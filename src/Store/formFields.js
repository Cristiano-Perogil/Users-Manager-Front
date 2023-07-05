const initialState = {
  name: {
    value: '',
    minLength: 3,
    maxLength: 100,
    isInvalid: false,
    errorMessage: ''
  },
  age: {
    value: 0,
    minLength: 1,
    maxLength: 3,
    isInvalid: false,
    errorMessage: ''
  },
  city: {
    value: '',
    minLength: 3,
    maxLength: 100,
    isInvalid: false,
    errorMessage: ''
  },
  role: {
    value: '',
    minLength: 5,
    maxLength: 50,
    isInvalid: false,
    errorMessage: ''
  },
  departmentNumber: {
    value: 0,
    minLength: 6,
    maxLength: 6,
    isInvalid: false,
    errorMessage: ''
  }
};

function changeField(state = initialState, action) {
  switch (action.type) {
    case 'SET_NEW_VALUE':
      return { ...state, [action.newValue.name]: { ...state[action.newValue.name], value: action.newValue.value } };
    case 'SET_CURRENT_USER':
      let currentUser = {};
      for (let key in action.fields) {
        if (key.toString() === 'ID') {
          continue;
        }
        currentUser[key] = {
          ...state[key],
          value: action.fields[key]
        };
      }
      return { ...state, ...currentUser };
    case 'SET_INVALID':
      let invalidFields = {};
      for (let key in action.fields) {
        invalidFields[key] = {
          ...state[key],
          isInvalid: action.fields[key].isInvalid,
          errorMessage: action.fields[key].errorMessage
        };
      }
      return { ...state, ...invalidFields };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default changeField;
