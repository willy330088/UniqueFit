import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FrontMuscle from './components/FrontMuscle';
import BackMuscle from './components/BackMuscle';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
          <FrontMuscle />
          <BackMuscle />
        </Route>
        <Route path='/gymworkout'>
          gymworkout
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

