import {create} from 'zustand'
import { axiosInstance } from './../lib/axios';
import toast from 'react-hot-toast'


export const useAdminStore = create((set,get)=>({
   users:[],
   students:[],
   lecturers:[],
   subjects:[],


    addUsers : async(data)=>{
      try {
      const res = await axiosInstance.post('/admin/register',data)
      set(state=>({users:[...state.users,res.data]}))
      toast.success("User Added")
      return res.data;
      } catch (error) {
      toast.error(error.response.data.message)
      }
    },

     addStudents: async(userId,data)=>{
     try {
        const res = await axiosInstance.post(`/admin/students/${userId}`,data)
        set(state=>({students:[...state.students,res.data]}))
        toast.success("Students Added")
     } catch (error) {
        toast.error(error.response.data.message)
     }
    },
    addLecturer : async(userId,data)=>{
      try {
      const res = await axiosInstance.post(`/admin/lecturer/${userId}`,data)
      set(state=>({lecturers:[...state.lecturers,res.data]}))
      toast.success("Lecturer Added")
      return res.data;
      } catch (error) {
      toast.error(error.response.data.message)
      }
    },

    addSubject :async(data)=>{
      try {
         const res = await axiosInstance.post('/admin/addSubjects',data)
         set(state=>({subjects:[...state.subjects,res.data]}))
         toast.success("Subject Added")
      } catch (error) {
          toast.error(error.response.data.message)

      }
    },
    listLecturer:async()=>{
      try {
         const res = await axiosInstance.get('/admin/lecturers')
         set({lecturers:res.data})
      } catch (error) {
         toast.error(error.response.data.message)
      }
    }  
}))