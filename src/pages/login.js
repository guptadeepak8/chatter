import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from '../component/loading';


//form value and connect with useState
export default function Login() {
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [errors,setErrors]=useState('')
  const navigate=useNavigate()
  const [data,setData]=useState({
    email:'',
    password:''
  })

  const handleSubmit=async(e)=>{
    e.preventDefault()
   
    const email=e.target[0].value
    const password=e.target[1].value
    setLoading(true)
    
  try {
   await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
  } catch (error) {
    setError(true);
    setErrors (getErrorMessage(error.code));
  }
  finally{
    setLoading(false)
  }
}

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/user-not-found':
      return 'User not found';
    // Add more error code mappings as needed
    default:
      return 'Something went wrong';
  }
};

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
               <input type="email" placeholder='EMAIL' />
               <input type="password" placeholder='PASSWORD'/>
               <button >Sign In</button>
               {error && <span>{errors}</span>}
            </form>
            <p>You don't have account?<Link to="/register">Register</Link></p>
          </div>
        </div>
      </>  
    )
}

