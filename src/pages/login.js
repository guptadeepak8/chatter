import React from 'react'

export default function Login() {
  return (
      <>
        <div className="form-control">
          <div className="form-wrapper">
            <span className='title'>LOGIN</span>
            <form className='form'>
               <input type="email" placeholder='EMAIL' />
               <input type="password" placeholder='PASSWORD'/>
               <button >Sign In</button>
            </form>
            <p>You don't have account? Register</p>
          </div>
        </div>
      </>  
    )
}

