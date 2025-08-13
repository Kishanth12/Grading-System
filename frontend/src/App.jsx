import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import AddStudent from './pages/Admin/AddStudent'
import AdminHome from './pages/Admin/AdminHome'
import Login from './pages/Login'
import {Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import AddUser from './pages/Admin/AddUser'
import AddLecturer from './pages/Admin/AddLecturer'
import AddSubject from './pages/Admin/AddSubject'
import Lecturer from './pages/Admin/Lecturer'


const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div>
      <NavBar/>
      <hr/>
      <div className='flex w-full'>
      <SideBar/>   
     <div className='w-[70%] mx-auto ml-10 text-gray-800 text-base'>
      <Routes>  
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/addStudent/:userId' element={<AddStudent/>}/>
        <Route path='/addUser' element={<AddUser/>}/>
        <Route path='/addLecturer/:userId' element={<AddLecturer/>}/>
        <Route path='/lecturer' element={<Lecturer/>}/>
        <Route path='/addSubject' element={<AddSubject/>}/>
      </Routes>
    </div>
    </div>
     </div>
     <Toaster/>
    </div>
  )
}

export default App  