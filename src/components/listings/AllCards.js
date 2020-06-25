import React, {useState, useEffect} from 'react'
import LocalDataManager from '../../modules/LocalDataManager'
import {Button} from 'reactstrap'
import ListingCard from './ListingCard'
import './AllCards.css'

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
    <Button onClick={() => props.history.push("/listings/create")}>Create Post</Button>
      <div className="container-cards">
        {posts.map(post => <ListingCard {...props} data={post} key={post.id} />)}
    </div>
    </>
  )
}

export default AllCards