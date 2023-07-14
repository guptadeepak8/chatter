import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewUser({ ...newUser, file });
  };

  return (
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
        </div>
      </div>
    </>
  );
}
