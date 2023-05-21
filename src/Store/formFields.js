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
    return { ...state, fields: { ...state.fields, [action.newValue.name]: action.newValue.value } };
  default:
    return state;
  }
}

export default changeField;
