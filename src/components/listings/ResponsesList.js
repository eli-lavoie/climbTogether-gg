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
    if(appStatus === "accepted"){
      setColor("success")
    }
    else if(appStatus === "rejected"){
      setColor("danger")
    }
    else{
      return
    }
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
  }, [])

  useEffect(() => {
    getRankName()
  }, [appRankId])

  useEffect(() => {
    genListInfo()
  }, [appRank])

  useEffect(() => {
    checkStatus()
  }, [appStatus])

  return(
    <>
      <ListGroupItem color={listItemColor}>
        {listItemText}
        <Button onClick={() => setAppStatus("accepted")}>Accept</Button>
        <Button onClick={() => setAppStatus("rejected")}>Reject</Button>
      </ListGroupItem>
    </>
  )
}

export default ResponsesList