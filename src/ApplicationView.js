import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


function ApplicationView() {
  const isAuthenticated = sessionStorage.getItem("authenticated")
  
  return (
    <>
      <Route exact path ="/"
      render={props =>{
      return <Home {...props} />
      }}/>

      <Route exact path = "/login"
      render={props =>{
        return <Login {...props} />
      }}/>

      <Route exact path ="/register"
      render={props =>{
        return <Register {...props}/>
      }}/>
    </>
  );
}

export default ApplicationView;
