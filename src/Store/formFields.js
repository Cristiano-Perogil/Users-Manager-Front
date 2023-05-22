const initialState = {
  fields: {
    name: '',
    age: 0,
    city: '',
    role: '',
    departmentNumber: 0
  }
};

function changeField(state = initialState, action) {
  switch (action.type) {
    case 'SET_NEW_VALUE':
      if (action.newValue.name == 'age' || action.newValue.name == 'departmentNumber') {
        return { ...state, fields: { ...state.fields, [action.newValue.name]: Number(action.newValue.value) } };
      } else { return { ...state, fields: { ...state.fields, [action.newValue.name]: action.newValue.value } }; }
    case 'SET_CURRENT_USER':
      return { ...state, fields: action.fields, };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default changeField;
