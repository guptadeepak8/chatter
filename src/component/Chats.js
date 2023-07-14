import React,{ useState, useEffect, useContext } from "react";
import {db} from '../firebase'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
<<<<<<< HEAD
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
      return (
      <div className="userinfo" key={chat[0]} onClick={handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL}alt="" />
        <div className="userchat">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
=======
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userinfo"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userchat">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
        </div>
      ))}
    </div>
  );
};

export default Chats;