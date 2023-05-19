const initialState = {
    status: {
        isVisible: false,
        isLoading: true,
        error: false,
        errorMessage: '',
    }
};

function setRequestStatus(state = initialState, action) {
    switch (action.type) {
        case 'SET_VISIBILITY':
            return { ...state, status: { isVisible: true, ...state.status } };
        case 'LOADED':
            return { ...state, status: { isLoading: false, ...state.status } };
        case 'HAS_ERROR':
            return { ...state, status: { isLoading: false, error: true, message: action.message } };
        default:
            return state;
    }
}

export default setRequestStatus;
