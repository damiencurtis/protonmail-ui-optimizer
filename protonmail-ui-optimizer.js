// ==UserScript==
// @name         protonmail-ui-optimizer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes promo/offer buttons (topnav, settings) from Proton Mail UI
// @author       You
// @match        https://mail.proton.me/*
// @match        https://account.proton.me/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove any nav promo/offer button across all layouts
    function removeNavPromoButtons() {
        // Select buttons with any class containing "button-promotion"
        document.querySelectorAll('button[class*="button-promotion"]').forEach(btn => {
            // Remove the parent <li> if present for a cleaner look
            const li = btn.closest('li.topnav-listItem');
            if (li) li.remove();
            else btn.remove();
        });
    }

    // Remove any promo/banner matching Proton Mail's structure
    function removePromoBanners() {
        document.querySelectorAll('div.bg-promotion[data-testid="promotion-banner"]').forEach(banner => banner.remove());
    }

    // Main cleanup function for unwanted elements
    function removeUIElements() {
        removeNavPromoButtons();
        removePromoBanners();
    }

    // Run on page load
    removeUIElements();

    // React instantly to DOM changes (dynamic content and app navigation)
    new MutationObserver(removeUIElements)
        .observe(document.body, { childList: true, subtree: true });
})();
