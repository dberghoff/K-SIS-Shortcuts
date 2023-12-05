// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.5.0
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

            // Shorcut actions
            //=============== Global ===============//

            // Save = Crtl + S
            // Save & Back = Ctrl + Shift + S ||  F12 (CMS)
            if(event.ctrlKey && event.code == "KeyS") {
                shortcutClick(event, "btnToolbarSave");
                if (event.shiftKey) {
                    back(event, page(), true);
                }
            }
            if(event.code == "F12") {
                shortcutClick(event, "btnToolbarSave");
                back(event, page(), true);
            }

            // Back = Esc
            if(event.code == "Escape") {
                back(event, page(), false);
            }


            //============ Student List ============//

            // Filter Menu = Ctrl + F
            if (event.ctrlKey && event.code == "KeyF") {
                if (shortcutClick(event, "btnToolbarFilterSort")) {
                    setTimeout(function() { // Focus first name input field
                        let nameInput = document.getElementById("filterFirstName");
                        nameInput.focus();
                        nameInput.select();
                    }, 250);
                }
            }

            // Enroll Student = F2
            if(event.code == "F2") {
                shortcutClick(event, "btnToolbarStudentEnrollNew");
            }

            // Score Card Entry = R || F6
            if(event.code == "KeyR" || event.code == "F6") {
                shortcutClick(event, "btnToolbarScoreCardEntry");
            }

            // Student Profile = F7
            if(event.code == "F7") {
                shortcutClick(event, "btnToolbarStudentProfile");
            }

            // Progress Goal = F8
            if(event.code == "F8") {
                shortcutClick(event, "btnToolbarProgressGoal");
            }

            // Level Study Plan = F9
            if(event.code == "F9") {
                shortcutClick(event, "btnToolbarStudyPlanLevel");
            }

            // Progress History = F10
            if(event.code == "F10") {
                shortcutClick(event, "btnToolbarProgressHistory");
            }

            // Score Card Plan = F10
            // if(event.code == "F10") {
            //     event.preventDefault();
            //     document.getElementById("btnToolbarScoreCardPlan").click();
            // }

            // Student Comments = F11
            if(event.code == "F11") {
                shortcutClick(event, "btnToolbarStudentComment");
            }


            //========== Score Card Entry ==========//

            // Date Range & Save = Ctrl + D
            if (event.ctrlKey && event.code == "KeyD") {
                shortcutClick(event, "btnToolbarSave");
                shortcutClick(event, "btnToolbarDateRange");
            }

            // Save & Next Student = Alt + >
            if (event.altKey && event.code == "Period") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(function() {
                    shortcutClick(event, "btnToolbarNextStudent")
                }, 500);
            }

            // Save & Previous Student = Alt + <
            if (event.altKey && event.code == "Comma") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(function() {
                    shortcutClick(event, "btnToolbarPrevStudent")
                }, 500);
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
    function back(event, page, reload) {
        // Set the best button to use to go back from current page
        let backBtn;
        switch (page) {
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
        if (!shortcutClick(event, backBtn)) return 0;
        if (reload) setTimeout(location.reload(), 600); // TODO: Find a better solution to fix focus issues after using this shortcut
        return 1;
    }
})();
