// copy-clipboard.js

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetId = btn.getAttribute('data-copy-target');
            var target = document.getElementById(targetId);
            if (target) {
                var text = target.textContent || target.value;
                navigator.clipboard.writeText(text).then(function () {
                    btn.classList.add('copied');
                    var originalTitle = btn.title;
                    btn.title = 'Copied!';
                    setTimeout(function () {
                        btn.classList.remove('copied');
                        btn.title = originalTitle;
                    }, 1200);
                });
            }
        });
    });
});
