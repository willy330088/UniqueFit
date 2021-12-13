const currentUserReducer = (state = 'loading', action) => {
  switch (action.type) {
    case 'GET_CURRENTUSER':
      return action.payload;
    default:
      return state;
  }
};

export default currentUserReducer;
