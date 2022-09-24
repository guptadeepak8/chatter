import { useState,useEffect } from "react";
import { createContext } from "react"; 
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext();
export const AuthContextProvider=({children})=>{
 const [currentUser,setCurrentUser]=useState({})
useEffect(() => {
  const authp = onAuthStateChanged(auth,(user)=>{
    setCurrentUser(user)
    console.log(user);
  })

  return () => {
    authp()
  }
}, []);

return (

<AuthContext.Provider value={{currentUser}}>
 {children}
</AuthContext.Provider>
)

}
