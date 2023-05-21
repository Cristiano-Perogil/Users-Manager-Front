export const formFields = (modelType) => {
  const filterFields = { method: '', keyWord: '' };
  const emptyFilterFields = { method: false, keyWord: false };

  const fields = {
    name: '',
    age: 0,
    city: '',
    role: '',
    departmentNumber: 0
  }

  const emptyFields = {
    name: false,
    age: false,
    city: false,
    role: false,
    departmentNumber: false
  }

  switch (modelType) {
  case 'filter-fields':
    return filterFields;
  case 'empty-filter-fields':
    return emptyFilterFields;
  case 'fields':
    return fields;
  case 'empty-fields':
    return emptyFields;
  default:
    return console.log('An error did not allowed a model to be returnd. Check if you typed a valid model name!')
  }
}
