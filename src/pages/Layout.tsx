
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Main from '../components/Main'

const Layout = () => {
  
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default Layout