import React from 'react'
import { FaRegUser} from 'react-icons/fa'


const Nav = () => {
  return (
<nav>
    <h1>Mapa Cen</h1>
    <div className='userPanel'>
    <div className='userIcon'>
      <FaRegUser size={40} color="black" />
    </div>
    <h2>Gosc</h2>
    </div>
    
</nav>
  )
}

export default Nav