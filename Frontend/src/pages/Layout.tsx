
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Main from '../components/Main'
import { useState } from 'react'



const Layout = () => {


  return (
    <>
    <Nav/>
    <Outlet />
    </>
  )
}

export default Layout