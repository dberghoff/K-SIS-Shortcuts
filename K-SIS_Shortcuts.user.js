// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.5.3
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

            const SAVE_DELAY = 700;

            // Shorcut actions
            //=============== Global ===============//

            // Save
            if(event.ctrlKey && event.code == "KeyS") {
                shortcutClick(event, "btnToolbarSave");
                // Save & Back
                if (event.shiftKey) {
                    setTimeout(() => {
                        back(event)
                    },SAVE_DELAY);
                }
                return;
            }

            // Save & Back
            else if(event.code == "F12") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(() => {
                    back(event)
                },SAVE_DELAY);
                return;
            }

            // Back
            else if(event.code == "Escape") {
                back(event);
                return;
            }


            //============ Student List ============//

            // Filter Menu
            else if (event.ctrlKey && event.code == "KeyF") {
                if (shortcutClick(event, "btnToolbarFilterSort")) {
                    setTimeout(() => { // Focus first name input field
                        let nameInput = document.getElementById("filterFirstName");
                        nameInput.focus();
                        nameInput.select();
                    }, 300);
                }
                return;
            }

            // Enroll Student
            else if(event.code == "F2") {
                shortcutClick(event, "btnToolbarStudentEnrollNew");
                return;
            }

            // Score Card Entry
            else if(event.code == "F6") {
                shortcutClick(event, "btnToolbarScoreCardEntry");
                return;
            }

            // Student Profile
            else if(event.code == "F7") {
                shortcutClick(event, "btnToolbarStudentProfile");
                return;
            }

            // Progress Goal
            else if(event.code == "F8") {
                shortcutClick(event, "btnToolbarProgressGoal");
                return;
            }

            // Level Study Plan
            else if(event.code == "F9") {
                shortcutClick(event, "btnToolbarStudyPlanLevel");
                return;
            }

            // Progress History
            else if(event.code == "F10") {
                shortcutClick(event, "btnToolbarProgressHistory");
                return;
            }

            // Score Card Plan
            else if(event.ctrlKey && "event.code == "F9") {
                shortcutClick(event, "btnToolbarScoreCardPlan");
                return;
            }

            // Student Comments
            else if(event.code == "F11") {
                shortcutClick(event, "btnToolbarStudentComment");
                return;
            }


            //========== Score Card Entry ==========//

            // Date Range & Save
            else if (event.ctrlKey && event.code == "KeyD") {
                shortcutClick(event, "btnToolbarSave");
                shortcutClick(event, "btnToolbarDateRange");
                return;
            }

            // Save & Next Student
            else if (event.altKey && event.code == "Period") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(() => {
                    shortcutClick(event, "btnToolbarNextStudent")
                }, SAVE_DELAY);
                return;
            }

            // Save & Previous Student
            else if (event.altKey && event.code == "Comma") {
                shortcutClick(event, "btnToolbarSave");
                setTimeout(() => {
                    shortcutClick(event, "btnToolbarPrevStudent")
                }, SAVE_DELAY);
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
    // function shortcutClick(event, button) {
    //     event.preventDefault();
    //     try {
    //         document.getElementById(button).click();
    //         return 1;
    //     } catch (error) {
    //         return 0;
    //     }
    // }

    // I have to simulate a full mouse click because K-SIS is stupid...
    function shortcutClick(event, buttonName) {
        event.preventDefault();

        var button = document.getElementById(buttonName);
        function simulateMouseEvent(element, eventName, coordX, coordY) {
            element.dispatchEvent(new MouseEvent(eventName, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: coordX,
                clientY: coordY,
                button: 0
            }));
        };

        try {
            var buttonPos = button.getBoundingClientRect();
            var coordX = buttonPos.left + (buttonPos.right - buttonPos.left) / 2;
            var coordY = buttonPos.top + (buttonPos.bottom - buttonPos.top) / 2;
            
            simulateMouseEvent(button, "mousedown", coordX, coordY);
            simulateMouseEvent(button, "mouseup", coordX, coordY);
            simulateMouseEvent(button, "click", coordX, coordY);
        } catch (error) { return 0; }

        return 1;
    }

    // Click back/studentlist/home button
    function back(event) {
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
        
        return 1;
    }
})();
