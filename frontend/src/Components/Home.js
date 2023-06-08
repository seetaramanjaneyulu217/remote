import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

  return (
    <>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
          <div className='border border-primary w-25 rounded row mx-auto col-10 col-md-8 col-lg-6' style={{marginTop: '10%',display:'flex',justifyContent:'center'}}>
              <h2 style={{marginBottom:'20%', display:'flex', justifyContent:'center'}}>Profile Page</h2>
              <button className='btn btn-primary w-50' onClick={() => navigate('/profile')}>View profile</button>
          </div>

          <div className='border border-primary w-25 rounded row mx-auto col-10 col-md-8 col-lg-6' style={{marginTop: '10%',display:'flex',justifyContent:'center'}}>
           <h2 style={{marginBottom:'20%', display:'flex', justifyContent:'center'}}>Users Page</h2>
           <button className='btn btn-primary w-50' onClick={() => navigate('/users')}>View all users</button>
          </div>
      </div>
    </>
  )
}

export default Home