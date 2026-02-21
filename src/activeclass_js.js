/**
 * @art_is_code/activeclass_js
 * (c) 2026 Andrea D'Agostino
 * Released under the MIT License.
 */
/**
 * activeclass_js
 * Advanced navigation context and active state management.
 * @author Andrea D'Agostino (art is code)
 */

export const active = (options = {}) => {
    
    const config = {
        className: 'activecl',
        selector: 'a[href]:not([href=""])',
        observer: true,
        ...options
    };

    /**
     * Core logic to evaluate and update elements
     */
    const run = () => {
        const currentPath = window.location.pathname;
        const currentHref = window.location.href;
        const currentHash = window.location.hash;

        /**
         * Activates logical groups defined in data-ac-group attributes.
         */
        const activateDependencies = (tagsString, originEl) => {
            tagsString.split(',').forEach(tag => {
                const cleanTag = tag.trim();
                if (!cleanTag) return;

                const potentialTargets = document.querySelectorAll(`[data-ac-group*="${cleanTag}"]`);
                
                potentialTargets.forEach(target => {
                    const groupAttr = target.dataset.acGroup || '';
                    const groups = groupAttr.split(/[ ,]+/).filter(Boolean);
                    
                    if (groups.includes(cleanTag) && target !== originEl) {
                        target.classList.add(config.className);
                    }
                });
            });
        };

        /**
         * Processes a single node to determine its active state.
         */
        const processElement = (el) => {
            if (el.tagName === 'A') {
                const ds = el.dataset;
                const withQuery = ds.acQuery === "1";
                const tagsString = ds.acTags;
                const exclude = ds.acExclude === "1";
                const href = el.getAttribute('href');

                if (!href || href === '#') return;

                let isMatch = false;
                if (href.startsWith('#')) {
                    isMatch = (href === currentHash);
                } else {
                    const currentCompare = withQuery ? currentHref : currentPath;
                    isMatch = (href === currentCompare);
                }

                if (isMatch) {
                    if (!exclude) el.classList.add(config.className);
                    if (tagsString) activateDependencies(tagsString, el);
                }
            }

            if (el.dataset.acForce) {
                activateDependencies(el.dataset.acForce, el);
            }
        };

        // Clear existing active classes to allow a clean refresh
        document.querySelectorAll(`.${config.className}`).forEach(el => {
            el.classList.remove(config.className);
        });

        // Execute processing
        document.querySelectorAll(`${config.selector}, [data-ac-force]`).forEach(processElement);
    };

    // 1. Initial execution
    run();

    // 2. MutationObserver for AJAX content injection
    if (config.observer) {
        const observer = new MutationObserver(() => run()); // Re-run logic on DOM changes
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 3. Return public API
    return {
        refresh: () => run()
    };
};