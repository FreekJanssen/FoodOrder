import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import './App.css';
import NavBar from './components/Navigation/index'

import Home from './pages/Home.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
