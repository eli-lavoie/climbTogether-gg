import React, {useState, useEffect} from 'react'
import LocalDataManager from '../../modules/LocalDataManager' 
import ListDetailsUser from './ListDetailsUser'
import ListDetailsCreator from './ListDetailsCreator'


const ListingDetail = props => {
  const [postObj, setPostObj] = useState({})
  const currentUser = sessionStorage.getItem("userId")

  const getPost = () => {
    LocalDataManager.get("LFGPosts", props.postId)
      .then(result => {
        setPostObj(result)
      })
  }

  useEffect(() => {
    getPost()
  }, [])

  if(postObj.userId == currentUser){
    return <ListDetailsCreator {...props} key={postObj.id}  postDetails={postObj}/>
  }
  else{
    return <ListDetailsUser {...props} key={postObj.id} postDetails={postObj} />
  }

}
export default ListingDetail