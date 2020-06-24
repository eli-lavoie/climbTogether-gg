import React, {useState, useEffect} from 'react'
import LocalDataManager from '../../modules/LocalDataManager'
import {Button} from 'reactstrap'

const AllCards = props => {
  const [posts, setPosts] = useState([])

  const allListings = () => {
    LocalDataManager.getAll("LFGPosts")
    .then(LFGPosts => {setPosts(LFGPosts)})
  }

  const test = () => console.log(posts)

  useEffect(() =>{
    allListings()
  }, [])

  return(
    <>
      <Button onClick={() => test()}>Test</Button>
    </>
  )
}

export default AllCards