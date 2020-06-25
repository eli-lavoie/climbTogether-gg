import React, {useState, useEffect} from 'react'
import {Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager' 

const ListDetailsUser = props => {
  const post = props.postDetails
  const [postCreator, setPostCreator] = useState("")
  const [minRankName, setMinRankName] = useState("")
  const [maxRankName, setMaxRankName] = useState("")
  const [roleName, setRoleName] = useState("")
  const [timeAsString, setTimeString] = useState("")
  const [currentSummoner, setCurrentSummoner] = useState("")
  const [currentRank, setCurrentRank] = useState("")
  const [currentRankId, setCurrentRankId] = useState(28)
  const [modalIsOpen, setModalOpen] = useState(false)
  const [alertIsOpen, setAlertIsOpen] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [alertMsg, setAlertMsg] = useState("")

  const toggleModal = () => setModalOpen(!modalIsOpen)
  const openAlert = () => setAlertIsOpen(true)
  const onDismiss = () => setAlertIsOpen(false)

  const getCreator = () => {
    const creatorId = post.userId
    LocalDataManager.get("users", creatorId)
    .then(result => {
      const creatorName = result.username
      setPostCreator(creatorName)
    })
  }

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

  const getRole = () => {
    const roleId = post.reqRole
    LocalDataManager.get("roles", roleId)
    .then(role => {
      const roleName = role.name
      setRoleName(roleName)
    })
  }

  const timeToString = () => {
    const timeInMs = post.time
    const date = new Date(timeInMs)
    const dateStr = date.toString()
    const dateNoDay = dateStr.slice(4, 21)
    setTimeString(dateNoDay)
  }
  const getCurrentSummoner = () => {
    const currentUserId = sessionStorage.getItem("userId")
    LocalDataManager.get("users", currentUserId)
    .then(userData => {
      const summonerName = userData.leagueId
      const rankId = userData.rank
      setCurrentSummoner(summonerName)
      setCurrentRankId(rankId)
    })
  }
  
  const getCurrentRank = () => {
    LocalDataManager.get("ranks", currentRankId)
    .then(rankResult => {
      const currentTier = rankResult.tier
      const currentDiv = rankResult.division
      const rankString = currentTier + " " + currentDiv
      setCurrentRank(rankString)
    })
  }

  const openApplyModal = () => {
    getCurrentSummoner()
    toggleModal()
  }
  const checkApply = () => {
    const currentUser = sessionStorage.getItem("userId")
    const currentPost = post.id
    LocalDataManager.getAll("responses")
    .then(responses => {
      const responseFound = responses.find(response => response.postId === currentPost && response.userId === currentUser)
      if(!responseFound){
        return "notSent"
      }

    })
  }
  const sendApply = () => {
      const currentUserId = sessionStorage.getItem("userId")
      const applyObj = {"postId": post.id, "playerId": currentUserId, "accepted": null}
      LocalDataManager.post("responses", applyObj)
      setAlertColor("success")
      setAlertMsg("Your application has successfully been sent in.")
      toggleModal()
      openAlert()
  }

  useEffect(() => {
    getCreator()
    getMinRank()
    getMaxRank()
    getRole()
    timeToString()
  }, [])

  useEffect(() => {
    getCurrentRank()
  }, [currentRankId])

  return(
    <>
      <Alert color={alertColor} isOpen={alertIsOpen} toggle={onDismiss}>
        {alertMsg}
      </Alert>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader>
          <div className="apply-modal-header">
            <p>You are applying for the post</p>
            <p className="apply-modal-post-title">{post.title}</p>
            <p className="apply-modal-post-time">{timeAsString}</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="apply-modal-body">
            <div className="apply-modal-summoner">
              <p>Summoner:</p>
              <p className="summoner-name">{currentSummoner}</p>
            </div>
            <div className="apply-modal-rank">
              <p>Current Rank:</p>
              <p>{currentRank}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="apply-modal-buttons">
          <Button onClick={() => sendApply()}>Confirm Application</Button>
          <Button onClick={toggleModal}>Go Back</Button>
        </ModalFooter>
      </Modal>
      <Container>
        <div className="title-and-creator">
          <h1>{post.title}</h1>
          <h2>{postCreator}</h2>
        </div>
        <hr/>
        <div className="post-details">
          <h3>{timeAsString}</h3>
          <hr/>
          <h4>Minimum Rank: {minRankName}</h4>
          <h4>Maximum Rank: {maxRankName}</h4>
          <h4>Role(s) Available: {roleName}</h4>
        </div>
        <Button onClick={() => openApplyModal()}>Apply</Button>
      </Container>
    </>
  )
}

export default ListDetailsUser