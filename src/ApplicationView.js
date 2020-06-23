import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Verify from './components/auth/Verify'
import CreateListing from './components/listings/CreateListing'


function ApplicationView() {
  const isAuthenticated = sessionStorage.getItem("authenticated")
  const isVerified = sessionStorage.getItem("verified")
  
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

      <Route exact path ="/verify"
      render={props =>{
        if(isAuthenticated === "true"){
          if(isVerified === "false"){
          return <Verify {...props} />
          }
          else{
            return <Redirect to="/" {...props} />
          }
        }
        else{
          return <Redirect to="/"/>
        }
      }}/>
      <Route exact path ="/listings/create"
      render={props =>{
        if(isAuthenticated === "true"){
          if(isVerified === "false"){
            return <Verify {...props} />
          }
          else{
            return <CreateListing {...props}/>
          }
        }
        else{
          return <Redirect to="/"/>
        }
      }}/>
    </>
  );
}

export default ApplicationView;
