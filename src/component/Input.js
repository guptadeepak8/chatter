

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
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [emoji, setEmoji] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const handleKey=(e)=>{
    e.code === "Enter" && handleSend();
  }
  const handleEmojiKey=(e)=>{
    e.code === "e" && handleEmoji();
  }

  const handleSelectEmoji = (Emoji, event) => {
    let message = text;
    message += Emoji.emoji;
    setText(message);
  };
  
  const handleSend = async () => {
    setText("");
    setImg(null);
    setEmoji(false)
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //  setError(true)
        },
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
      [data.chatId + ".date"]: serverTimestamp(),
    });
    
  };
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
            <button className="btn yellow" onClick={handleEmoji}>
              EMOJI
            </button>
            {emoji && <EmojiPicker
 width={930} height={280}  onEmojiClick={handleSelectEmoji} />}
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
