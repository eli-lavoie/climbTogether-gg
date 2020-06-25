import React, {useState, useEffect} from 'react'
import {Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager' 
import ResponsesList from './ResponsesList'

const ListDetailsCreator = props => {
  const post = props.postDetails
  const [postCreator, setPostCreator] = useState("") 
  const [modalIsOpen, setModalOpen] = useState(false)
  const [modalHeaderText, setModalHeader] = useState("")
  const [modalBody, setModalBody] = useState("")
  const [modalFooter, setModalFooter] = useState("")
  const [responses, setResponses] = useState([])

  const toggleModal = () => setModalOpen(!modalIsOpen)

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
  useEffect(() => {
    getCreator()
    getResponses()
  }, [])

  return(
    <>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader>{modalHeaderText}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </Modal>
      <Container>
        <div className="title-creator">
        <h1>{post.title}</h1>
        <h2>{postCreator}</h2>
        </div>
        <div className="edit-delete">
        <Button>Edit Post</Button>
        <Button>Delete Post </Button>
        </div>
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

export default ListDetailsCreator