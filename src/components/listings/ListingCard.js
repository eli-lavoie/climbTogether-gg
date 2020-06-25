import React, {useState, useEffect} from 'react'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager'
import './ListingCard.css'


const ListingCard = props => {
  const [postUser, setPostUser] = useState("")
  const [minRankName, setMinRankName] = useState("")
  const [maxRankName, setMaxRankName] = useState("")
  const [roleName, setRoleName] = useState("")
  const [postDate, setPostDate] = useState("")

  const getUser = () => {
    const postUserId = props.data.userId
    LocalDataManager.get("users", postUserId)
      .then(result => {
        const postUsername = result.username
        setPostUser(postUsername)
      })
  }

  const getMinRank = () => {
    const minRankId = props.data.reqRankMin
    LocalDataManager.get("ranks", minRankId)
      .then(result => {
        const minRankTier = result.tier
        const minRankDivision = result.division
        if(minRankId >= 25){
          setMinRankName(minRankTier)
        }
        else{
          const minRankString = minRankTier + " " + minRankDivision
          setMinRankName(minRankString)
        }
      })
  }

  const getMaxRank = () => {
    const maxRankId = props.data.reqRankMax
    LocalDataManager.get("ranks", maxRankId)
      .then(result => {
        const maxRankTier = result.tier
        const maxRankDivision = result.division
        if(maxRankId >= 25){
          setMaxRankName(maxRankTier)
        }
        else{
          const maxRankString = maxRankTier + " " + maxRankDivision
          setMaxRankName(maxRankString)
        }
      })
  }
  const getRole = () => {
    const roleId = props.data.reqRole
    LocalDataManager.get("roles", roleId)
      .then(result => {
        const roleName = result.name
        setRoleName(roleName)
      })
  }
  const getDate = () => {
    const dateInMs = props.data.time
    const date = new Date(dateInMs)
    const dateStr = date.toString()
    const dateNoDay = dateStr.slice(4, 21)
    setPostDate(dateNoDay)
  }
  const getDetails = () => {
    const postId = props.data.id
    const postIdStr = postId.toString()
    const detailsString = "/listings/" + postIdStr
    props.history.push(detailsString)
  }

  useEffect(() => {
    getUser()
    getMinRank()
    getMaxRank()
    getRole()
    getDate()
  }, [])

  return(
    <>
      <Card id={props.data.id} className="post-card">
        <CardBody>
          <CardTitle className="card-title">{props.data.title}</CardTitle>
          <CardSubtitle className="card-from-user">{postUser}</CardSubtitle>
          <CardText>{postDate}</CardText>
          <hr/>
          <CardText>{minRankName} - {maxRankName}</CardText>
          <CardText>{roleName}</CardText>
          <div className="details-div">
          <Button onClick={() => getDetails()}>Details</Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default ListingCard