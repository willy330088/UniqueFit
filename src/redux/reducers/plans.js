const plansReducer = (state = [], action) => {
  switch ((action.type)) {
    case 'GET_PLANS':
      return action.payload
    default:
      return state 
  }
}

export default plansReducer