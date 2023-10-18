import {useState} from 'react'
import axios from 'axios'
import {Toaster,toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  var navigate = useNavigate()

  var [data,setData] = useState({
    username:"",
    password:"",
  })

  const changeHandler = (e) =>{
    var name = e.target.name
    var value = e.target.value
    setData({...data,[name]:value})
  }


  var registerInputs = [
    {lable:"Username",id:"username",type:"text"},
    {lable:"Password",id:"password",type:"password"},
  ]


  const Login =async (e) =>{
    e.preventDefault()
    try {
      var res = await axios.post('https://notes-app-one-flax.vercel.app/api/auth/login',data,{withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message)
        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div>
      <Toaster />
      
    <form className='max-w-2xl border p-4 rounded-lg mx-auto my-20' onSubmit={Login}>
      <h1 className='text-2xl mb-2 font-semibold'>Sign to your <span className='text-indigo-600'>Account</span></h1>
      {
        registerInputs.map((v,i)=>{
          return(
            <div key={i}>
              <label className='block w-full' htmlFor={v.id}>{v.lable}</label>
              <input value={data[v.id]} required onChange={changeHandler} name={v.id} className='w-full border-1 border-gray-300 rounded-md block mb-2' id={v.id} type={v.type} placeholder={v.lable} />
            </div>
          )
        })
      }
      <button className='bg-indigo-600 my-1 py-2 px-3 text-white rounded-md'>Sign in</button>
    </form>

    </div>
  )
}

export default Login