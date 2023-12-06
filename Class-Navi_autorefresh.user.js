// ==UserScript==
// @name         Class Navi Auto Refresh
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Click the refresh button after a set interval
// @author       Dan Berghoff
// @match        https://class-navi.digital.kumon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kumon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.code == "KeyR") {
            event.preventDefault();
            document.getElementsByClassName("button")[0].click();
        }
    }
})();
