import {useState} from 'react'
import axios from 'axios'
import {Toaster,toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  var navigate = useNavigate()

  var [data,setData] = useState({
    fullName:"",
    email:"",
    username:"",
    password:"",
  })

  const changeHandler = (e) =>{
    var name = e.target.name
    var value = e.target.value
    setData({...data,[name]:value})
  }


  var registerInputs = [
    {lable:"Full Name",id:"fullName",type:"text"},
    {lable:"Username",id:"username",type:"text"},
    {lable:"Email",id:"email",type:"email"},
    {lable:"Password",id:"password",type:"password"},
  ]


  const Register =async (e) =>{
    e.preventDefault()
    try {
      var res = await axios.post('https://notes-app-one-flax.vercel.app/api/auth/register',data)
      if(res.data.success){
        toast.success("Your are Registered!")
        setTimeout(()=>{
          navigate("/login")
        },2000)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div>
      <Toaster />
      
    <form className='max-w-2xl border p-4 rounded-lg mx-auto my-20' onSubmit={Register}>
      <h1 className='text-2xl mb-2 font-semibold'>Create Your <span className='text-indigo-600'>Account</span></h1>
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
      <button className='bg-indigo-600 my-1 py-2 px-3 text-white rounded-md'>Register</button>
    </form>

    </div>
  )
}

export default Register