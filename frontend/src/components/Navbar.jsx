import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-gray-100'>
        <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" alt="" />
        <ul className='flex'>
            <li><NavLink className='mx-1 px-1' to="/">Home</NavLink></li>
            <li><NavLink className='mx-1 px-1' to="/login">Login</NavLink></li>
            <li><NavLink className='mx-1 px-1' to="/register">Register</NavLink></li>
        </ul>
    </div>
  )
}

export default Navbar