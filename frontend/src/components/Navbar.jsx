import { NavLink } from 'react-router-dom'
import {useContext} from 'react'
import { GlobalData } from '../Context'

const Navbar = () => {

  var data = useContext(GlobalData)

  return (
    <div className='flex items-center justify-between bg-gray-100'>
        <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" alt="" />
        <ul className='flex'>
            <li><NavLink className='mx-1 px-1' to="/">Home</NavLink></li>
            <li><NavLink className='mx-1 px-1' to="/login">Login</NavLink></li>
            <li><NavLink className='mx-1 px-1' to="/register">Register</NavLink></li>
        </ul>

        {
          data?.user?.fullName
        }

    </div>
  )
}

export default Navbar