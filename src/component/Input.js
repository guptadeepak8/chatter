

import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
<<<<<<< HEAD
  const [text,setText]=useState('');
  const [img,setImg]=useState(null);
  const [error,setError]=useState(false)
=======
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [emoji, setEmoji] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818

  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const handleKey=(e)=>{
    e.code === "Enter" && handleSend();
  }
  const handleEmojiKey=(e)=>{
    e.code === "e" && handleEmoji();
  }

<<<<<<< HEAD
  const handleSend=async()=>{
    //for image
    setText('')
     if(img){
=======
  const handleSelectEmoji = (Emoji, event) => {
    let message = text;
    message += Emoji.emoji;
    setText(message);
  };
  
  const handleSend = async () => {
    setText("");
    setEmoji(false)
    if (img) {
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
<<<<<<< HEAD
         setError(true)
        }, 
=======
            //setError(true)
        },
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
<<<<<<< HEAD
      [data.chatId+'.date']:serverTimestamp()
     })
   
     setImg(null)
  }
=======
      [data.chatId + ".date"]: serverTimestamp(),
    });
    
  };
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
  return (
    <div className="Input">
      <input
        type="text"
        placeholder="Type here.."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      <div className="inputinfo">
        <div className="button-container">
          <div className="emoji">
            <span className="btn yellow" onClick={handleEmoji} onKeyDown={handleEmojiKey}>
              EMOJI
            </span>
            {emoji && <EmojiPicker width={930} height={280}  onEmojiClick={handleSelectEmoji} />}
          </div>
        </div>
        <label htmlFor="file" className='btn blue'>IMAGE</label>
      <input type="file" id='file' style={{display:'none'}} onChange={(e)=>setImg(e.target.files[0])}/>
        <button className="btn green"  onClick={handleSend}>
          SEND
        </button>

        {/* ?  */}
      </div>
    </div>
  );
};
// for image uploading if want put on mark ?


export default Input;
