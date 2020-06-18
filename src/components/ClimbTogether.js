import React from "react"
import "./ClimbTogether.css"
import ApplicationView from '../ApplicationView'
import NavbarHeader from './nav/Navbar'

const ClimbTogether = () => {
  const authenticated = sessionStorage.getItem("authenticated")

  if(authenticated === "true"){
    return(
      <>
        <NavbarHeader />
        <ApplicationView />
      </>
    )
  } 
  else{
    return(
      <ApplicationView />
    )
  }
}

export default ClimbTogether