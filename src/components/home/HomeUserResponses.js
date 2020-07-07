import React, {useState, useEffect} from 'react'
import {ListGroupItem, Button} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager'
import './UserResponses.css'

const HomeUserResponses = props => {
  const [postTitle, setPostTitle] = useState()
  const [link, setLink] = useState("")
  const [acceptedState, setAccepted] = useState("Waiting")
  const [color, setColor] = useState("warning")


  const getPostTitle = () => {
    const postId = props.data.postId
    LocalDataManager.get("LFGPosts", postId)
      .then(post => {
        const title = post.title
        const fullLink = "/listings/" + postId
        setPostTitle(title)
        setLink(fullLink)
      })
  }

  const getStatus = () => {
    const acceptedBool = props.data.accepted
    if(acceptedBool === null){
      return
    }
    if (acceptedBool === true){
      setAccepted("Accepted")
      setColor("success")
      return
    }
    if(acceptedBool === false){
      setAccepted("Rejected")
      setColor("danger")
      return
    }
  }

  useEffect(() => {
    getPostTitle()
    getStatus()
  }, [])

  return(
    <>
      <ListGroupItem color={color} className="response-details">
        <div className="response-data">
          {postTitle} | Status: {acceptedState}
        </div>
        <div className="response-button">
          <Button className="post-details" onClick={() => {props.history.push(link)}}>Details</Button>
        </div>
      </ListGroupItem>
    </>
  )
}

export default HomeUserResponses