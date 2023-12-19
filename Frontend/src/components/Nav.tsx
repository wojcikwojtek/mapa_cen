import {useRef, useState } from 'react'
import { FaRegUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useUserStore from '../store'

const Nav = () => {
  const userStore=useUserStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPopUp,setShowPopUp]=useState('0');

  console.log(userStore.username);
    if(userStore.username=="gość"){
      console.log("weszlo");
      const username =localStorage.getItem("username");
      console.log(username);
      if(username!=null){
        userStore.setUsername(username);
      }
    }

  const handleLogout=()=>{
    localStorage.removeItem("username");
    setShowPopUp('0');
    userStore.reset();
  }

  const handleSearch=(event: { key: string })=>{
    if (event.key === 'Enter') {
      const searchProduct = searchInputRef.current;
      if (searchProduct) {
        console.log(searchProduct.value);
        userStore.setSearchProduct(searchProduct.value);
      }
    }
  }
 


  return (
<nav><>
  <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
    <h1>Mapa Cen</h1>
  </Link>
    <input type="text" className="searchField" placeholder="Enter your search term" ref={searchInputRef}
     onKeyDown={handleSearch}/>
      <div className='userPanel' onKeyDown={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
    <div className='userIcon'onClick={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
      <FaRegUser size={40} color="black" />
    </div>
    
    <h2>{userStore.username=="gość"?"gość":userStore.username}</h2>
   
    </div>
 
    <div className='userPopUp' style={{opacity:showPopUp}}>
  <Link to={'/auth/login'} style={{textDecoration: 'none'}}>
    <div onClick={()=>{userStore.username=="gość" && setShowPopUp('0')}}>
      Login
      </div>
      </Link>
    <div onClick={()=>handleLogout()}>
      Logout
      </div> 
    </div>
    </>
</nav>
  )
}

export default Nav