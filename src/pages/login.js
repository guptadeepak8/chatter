import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from '../component/loading';

export default function Login() {
  const [loading,setLoading]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [erroremail,setErrorEmail]=useState(false)
  const [errorpass,setErrorPass]=useState(false)
  const navigate=useNavigate()



  const clearError=()=>{
    setErrorEmail(false)
    setErrorPass(false)
  }

  const clearInfo=()=>{
    setEmail('')
    setPassword('')
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault()

  try {
    clearError();
    await signInWithEmailAndPassword(auth, email, password)
    setInterval(()=>setLoading(true),5000)
      navigate('/')
      setLoading(false)
   
  } catch (error) {
    switch(error.code){
      case 'auth/user-not-found':
         setErrorEmail(true)
         clearInfo();
      break;
      
      case 'auth/wrong-password':
          setErrorPass(true)
          clearInfo();
       break;
       default:
    }
    console.log(error)
  }
}
if(loading){
  return(
    <main>
      <Loading />
    </main>
  )
}
  return (
      <>
        <div className="form-control">
          <div className="form-wrapper">
            <span className='title'>LOGIN</span>
            <form className='form' onSubmit={handleSubmit}>
               <input type="email" placeholder='EMAIL' value={email} onChange={e=>setEmail(e.target.value)}/>
               <input type="password" placeholder='PASSWORD' value={password} onChange={e=>setPassword(e.target.value)}/>
               {erroremail && <span>User not found</span>}
               {errorpass && <span>Password Incorrect</span>}
               <button >Sign In</button>
              
            </form>
            <p>You don't have account?<Link to="/register">Register</Link></p>
          </div>
        </div>
      </>  
    )
}

