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

export const getSchedules = (schedules) => {
  return {
    type: 'GET_SCHEDULES',
    payload: schedules
  }
}

export const getCurrentUser = (currentUser) => {
  return {
    type: 'GET_CURRENTUSER',
    payload: currentUser
  }
}