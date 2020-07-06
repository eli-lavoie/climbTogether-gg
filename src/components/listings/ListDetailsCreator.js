import React, {useState, useEffect} from 'react'
import {Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, Popover, PopoverHeader, PopoverBody} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager' 
import ResponsesList from './ResponsesList'
import {withRouter} from 'react-router-dom'

const ListDetailsCreator = props => {
  const post = props.postDetails
  const [postCreator, setPostCreator] = useState("") 
  const test = "/listings/`${post.id}`/edit"
  const [modalFooter, setModalFooter] = useState("")
  const [responses, setResponses] = useState([])
  const [deletePopover, openPopover] = useState(false)
  const [minRankName, setMinRankName] = useState("")
  const [maxRankName, setMaxRankName] = useState("")
  const [roleName, setRoleName] = useState("")
  const [timeAsString, setTimeString] = useState("")
  
  const toggleDeletePopover = () => openPopover(!deletePopover)

  const getMinRank = () => {
    const minId = post.reqRankMin
    LocalDataManager.get("ranks", minId)
    .then(minRank => {
      const tier = minRank.tier
      const division = minRank.division
      const rankString = tier + " " + division
      setMinRankName(rankString)
    })
  }

  const getMaxRank = () => {
    const maxId = post.reqRankMax
    LocalDataManager.get("ranks", maxId)
    .then(maxRank => {
      const tier = maxRank.tier
      const division = maxRank.division
      const rankString = tier + " " + division
      setMaxRankName(rankString)
    })
  }

  const timeToString = () => {
    const timeInMs = post.time
    const date = new Date(timeInMs)
    const dateStr = date.toString()
    const dateNoDay = dateStr.slice(4, 21)
    setTimeString(dateNoDay)
  }

  const getRole = () => {
    const roleId = post.reqRole
    LocalDataManager.get("roles", roleId)
    .then(role => {
      const roleName = role.name
      setRoleName(roleName)
    })
  }

  const getCreator = () => {
    const creatorId = post.userId
    LocalDataManager.get("users", creatorId)
    .then(user => {
      const creatorName = user.username
      setPostCreator(creatorName)
    })
  }
  const getResponses = () => {
    LocalDataManager.getResponsesByPostId(post.id)
    .then(responseData => {setResponses(responseData)})
  }

  const returnEdit = () => {
    const string1 = "/listings/"
    const string2 = post.id.toString()
    const string3 = "/edit"
    const stringFull = string1 + string2 + string3
    props.history.push(stringFull)
  }

  const deletePost = () => {
    LocalDataManager.delete("LFGPosts", post.id)
    responses.map(response => LocalDataManager.delete("responses", response.id))
    props.history.push('/listings')
  }

  useEffect(() => {
    getCreator()
    getResponses()
    getMinRank()
    getMaxRank()
    timeToString()
    getRole()
  }, [])

  return(
    <>
      <Container>
        <div className="title-creator">
          <h1>{post.title} - {timeAsString}</h1>
          <h2>{postCreator}</h2>
        </div>
        <div className="edit-delete">
          <Button onClick={() => returnEdit()}>Edit Post</Button>
          <Button id="delete">Delete Post </Button>
          <Popover placement="right" isOpen={deletePopover} target="delete" toggle={toggleDeletePopover}>
            <PopoverHeader>Are you sure you want to delete this post?</PopoverHeader>
            <PopoverBody className="delete-confirm">
              <Button onClick={() => deletePost()}>Yes</Button>
              <Button onClick={toggleDeletePopover}>No</Button>
            </PopoverBody>
          </Popover>
        </div>
        <hr/>
        <div className="post-content">
          <h4>Minimum Rank: {minRankName}</h4>
          <h4>Maximum Rank: {maxRankName}</h4>
          <h4>Role(s) Available: {roleName}</h4>
        </div>
        <hr/>
        <div className="response-list">
          <h3>Responses</h3>
          <ListGroup className="responses-group">
            {responses.map(response => <ResponsesList {...props} data={response} key={response.id} />)}
          </ListGroup>
        </div>
      </Container>
    </>
  )
}

export default withRouter(ListDetailsCreator)