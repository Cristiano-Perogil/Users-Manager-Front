// The modal of the page

// Variable for storing the last focused element
var lastFocusedElement;

// Show Modal
export function keepTabIn(focusableElement=[]) {
  // Close all open modal windows
  stopTrackTab();
  // Store the last focused element
  lastFocusedElement = document.activeElement;

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
      stopTrackTab();
    }
  });
}

// Remove the modal window if it's visible
export function stopTrackTab() {
  // Return the focus to the last focused element
  lastFocusedElement.focus();
}