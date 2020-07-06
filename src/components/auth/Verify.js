import React, {useState, useEffect} from 'react'
import {Container, Input, Button, Alert, Media} from 'reactstrap'
import RiotDataManager from '../../modules/RiotDataManager'
import LocalDataManager from '../../modules/LocalDataManager'

const Verify = props => {
  const [summonerName, setSN] = useState("")
  const [imgLink, setImgLink] = useState("")
  const [hidden, setHidden] = useState(true)
  const [alert, setAlert] = useState(false)
  const [alrtClr, setAlrtClr] = useState("")
  const [alrtMsg, setAlrtMsg] = useState("")
  const [imgId, setImgId] = useState(null)
  const [rankId, setRankId] = useState(28)

  function genVerify() {
    const min = Math.ceil(0);
    const max = Math.floor(28);
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    setImgId(result)
  }
  
  const onDismiss = () => setAlert(!alert)

  const checkAccount = () => {
    const accountName = summonerName.replace(/ /g, "%20")
    RiotDataManager.searchAccount(accountName)
    .then(result => {
      const accExists = result.name
      if(accExists){
        LocalDataManager.getAll("users")
          .then(users => {
            const accInUse = users.find(user => user.leagueId === accExists)
            if(!accInUse){
              sessionStorage.setItem("tempId", result.id)
              getRank()
              const image = (imgId.toString() + ".png")
              const imageLink = "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" + image
              setImgLink(imageLink)
              setHidden(!hidden)}
            else{
              setAlrtClr("warning")
              setAlrtMsg("That account has already been verified on ClimbTogether.")
            }
            })
          }
      else{
        setAlrtClr("danger")
        setAlrtMsg("We couldn't find an account with that summoner name. Please try again!")
        setAlert(!alert)
        return
      }
            
    })
  }
  
  
  const getRank = () => {
    const summId = sessionStorage.getItem("tempId")
    RiotDataManager.getRanked(summId)
      .then(result => {
        if (result === []){
          return
        }
        else{
          const info = result[0]
          const tier = info.tier
          const division = info.rank
          LocalDataManager.getRank(tier, division)
          .then(result => {
            const rank = result[0].id
            setRankId(rank)
          })
        }
      })
  }

  const verification = () => {
    const currentUser = sessionStorage.getItem("userId")
    const verificationCheck = imgId
    const accountName = summonerName.replace(/ /g, "%20") 
    RiotDataManager.searchAccount(accountName)
      .then(result => {
        const profileIcon = result.profileIconId
        if(profileIcon === verificationCheck){
          setAlrtClr("success")
          setAlrtMsg("Your account has successfully been verified! You may now create and apply to listings.")
          setAlert(!alert)
          LocalDataManager.get("users",currentUser)
            .then(result => {
              const updatedUser = {
                "username": result.username,
                "password": result.password,
                "leagueId": summonerName,
                "verified": true,
                "rep": result.rep,
                "rank": rankId,
                "id": result.id
              }
              LocalDataManager.update("users", updatedUser, currentUser)
              sessionStorage.setItem("verified", true)
              sessionStorage.removeItem("tempId")
            })
        }
        else{
          console.log(imgId)
          setAlrtClr("warning")
          setAlrtMsg("Uh-oh! Your account could not be verified. Please set your icon in the client to the icon below.")
          setAlert(!alert)
          return
        }
      })
  }

  useEffect(() => {
    genVerify()
  }, [])

  return(
    <>
      <Alert color={alrtClr} isOpen={alert} toggle={onDismiss}>
        {alrtMsg}
      </Alert>
      <Container>
        <h1>Verify your League of Legends account.</h1>
        <h3>Enter your League of Legends Summoner Name</h3>
        <Input disabled={!hidden} onChange={event => setSN(event.target.value)}/>
        <Button hidden={!hidden} onClick={checkAccount}>Submit</Button>
        <h3 hidden={hidden}>Please change your League of Legends icon to the image below.</h3>
        <Media>
          <Media left href="#">
            <Media hidden={hidden} object src={imgLink} alt="Generic placeholder image" />
          </Media>
        </Media>
        <h4 hidden={hidden}>Click the verify button after your icon has been changed.</h4>
        <Button hidden={hidden} onClick={verification}>Verify</Button>
      </Container>
    </>
  )
}

export default Verify