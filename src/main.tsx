import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Nav from './components/Nav.tsx'
import Main from './components/Main.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Nav/>
   <Main/>
  </React.StrictMode>,
)
