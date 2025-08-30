import { House ,UserRound,Settings,Info } from 'lucide-react';
import { assets } from './../assets/assets';
import {Link, useNavigate} from 'react-router-dom'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const NavBar = ({authUser,setAuthUser}) => {
  
   const navigate = useNavigate()
   const logout = async()=>{
    try {
      await axiosInstance.post('/auth/logout')
      setAuthUser(null)
      navigate('/')
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  return (
    <div className='bg-gray-50 px-10 pr-20 border h-[80px]'>
    <div className='flex flex-row pt-1  justify-between items-center'>
      <div className='m-1'>
        <img className='w-15 h-16 rounded-sm' src={assets.logo} alt="logo" />
      </div>
      <div className='text-lg  text-gray-850 flex items-center gap-6'>
        <Link to='' className=' hover:text-gray-700  flex items-center gap-1' ><House className='w-5 h-5'/>Home</Link>
        <Link to='' className='px-4 hover:text-gray-700 flex items-center gap-1' ><Info/>About</Link>
        <Link to='' className='px-4 hover:text-gray-700 flex items-center gap-1' ><UserRound/>Profile</Link>
        <Link to='' className='px-4 hover:text-gray-700 flex items-center gap-1' ><Settings/>Settings</Link>
        <button onClick={logout} className='px-4 hover:text-gray-700 flex items-center gap-1' >LogOut</button>
      </div>
    </div>
    </div>
  )
}

export default NavBar