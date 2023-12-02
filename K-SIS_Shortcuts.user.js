// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.4.4
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
            //=============== Global ===============//

            // Save = Crtl + S
            // Save & Back = Ctrl + Shift + S ||  F12 (CMS)
            if(event.ctrlkey && event.key == 83) {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                if (event.shiftKey) {
                    setTimeout(function() {
                        document.getElementById(backBtn).click();
                        location.reload(); // TODO: Find a better solution to fix focus issues after using this shortcut
                    }, 1000);
                }
            }
            if(event.key == 123) {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById(backBtn).click();
                    location.reload(); // TODO: Find a better solution to fix focus issues after using this shortcut
                }, 1000);
            }

            // Back = Esc
            if(event.key == 27) {
                document.getElementById(backBtn).click();
            }



            //============ Student List ============//

            // Filter Menu = Ctrl + F
            if (event.ctrlKey && event.key == 70) {
                event.preventDefault();
                document.getElementById("btnToolbarFilterSort").click();
                setTimeout(function() { // Focus first name input field
                    const nameInput = document.getElementById("filterFirstName");
                    nameInput.focus();
                    nameInput.select();
                }, 500);
            }

            // Enroll Student = F2
            if(event.key == 113) {
                event.preventDefault();
                document.getElementById("btnToolbarStudentEnrollNew").click();
            }

            // Student Profile = F3
            if(event.key == 114) {
                event.preventDefault();
                document.getElementById("btnToolbarStudentProfile").click();
            }

            // Score Card Entry = R || F6
            if(event.key == 82 || event.key == 117) {
                event.preventDefault();
                document.getElementById("btnToolbarScoreCardEntry").click();
            }

            // Progress Goal = F7
            if(event.key == 118) {
                event.preventDefault();
                document.getElementById("btnToolbarProgressGoal").click();
            }

            // Progress History = F8
            if(event.key == 119) {
                event.preventDefault();
                document.getElementById("btnToolbarProgressHistory").click();
            }
            
            // Level Study Plan = F9
            if(event.key == 120) {
                event.preventDefault();
                document.getElementById("btnToolbarStudyPlanLevel").click();
            }

            // Score Card Plan = F10
            if(event.key == 121) {
                event.preventDefault();
                document.getElementById("btnToolbarScoreCardPlan").click();
            }

            // Student Comments = F11
            if(event.key == 122) {
                event.preventDefault();
                document.getElementById("btnToolbarStudentComment").click();
            }



            //========== Score Card Entry ==========//

            // Date Range = Ctrl + D
            // Date Range & Save = Ctrl + Shift + D
            if (event.ctrlKey && event.key == 68) {
                event.preventDefault();
                document.getElementById("btnToolbarDateRange").click();
                if (event.shiftKey) {
                    setTimeout(function() {
                        document.getElementById("btnToolbarSave").click();
                    }, 100);
                }
            }

            // Save & Next Student = Alt + >
            if (event.altKey && event.key == 188) {
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById("btnToolbarNextStudent").click();
                }, 1000);
            }

            // Save & Previous Student = Alt + <
            if (event.altKey && event.key == 190) {
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById("btnToolbarPrevStudent").click();
                }, 1000);
            }
        }
    })
})();
