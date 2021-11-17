import plansReducer from "./plans";
import schedulesReducer from "./schedules";
import workoutsReducer from "./workouts";
import currentUserReducer from "./currentUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  plans: plansReducer,
  schedules: schedulesReducer,
  workouts: workoutsReducer,
  currentUser: currentUserReducer
})
 
export default allReducers