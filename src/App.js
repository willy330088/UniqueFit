import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import CreatePlanPage from './components/CreatePlanPage';
import GymWorkoutPage from './components/GymWorkoutPage';
import GoogleMap from './components/GoogleMap'
import CreateWorkoutPage from './components/CreateWorkoutPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/gymworkout'>
          <GymWorkoutPage/>
        </Route>
        <Route path='/homeworkout'>
          <Header/>
        </Route>
        <Route path='/createplan'>
          <CreatePlanPage/>
        </Route>
        <Route path='/createworkout'>
          <CreateWorkoutPage />
        </Route>
        <Route path='/profile'>
          <Header />
          <GoogleMap />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

