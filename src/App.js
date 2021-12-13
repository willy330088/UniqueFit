import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import WorkoutListPage from './components/WorkoutPage';
import PlanPage from './components/PlanPage';
import SpecificPlanPage from './components/SpecificPlanPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';
import FullPageLoading from './components/Common/FullPageLoading';
import ScrollToTop from './components/Common/ScrollToTop';
import { StyledToastContainer } from './utils/toast';
import {
  onUserChanged,
  getWorkoutsData,
  getPlansData,
  getUsersData,
} from './utils/firebase';
import 'firebase/firestore';
import {
  getWorkouts,
  getPlans,
  getCurrentUser,
  getUsers,
} from '../src/redux/actions';

function App() {
  AOS.init();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getWorkoutsData((data) => {
      dispatch(getWorkouts(data));
    });

    getPlansData((data) => {
      dispatch(getPlans(data));
    });

    getUsersData((data) => {
      dispatch(getUsers(data));
    });

    onUserChanged((user) => {
      dispatch(getCurrentUser(user));
      setCurrentUser(user);
    });
  }, []);

  return (
    <>
      <StyledToastContainer />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            {currentUser !== null ? (
              currentUser !== undefined ? (
                <Redirect to="/home" />
              ) : (
                <FullPageLoading />
              )
            ) : (
              <LandingPage />
            )}
          </Route>

          <Route exact path="/profile">
            {currentUser !== null ? (
              currentUser !== undefined ? (
                <ProfilePage />
              ) : (
                <FullPageLoading />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/home">
            <HomePage currentUser={currentUser} />
          </Route>
          <Route exact path="/workouts">
            <WorkoutListPage currentUser={currentUser} />
          </Route>
          <Route exact path="/plans">
            <PlanPage currentUser={currentUser} />
          </Route>
          <Route exact path="/plans/:planId">
            <SpecificPlanPage currentUser={currentUser} />
          </Route>
          <Route exact path="/pageNotFound">
            <NotFoundPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
