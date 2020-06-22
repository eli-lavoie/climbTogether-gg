import React, {useState} from 'react'
import LocalDataManager from '../../modules/LocalDataManager'
import {Alert, Button, InputGroup, InputGroupText, InputGroupAddon, Input, Container} from 'reactstrap'

const Login = props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState("")
  const [error, setError] = useState("")

  const toggleAlert = () => {
    setVisible(!visible)
  }

  const login = () => {
    if(username === "" || password === ""){
      setColor("warning")
      setError("Please fill out both username and password fields!")
      toggleAlert()
      return
    }
    LocalDataManager.getAll("users")
    .then(users =>{
      const userLogin = users.find(user => user.username === username)
      if (userLogin){
        if (userLogin.password === password){
          sessionStorage.setItem("userId", userLogin.id)
          sessionStorage.setItem("authenticated", true)
          sessionStorage.setItem("verified", userLogin.verified)
          props.history.push("/")
          window.location.reload()
        }
      }
      else{
        setColor("danger")
        setError("That user does not exist or the username is misspelled. Please try again, or register a new account.")
        toggleAlert()
      }
    }
      )
  }

  return(
    <>
      <Alert color={color} isOpen={visible} toggle={toggleAlert}>
        {error}
      </Alert>
      <Container>
        <InputGroup>
          <InputGroupAddon addonType="prepend" className="login-label">
            <InputGroupText>Username</InputGroupText>   
          </InputGroupAddon>
          <Input className="username-input" onChange={event => {setUsername(event.target.value)}}/>
          <InputGroupAddon addonType="prepend" className="password-label">
            <InputGroupText>Password</InputGroupText>
          </InputGroupAddon>
          <Input type="password" className="password-input" onChange={event => {setPassword(event.target.value)}}/>
          <Button onClick={login}>Log In</Button>
        </InputGroup>
      </Container>
    </>
  )
}

export default Login