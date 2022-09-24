import React,{useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';


export default function Register() {
 
 
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const displayName=e.target[0].value
    const email=e.target[1].value
    const password=e.target[2].value
    const file=e.target[3].files[0]
    
try {
  const res=await createUserWithEmailAndPassword(auth, email, password)
  const storageRef = ref(storage, displayName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on(
    (error) => {
     setError(true)
    }, 
    () => {
   
      getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
        await updateProfile(res.user,{
          displayName, 
          photoURL:downloadURL
        });
        await setDoc(doc(db, "users" ,res.user.uid),{
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL
        });
        await setDoc(doc(db, "userChats" ,res.user.uid),{})
        navigate('/')
      });
    }
  );  
} catch (error) {
  setError(true)
}

}


  return (
      <>
        <div className="form-control">
          <div className="form-wrapper">
            <span className='title'>REGISTER</span>
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder='NAME' />
               <input type="email" placeholder='EMAIL' />
               <input type="password" placeholder='PASSWORD'/>
               <input style={{display:'none'}} type="file" id='upload'/>
               <label htmlFor="upload">Upload images</label>
               <button >Sign up</button>
               {error && <span>Something Went wrong</span>}
            </form>
            <p>You do have account?<Link to="/login">Login</Link></p>
          </div>
        </div>
      </>  
    )
}
