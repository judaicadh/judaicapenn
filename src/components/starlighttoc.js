// src/components/TableOfContents/toc-open-current.js
(function () {
    const navRoot = document.querySelector('starlight-toc nav');
    if (!navRoot) return;

    function setActiveFromHash() {
        const hash = decodeURIComponent(location.hash || '');
        const links = navRoot.querySelectorAll('a[href^="#"]');
        links.forEach((a) => a.setAttribute('aria-current', 'false'));

        if (!hash) return;

        // find closest matching link
        const current = navRoot.querySelector(`a[href="${hash}"]`);
        if (!current) return;

        current.setAttribute('aria-current', 'true');

        // open all ancestor <details>
        let node = current.parentElement;
        while (node) {
            if (node.tagName === 'DETAILS') node.open = true;
            node = node.parentElement;
        }
    }

    // Initial + on hash changes (clicks or scrolling updates)
    setActiveFromHash();
    window.addEventListener('hashchange', setActiveFromHash, { passive: true });

    // If your site updates hash while scrolling, you can also observe headings:
    // Optional: open on IntersectionObserver-driven hash updates
})();