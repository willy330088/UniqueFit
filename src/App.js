import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WorkoutListPage from './components/WorkoutListPage';
import ProfilePage from './components/ProfilePage';
import PlanListPage from './components/PlanListPage';
import SpecificPlanPage from './components/SpecificPlanPage';
import NotFoundPage from './components/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from './utils/firebase';
import 'firebase/firestore';
import {
  getWorkouts,
  getPlans,
  getCurrentUser,
  getUsers,
} from '../src/redux/actions';
import FullPageLoading from './components/FullPageLoading';

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
    firebase
      .firestore()
      .collection('workouts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        dispatch(getWorkouts(data));
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .orderBy('createdAt', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        dispatch(getPlans(data));
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
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
