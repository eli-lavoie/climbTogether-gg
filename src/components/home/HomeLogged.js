import React, {useEffect, useState, useReducer} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import LocalDataManager from '../../modules/LocalDataManager'
import ListingCard from '../listings/ListingCard'
import './Logged.css'

const HomeLogged = props => {
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState("")
  const [greeting, setGreeting] = useState("")
  const [newPosts, setNewPosts] = useState([])
  const [myResponses, setMyResponses] = useState([])

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

  const getNewPosts = () => {
    LocalDataManager.getAll("LFGPosts")
      .then(allPosts => {
        const postArr = allPosts
        const numPosts = postArr.length
        const newestPosts = []
        if(numPosts <= 4) {
          setNewPosts(postArr)
        }
        else{

          newestPosts.push(postArr[numPosts-1])
          newestPosts.push(postArr[numPosts-2])
          newestPosts.push(postArr[numPosts-3])
          newestPosts.push(postArr[numPosts-4])
          console.log(newestPosts)
        }
      })
  }

  const getResponseStatus = () => {
    const currentUser = sessionStorage.getItem("userId")
    const currentUserId = parseInt(currentUser)
    LocalDataManager.getQueryByOneParam("responses", "playerId", currentUserId)
    .then(responses => {
      const postId = responses
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
    getNewPosts()
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
      <Container className="greeting">
      <div className="greeting-div">
        <h2>{greeting}{user}</h2>
      </div>
      </Container>
      <hr />
      <Container>
        <div className="top-row">

          <Container className="new-posts">
          <div className="posts-header">
            <h3>Newest Posts</h3>
          </div>
            <div className="post-cards">
              {newPosts.map(post => <ListingCard {...props} data={post} key={post.id} />)}
            </div>
          </Container>
          <hr />
          <Container className="my-responses-status">
            <div className="responses-header">
              <h3>Current Responses</h3>
            </div>
          </Container>

        </div>
        <div className="bottom-row">

        </div>
        </Container>

    </>
  )
}

export default HomeLogged