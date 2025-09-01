import  { useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { axiosInstance } from "../../lib/axios";
import toast from 'react-hot-toast'

const Subjects = () => {

   const [subjects,setSubjects]= useState([]);


   const listSubjects = async()=>{
      try {
        const res = await axiosInstance.get('/admin/subjects')
        setSubjects(res.data)
      } catch (error) {
       toast.error(error.response?.data?.message || "Something went wrong")
      }
    }

  useEffect(()=>{
    listSubjects()
  },[])

  return (
    <div>
      <div className='mt-6'>
        <h1 className='text-2xl text-gray-800 font-bold'>Student List</h1>
        </div>
      <div className='mt-6'>
        <table className='divide-y divide-gray-300 rounded-lg shadow-md min-w-full overflow-y-auto  '>
          <thead className='bg-gray-200 text-gray-700 uppercase text-sm'>
          <tr>
          <th className= 'px-6 py-3 text-left'>subCode</th>
          <th className='px-6 py-3 text-left'>name</th>
          <th className='px-6 py-3 text-left'>Department</th>
          <th className='px-6 py-3 text-left'>Batch</th>
          <th className='px-6 py-3 text-left'>semester</th>
          <th className='px-6 py-3 text-left'>View</th>
          </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
            {subjects.map((subject,index)=>(
             <tr key={subject._id} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors`}>
             <td className=' px-6 py-3'>{subject.subCode}</td>
             <td className=' px-6 py-3'>{subject.name}</td>
             <td className=' px-6 py-3'>{subject.department}</td>
             <td className=' px-6 py-3'>{subject.batch}</td>
             <td className=' px-6 py-3'>{subject.semester}</td>
             <td className=' px-6 py-3'colSpan={2}>
              <Link to={`/subjectInfo/${subject._id}`}>
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

export default Subjects