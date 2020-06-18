import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import './App.css';
import NavBar from './components/Navigation/index';

import Home from './pages/Home.js';
import Order from './pages/Order.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route patch='/order' component={Order} />
      </Switch>
    </div>
  );
}

export default App;
