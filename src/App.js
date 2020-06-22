import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import './App.css';
import NavBar from './components/Navigation/index';

import Home from './pages/Home.js';
import Order from './pages/Order.js';
import Login from './pages/Login.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/order' component={Order} />
        <Route path='/admin' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
