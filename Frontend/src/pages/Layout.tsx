
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Main from '../components/Main'
import { useState } from 'react'



const Layout = () => {
  const [username,setUsername]=useState()


  return (
    <>
    <Nav username={username}/>
    <Outlet />
    </>
  )
}

export default Layout