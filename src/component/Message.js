import React,{useContext,useEffect,useRef} from 'react'
import { AuthContext } from '../context/AuthContext'


const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
 
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
   
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;