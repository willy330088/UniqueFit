import plansReducer from "./plans";
import schedulesReducer from "./schedules";
import workoutsReducer from "./workouts";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  plans: plansReducer,
  schedules: schedulesReducer,
  workouts: workoutsReducer
})
 
export default allReducers