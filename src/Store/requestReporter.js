const initialState = {
  status: {
    isVisible: false,
  },
  error: {
    on: false,
    errorMessage: '',
  }
};

function setRequestStatus(state = initialState, action) {
  switch (action.type) {
  case 'SET_VISIBILITY':
    return { ...state, status: { isVisible: action.status } };
  case 'HAS_ERROR':
    return {
      ...state,
      error: {
        on: true,
        errorMessage: action.errorMessage

      }
    };
  default:
    return state;
  }
}

export default setRequestStatus;
