const workoutsReducer = (state = [], action) => {
  switch ((action.type)) {
    case 'GET_WORKOUTS':
      return action.payload
    default:
      return state 
  }
}

export default workoutsReducer