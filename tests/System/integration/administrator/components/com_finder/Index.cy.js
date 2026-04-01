describe('Test in backend that the Smart Search', () => {
  beforeEach(() => {
    cy.doAdministratorLogin();
  });
  afterEach(() => {
    cy.task('queryDB', "DELETE FROM #__finder_links WHERE title IN ('Test article', 'Cafe Stereo', 'Café Stereo')");
    cy.task('queryDB', "DELETE FROM #__content WHERE title IN ('Test article', 'Cafe Stereo', 'Café Stereo')");
  });

  const createArticle = (title, alias) => {
    cy.visit('/administrator/index.php?option=com_content&task=article.add');
    cy.get('#jform_title').clear().type(title);
    cy.get('#jform_alias').clear().type(alias);
    cy.clickToolbarButton('Save & Close');
    cy.checkForSystemMessage('Article saved.');
  };

  it('can index an article', () => {
    // Create a new article
    createArticle('Test article', 'test-article');
    // Visit the smart search page
    cy.visit('/administrator/index.php?option=com_finder&view=index');
    cy.contains('Test article').should('exist');
  });

  it('can index articles with duplicate normalized terms', () => {
    createArticle('Café Stereo', 'cafe-stereo-accent');
    createArticle('Cafe Stereo', 'cafe-stereo-no-accent');

    cy.visit('/administrator/index.php?option=com_finder&view=index');

    cy.contains('Café Stereo').should('exist');
    cy.contains('Cafe Stereo').should('exist');

    cy.task('queryDB', "SELECT COUNT(*) AS count FROM #__finder_links WHERE title IN ('Café Stereo', 'Cafe Stereo')").then((rows) => {
      expect(Number(rows[0].count)).to.eq(2);
    });
  });

  it('can purge the index', () => {
    // Visit the smart search page
    cy.visit('/administrator/index.php?option=com_finder&view=index');
    cy.get('#toolbar-maintenance-group > button').click();
    // Click the "Clear Index" button
    cy.get('#maintenance-group-children-index-purge > button', { force: true }).click();
    cy.clickDialogConfirm(true);
    cy.checkForSystemMessage('All items have been deleted.');
  });
});
