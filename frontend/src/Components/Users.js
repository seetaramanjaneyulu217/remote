import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

const Users = ({ gettheOtherUser }) => {

    const email = window.localStorage.getItem("email");
    const [users, setUsers] = useState([]);

    const getallUsers = async () => {

        await fetch('http://localhost:4000/getallusers', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(result => {
            setUsers(result.users);
        })
    }

    const handleviewProfile = async (user) => {
        await fetch('http://localhost:4000/getuserprivacystatus', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.privacy === 'private') {
                toast.error('Profile is private. Cannot view this profile', {
                    position: "top-center",
                    style: {
                      backgroundColor: "red",
                      color: "white",
                    },
                });
            }

            else {
                gettheOtherUser(user);
            }
        })
    }

    useEffect(() => {
        getallUsers();
    },[])


  return (
    <>
        <div style={{marginTop:'10%'}}>
            <div className='w-25 row mx-auto col-10 col-md-8 col-lg-6'>
                <h2 style={{marginLeft:'35%'}}>Users</h2>
            </div>
            <div className='w-25 border border-primary rounded row mx-auto col-10 col-md-8 col-lg-6'>
                {
                users.map(user => {
                    return (
                        <div style={{cursor:'pointer'}}>
                            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                <h4>{user.firstname + ' ' + user.lastname}</h4> 
                                <button className='btn btn-primary' onClick={() => handleviewProfile(user)}>View Profile</button>
                            </div>
                            <hr></hr>
                        </div>
                    )
                })   
                }
            </div>
        </div>
        <Toaster/>
    </>
  )
}

export default Users