export const setFieldValue = (newValue) => ({
  type: 'SET_NEW_VALUE',
  newValue,
});

export const setCurrentUserFields = (action, fields = {}) => {
  switch (action) {
    case 'SET_CURRENT_USER':
      return { type: 'SET_CURRENT_USER', fields };
    case 'RESET':
      return { type: 'RESET', };
    default:
      return false;
  }
};

export const setInvalidFieldMessage = (fields) => ({
  type: 'SET_INVALID',
  fields
});

export const setRequestStatus = (status) => ({
  type: 'SET_VISIBILITY',
  status,
});

export const setErrorMessage = (errorMessage) => ({
  type: 'HAS_ERROR',
  errorMessage,
});
