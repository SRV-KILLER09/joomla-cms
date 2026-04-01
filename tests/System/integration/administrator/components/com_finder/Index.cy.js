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

    // Trigger indexing via direct API call using queryDB task
    cy.task('queryDB', "UPDATE #__finder_links SET published = 0 WHERE link LIKE '%cafe%'");
    
    // Visit Smart Search index page
    cy.visit('/administrator/index.php?option=com_finder&view=index');

    // Click on Index button (first button in toolbar, which is typically the Index action)
    cy.get('#toolbar-index-group > button').first().click({ force: true });

    // Wait a moment for indexing to process
    cy.wait(2000);

    // Check indexing message appeared
    cy.checkForSystemMessage('Indexing', { position: 0 });

    // Refresh the index view to see updated results
    cy.reload();
    cy.wait(1000);

    // Verify both articles are indexed by checking in the database
    cy.task('queryDB', "SELECT COUNT(*) AS count FROM #__finder_links WHERE (title = 'Café Stereo' OR title = 'Cafe Stereo') AND published = 1").then((rows) => {
      expect(Number(rows[0].count)).to.be.greaterThanOrEqual(2);
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
