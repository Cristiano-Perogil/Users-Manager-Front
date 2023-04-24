// The modal of the page

// Variable for storing the last focused element
var lastFocusedElement;


// Show Modal
export function showModal() {
    // Close all open modal windows
    removeModal();
    // Store the last focused element
    lastFocusedElement = document.activeElement;
    // Select the modal window
    var modal = document.getElementById("modal");
    // Show the window
    modal.classList.add("modal--visible");
    // Find all focusable children
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [tabindex="-1"], [contenteditable]';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);

    // The first focusable element within the modal window
    var firstTabStop = focusableElements[0];
    // The last focusable element within the modal window
    var lastTabStop = focusableElements[focusableElements.length - 1];
    // Focus the window
    firstTabStop.focus();
    // Add keydown event
    modal.addEventListener('keydown', function (e) {
        // Listen for the Tab key
        if (e.keyCode === 9) {
            // If Shift + Tab
            if (e.shiftKey) {
                // If the current element in focus is the first focusable element within the modal window...
                if (document.activeElement === firstTabStop) {
                    e.preventDefault();
                    // ...jump to the last focusable element
                    lastTabStop.focus();
                }
                // if Tab
            } else {
                // If the current element in focus is the last focusable element within the modal window...
                if (document.activeElement === lastTabStop) {
                    e.preventDefault();
                    // ...jump to the first focusable element
                    firstTabStop.focus();
                }
            }
        }

        // Close the window by pressing the Esc-key
        if (e.keyCode === 27) {
            removeModal();
        }
    });
}

// Remove the modal window if it's visible
export function removeModal() {
    var visibleClass = 'modal--visible';
    if (document.querySelector('.' + visibleClass)) {
        document.querySelector('.' + visibleClass).classList.remove(visibleClass);
        // Return the focus to the last focused element
        lastFocusedElement.focus();
    }
}