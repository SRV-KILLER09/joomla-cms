<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Content.autotitle
 *
 * @copyright   (C) 2026 Your Name
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Joomla\Plugin\Content\Autotitle\Extension;

use Joomla\CMS\Event\Model\PrepareFormEvent;
use Joomla\CMS\Event\Plugin\AjaxEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Session\Session;
use Joomla\Event\SubscriberInterface;

\defined('_JEXEC') or die;

/**
 * Content plugin to prefill article title on new article form.
 */
final class Autotitle extends CMSPlugin implements SubscriberInterface
{
    /**
     * Returns an array of events this subscriber will listen to.
     *
     * @return  array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onContentPrepareForm' => 'onContentPrepareForm',
            'onAjaxAutotitle'      => 'onAjaxAutotitle',
        ];
    }

    /**
     * Adds script to the article edit form in administrator.
     *
     * @param   PrepareFormEvent  $event  The event instance.
     *
     * @return  void
     */
    public function onContentPrepareForm(PrepareFormEvent $event): void
    {
        $app = $this->getApplication();

        if (!$app->isClient('administrator')) {
            return;
        }

        $form = $event->getForm();

        if ($form->getName() !== 'com_content.article') {
            return;
        }

        $ajaxUrl = Route::_(
            'index.php?option=com_ajax&plugin=autotitle&group=content&format=json&' . Session::getFormToken() . '=1',
            false
        );

        $script = <<<JS
(() => {
    'use strict';

    const titleField = document.getElementById('jform_title');
    const idField = document.getElementById('jform_id');

    if (!titleField || !idField) {
        return;
    }

    // Apply only when creating a new article and the title is still empty.
    if (idField.value !== '0' || titleField.value.trim() !== '') {
        return;
    }

    Joomla.request({
        url: {$this->encodeForScript($ajaxUrl)},
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        onSuccess: (responseText) => {
            try {
                const response = JSON.parse(responseText);
                const prefill = response && response.success && response.data && response.data.title
                    ? String(response.data.title)
                    : '';

                if (prefill.trim() !== '' && titleField.value.trim() === '') {
                    titleField.value = prefill;
                    titleField.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } catch (error) {
                // Ignore malformed responses so the form remains usable.
            }
        }
    });
})();
JS;

        $app->getDocument()->addScriptDeclaration($script);
    }

    /**
     * Returns the configured prefill title through com_ajax.
     *
     * @param   AjaxEvent  $event  The event instance.
     *
     * @return  void
     */
    public function onAjaxAutotitle(AjaxEvent $event): void
    {
        if (!$this->getApplication()->isClient('administrator') || !Session::checkToken('request')) {
            return;
        }

        $event->updateEventResult([
            'title' => trim((string) $this->params->get('autotitle_text', '')),
        ]);
    }

    /**
     * Encodes a string for use as a JavaScript string literal.
     *
     * @param   string  $value  The value to encode.
     *
     * @return  string
     */
    private function encodeForScript(string $value): string
    {
        return (string) json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}
