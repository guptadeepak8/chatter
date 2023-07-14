import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from '../component/loading';


//form value and connect with useState
export default function Login() {
  const [loading,setLoading]=useState(false)
<<<<<<< HEAD
  const [error,setError]=useState(false)
  const [errors,setErrors]=useState('')
=======
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [erroremail,setErrorEmail]=useState(false)
  const [errorpass,setErrorPass]=useState(false)
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
  const navigate=useNavigate()
  const [data,setData]=useState({
    email:'',
    password:''
  })



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
<<<<<<< HEAD
   await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
  } catch (error) {
    setError(true);
    setErrors (getErrorMessage(error.code));
  }
  finally{
    setLoading(false)
=======
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
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
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
               <input type="email" placeholder='EMAIL' value={email} onChange={e=>setEmail(e.target.value)}/>
               <input type="password" placeholder='PASSWORD' value={password} onChange={e=>setPassword(e.target.value)}/>
               {erroremail && <span>User not found</span>}
               {errorpass && <span>Password Incorrect</span>}
               <button >Sign In</button>
<<<<<<< HEAD
               {error && <span>{errors}</span>}
=======
              
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
            </form>
            <p>You don't have account?<Link to="/register">Register</Link></p>
          </div>
        </div>
      </>  
    )
}

