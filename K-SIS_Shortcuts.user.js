// ==UserScript==
// @name         K-SIS Shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.5.3
// @description  Various shortcuts to make using K-SIS less annoying
// @author       Dan Berghoff
// @updateURL    https://github.com/dberghoff/K-SIS-Shortcuts/raw/main/K-SIS_Shortcuts.user.js
// @match        https://us.ksisstandard.kumon.com/*
// @icon         https://us.ksisstandard.kumon.com/favicon.ico
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';0;

    const SAVE_DELAY = 700;
    const FILTER_DELAY = 250;

    var inDialog = false;
    var observerDialog = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {

            // Remove tooltip from score card time input
            if (mutations[i].target.hasAttribute("gcuielement")) {
                let element = mutations[i].target;
                if (element.getAttribute("gcuielement") == "gcSpread") {
                    let tooltip = element.childNodes[0].childNodes[2];
                    if (tooltip != null) {
                        tooltip.remove();
                    }
                }
            }

            // Check if user has opened a dialog window
            if (mutations[i].target.getAttribute("class") == null) continue;
            if (mutations[i].target.getAttribute("class") == "notranslate modal-open") {
                inDialog = true;
            }
            else if (mutations[i].target.getAttribute("class") == "notranslate") {
                inDialog = false;
            }
        }
    });
    observerDialog.observe(document.body, {
        attributeFilter: ["class", "gcuielement"],
        subtree: true,
        childList: true
    });

    // Listen for keyboard events
    document.addEventListener("keydown", (event) => {
        if (!inDialog) { // Do nothing if dialog open

            // Shorcut actions
            //=============== Global ===============//

            // Save
            if(event.ctrlKey && event.code == "KeyS") {
                clickElement(event, findButton("btnToolbarSave"));
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
                clickElement(event, findButton("btnToolbarSave"));
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

            // Move Up
            else if (event.code.includes("Arrow") && page() == "studentlist") {
                let rowSelected = document.getElementsByClassName("k-master-row ng-scope k-state-selected")[0];
                let rowClick = null;

                if (event.code == "ArrowUp") {
                    rowClick = rowSelected.previousElementSibling;
                }

                else if (event.code == "ArrowDown") {
                    rowClick = rowSelected.nextElementSibling;
                }

                if (rowClick == null) return;
                clickElement(event, rowClick);
                return;
            }

            // Filter Menu
            else if (event.ctrlKey && event.code == "KeyF") {
                if (clickElement(event, findButton("btnToolbarFilterSort"))) {
                    setTimeout(() => { // Focus first name input field
                        let nameInput = document.getElementById("filterFirstName");
                        nameInput.focus();
                        nameInput.select();
                    }, FILTER_DELAY);
                }
                return;
            }

            // Enroll Student
            else if(event.code == "F2") {
                clickElement(event, findButton("btnToolbarStudentEnrollNew"));
                return;
            }

            // Score Card Entry
            else if(event.code == "F6") {
                clickElement(event, findButton("btnToolbarScoreCardEntry"));
                return;
            }

            // Student Profile
            else if(event.code == "F7") {
                clickElement(event, findButton("btnToolbarStudentProfile"));
                return;
            }

            // Progress Goal
            else if(event.code == "F8") {
                clickElement(event, findButton("btnToolbarProgressGoal"));
                return;
            }

            // Level Study Plan
            else if(!event.ctrlKey && event.code == "F9") {
                clickElement(event, findButton("btnToolbarStudyPlanLevel"));
                return;
            }

            // Progress History
            else if(event.code == "F10") {
                clickElement(event, findButton("btnToolbarProgressHistory"));
                return;
            }

            // Score Card Plan
            else if(event.ctrlKey && event.code == "F9") {
                clickElement(event, findButton("btnToolbarScoreCardPlan"));
                return;
            }

            // Student Comments
            else if(event.code == "F11") {
                clickElement(event, findButton("btnToolbarStudentComment"));
                return;
            }


            //========== Score Card Entry ==========//

            // Date Range & Save
            else if (event.ctrlKey && event.code == "KeyD") {
                clickElement(event, findButton("btnToolbarSave"));
                clickElement(event, findButton("btnToolbarDateRange"));
                return;
            }

            // Save & Next Student
            else if (event.altKey && event.code == "Period") {
                clickElement(event, findButton("btnToolbarSave"));
                setTimeout(() => {
                    clickElement(event, findButton("btnToolbarNextStudent"))
                }, SAVE_DELAY);
                return;
            }

            // Save & Previous Student
            else if (event.altKey && event.code == "Comma") {
                clickElement(event, findButton("btnToolbarSave"));
                setTimeout(() => {
                    clickElement(event, findButton("btnToolbarPrevStudent"))
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

    // Find button on page
    function findButton(buttonName) {
        let buttonElement = null;

        try {
            buttonElement = document.getElementById(buttonName);
        } catch (error) {}

        return buttonElement;
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
    function clickElement(event, button) {
        event.preventDefault();

        //var button = document.getElementById(buttonName);
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
            case "error":
                backBtn = "btnToolbarBack";
                break;
            default:
                backBtn = "btnToolbarHome";
                break;
        }

        if (!clickElement(event, findButton(backBtn))) return 0;

        return 1;
    }
})();
