import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data}=useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user?.displayName}</span>
       <div className="chaticon">
          
       </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat