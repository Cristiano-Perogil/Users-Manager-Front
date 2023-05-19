export const setFieldValue = (newValue) => ({
    type: 'SET_NEW_VALUE',
    newValue,
});

export const setRequestStatus = (status) => {
    switch (status) {
        case 'SET_VISIBILITY':
            return { type: 'SET_VISIBILITY', status, }
        case 'LOADED':
            return { type: 'LOADED', status, }
        default:
            break;
    }
};

export const setErrorMessage = (message) => ({
    type: 'HAS_ERROR',
    message,
});
