import React from 'react'
import HomeLogged from './HomeLogged'
import HomeNotLogged from './HomeNotLogged'

const Home = props => {
  const authorized =  sessionStorage.getItem("authenticated") 

  if (authorized === "true") {
    return(
      <HomeLogged {...props}/>
      )
    }
  else{
    return(
      <HomeNotLogged {...props}/>
    ) 
  }
}

export default Home