// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Various shortcuts to make using K-SIS less annoying
// @author       Dan Berghoff
// @updateURL    https://github.com/dberghoff/K-SIS-Shortcuts/raw/main/K-SIS_Shortcuts.user.js
// @match        https://us.ksisstandard.kumon.com/*
// @match        https://www.tampermonkey.net/index.php?version=4.19.0&ext=dhdg&updated=true
// @icon         https://us.ksisstandard.kumon.com/favicon.ico
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {
    'use strict';0;

    // Listen for keyboard events
    document.addEventListener("keydown", onKeydown, true);

    // Check if user has focus on form input
    var formFocus = false;
    document.addEventListener("focusin", (event) => {
        formFocus = document.getElementById(event.target.id).className.includes("form-control");
    });
    document.addEventListener("focusout", () => {
        formFocus = false;
    });

    // Shorcut actions
    function onKeydown(event) {
        if (!formFocus) {
            switch(event.keyCode) {
                // Filter Menu = F
                case 70:
                    document.getElementById("btnToolbarFilterSort").click();
                    setTimeout(function() {
                        const nameInput = document.getElementById("filterFirstName");
                        nameInput.focus();
                        nameInput.select();
                    }, 500);
                    break;

                // Score Card Entry = R
                case 82:
                    document.getElementById("btnToolbarScoreCardEntry").click();
                    break;

                // Date Range = D
                case 68:
                    document.getElementById("btnToolbarDateRange").click();
                    break;

                // Back = Esc
                case 27:
                    document.getElementById("btnToolbarStudentList").click();
                    break;

                // Save = S
                // Save & Back = Shift + S
                case 83:
                    document.getElementById("btnToolbarSave").click();
                    if (event.shiftKey) {
                        setTimeout(function() {
                            document.getElementById("btnToolbarStudentList").click();
                        }, 1000);
                        break;
                    }
                    break;

                // Next Student = >
                case 188:
                    document.getElementById("btnToolbarSave").click();
                    setTimeout(function() {
                        document.getElementById("btnToolbarNextStudent").click();
                    }, 1000);
                    break;

                // Previous Student = <
                case 190:
                    document.getElementById("btnToolbarSave").click();
                    setTimeout(function() {
                        document.getElementById("btnToolbarPrevStudent").click();
                    }, 1000);
                    break;
            }
        }
    }
})();
