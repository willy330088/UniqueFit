import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import firebase from './utils/firebase';
import 'firebase/firestore';
import { getWorkouts, getPlans, getSchedules } from '../src/redux/actions';

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
  
  return (
    <>
      <StyledToastContainer />
      <Router>
        <ScrollToTop/>
        <Switch>
          <Route exact path="/" >
            <LandingPage />
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
            <ProfilePage />
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
