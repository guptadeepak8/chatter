import React, { useState,useContext } from 'react'
import { collection, query, where,getDoc,getDocs,setDoc, updateDoc, serverTimestamp,doc } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  
  const [username,setUserName]=useState('')
  const [user,setUser]=useState(null)
  const [error,setError]=useState(false)

  const {currentUser}= useContext(AuthContext);

  const handleSearch= async()=>{
    const q= query(
      collection(db, 'users'),
      where('displayName','==', username)
      );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
    } catch (error) {

      setError(true)
    }
   
  }

  const handleKey=(e)=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect=async()=>{
    const combinedId= currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid+currentUser.uid
    try {
      const res= await getDoc(doc(db,'chats',combinedId))
      if(!res.exists()){

      await setDoc(doc(db,'chats',combinedId),{ messages:[] });
      
      await updateDoc(doc(db,'userChats',currentUser.uid),{
        [combinedId+'.userInfo']:{
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [combinedId +'.date']:serverTimestamp()
      })
      await updateDoc(doc(db,'userChats',user.uid),{
        [combinedId+'.userInfo']:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [combinedId+'.date']:serverTimestamp()
      })

      }
    } catch (error) {
      setError(true)
    }
    setUser(null)
    setUserName('')
  }
  return (
    <div className='search'>
      <div className="searchform">
        <input type="text" placeholder='Find A User' onKeyDown={handleKey} onChange={(e)=>setUserName(e.target.value)} value={username}/>
      </div>
      {error && <span>User not found</span>}
      {user && (
      <div className="userinfo" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className='userchat'>
          <span>{user.displayName}</span>
        </div>
      </div>
      )}
    </div>
  )
}

export default Search