
import { assets } from './../assets/assets';

const NavBar = () => {
  return (
    <div className='bg-gray-50 px-10 pr-20 border w-full'>
    <div className='flex flex-row pt-2  justify-between items-center'>
      <div className='m-1'>
        <img className='w-15 h-20 rounded-sm' src={assets.logo} alt="logo" />
      </div>
      <div className='text-lg  text-gray-850 '>
        <a className='px-6 hover:text-gray-700' href=''>Home</a>
        <a className='px-6 hover:text-gray-700' href=''>About</a>
        <a className='px-6 hover:text-gray-700' href=''>Profile</a>
        <a className='px-6 hover:text-gray-700' href=''>Settings</a>
      </div>
    </div>
    </div>
  )
}

export default NavBar