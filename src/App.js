import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FrontMuscle from './components/FrontMuscle';
import BackMuscle from './components/BackMuscle';
import VideoInput from './components/VideoInput';
import ExercisePopup from './components/ExercisePopup';
import Header from './components/Header';

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
          <Header/>
        </Route>
        <Route path='/homeworkout'>
          <Header/>
        </Route>
        <Route path='/createplan'>
          <Header/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

