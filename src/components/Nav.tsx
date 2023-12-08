import React, { useState } from 'react'
import { FaRegUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useUserStore from '../store'
import APIClient from '../services/api-client'

const Nav = () => {
  // const apiClient=new APIClient<string>('/logout');
  const userStore=useUserStore();
  const [showPopUp,setShowPopUp]=useState('0');

  const handleLogout=()=>{
    // apiClinet.logout();
    setShowPopUp('0');
    userStore.reset();
  }
 


  return (
<nav>
    <h1>Mapa Cen</h1>
      <div className='userPanel' onClick={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
    <div className='userIcon'onClick={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
      <FaRegUser size={40} color="black" />
    </div>
    
    <h2>{userStore.username}</h2>
   
    </div>
 
    <div className='userPopUp' style={{opacity:showPopUp}}>
  <Link to={'/auth/login'} style={{textDecoration: 'none'}}>
    <div onClick={()=>setShowPopUp('0')}>
      Login
      </div>
      </Link>
    <div onClick={()=>handleLogout()}>
      Logout
      </div> 
    </div>
</nav>
  )
}

export default Nav