import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileTemplate = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div style={{marginTop: '3%'}}>
      <button className='w-25 btn btn-primary' style={{marginLeft:'37.5%', marginBottom:'2%'}} onClick={() => navigate('/home')}>Home</button>
      <div className='border border-primary w-25 rounded row mx-auto col-10 col-md-8 col-lg-6'>
          <h2 style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>Profile</h2>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Firstname: <h5>{user.firstname}</h5></p>
              <p>Lastname: <h5>{user.lastname}</h5></p>
          </div>
          <p>Gender: <h5>{user.gender}</h5></p>
          <p>Privacy: <h5>{user.privacy}</h5></p>
          <p>Email: <h5>{user.email}</h5></p>
      </div>
    </div>
  )
}

export default ProfileTemplate