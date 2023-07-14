import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React,{useContext,useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text,setText]=useState('');
  const [img,setImg]=useState(null);
  const [error,setError]=useState(false)

  const {currentUser}=useContext(AuthContext)
  const { data}=useContext(ChatContext)

  const handleSend=async()=>{
    //for image
    setText('')
     if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
         setError(true)
        }, 
        () => {
       
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          });
         });
        }
      );
     }else{
      await updateDoc(doc(db,'chats',data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now()
        })
      })
     }
     await updateDoc(doc(db,'userChats',currentUser.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp(),
     })
     await updateDoc(doc(db,'userChats', data.user.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp()
     })
   
     setImg(null)
  }
  return (
    <div className="Input"> 
        <input type="text" placeholder='Type Something...' onChange={(e)=>setText(e.target.value)} value={text}/>
        <div className="inputinfo">
          <label htmlFor="file">Image</label>
        <input type="file" id='file' style={{display:'none'}} placeholder='Type Something...' onChange={(e)=>setImg(e.target.files[0])}/>
          
          <button onClick={handleSend}>SEND</button>
        </div>
    </div>
  )
}

export default Input