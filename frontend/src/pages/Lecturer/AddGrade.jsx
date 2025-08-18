import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from './../../lib/axios';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const AddGrade = () => {

  const {id} = useParams();
  const[subjects,setSubjects]=useState([])
  const[formData,setFormData]=useState({
    student:id,
    subject:'',
    marks:{
      assignment:'',
      finalExam:''
    }
  })
   const addGrade = async(data)=>{
    try {
      const res =await axiosInstance.post('/lecturer/addGrade',data)
      toast.success("Grade submitted successfully!");
    } catch (error) {
      toast.error(error.response.data || "Something Went Wrong")
    }
   }
  
   const studentSub = async()=>{
     try {
      const res =await axiosInstance.get(`/lecturer/studentSub/${id}`)
      setSubjects(res.data.subjects)
    } catch (error) {
      toast.error(error.response.data || "Something Went Wrong")
    }
   }
  const handleSubmit=async(e)=>{
     e.preventDefault();
     addGrade(formData)
  }

  useEffect(()=>{
    studentSub()
  },[])

  return (
    <div>
       <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Add Grade</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Select subject</span>
          </label>
          <select
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="ml-14 text-md text-gray-950"
          >
            <option value="">--Select--</option>
            {subjects.map((sub)=>(
            <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Assignment</span>
          </label>
          <input
            value={formData.marks.assignment}
            onChange={(e) =>
              setFormData({ ...formData,marks:{...formData.marks, assignment: e.target.value} })
            }
            className="ml-[2.75rem] w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="number"
            required
          />
          <label>
            <span className="text-xl text-gray-700">Final Exam</span>
          </label>
             <input
            value={formData.marks.finalExam}
            onChange={(e) =>
              setFormData({...formData,marks:{ ...formData.marks, finalExam: e.target.value} })
            }
            className="ml-[2.75rem] w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="number"
            required
          />
        </div>
        <div className="mt-6">
          <button
            className="text-lg p-2 text-gray-50 bg-gray-700 rounded-md"
            type="submit"
          >
            Submit Grade
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddGrade