export const getWorkouts = (workouts) => {
  return {
    type: 'GET_WORKOUTS',
    payload: workouts
  }
}

export const getPlans = (plans) => {
  return {
    type: 'GET_PLANS',
    payload: plans
  }
}

export const getUsers = (users) => {
  return {
    type: 'GET_USERS',
    payload: users
  }
}

export const getCurrentUser = (currentUser) => {
  return {
    type: 'GET_CURRENTUSER',
    payload: currentUser
  }
}