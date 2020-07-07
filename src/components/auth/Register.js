import React, {useState} from 'react'
import LocalDataManager from '../../modules/LocalDataManager'
import {Alert, Button, InputGroup, InputGroupText, InputGroupAddon, Input, Container, Card, CardImg, CardBody, CardFooter} from 'reactstrap'
import './Register.css'

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
          sessionStorage.setItem("authenticated", true)
          sessionStorage.setItem("verified", false)
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

      <Container className="register-page">
        <Card className="register-card">
          <CardImg top width="100%" src="https://i.ibb.co/L0TKDXS/Logo.png" />
          <CardBody>
            <InputGroup className="register-input">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Username:</InputGroupText>
              </InputGroupAddon>
              <Input className="username-field" onChange={event => {setUsername(event.target.value)}} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Password:</InputGroupText>
              </InputGroupAddon>
              <Input type="password" className="password-field" onChange={event => {setPassword(event.target.value)}}/>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Confirm Password:</InputGroupText>
              </InputGroupAddon>
              <Input type="password" className="password-verify-field" onChange={event => {setVerifyPass(event.target.value)}}/>
            </InputGroup>
          </CardBody>
          <CardFooter>
            <div className="register-or-login">
              <div className="register-btn-div">
                <Button className="register-btn" onClick={() =>{register(username, password, verifyPass)}}>Register</Button>
              </div>
              <div className="link-to-login">
                <Button className="btn-to-login" onClick={() =>{props.history.push("/login")}}>Login</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </>
  )

}

export default Register