import React from 'react'
import Sidebar from '../component/Sidebar'
import Chat from '../component/Chat'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-container">
          <Sidebar />
          <Chat />
      </div>
    </div>
  )
}

export default Home