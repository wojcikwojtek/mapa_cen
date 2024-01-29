import {useRef, useState } from 'react'
import { FaRegUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../store'
import APIClient from '../services/api-client'
import useProvinces from '../hooks/useProvinces'


const Nav = () => {
  const userStore=useUserStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPopUp,setShowPopUp]=useState('0');
  const [showChangeProvincePopUp,setShowChangeProvincePopUp]=useState(false);
  const [searchValue,setSearchValue]=useState('');
  const apiClient=new APIClient();
  const navigate=useNavigate();

  const provinceData = useProvinces();
    if(userStore.username=="gość"){
      const username =localStorage.getItem("username");
      const userId =localStorage.getItem("userId");
      const province =localStorage.getItem("province");
      const hasAdmin =!!localStorage.getItem("hasAdmin");
      
      if(username!=null && userId != null &&province != null && hasAdmin != null){
        userStore.setUsername(username);
        userStore.setUserId(parseInt(userId));
        userStore.setUserRegion(parseInt(province));
        userStore.setHasAdmin(hasAdmin);
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
    localStorage.removeItem("hasAdmin");
    setShowPopUp('0');
    userStore.reset();
  }

  const handleSearch=(event: { key: string })=>{
    if (event.key === 'Enter') {
      navigate('/');
      const searchProduct = searchInputRef.current;
      if (searchProduct) {
        console.log(searchProduct.value);
        userStore.setSearchProduct(searchProduct.value);
      }
    }
  }
 
  const handleBackToMainPage=()=>{
    setSearchValue('');
    userStore.setSearchProduct('');
    navigate('/');
  }


  return (
<nav>
  <>
    <h1 style={{cursor:'pointer'}} onClick={handleBackToMainPage}>Mapa Cen</h1>
    <input type="text" className="searchField" value={searchValue} onKeyDown={handleSearch}
    onChange={()=>setSearchValue(searchInputRef.current?.value||'')}  placeholder="Enter your search term" ref={searchInputRef} />
      <div className='userPanel' onKeyDown={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
    <div className='userIcon'onClick={()=>setShowPopUp(showPopUp==='1'?'0':'1')}>
      <FaRegUser size={40} color="black" />
    </div>
    
    <h2>{userStore.username=="gość"?"gość":userStore.username}</h2>
   
    </div>
 
  
  {userStore.username!='gość' ?
  <>
  <div className='userPopUp' style={userStore.hasAdmin?{scale:showPopUp,zIndex:'4',top:'-30px'}
  :{scale:showPopUp,zIndex:'4'}}>
  {userStore.hasAdmin &&
  <Link to={'/adminPanel'} style={{textDecoration:'none'}}><div> 
  admin panel
  </div></Link>}
  <div onClick={()=>{setShowPopUp('0');setShowChangeProvincePopUp(true)}}>
  ustaw województwo
  </div>
  <div onClick={()=>handleLogout()}>
  wyloguj
  </div> 
  </div>
  </>
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