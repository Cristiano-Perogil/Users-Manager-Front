export const formFields = (modelType) => {
  const filterFields = {
    method: {
      value: '',
      isEmpty: false
    },
    keyWord: {
      value: '',
      isEmpty: false
    }
  };

  switch (modelType) {
    case 'filter-fields':
      return filterFields;
    default:
      return console.log('An error did not allowed a model to be returnd. Check if you typed a valid model name!');
  }
};
