import { setInvalidFieldMessage } from '../src/Store/actions';

/* 
Validates a range of input fields based on a base obj and on another error based one.
If the input field is invalid, the base obj will set its equivalent property to true within the error one.
*/
export function validateFields(
  fields = null,
  action = null,
  minLength = 0,
  maxLength = 0,
  isCheckingOne = false,
  individualField = null,
  dispatch = null
) {
  let isInvalid = false;
  if (isCheckingOne) {
    const { name, value } = individualField;
    return checkField(name, value, minLength, maxLength, dispatch);
  }

  // In case of multiple fields being validated
  for (let key in fields) {
    const name = key.toString();
    const value = fields[name].value;
    const fieldMinLength = fields[name].mimLength;
    const fieldMaxLength = fields[name].maxLength;
    if (!checkField(name, value, fieldMinLength, fieldMaxLength, dispatch)) {
      isInvalid = true;
    }
  }
  if (!isInvalid && !isCheckingOne) action();
}

// Validates a field according to its specified criteria
export function checkField(name, value, min, max, dispatch) {
  let isInvalid = false;
  const field = { [name]: { isInvalid: false, errorMessage: '' } };
  if (!value) {
    field[name].errorMessage = `${name} cannot be empty!`;
    isInvalid = true;
  } else if (value.length < min) {
    field[name].errorMessage = `${name} must be at least ${min} characters long`;
    isInvalid = true;
  } else if (value.length > max) {
    field[name].errorMessage = `${name} must include only ${max} characters.`;
    isInvalid = true;
  }

  if (isInvalid) {
    field[name].isInvalid = isInvalid;
    dispatch(setInvalidFieldMessage(field));
    return false;
  } else {
    dispatch(setInvalidFieldMessage(field));
    return true;
  }
}

// Updating the filter fields
export function handelFielterChange(e, setState) {
  const { name, value } = e.target;
  setState((prevState) => {
    let newState = {
      ...prevState,
      [name]: { ...prevState[name], value: value, isEmpty: false }
    };
    return newState;
  });
}

// Checks if one of the filter fields is empty
export function validateFilters(filter, setFilterState, action, setClearFiltersState) {
  let isInvalid = false;
  for (let key in filter) {
    if (filter[key].value == '') {
      isInvalid = true;
      setFilterState((prevState) => {
        let newState = {
          ...prevState,
          [key]: { ...prevState[key], isEmpty: true }
        };
        return newState;
      });
    }
  }
  if (!isInvalid) {
    action();
    setClearFiltersState(true);
  }
}

// As all the data is stored within a upper case format in the database, converts it for displaying it better
export function structureData(str = '') {
  let splitWords = str.split(' ');
  let newWords = [];
  splitWords.forEach((words) => newWords.push([words[0].toUpperCase().concat(words.substring(1))].join('')));
  return newWords.join(' ');
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
