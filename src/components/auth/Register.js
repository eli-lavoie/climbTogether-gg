import React, {useState} from 'react'
import LocalDataManager from '../../modules/LocalDataManager'
import {Alert, Button, InputGroup, InputGroupText, InputGroupAddon, Input, Container} from 'reactstrap'

const Register = props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPass, setVerifyPass] = useState("")
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState("")
  const [error, setError] = useState("")

  const toggleAlert = () =>{
    setVisible(!visible)
  }

  const register = (user, pass, pass2) => {
    if(user === "" || pass === "" || pass2 === ""){
      setColor("warning")
      setError("Please fill in all forms before submitting")
      toggleAlert()
      return
    }
    if(pass !== pass2){
      setColor("warning")
      setError("The passwords do not match.")
      toggleAlert()
      return
    }
    const createdUser = {
      "username": user, 
      "password": pass, 
      "leagueId": "",
      "verified": false,
      "rep": 0,
      "rank": 28  
    }
    LocalDataManager.getAll("users")
      .then(existingUsers => {
        let userExists = existingUsers.find(user => user.username === user)
        if(userExists){
          setColor("danger")
          setError("That username is already in use.")
          toggleAlert()
          return
        }
        LocalDataManager.post("users", createdUser)
        setColor("success")
        setError("Account created successfully! Please log in.")
        sessionStorage.setItem("authenticated", true)
        LocalDataManager.getQueryByOneParam("users", "username", username)
        .then(result => {
          const newUserId = result[0].id
          sessionStorage.setItem("userId", newUserId)
        })
        props.history.push("/")
        window.location.reload()
      })
  }  

  
  return(
    <>
      <Alert color={color} isOpen={visible} toggle={toggleAlert}>
        {error}
      </Alert>
      <Container className="register-container">
        <InputGroup className="register-input">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Username:</InputGroupText>
          </InputGroupAddon>
          <Input className="username-field" onChange={event => {setUsername(event.target.value)}} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Password:</InputGroupText>
          </InputGroupAddon>
          <Input type="password" className="password-field" onChange={event => {setPassword(event.target.value)}}/>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Confirm Password:</InputGroupText>
          </InputGroupAddon>
          <Input type="password" className="password-verify-field" onChange={event => {setVerifyPass(event.target.value)}}/>
          <Button className="register-btn" onClick={() =>{register(username, password, verifyPass)}}>Register</Button>
        </InputGroup>
      </Container>
    </>
  )

}

export default Register