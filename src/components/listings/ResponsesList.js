import React, {useState, useEffect} from 'react'
import {ListGroupItem, Button} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager'

const ResponsesList = props => {
  const appUserId = props.data.playerId
  const [listItemColor, setColor] = useState("warning")
  const [listItemText, setText] = useState("")
  const [appName, setAppName] = useState("")
  const [appRank, setAppRank] = useState("")
  const [appRankId, setRankId] = useState()
  const [appStatus, setAppStatus] = useState("Undecided")

  const checkStatus = () => {
    if(props.data.accepted === null){
      setColor("warning")
    }
    else if(props.data.accepted === true){
      setColor("success")
    }
    else if (props.data.accepted === false){
      setColor("danger")
    }
      return
    }
  

  const getSummonerId = () => {
    LocalDataManager.get("users", appUserId)
    .then(userData => {
      const summoner = userData.leagueId
      setAppName(summoner)
    })
  }

  const getRankId = () => {
    LocalDataManager.get("users", appUserId)
    .then(userData => {
      const rankId = userData.rank
      setRankId(rankId)
    })
  }

  const getRankName = () => {
    LocalDataManager.get("ranks", appRankId)
    .then(rankData => {
      const tier = rankData.tier
      const division = rankData.division
      if(appRankId >= 25){
        setAppRank(tier)
      }
      else{
        const rankString = tier + " " + division
        setAppRank(rankString)
      }
    })
  }

  const acceptBtn = () => {
    const newResponse = {"postId": props.data.postId, "playerId": props.data.playerId, "accepted": true, "id": props.data.id}
    LocalDataManager.update("responses", newResponse, props.data.id)
    setAppStatus("accepted")
  }

  const rejectBtn = () => {
    const newResponse = {"postId": props.data.postId, "playerId": props.data.playerId, "accepted": false, "id": props.data.id}
    LocalDataManager.update("responses", newResponse, props.data.id)
    setAppStatus("rejected")
  }

  const genListInfo = () => {
    const summName = appName
    const summRank = appRank
    const nameString = "Summoner Name:" + " " + summName
    const rankString = "Current Rank:" + " " + summRank
    const fullString = nameString + " | " + rankString + " | "
    setText(fullString)
  }

  useEffect(() => {
    getSummonerId()
    getRankId()
    checkStatus()
  }, [])

  useEffect(() => {
    getRankName()
  }, [appRankId])

  useEffect(() => {
    genListInfo()
  }, [appRank])

  useEffect(() =>{
    checkStatus()
  }, [appStatus])


  return(
    <>
      <ListGroupItem color={listItemColor}>
        {listItemText}
        <Button onClick={() => acceptBtn()}>Accept</Button>
        <Button onClick={() => rejectBtn()}>Reject</Button>
      </ListGroupItem>
    </>
  )
}

export default ResponsesList