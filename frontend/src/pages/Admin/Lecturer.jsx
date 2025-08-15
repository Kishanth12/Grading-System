import React, { useEffect } from 'react'
import { useAdminStore } from '../../store/useAdminStore'
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
const Lecturer = () => {

  const {listLecturer,lecturers}=useAdminStore();

  useEffect(()=>{
    listLecturer();
  },[])

  return (
    <div>
      <div className='mt-6'>
        <h1 className='text-2xl text-gray-800 font-bold'>Lecturer List</h1>
        </div>
      <div className='mt-6'>
        <table className='divide-y divide-gray-300 rounded-lg shadow-md min-w-full overflow-y-auto'>
          <thead className='bg-gray-200 text-gray-700 uppercase text-sm'>
          <tr>
          <th className= 'px-6 py-3 text-left'>Lecturer Id</th>
          <th className='px-6 py-3 text-left '>Lecturer Name</th>
          <th className='px-6 py-3 text-left '>Department</th>
          <th className='px-6 py-3 text-left '>View</th>
          </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
            {lecturers.map((lecturer,index)=>(
             <tr key={lecturer._id} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors`}>
             <td className='px-6 py-3'>{lecturer.lecturerId}</td>
             <td className='px-6 py-3'>{lecturer.userId?.fullName}</td>
             <td className='px-6 py-3'>{lecturer.department}</td>
             <td className='px-6 py-3'colSpan={2}>
              <Link to={`/lecturerInfo/${lecturer._id}`}><button  className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors">
                <Eye size={16} className="mr-1" />  View</button></Link>
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