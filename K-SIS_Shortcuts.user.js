// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.4.8
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

    // Check if user has opened a dialog window
    var inDialog = false;
    var observer = new MutationObserver(function(mutations, observer) {
        for (var i = 0; i < mutations.length; i++) {
            //console.log(mutations[i].target.getAttributeNode("class"));
            if (mutations[i].target.getAttributeNode("class").value == "notranslate modal-open") {
                //console.log("Dialog focused");
                inDialog = true;
            }
            else if (mutations[i].target.getAttributeNode("class").value == "notranslate") {
                //console.log("Dialog unfocused");
                inDialog = false;
            }
        }
    });
    observer.observe(document.body, {
        attributeFilter: ["class"]
    });

    // Listen for keyboard events
    document.addEventListener("keydown", (event) => {
        if (!inDialog) { // Do nothing if dialog open

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
            if(event.ctrlKey && event.code == 'KeyS' ) {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                if (event.shiftKey) {
                    setTimeout(function() {
                        document.getElementById(backBtn).click();
                        setTimeout(location.reload(), 600); // TODO: Find a better solution to fix focus issues after using this shortcut
                    }, 500);
                }
            }
            if(event.code == 'F12') {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById(backBtn).click();
                    setTimeout(location.reload(), 600); // TODO: Find a better solution to fix focus issues after using this shortcut
                }, 500);
            }

            // Back = Esc
            if(event.code == 'Escape') {
                document.getElementById(backBtn).click();
            }



            //============ Student List ============//

            // Filter Menu = Ctrl + F
            if (event.ctrlKey && event.code == 'KeyF') {
                event.preventDefault();
                document.getElementById("btnToolbarFilterSort").click();
                setTimeout(function() { // Focus first name input field
                    const nameInput = document.getElementById("filterFirstName");
                    nameInput.focus();
                    nameInput.select();
                }, 250);
            }

            // Enroll Student = F2
            if(event.code == "F2") {
                event.preventDefault();
                document.getElementById("btnToolbarStudentEnrollNew").click();
            }

            // Score Card Entry = R || F6
            if(event.code == 'KeyR' || event.code == 'F12') {
                event.preventDefault();
                document.getElementById("btnToolbarScoreCardEntry").click();
            }

            // Student Profile = F7
            if(event.code == "F7") {
                event.preventDefault();
                document.getElementById("btnToolbarStudentProfile").click();
            }

            // Progress Goal = F8
            if(event.code == "F8") {
                event.preventDefault();
                document.getElementById("btnToolbarProgressGoal").click();
            }

            // Level Study Plan = F9
            if(event.code == "F9") {
                event.preventDefault();
                document.getElementById("btnToolbarStudyPlanLevel").click();
            }

            // Progress History = F10
            if(event.code == "F10") {
                event.preventDefault();
                document.getElementById("btnToolbarProgressHistory").click();
            }

            // Score Card Plan = F10
            // if(event.code == "F10") {
            //     event.preventDefault();
            //     document.getElementById("btnToolbarScoreCardPlan").click();
            // }

            // Student Comments = F11
            if(event.code == "F11") {
                event.preventDefault();
                document.getElementById("btnToolbarStudentComment").click();
            }



            //========== Score Card Entry ==========//

            // Date Range = Ctrl + D
            // Date Range & Save = Ctrl + Shift + D
            if (event.ctrlKey && event.code == 'KeyD') {
                event.preventDefault();
                document.getElementById("btnToolbarDateRange").click();
                if (event.shiftKey) {
                    event.preventDefault();
                    setTimeout(function() {
                        document.getElementById("btnToolbarSave").click();
                    }, 100);
                }
            }

            // Save & Next Student = Alt + >
            if (event.altKey && event.code == 'Period') {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById("btnToolbarNextStudent").click();
                }, 500);
            }

            // Save & Previous Student = Alt + <
            if (event.altKey && event.code == 'Comma') {
                event.preventDefault();
                document.getElementById("btnToolbarSave").click();
                setTimeout(function() {
                    document.getElementById("btnToolbarPrevStudent").click();
                }, 500);
            }
        }
    })
})();
