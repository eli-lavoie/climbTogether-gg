import React, {useState, useEffect} from 'react'
import {
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert
} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager'
import './CreateListing.css'

const CreateListing = props => {
  // Variables used for the LFG Post Object and their associated useStates
  const [userId, setUserId] = useState(0)
  const [postTitle, setPostTitle] = useState("")
  const [gameMode, setGameMode] = useState("Normal")
  const [minRank, setMinRank] = useState("UNRANKED")
  const [minRankTier, setMinRankTier] = useState("I")
  const [maxRank, setMaxRank] = useState("CHALLENGER")
  const [maxRankTier, setMaxRankTier] = useState("I")
  const [role, setRole] = useState("Fill")
  const [honored, setHonored] = useState(false)
  const [time, setTime] = useState("0")
  const [date, setDate] = useState("0")
  const [discord, setDiscord] = useState(0)

  // The following useStates are used to define the content of any error alerts that submit may give
  const [alertVisible, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [alertColor, setAlertColor] = useState("warning")

  // Variables used in the post object that contain the min/max rank ids and role/gamemode ids
  const [minRankId, setMinRankId] = useState(28)
  const [maxRankId, setMaxRankId] = useState(27)
  const [gameModeId, setModeId] = useState(1)
  const [roleId, setRoleId] = useState(6)

  // Variables used to display the full selected rank
  const [minRankString, setMinRankString] = useState("UNRANKED")
  const [maxRankString, setMaxRankString] = useState("CHALLENGER")

  // Variables used in the toggling and hiding of the dropdown selectors for the min/max ranks and roles
  const [minRankDrop, minRankDropOpen] = useState(false);
  const [maxRankDrop, maxRankDropOpen] = useState(false);
  const [minTierDrop, minTierDropOpen] = useState(false);
  const [maxTierDrop, maxTierDropOpen] = useState(false);
  const [minTierDropHidden, minTierDropHide] = useState(true)
  const [maxTierDropHidden, maxTierDropHide] = useState(true)
  const [roleDropdown, setRoleDropdown] = useState(false)
  const [modeDropdown, setModeDropdown] = useState(false)
  const [timeInMs, setTimeMs] = useState(0)
  // Functions used by the dropdownmenu togglers
  const toggleMinRankDrop = () => minRankDropOpen(!minRankDrop);
  const toggleMinRankTierDrop = () => minTierDropOpen(!minTierDrop);
  const toggleMaxRankDrop = () => maxRankDropOpen(!maxRankDrop);
  const toggleMaxRankTierDrop = () => maxTierDropOpen(!maxTierDrop);
  const toggleRoleDrop = () => setRoleDropdown(!roleDropdown) 
  const toggleModeDrop = () => setModeDropdown(!modeDropdown)
  

  // The two functions used to display the tier dropdown list as long as the min/max ranks selected have associated tiers
  const showMinTier = () => {
    if(minRank !== "UNRANKED" && minRank !== "MASTER" && minRank !== "GRANDMASTER" && minRank !=="CHALLENGER"){
      minTierDropHide(false)
    }
    else{
      minTierDropHide(true)
      setMinRankTier("I")
    }
  }

  const showMaxTier = () => {
    if(maxRank !== "UNRANKED" && maxRank !== "MASTER" && maxRank !== "GRANDMASTER" && maxRank !=="CHALLENGER"){
      maxTierDropHide(false)
    }
    else{
      maxTierDropHide(true)
    }
  }
  const alertDismiss = () => setAlert(false)

  // Functions used to listen for changes to the min/max rank and update the min/max rank string accordingly
  const minRankStringGen = () => {
    if(minRank !== "UNRANKED" && minRank !== "MASTER" && minRank !== "GRANDMASTER" && minRank !=="CHALLENGER"){
      const fullMinRank = minRank + " " + minRankTier
      setMinRankString(fullMinRank)
    }
    else{
      setMinRankString(minRank)
    }
  }
  const maxRankStringGen = () => {
    if(maxRank !== "UNRANKED" && maxRank !== "MASTER" && maxRank !== "GRANDMASTER" && maxRank !=="CHALLENGER"){
      const fullMaxRank = maxRank + " " + maxRankTier
      setMaxRankString(fullMaxRank)
    }
    else{
      setMaxRankString(maxRank)
    }
  }

  // Gets the userId from session storage and stores it as a variable used in the post object
  const getUserId = () => {
    const currentUser = sessionStorage.getItem("userId")
    setUserId(currentUser)
  }

  // Function to handle creating the new listing object and posting it to local db.
  const newListing = () => {
    if (postTitle === ""){
      setAlertMsg("All posts must contain a title!")
      setAlertColor("danger")
      setAlert(true)
      return
    }
    if(isNaN(timeInMs)){
      setAlertMsg("Posts must contain a valid time and date.")
      setAlertColor("danger")
      setAlert(true)
      return
    }
    const timeNow = new Date()
    const nowInMs = timeNow.getTime()
    if(timeInMs < nowInMs){
      setAlertMsg("The game time cannot be a date that has already passed.")
      setAlertColor("warning")
      setAlert(true)
      return
    }
    if(minRankId != 28){
      if (minRankId > maxRankId){
        setAlertMsg("The minimum rank cannot be higher than the maximum rank.")
        setAlertColor("warning")
        setAlert(true)
        return
      }
    }

    const newListingObj = 
      {
        "userId": userId,
        "title": postTitle,
        "gameType": gameModeId,
        "reqRankMin": minRankId,
        "reqRankMax": maxRankId,
        "reqRole": roleId,
        "reqHonored": honored,
        "time": timeInMs,
        "discord": discord
      }
    LocalDataManager.post("LFGPosts", newListingObj)
    setAlertMsg("Your post has successfully been created.")
    setAlertColor("success")
    setAlert(true)
  }

  // The below functions work to obtain the id for the minimum and maximum ranks.
  const getMinRankId = () => {
    const minTier = minRank
    const minDiv = minRankTier
    LocalDataManager.getRank(minTier, minDiv)
      .then(result => {
        const minRankId = result[0].id
        setMinRankId(minRankId)
      })
  }

  const getMaxRankId = () => {
    const maxTier = maxRank
    const maxDiv = maxRankTier
    LocalDataManager.getRank(maxTier, maxDiv)
      .then(result => {
        const maxRankId = result[0].id
        setMaxRankId(maxRankId)
      })
  }
  
  const getRoleId = () => {
    const roleName = role
    LocalDataManager.getRoleByName(roleName)
      .then(result => {
        const roleId = result[0].id
        setRoleId(roleId)
      })
  }
  const getModeId = () => {
    const modeName = gameMode
    LocalDataManager.getModeByName(modeName)
      .then(result => {
        const modeId = result[0].id
        setModeId(modeId)
      })
  }
  const getTimeMs = () => {
    const dateArr = date.split("-")
    const timeArr = time.split(":")
    dateArr[1] = dateArr[1] - 1
    const dateTimeArr = dateArr.concat(timeArr)
    const dateTimeFormat = new Date(dateTimeArr[0],dateTimeArr[1],dateTimeArr[2],dateTimeArr[3],dateTimeArr[4])
    const postTimeInMs = dateTimeFormat.getTime()
    setTimeMs(postTimeInMs)
  }

  // UseEfect to get current user's Id on page load
  useEffect(() => {
    getUserId()
  }, [])

  // UseEffect to detect changes to min/max rank and display the appropriate tier selector if necessary
  useEffect(() => {
    showMinTier()
  }, [minRank])

  useEffect(() => {
    showMaxTier()
  }, [maxRank])

  // UseEffect to detect changes to overall rank and update the appropriate string and id
  useEffect(() => {
    minRankStringGen()
    getMinRankId()
  }, [minRank, minRankTier])

  useEffect(() => {
    maxRankStringGen()
    getMaxRankId()
  }, [maxRank, maxRankTier])

  useEffect(() => {
    getRoleId()
  }, [role])

  useEffect(() => {
    getModeId()
  }, [gameMode])
  
  useEffect(() => {
    getTimeMs()
  }, [date, time])
  return(
    <>
      <Container>
        <Alert color={alertColor} isOpen={alertVisible} toggle={alertDismiss}>
          {alertMsg}
        </Alert>
        <InputGroup className="post-title">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Title</InputGroupText>
          </InputGroupAddon>
            <Input placeholder="required" onChange={event => setPostTitle(event.target.value)}/>
        </InputGroup>

        <InputGroup className="post-gamemode">
          <InputGroupAddon>
            <InputGroupText addonType="prepend">Game Mode</InputGroupText>
          </InputGroupAddon>
          <Input value={gameMode}/>
          <InputGroupButtonDropdown addonType="append" isOpen={modeDropdown} toggle={toggleModeDrop}>
            <DropdownToggle split/>
            <DropdownMenu>
              <DropdownItem onClick={evt => setGameMode(evt.target.innerText)}>Normal</DropdownItem>
              <DropdownItem onClick={evt => setGameMode(evt.target.innerText)}>Ranked(Solo/Duo)</DropdownItem>
              <DropdownItem onClick={evt => setGameMode(evt.target.innerText)}>Ranked(Flex)</DropdownItem>
              <DropdownItem onClick={evt => setGameMode(evt.target.innerText)}>ARAM</DropdownItem>
              <DropdownItem onClick={evt => setGameMode(evt.target.innerText)}>RGM</DropdownItem>
            </DropdownMenu>
            </InputGroupButtonDropdown>
        </InputGroup>

        <InputGroup className="post-min-rank">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Minimum Rank</InputGroupText>
          </InputGroupAddon>
            <Input value={minRankString}/>
          <InputGroupButtonDropdown addonType="append" isOpen={minRankDrop} toggle={toggleMinRankDrop}>
            <DropdownToggle>
              Rank
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>UNRANKED</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>IRON</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>BRONZE</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>SILVER</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>GOLD</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>PLATINUM</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>DIAMOND</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>MASTER</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>GRANDMASTER</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>CHALLENGER</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <InputGroupButtonDropdown addonType="append" hidden={minTierDropHidden} isOpen={minTierDrop} toggle={toggleMinRankTierDrop}>
            <DropdownToggle>
              Tier
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem onClick={evt => setMinRankTier(evt.target.innerText)}>IV</DropdownItem>
            <DropdownItem onClick={evt => setMinRankTier(evt.target.innerText)}>III</DropdownItem>
            <DropdownItem onClick={evt => setMinRankTier(evt.target.innerText)}>II</DropdownItem>
            <DropdownItem onClick={evt => setMinRankTier(evt.target.innerText)}>I</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>

        <InputGroup className="post-max-rank">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Maximum Rank</InputGroupText>
          </InputGroupAddon>
            <Input value={maxRankString}/>
          <InputGroupButtonDropdown addonType="append" isOpen={maxRankDrop} toggle={toggleMaxRankDrop}>
            <DropdownToggle>
              Rank
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>UNRANKED</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>IRON</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>BRONZE</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>SILVER</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>GOLD</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>PLATINUM</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>DIAMOND</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>MASTER</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>GRANDMASTER</DropdownItem>
              <DropdownItem onClick={evt => setMaxRank(evt.target.innerText)}>CHALLENGER</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <InputGroupButtonDropdown addonType="append" hidden={maxTierDropHidden} isOpen={maxTierDrop} toggle={toggleMaxRankTierDrop}>
            <DropdownToggle>
              Tier
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem onClick={evt => setMaxRankTier(evt.target.innerText)}>IV</DropdownItem>
            <DropdownItem onClick={evt => setMaxRankTier(evt.target.innerText)}>III</DropdownItem>
            <DropdownItem onClick={evt => setMaxRankTier(evt.target.innerText)}>II</DropdownItem>
            <DropdownItem onClick={evt => setMaxRankTier(evt.target.innerText)}>I</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>

        <InputGroup className="post-role">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Role</InputGroupText>
          </InputGroupAddon>
            <Input value={role}/>
            <InputGroupButtonDropdown addonType="append" isOpen={roleDropdown} toggle={toggleRoleDrop}>
            <DropdownToggle split/>
            <DropdownMenu>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>Top</DropdownItem>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>Jungle</DropdownItem>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>Middle</DropdownItem>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>ADC</DropdownItem>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>Support</DropdownItem>
              <DropdownItem onClick={evt => setRole(evt.target.innerText)}>Fill</DropdownItem>
            </DropdownMenu>
            </InputGroupButtonDropdown>
        </InputGroup>

        <InputGroup className="post-date">
          <InputGroupAddon>
            <InputGroupText addonType="prepend">Date and Time</InputGroupText>
          </InputGroupAddon>
            <Input type="date" onChange={event => setDate(event.target.value)}/>
            <div/>
            <Input type="time" onChange={event => setTime(event.target.value)}/>
        </InputGroup>

        <InputGroup className="post-discord">
          <InputGroupAddon>
            <InputGroupText addonType="prepend">Discord</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="(optional)" onChange={event => setDiscord(event.target.value)}/>
        </InputGroup>

        <InputGroup className="post-submit">
        <Button className="submit-button" onClick={() => newListing()}>Submit Post</Button>
        <div className="post-require-honored">
          <p className="req-honor-text">Require Honored Status?</p>
          <input type="checkbox" onClick={() => setHonored(!honored)}/>
        </div>
        </InputGroup>
      </Container>
    </>
  )
}

export default CreateListing