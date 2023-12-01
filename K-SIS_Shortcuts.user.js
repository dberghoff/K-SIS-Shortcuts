// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  Various shortcuts to make using K-SIS less annoying
// @author       Dan Berghoff
// @updateURL    https://github.com/dberghoff/K-SIS-Shortcuts/raw/main/K-SIS_Shortcuts.user.js
// @include      https://us.ksisstandard.kumon.com/*
// @match        https://www.tampermonkey.net/index.php?version=4.19.0&ext=dhdg&updated=true
// @icon         https://us.ksisstandard.kumon.com/favicon.ico
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {
    'use strict';0;

    function onKeydown(evt) {
        // Ctrl + Shift + F = Filter Menu
        if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 70) {
            setTimeout(document.getElementById("btnToolbarFilterSort").click(),500);
            setTimeout(function() {
                const nameInput = document.getElementById("filterFirstName");
                nameInput.click();
                setTimeout(nameInput.focus(),100);
                setTimeout(nameInput.select(),200);
            }, 500);
        }

        // Ctrl + Shift + V = Score Card Entry
        if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 86) {
            document.getElementById("btnToolbarScoreCardEntry").click();
        }

        // D = Date Range
        if (evt.keyCode == 68) {
            document.getElementById("btnToolbarDateRange").click();
        }

        // Esc = Back
        //if (evt.keyCode == 27) {
        //    document.getElementById("btnToolbarBack").click();
        //}

        // S = Save
        if (evt.keyCode == 83) {
            document.getElementById("btnToolbarSave").click();
        }

        // S = Save and Back
        if (evt.shiftKey && evt.shiftKey && evt.keyCode == 83) {
            document.getElementById("btnToolbarSave").click();
            setTimeout(function() {
                document.getElementById("btnToolbarBack").click();
            }, 1000);
        }

        // Alt + RightArrow = Next Student
        if (evt.altKey && evt.keyCode == 39) {
            document.getElementById("btnToolbarSave").click();
            setTimeout(function() {
                document.getElementById("btnToolbarNextStudent").click();
            }, 1000);
        }

        // Alt + LeftArrow = Previous Student
        if (evt.altKey && evt.keyCode == 37) {
            document.getElementById("btnToolbarSave").click();
            setTimeout(function() {
                document.getElementById("btnToolbarPrevStudent").click();
            }, 1000);
        }
    }

    document.addEventListener('keydown', onKeydown, true);
})();
