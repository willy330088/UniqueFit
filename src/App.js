import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import CreatePlanPage from './components/CreatePlanPage';
import WorkoutListPage from './components/WorkoutListPage';
import ProfilePage from './components/ProfilePage'
import PlanListPage from './components/PlanListPage'
import SpecificPlanPage from './components/SpecificPlanPage'
import GoogleMap from './components/GoogleMap'
import CreateWorkoutPage from './components/CreateWorkoutPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/workouts'>
          <WorkoutListPage/>
        </Route>
        <Route path='/plans'>
          <PlanListPage/>
        </Route>
        <Route path='/createplan'>
          <CreatePlanPage/>
        </Route>
        <Route path='/createworkout'>
          <CreateWorkoutPage />
        </Route>
        <Route path='/profile'>
          <ProfilePage/>
        </Route>
        <Route path='/specificplan'>
          <SpecificPlanPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

