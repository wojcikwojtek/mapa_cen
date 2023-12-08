import React from 'react'
import { FaRegUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
<nav>
    <h1>Mapa Cen</h1>
    <div className='userPanel'>
   <Link to={'/auth/login'}> <div className='userIcon'>
      <FaRegUser size={40} color="black" />
    </div></Link>
    <h2>Gosc</h2>
    </div>
</nav>
  )
}

export default Nav