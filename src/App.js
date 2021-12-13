import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import WorkoutPage from './components/WorkoutPage';
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
import {
  getWorkouts,
  getPlans,
  getCurrentUser,
  getUsers,
} from '../src/redux/actions';

function App() {
  AOS.init();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

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
              currentUser !== 'loading' ? (
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
              currentUser !== 'loading' ? (
                <ProfilePage />
              ) : (
                <FullPageLoading />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/workouts">
            <WorkoutPage />
          </Route>
          <Route exact path="/plans">
            <PlanPage />
          </Route>
          <Route exact path="/plans/:planId">
            <SpecificPlanPage />
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
