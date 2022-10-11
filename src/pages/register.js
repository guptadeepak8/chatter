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
    let file=e.target[3].files[0]
 
    // email-already-in-use
try {
  const res =await createUserWithEmailAndPassword(auth, email, password)
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
  console.log(error)
  setError(true)
}

}


  return (
      <>
        <div className="form-control">
          <div className="form-wrapper">
            <span className='title'>REGISTER</span>
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder='USERNAME' />
               <input type="email" placeholder='EMAIL' />
               <input type="password" placeholder='PASSWORD'/>
               <input style={{display:'none'}} type="file" id='upload'/>
               <label htmlFor="upload" style={{padding:'10px 15px',backgroundColor:'#7b96ec',textAlign:'center',borderRadius:'8px',fontWeight:'bold'}}>Upload images</label>
               <button >Sign up</button>
               {error && <span>Something Went wrong</span>}
            </form>
            <p>You do have account?<Link to="/login">Login</Link></p>
          </div>
        </div>
      </>  
    )
}
