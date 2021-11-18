import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WorkoutListPage from './components/WorkoutListPage';
import ProfilePage from './components/ProfilePage';
import PlanListPage from './components/PlanListPage';
import SpecificPlanPage from './components/SpecificPlanPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './utils/firebase';
import 'firebase/firestore';
import { getWorkouts, getPlans, getSchedules, getCurrentUser } from '../src/redux/actions';

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
  const dispatch = useDispatch()
  // const [currentUser, setCurrentUser] = useState()
  const currentUser = useSelector((state) => state.currentUser);

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
        dispatch(getWorkouts(data))
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
        dispatch(getPlans(data))
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('schedules')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        dispatch(getSchedules(data))
      });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(getCurrentUser(user))
    });
  }, []);
  
  return (
    <>
      <StyledToastContainer />
      <Router>
        <ScrollToTop/>
        <Switch>
          <Route exact path="/" >
            { currentUser ? (<Redirect to='/home'/>) : (<LandingPage />)}
          </Route>
          <Route exact path="/home" >
            <HomePage />
          </Route>
          <Route path="/workouts" exact>
            <WorkoutListPage />
          </Route>
          <Route path="/plans" exact>
            <PlanListPage />
          </Route>
          <Route path="/profile" exact>
            { currentUser ? (<ProfilePage />) : (<Redirect to='/'/>)}
          </Route>
          <Route path="/plans/:planId" exact>
            <SpecificPlanPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
