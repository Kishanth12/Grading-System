import { useState } from 'react'
import { axiosInstance } from './../lib/axios';
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';


const Login = ({setAuthUser}) => {
  const navigate = useNavigate()

  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]= useState({
    email:"",
    password:""
  })

  const login =async(data)=>{
    try {
     const res = await axiosInstance.post('/auth/login',data);
     setAuthUser(res.data.user)
     navigate('/dashboard');
    
    } catch (error) {
      toast.error(error.response.data || "something went wrong")
    }
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(formData);
  }
  
  
  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center '>
      <div className='bg-gray-400 p-16 rounded-lg shadow-lg w-[500px] '>
        <div className='text-center'>
        <h1 className='text-2xl mb-6'>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div>
          <label>
            <span className='text-xl mr-2'>Email</span>
          </label>
          <input className=' border-2 rounded-md p-1 w-56 border-gray-400 hover:border-gray-800' type="text" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}} name='email' placeholder='Your email' />
        </div>
        <div className='mt-2'>
          <label>
            <span className='mr-2 text-xl'>Password</span>
          </label>
          <input className=' border-2 rounded-md p-1 w-56 border-gray-400 hover:border-gray-800'value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}} type={showPassword ? "text" :"password"} name='password' placeholder='••••••••' />
          <button className='pl-1' type='button' onClick={()=>setShowPassword(!showPassword)}>show</button>
        </div>
        <div className='mt-2'>
        <button className='p-1 w-56 ml-14 text-white bg-gray-700 rounded-md' type='submit'>Login</button>
        </div>
        </form>
      </div>
      </div>
    
  )
}

export default Login