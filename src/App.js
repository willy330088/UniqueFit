import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FrontMuscle from './components/FrontMuscle';
import BackMuscle from './components/BackMuscle';
import VideoInput from './components/VideoInput';
import ExercisePopup from './components/ExercisePopup';
import Header from './components/Header';
import CreatePlanPage from './components/CreatePlanPage';
import GymWorkoutPage from './components/GymWorkoutPage';
import GoogleMap from './components/GoogleMap'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
          <VideoInput />
          <ExercisePopup />
          <FrontMuscle />
          <BackMuscle />
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
          <Header/>
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

