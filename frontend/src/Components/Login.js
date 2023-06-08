import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const loginHandler = async (e) => {

        e.preventDefault();

        await fetch('http://localhost:4000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {
            if(result.msg === 'Login successful') {
                toast.success(result.msg, {
                    position: "top-center",
                    style: {
                      backgroundColor: "green",
                      color: "white",
                    },
                });

                window.localStorage.setItem("email", user.email)
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
            }

            else {
                toast.error(result.msg, {
                    position: "top-center",
                    style: {
                      backgroundColor: "red",
                      color: "white",
                    },
                });
            }
        })         
    }

  return (
    <>
        <form className='w-25 row mx-auto col-10 col-md-8 col-lg-6' style={{marginTop:'10%'}}>
            <div className='mb-3' style={{display:'flex',justifyContent:'center'}}>
                <h2>Login</h2>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
            </div>
            

            <div className='mb-4' style={{display:'flex',justifyContent:'center'}}>
                <button type="submit" className="btn btn-primary w-25" onClick={loginHandler}>Login</button>
            </div>

            <div style={{marginLeft:'20%'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                New user ? &nbsp;&nbsp;&nbsp;&nbsp;
                <a href='/'>Sign Up</a>
            </div>
        </form>

        <Toaster/>
    </>
  )
}

export default Login