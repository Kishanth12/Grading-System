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
import LecturerInfo from './pages/Admin/LecturerInfo'
import Students from './pages/Admin/Students'
import Subjects from './pages/Admin/Subjects'


const App = () => {
  return (
    <div className='bg-gray-50 h-screen'>
      <NavBar />
      <hr />
      <Routes>
        <Route path="/lecturerInfo/:id" element={<LecturerInfo />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <div className='flex w-full'>
              <SideBar />
              <div className='w-[75%] mx-auto ml-10 text-gray-800 text-base'>
                <Routes>
                  <Route path="/adminHome" element={<AdminHome />}/>
                  <Route path="/addStudent/:userId" element={<AddStudent />}/>
                  <Route path="/registerUser" element={<AddUser/>} />
                  <Route path="/addLecturer/:userId" element={<AddLecturer/>}/>
                  <Route path="/lecturers" element={<Lecturer />}/>
                  <Route path="/students" element={<Students />}/>
                  <Route path="/subjects" element={<Subjects />}/>
                  <Route path="/addSubject" element={<AddSubject/>} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App  