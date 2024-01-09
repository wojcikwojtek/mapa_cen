import {useRef, useState } from 'react'
import { FaRegUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useUserStore from '../store'
import APIClient from '../services/api-client'
import useProvinces from '../hooks/useProvinces'


const Nav = () => {
  const userStore=useUserStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPopUp,setShowPopUp]=useState('0');
  const [showChangeProvincePopUp,setShowChangeProvincePopUp]=useState(false);
  const apiClient=new APIClient();

  const provinceData = useProvinces();
    if(userStore.username=="gość"){
      const username =localStorage.getItem("username");
      const userId =localStorage.getItem("userId");
      const province =localStorage.getItem("province");
      if(username!=null && userId != null &&province != null){
        userStore.setUsername(username);
        userStore.setUserId(parseInt(userId));
        userStore.setUserRegion(parseInt(province));
      }
    }

  const handleChangeDefaultProvince=(id:number)=>{
    setShowChangeProvincePopUp(false);
    apiClient.updateDefaultProvince(id,userStore.userId);
    userStore.setUserRegion(id);
    localStorage.setItem('province',""+id);
  }

  const handleLogout=()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("province");
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
 
  
  {userStore.username!='gość' ?
  <div className='userPopUp'  style={{scale:showPopUp,zIndex:'4'}}>
  <div onClick={()=>{setShowPopUp('0');setShowChangeProvincePopUp(true)}}>
  ustaw województwo
  </div>
  <div onClick={()=>handleLogout()}>
  wyloguj
  </div> 
  </div>
  :
  <div className='userPopUp'  style={{opacity:showPopUp,zIndex:'4',marginTop:'30px'}}>
  <Link to={'/auth/login'} style={{textDecoration: 'none'}}>
    <div onClick={()=>{userStore.username=="gość" && setShowPopUp('0')}}>
      Login
      </div>
      </Link>
   </div>
    }

    {showChangeProvincePopUp &&
    <div className='provincePopUp'>
    <div className='provincePopUpInner'>
    {provinceData.data?.map((provinceData,index) => (
          <div key={index} onClick={()=>handleChangeDefaultProvince(provinceData.id)}>
        {provinceData.name}
          </div>
          
        ))}
    </div>
    </div>}
    </>
</nav>
  )
}

export default Nav