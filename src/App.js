import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WorkoutListPage from './components/WorkoutListPage';
import ProfilePage from './components/ProfilePage';
import PlanListPage from './components/PlanListPage';
import SpecificPlanPage from './components/SpecificPlanPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  /* .toast-container */
  width: 375px;

  /* .toast is passed to toastClassName */
  .toast {
    background-color: #222d35;
  }

  button {
    color: white;
  }
  /* .body is passed to bodyClassName */
  .body {
    color: white;
    font-size: 18px;
  }

  /* .progress is passed to progressClassName */
  .progress {
    color: #1face1;
  }
`;

function App() {
  return (
    <>
      <StyledToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" exact>
            <LandingPage />
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
