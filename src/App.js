import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import HomePage from './components/homePage/HomePage';
import WorkoutListPage from './components/workoutPage/WorkoutListPage';
import PlanListPage from './components/planPage/PlanListPage';
import SpecificPlanPage from './components/specificPlanPage/SpecificPlanPage';
import ProfilePage from './components/profilePage/ProfilePage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import FullPageLoading from './components/common/FullPageLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import ScrollToTop from './components/common/ScrollToTop';
import { useDispatch } from 'react-redux';
import {
  firebase,
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

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  width: 375px;
  .toast {
    background-color: black;
  }
  button {
    color: white;
  }
  .body {
    color: white;
    font-size: 18px;
  }
  .progress {
    color: #1face1;
  }
`;

function App() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getWorkoutsData((data) => {
      dispatch(getWorkouts(data));
    });
  }, []);

  useEffect(() => {
    getPlansData((data) => {
      dispatch(getPlans(data));
    });
  }, []);

  useEffect(() => {
    getUsersData((data) => {
      dispatch(getUsers(data));
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(getCurrentUser(user));
      setCurrentUser(user);
    });
  }, []);

  console.log(currentUser);
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
            <PlanListPage currentUser={currentUser} />
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
