// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.4.3
// @description  Various shortcuts to make using K-SIS less annoying
// @author       Dan Berghoff
// @updateURL    https://github.com/dberghoff/K-SIS-Shortcuts/raw/main/K-SIS_Shortcuts.user.js
// @match        https://us.ksisstandard.kumon.com/*
// @icon         https://us.ksisstandard.kumon.com/favicon.ico
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {
    'use strict';0;

    // Check if user has focus on form input
    var formFocus = false;
    document.addEventListener("focusin", (event) => {
        formFocus = document.getElementById(event.target.id).className.includes("form-control"); // TODO: Get focus of scorecard & catch errors w/ clicking on elements w/o className
    });
    document.addEventListener("focusout", () => {
        formFocus = false;
    });

    // Listen for keyboard events
    document.addEventListener("keydown", (event) => {
        if (!formFocus) { // Do nothing if user is editing a form

            // Set the best button to use to go back from current page
            let url = document.location.toString();
            let backBtn;
            url = url.slice(37, (url.indexOf("/",38) >= 0) ? url.indexOf("/",38):100);
            switch(url) {
                case "scorecardentry":
                    backBtn = "btnToolbarStudentList";
                    break;
                case "progressgoal":
                    backBtn = "btnToolbarStudentList";
                    break;
                case "progresshistory":
                    backBtn = "btnToolbarStudentList";
                    break;
                case "student":
                    backBtn = "btnToolbarStudentList";
                    break;
                case "studentcommentlist":
                    backBtn = "btnToolbarBack";
                    break;
                case "studyplanlevel":
                    backBtn = "btnToolbarBack";
                    break;
                case "scorecardplan":
                    backBtn = "btnToolbarBack";
                    break;
                default:
                    backBtn = "btnToolbarHome";
                    break;
            }

            // Shorcut actions
            switch(event.keyCode) {

                //=============== Global ===============//

                // Save = Crtl + S
                // Save & Back = Ctrl + Shift + S
                case 83:
                    if (event.ctrlKey) {
                        event.preventDefault();
                        document.getElementById("btnToolbarSave").click();
                        if (event.shiftKey) {
                            setTimeout(function() {
                                document.getElementById(backBtn).click();
                                location.reload(); // TODO: Find a better solution to fix focus issues after using this shortcut
                            }, 1000);
                        }
                    }
                    break;

                // Back = Esc
                case 27:
                    document.getElementById(backBtn).click();
                    break;



                //============ Student List ============//

                // Filter Menu = Ctrl + F
                case 70:
                    if (event.ctrlKey) {
                        event.preventDefault();
                        document.getElementById("btnToolbarFilterSort").click();
                        setTimeout(function() { // Focus first name input field
                            const nameInput = document.getElementById("filterFirstName");
                            nameInput.focus();
                            nameInput.select();
                        }, 500);
                        break;
                    }

                // Score Card Entry = R
                case 82:
                    document.getElementById("btnToolbarScoreCardEntry").click();
                    break;

                // Progress Goal
                // Progress History
                // Student Profile
                // Student Comments
                // Level Study Plan
                // Score Card Plan



                //========== Score Card Entry ==========//

                // Date Range = Ctrl + D
                // Date Range & Save = Ctrl + Shift + D
                case 68:
                    if (event.ctrlKey) {
                        event.preventDefault();
                        document.getElementById("btnToolbarDateRange").click();
                        if (event.shiftKey) {
                            setTimeout(function() {
                                document.getElementById("btnToolbarSave").click();
                            }, 100);
                        }
                    }
                    break;

                // Save & Next Student = Alt + >
                case 188:
                    if (event.altKey) {
                        document.getElementById("btnToolbarSave").click();
                        setTimeout(function() {
                            document.getElementById("btnToolbarNextStudent").click();
                        }, 1000);
                    }
                    break;

                // Save & Previous Student = Alt + <
                case 190:
                    if (event.altKey) {
                        document.getElementById("btnToolbarSave").click();
                        setTimeout(function() {
                            document.getElementById("btnToolbarPrevStudent").click();
                        }, 1000);
                    }
                    break;
            }
        }
    })
})();
