const schedulesReducer = (state = [], action) => {
  switch ((action.type)) {
    case 'GET_SCHEDULES':
      return action.payload
    default:
      return state 
  }
}

export default schedulesReducer