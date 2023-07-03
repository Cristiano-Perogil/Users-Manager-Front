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
      state[action.newValue.name]['value'] = action.newValue.value;
      return { ...state };
    case 'SET_CURRENT_USER':
      for (let key in action.fields) {
        if (key.toString() === 'ID') {
          continue;
        }
        state[key]['value'] = action.fields[key];
      }
      return { ...state };
    case 'SET_INVALID':
      for (let key in action.fields) {
        state[key] = {
          ...state[key],
          isInvalid: action.fields[key].isInvalid,
          errorMessage: action.fields[key].errorMessage
        };
      }
      return { ...state };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default changeField;
