import { useAdminStore } from '../../store/useAdminStore'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const Students = () => {

  const {listStudents,students}=useAdminStore();

  useEffect(()=>{
    listStudents()
  },[])

  return (
     <div>
      <div className='mt-6'>
        <h1 className='text-2xl text-gray-800 font-bold'>Student List</h1>
        </div>
      <div className='mt-6'>
        <table className='divide-y divide-gray-300 rounded-lg shadow-md min-w-full overflow-y-auto '>
          <thead className='bg-gray-200 text-gray-700 uppercase text-sm'>
          <tr>
          <th className= 'px-6 py-3 text-left'>Admission No</th>
          <th className='px-6 py-3 text-left'>StudentName</th>
          <th className='px-6 py-3 text-left'>Department</th>
          <th className='px-6 py-3 text-left'>Batch</th>
          <th className='px-6 py-3 text-left'>View</th>
          </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
            {students.map((student,index)=>(
             <tr key={student._id} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors`}>
             <td className=' px-6 py-3'>{student.admissionNo}</td>
             <td className=' px-6 py-3'>{student.userId?.fullName}</td>
             <td className=' px-6 py-3'>{student.department}</td>
             <td className=' px-6 py-3'>{student.batch}</td>
             <td className=' px-6 py-3'colSpan={2}>
              <Link to={`/studentInfo/${student._id}`}>
              <button className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors">
                <Eye size={16} className="mr-1" /> View</button></Link>
             </td>
             </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Students