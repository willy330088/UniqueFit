const currentUserReducer = (state = null, action) => {
  switch ((action.type)) {
    case 'GET_CURRENTUSER':
      return action.payload
    default:
      return state 
  }
}

export default currentUserReducer