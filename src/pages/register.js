import React from 'react'

export default function Register() {
  return (
      <>
        <div className="form-control">
          <div className="form-wrapper">
            <span className='title'>REGISTER</span>
            <form >
               <input type="text" placeholder='NAME' />
               <input type="email" placeholder='EMAIL' />
               <input type="password" placeholder='PASSWORD'/>
               <input style={{display:'none'}} type="file" id='upload'/>
               <label htmlFor="upload">Upload images</label>
               <button >Sign up</button>
            </form>
            <p>You do have account? Login</p>
          </div>
        </div>
      </>  
    )
}
