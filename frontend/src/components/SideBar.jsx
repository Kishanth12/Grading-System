import { useState } from "react"
import {Link} from 'react-router-dom'

const SideBar = () => {

  const [openSection,setOpenSection]=useState(null)

  const toggleSection = (section)=>{
     setOpenSection(openSection === section ? null :section)
  }
  return (
    <div className="w-3/12 border-2 bg-gray-100 flex flex-col h-screen">
      <div className="text-2xl text-gray-950">
        <div className="mt-10">
          <div className="flex justify-between items-center py-2 border-4 mx-1 rounded-md border-red-200">
          <h1 className="ml-12">Students</h1>
          <button className='pr-1' onClick={()=>toggleSection("student")}>arrow</button>
          </div>
          {openSection ==="student" &&
          (<div className="mt-5 text-lg">
            <div  className="border-2 border-red-200 py-2 pl-10">
              <Link to=''>Add Students</Link>
            </div>
            <div className="mt-1 border-2 border-red-200 py-2 pl-10">
              <a href=''>Students List</a>
            </div>
            </div>)}
        </div>
        <div className="my-10">
          <div className="flex justify-between py-2 items-center border-4 mx-1 rounded-md  border-red-200">
            <h1 className="ml-12">Lecturer</h1>
            <button className='pr-1' onClick={()=>toggleSection("lecturer")}>arrow</button>
          </div>
          {openSection === "lecturer" &&
          (
          <div className="mt-5 text-lg">
          <div className="border-2 border-red-200 py-2 pl-10">
            <a href=''>Add Lecturer</a>
          </div>
          <div className="mt-1 border-2 border-red-200 py-2 pl-10">
            <a href=''>Lecturer List</a>
          </div>
          </div>)}
        </div>
        <div className="my-10">
          <div className="flex justify-between items-center py-2 border-4 mx-1 rounded-md border-red-200">
            <h1 className="ml-12">Academic Details</h1>
            <button className='pr-1' onClick={()=>toggleSection("grade")}>arrow</button>
          </div>
          {openSection === "grade" ? (
            <div className="mt-5 text-lg">
          <div className="border-2 border-red-200 py-2 pl-10">
            <a href=''>Add Grade</a>
          </div>
          <div className="mt-1 border-2 border-red-200 py-2 pl-10">
            <a href=''>Students Grades</a>
          </div>
            </div>
          ):''}
        </div>
        </div>
      </div>
  )
}

export default SideBar;