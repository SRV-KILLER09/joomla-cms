// Dark Mode Toggle for Joomla Admin (Atum)
(function() {
  const STORAGE_KEY = 'joomlaAdminDarkMode';
  const root = document.documentElement;

  function setDarkMode(enabled) {
    if (enabled) {
      root.setAttribute('data-color-scheme', 'dark');
      root.setAttribute('data-bs-theme', 'dark');
    } else {
      root.setAttribute('data-color-scheme', 'light');
      root.setAttribute('data-bs-theme', 'light');
    }
    localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  }

  function getDarkMode() {
    return localStorage.getItem(STORAGE_KEY) === '1';
  }

  function toggleDarkMode() {
    setDarkMode(!getDarkMode());
    updateButton();
  }

  function updateButton() {
    const btn = document.getElementById('darkmode-toggle-btn');
    if (!btn) return;
    btn.setAttribute('aria-pressed', getDarkMode() ? 'true' : 'false');
    btn.innerHTML = getDarkMode() ? '🌙 Dark' : '☀️ Light';
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Insert button in header
    const header = document.querySelector('.header-inside .header-title');
    if (header && !document.getElementById('darkmode-toggle-btn')) {
      const btn = document.createElement('button');
      btn.id = 'darkmode-toggle-btn';
      btn.type = 'button';
      btn.className = 'btn btn-sm btn-darkmode ms-3';
      btn.style.fontSize = '1.2em';
      btn.style.padding = '0.3em 0.8em';
      btn.style.borderRadius = '1.5em';
      btn.style.border = '1px solid #888';
      btn.style.background = 'var(--template-bg-light, #f0f4fb)';
      btn.style.color = 'var(--template-text-dark, #495057)';
      btn.onclick = toggleDarkMode;
      header.appendChild(btn);
      updateButton();
    }
    // Apply saved mode
    setDarkMode(getDarkMode());
  });
})();
