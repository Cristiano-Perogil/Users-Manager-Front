export const setFieldValue = (newValue) => ({
    type: 'SET_NEW_VALUE',
    newValue,
});

export const setRequestStatus = (status) => ({
    type: 'SET_VISIBILITY',
    status,
});

export const setErrorMessage = (errorMessage) => ({
    type: 'HAS_ERROR',
    errorMessage,
});
