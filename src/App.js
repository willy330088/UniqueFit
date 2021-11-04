import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreatePlanPage from './components/CreatePlanPage';
import WorkoutListPage from './components/WorkoutListPage';
import ProfilePage from './components/ProfilePage'
import PlanListPage from './components/PlanListPage'
import SpecificPlanPage from './components/SpecificPlanPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' exact>
          <LandingPage />
        </Route>
        <Route path='/workouts' exact>
          <WorkoutListPage/>
        </Route>
        <Route path='/plans' exact>
          <PlanListPage/>
        </Route>
        <Route path='/createplan' exact>
          <CreatePlanPage/>
        </Route>
        <Route path='/profile' exact>
          <ProfilePage/>
        </Route>
        <Route path='/plans/:planId' exact>
          <SpecificPlanPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

