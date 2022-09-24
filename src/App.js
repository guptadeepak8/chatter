
import "./app.scss"
import  Register from "./pages/register";
import  Home from "./pages/home";
import  Login from "./pages/login";
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom' 
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
const {currentUser}= useContext(AuthContext)

const ProtectedRoute=({children})=>{
  if(!currentUser){
    return <Navigate to='/login'/>
  }
  return children
}

  return (
    <div >
      <BrowserRouter>
       <Routes>
        <Route path="/">
          <Route index  element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="login"  element={<Login/>}></Route>
          <Route path="register"  element={<Register/>}></Route>
        </Route>
       </Routes>
      </BrowserRouter>
    
    
    </div>
  );
}

export default App;
