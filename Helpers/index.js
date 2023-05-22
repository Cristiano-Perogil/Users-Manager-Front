/* 
Validates a range of input fields based on a base obj and on another error based one.
If the input field is invalid, the base obj will set its equivalent property to true within the error one.
*/
export function validateFields(baseObj, setErrorObjState, action) {
  let isInvalid = false;
  for (let key in baseObj) {
    if (baseObj[key] == '') {
      setErrorObjState(prevState => ({ ...prevState, [key]: true }));
      isInvalid = true;
    }
  }
  if (!isInvalid) action();
}

// Sets the object state of a range of input fields according to their name and value
export function handleChange(e, state) {
  let name = e.target.name;
  let value = e.target.value;
  state(prevState => ({ ...prevState, [name]: value }));
}

// As a dialog window is displayed, keeps the focus within it
export function keepTabIn(firstTabStop, lastTabStop) {
  // Focus the window
  firstTabStop.focus();
  // Add keydown event
  document.addEventListener('keydown', function (e) {

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
  });
}

// Shifting the type of validation according to what is requested
export function validateBeforeSubmit(modalTextKind, inputFields, setEmptInputFields, setUsers, action1, action2, dispatch) {
  switch (modalTextKind) {
    case 'addition':
      validateFields(inputFields, setEmptInputFields, () => action1(inputFields, () => action2(false, '', '', setUsers, dispatch), dispatch));
    default:
      return false;
  }
}
