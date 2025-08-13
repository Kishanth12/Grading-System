import React, { useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'

const Lecturer = () => {

  const {listLecturer,lecturers}=useAdminStore();

  useEffect(()=>{
    listLecturer();
  },[listLecturer])

  return (
    <div>
      <div className='mt-6'>
        <h1 className='text-2xl text-gray-700 font-bold'>Lecturer List</h1>
        </div>
      <div className='mt-6'>
        <table className='border-2 border-gray-400 '>
          <thead className='text-lg text-gray-700'>
          <tr>
          <th className= 'border border-gray-300 px-20 py-4'>LecturerId</th>
          <th className='border border-gray-300 px-20 '>LecturerName</th>
          <th className='border border-gray-300 px-20 '>Department</th>
          <th className='border border-gray-300 px-20 '>Actions</th>
          </tr>
          </thead>
          <tbody className='text-md'>
            {lecturers.map((lecturer)=>(
             <tr key={lecturer._id}>
             <td className='border border-gray-300 px-20 py-4'>{lecturer.lecturerId}</td>
             <td className='border border-gray-300 px-20'>{lecturer.userId?.fullName}</td>
             <td className='border border-gray-300 px-20'>{lecturer.department}</td>
             <td className='border border-gray-300 px-10'colSpan={2}>
              <button className='p-2 px-4 bg-green-500 text-gray-900 rounded-md hover:bg-green-700'>Edit</button>
              <button className='p-2 ml-6 bg-red-500 text-gray-900 rounded-md hover:bg-red-700'>Delete</button>
             </td>
             </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Lecturer