import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import UserProfile from "./Components/UserProfile";
import Users from "./Components/Users";
import ProfileTemplate from "./Components/ProfileTemplate";
import { useState } from "react";


function App() {

  const navigate = useNavigate();
  const email = window.localStorage.getItem("email");

  const [user, setUser] = useState({})
  const gettheOtherUser = (user) => {
    setUser(user)
    navigate('/otheruserprofile')
  }

  return (
    <>
       <Routes>
          <Route path="/" element={email ? <UserProfile/> : <SignUp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/users" element={<Users gettheOtherUser={gettheOtherUser}/>} />
          <Route path="/otheruserprofile" element={<ProfileTemplate user={user}/>} />
       </Routes>
    </>
  )
}

export default App;
