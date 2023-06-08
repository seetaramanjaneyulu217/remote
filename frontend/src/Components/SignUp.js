import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        privacy:'',
        email:'',
        password:'',
        confirmpassword:''
    })

    const signupHandler = async (e) => {

        e.preventDefault();

        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {
            if(result.msg === 'Profile Created') {
                toast.success(result.msg, {
                    position: "top-center",
                    style: {
                      backgroundColor: "green",
                      color: "white",
                    },
                });

                window.localStorage.setItem("email", user.email);
                
                setTimeout(() => {
                    navigate('/home');
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
        <form className='w-25 row mx-auto col-10 col-md-8 col-lg-6' style={{marginTop:'0.5%'}}>
            <div className='mb-3' style={{display:'flex',justifyContent:'center'}}>
                <h2>SignUp</h2>
            </div>

            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstname" onChange={(e) => setUser({...user, firstname: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastname" onChange={(e) => setUser({...user, lastname: e.target.value})}/>
            </div>

            <div className="mb-3">
                <h6>Gender</h6>
                <input type="radio" id="male" name='gender' value="M" onChange={(e) => setUser({...user, gender: e.target.value})}/>
                <label htmlFor="male" className="form-label">Male</label>

                &nbsp;&nbsp;&nbsp;

                <input type="radio" id="female" name='gender' value="F" onChange={(e) => setUser({...user, gender: e.target.value})}/>
                <label htmlFor="female" className="form-label">Female</label>
            </div>

            <div className="mb-3">
                <h6>Make your account visible to others or not</h6>
                <input type="radio" id="public" name='privacy' value="public" onChange={(e) => setUser({...user, privacy: e.target.value})}/>
                <label htmlFor="public" className="form-label">Public</label>

                &nbsp;&nbsp;&nbsp;

                <input type="radio" id="private" name='privacy' value="private" onChange={(e) => setUser({...user, privacy: e.target.value})}/>
                <label htmlFor="private" className="form-label">Private</label>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">ConfirmPassword</label>
                <input type="password" className="form-control" id="confirmpassword" onChange={(e) => setUser({...user, confirmpassword: e.target.value})}/>
            </div>

            <div className='mb-3' style={{display:'flex',justifyContent:'center'}}>
                <button type="submit" className="btn btn-primary w-25" onClick={signupHandler}>Sign Up</button>
            </div>

            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;
                <a href='/login'>Login here</a>
            </div>
        </form>

        <Toaster/>
    </>
  )
}

export default SignUp