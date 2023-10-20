import {createContext, useState,useEffect} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'


export const GlobalData = createContext()

const Context = ({children}) => {

  var [user,setUser] = useState(null)

  var {pathname} = useLocation()



  async function GetUserInfo(){
    try {
      var user = await axios.get('http://localhost:5000/api/auth/user-info',{withCredentials:true})
      setUser(user.data.message)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(()=>{
    GetUserInfo()
  },[pathname])


  
 
  return (
    <GlobalData.Provider value={{user,setUser}} >
      {children}
    </GlobalData.Provider>
  )
}

export default Context