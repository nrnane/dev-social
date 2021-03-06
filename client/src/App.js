import React, {Fragment, useEffect} from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Alert from './components/layout/Alert'
import {loadUser} from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/layout/Dashboard'
//redux
import setAuthToken from './utils/setAuthToken';
import {Provider} from 'react-redux';
import store from './store';

import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperiance from './components/profile-form/AddExperiance';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/posts/Post'



if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App= ()=>{
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experiance" component={AddExperiance} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
      </Provider>
  )
}


export default App;
