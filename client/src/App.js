import React, {Fragment} from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App= ()=>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>

export default App;
