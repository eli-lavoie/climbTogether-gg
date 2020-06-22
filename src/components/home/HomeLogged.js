import React, {useEffect, useState, useReducer} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import LocalDataManager from '../../modules/LocalDataManager'

const HomeLogged = props => {
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState("")
  const [greeting, setGreeting] = useState("")

  const listOfGreetings = ["Hello there, General ", "Welcome to the League of ", "I'm a plat 2 smurf, my main is " ]
  const verify = () => props.history.push("/verify")
  const toggle = () => setModal(!modal)
  
  const checkVerified = () => {
    const check = sessionStorage.getItem("verified")
    if (check === "true"){
      return
    }
    else{
      toggle()
    }
  }

  const getUser = () => {
    const userId = sessionStorage.getItem("userId")
    LocalDataManager.get("users", userId)
      .then(data => {
        const currentUser = data.username
        setUser(currentUser)
      })
  }
  
  const newGreeting = () => {
    const min = Math.ceil(0);
    const max = Math.floor(listOfGreetings.length - 1);
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    const newGreetingMsg = listOfGreetings[result]
    setGreeting(newGreetingMsg)
    
  }

  useEffect(() => {
    checkVerified()
    getUser()
    newGreeting()
  }, [])
  return(
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>We noticed you have not linked a League of Legends account.</ModalHeader>
        <ModalBody>In order to get the full ClimbTogether experience, you must link and verify your League of Legends account. Until you have verified ownership of an account, you will not be able to respond to postings. Would you like to verify your account now?</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={verify}>Yes</Button>
          <Button color="danger" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
      <Container>
      <div>
        <h2 className="greeting">{greeting}{user}</h2>
      </div>
      </Container>
    </>
  )
}

export default HomeLogged