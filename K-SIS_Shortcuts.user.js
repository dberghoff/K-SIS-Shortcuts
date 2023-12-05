// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.5.1
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
            if (mutations[i].target.getAttributeNode("class").value == "notranslate modal-open") {
                inDialog = true;
            }
            else if (mutations[i].target.getAttributeNode("class").value == "notranslate") {
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

            // Shorcut actions
            //=============== Global ===============//

            // Save
            if(event.ctrlKey && event.code == "KeyS") {
                shortcutClick(event, "btnToolbarSave");
                // Save & Back
                if (event.shiftKey) {
                    back(event, true);
                }
                return;
            }

            // Save & Back
            if(event.code == "F12") {
                shortcutClick(event, "btnToolbarSave");
                back(event, true);
                return;
            }

            // Back
            if(event.code == "Escape") {
                back(event, false);
                return;
            }


            //============ Student List ============//

            // Filter Menu
            if (event.ctrlKey && event.code == "KeyF") {
                if (shortcutClick(event, "btnToolbarFilterSort")) {
                    setTimeout(function() { // Focus first name input field
                        let nameInput = document.getElementById("filterFirstName");
                        nameInput.focus();
                        nameInput.select();
                    }, 250);
                }
                return;
            }

            // Enroll Student
            if(event.code == "KeyE" || event.code == "F2") {
                shortcutClick(event, "btnToolbarStudentEnrollNew");
                return;
            }

            // Score Card Entry
            if(event.code == "KeyR" || event.code == "F6") {
                shortcutClick(event, "btnToolbarScoreCardEntry");
                return;
            }

            // Student Profile
            if(event.code == "KeyP" || event.code == "F7") {
                shortcutClick(event, "btnToolbarStudentProfile");
                return;
            }

            // Progress Goal
            if(event.code == "KeyG" || event.code == "F8") {
                shortcutClick(event, "btnToolbarProgressGoal");
                return;
            }

            // Level Study Plan
            if(event.code == "KeyL" || event.code == "F9") {
                shortcutClick(event, "btnToolbarStudyPlanLevel");
                return;
            }

            // Progress History
            if(event.code == "KeyH" || event.code == "F10") {
                shortcutClick(event, "btnToolbarProgressHistory");
                return;
            }

            // Score Card Plan
            if(event.code == "KeyS") {
                shortcutClick(event, "btnToolbarScoreCardPlan");
                return;
            }

            // Student Comments
            if(event.code == "KeyC" || event.code == "F11") {
                shortcutClick(event, "btnToolbarStudentComment");
                return;
            }

            // Transfer Report
            if(event.code == "KeyT") {
                shortcutClick(event, "btnToolbarStudentTransferReport");
                return;
            }


            //========== Score Card Entry ==========//

            // Date Range & Save
            if (event.ctrlKey && event.code == "KeyD") {
                shortcutClick(event, "btnToolbarSave");
                shortcutClick(event, "btnToolbarDateRange");
                return;
            }

            // Save & Next Student
            if (event.altKey && event.code == "Period") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(function() {
                    shortcutClick(event, "btnToolbarNextStudent")
                }, 500);
                return;
            }

            // Save & Previous Student
            if (event.altKey && event.code == "Comma") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(function() {
                    shortcutClick(event, "btnToolbarPrevStudent")
                }, 500);
                return;
            }
        }
    })

    // Get the current page name
    // ? maybe use for other things
    function page() {
        let url = document.location.toString();
        let indexSlash = url.indexOf("/", 38);
        return url.slice(37, (indexSlash >= 0) ? indexSlash:100);
    }

    // Click button do thing
    function shortcutClick(event, button) {
        event.preventDefault();
        try {
            document.getElementById(button).click();
            return 1;
        } catch (error) {
            return 0;
        }
    }

    // Click back/studentlist/home button
    function back(event, reload) {
        // Set the best button to use to go back from current page
        let backBtn;
        switch (page()) {
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
            case "printview":
                backBtn = "btnToolbarBack";
                break;
            default:
                backBtn = "btnToolbarHome";
                break;
        }

        if (!shortcutClick(event, backBtn)) return 0;
        
        if (reload) setTimeout(location.reload(), 600); // TODO: Find a better solution to fix focus issues after using this shortcut
        
        return 1;
    }
})();
