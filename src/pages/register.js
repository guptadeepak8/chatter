import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
<<<<<<< HEAD
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

=======
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
export default function Register() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    displayName: '',
    email: '',
    password: '',
    file: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      const storageRef = ref(storage, newUser.displayName);
      const uploadTask = uploadBytesResumable(storageRef, newUser.file);

<<<<<<< HEAD
      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: newUser.displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: newUser.displayName,
              email: newUser.email,
              photoURL: downloadURL,
            });
            navigate("/");
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };
=======
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
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewUser({ ...newUser, file });
  };

  return (
<<<<<<< HEAD
    <>
      <div className="form-control">
        <div className="form-wrapper">
          <span className="title">REGISTER</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="displayName"
              placeholder="NAME"
              value={newUser.displayName}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={newUser.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={newUser.password}  
              onChange={(e) => handleChange(e)}
            />
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="upload"
              onChange={(e) => handleFileChange(e)}
            />
            <label htmlFor="upload">Upload images</label>
            <button>Sign up</button>
            {error && <span>Something Went wrong</span>}
          </form>
          <p>
            You do have account?<Link to="/login">Login</Link>
          </p>
=======
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
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
        </div>
      </div>
    </>
  );
}
