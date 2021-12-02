import plansReducer from "./plans";
import workoutsReducer from "./workouts";
import usersReducer from "./users";
import currentUserReducer from "./currentUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  plans: plansReducer,
  workouts: workoutsReducer,
  currentUser: currentUserReducer,
  users: usersReducer
})
 
export default allReducers