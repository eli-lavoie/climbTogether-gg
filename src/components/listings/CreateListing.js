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
  DropdownItem
} from 'reactstrap'
import LocalDataManager from '../../modules/LocalDataManager'

const CreateListing = props => {
  // Variables used for the LFG Post Object and their associated useStates
  const [userId, setUserId] = useState(0)
  const [postTitle, setPostTitle] = useState("")
  const [gameMode, setGameMode] = useState("Game Mode")
  const [minRank, setMinRank] = useState("Unranked")
  const [minRankTier, setMinRankTier] = useState("IV")
  const [maxRank, setMaxRank] = useState("Maximum Rank")
  const [maxRankTier, setMaxRankTier] = useState("")
  const [role, setRole] = useState("Select Role")
  const [honored, setHonored] = useState(false)
  const [time, setTime] = useState(0)
  const [discord, setDiscord] = useState(0)

  // Variables used to display the full selected rank
  const [minRankString, setMinRankString] = useState("Unranked")
  const [maxRankString, setMaxRankString] = useState("Challenger")

  // Variables used in the toggling and hiding of the dropdown selectors for the min/max ranks
  const [minRankDrop, minRankDropOpen] = useState(false);
  const [maxRankDrop, maxRankDropOpen] = useState(false);
  const [minTierDrop, minTierDropOpen] = useState(false);
  const [maxTierDrop, maxTierDropOpen] = useState(false);
  const [minTierDropHidden, minTierDropHide] = useState(true)
  const [maxTierDropHidden, maxTierDropHide] = useState(true)

  // Functions used by the dropdownmenu togglers
  const toggleMinRankDrop = () => minRankDropOpen(!minRankDrop);
  const toggleMinRankTierDrop = () => minTierDropOpen(!minTierDrop);
  const toggleMaxRankDrop = () => minRankDropOpen(!minRankDrop);
  const toggleMaxRankTierDrop = () => minRankDropOpen(!minRankDrop);

  // The two functions used to display the tier dropdown list as long as the min/max ranks selected have associated tiers
  const showMinTier = () => {
    if(minRank !== "Unranked" && minRank !== "Master" && minRank !== "Grandmaster" && minRank !=="Challenger"){
      minTierDropHide(false)
    }
    else{
      minTierDropHide(true)
      setMinRankTier("I")
    }
  }

  const showMaxTier = () => {
    if(maxRank !== "Unranked" && maxRank !== "Master" && maxRank !== "Grandmaster" && maxRank !=="Challenger"){
      maxTierDropHide(false)
    }
    else{
      maxTierDropHide(true)
    }
  }

  // Functions used to listen for changes to the min/max rank and update the min/max rank string accordingly
  const minRankStringGen = () => {
    if(minRank !== "Unranked" && minRank !== "Master" && minRank !== "Grandmaster" && minRank !=="Challenger"){
      const fullMinRank = minRank + " " + minRankTier
      setMinRankString(fullMinRank)
    }
    else{
      setMinRankString(minRank)
    }
  }
  const maxRankStringGen = () => {
    if(maxRank !== "Unranked" && maxRank !== "Master" && maxRank !== "Grandmaster" && maxRank !=="Challenger"){
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
    const newListingObj = 
      {
        "userId": userId,
        "title": postTitle,
        "gameType": gameMode,
        "reqRankMin": minRank,
        "reqRankMax": maxRank,
        "reqRole": role,
        "reqHonored": honored,
        "time": time,
        "discord": discord
      }
    LocalDataManager.post("LFGPosts", newListingObj)
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

  // UseEffect to detect changes to overall rank and update the appropriate string
  useEffect(() => {
    minRankStringGen()
  }, [minRank, minRankTier])
  return(
    <>
      <Container>

        <InputGroup className="post-title">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Title</InputGroupText>
            <Input/>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="post-min-rank">
          <InputGroupAddon addonType="prepend">
          <InputGroupText>Minimum Rank</InputGroupText>
          <Input value={minRankString}/>
          </InputGroupAddon>
          <InputGroupButtonDropdown addonType="append" isOpen={minRankDrop} toggle={toggleMinRankDrop}>
            <DropdownToggle>
              Rank
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Unranked</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Iron</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Bronze</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Silver</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Gold</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Platinum</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Diamond</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Master</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Grandmaster</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Challenger</DropdownItem>
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
          <Input value={maxRankString}/>
          </InputGroupAddon>
          <InputGroupButtonDropdown addonType="append" isOpen={maxRankDrop} toggle={toggleMaxRankDrop}>
            <DropdownToggle>
              Rank
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Unranked</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Iron</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Bronze</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Silver</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Gold</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Platinum</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Diamond</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Master</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Grandmaster</DropdownItem>
              <DropdownItem onClick={evt => setMinRank(evt.target.innerText)}>Challenger</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <InputGroupButtonDropdown addonType="append" hidden={maxTierDropHidden} isOpen={maxTierDrop} toggle={toggleMaxRankTierDrop}>
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
      </Container>
    </>
  )
}

export default CreateListing