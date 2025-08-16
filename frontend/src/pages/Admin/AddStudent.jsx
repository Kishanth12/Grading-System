import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from 'react-hot-toast'
import { useParams } from "react-router-dom";

const AddStudent = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    admissionNo: "",
    batch: "",
    department: "",
  });

  const addStudents= async(userId,data)=>{
     try {
        const res = await axiosInstance.post(`/admin/students/${userId}`,data)
        toast.success("Students Added")
     } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
     }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudents(userId, formData);
  };
  return (
    <div>
      <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Add Student</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start">
        <div className="mt-8">
          <label>
            <span className="text-xl text-gray-700">Admission No</span>
          </label>
          <input
            value={formData.admissionNo}
            onChange={(e) =>
              setFormData({ ...formData, admissionNo: e.target.value })
            }
            className="ml-6 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="text"
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Select Department</span>
          </label>
          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="ml-8 text-md text-gray-950"
          >
            <option value="">--Select--</option>
            <option value="HNDIT">HNDIT</option>
            <option value="HNDE">HNDE</option>
            <option value="HNDA">HNDA</option>
          </select>
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Select Batch</span>
          </label>
          <select
            value={formData.batch}
            onChange={(e) =>
              setFormData({ ...formData, batch: e.target.value })
            }
            className="ml-20 text-md text-gray-950"
            name="batch"
          >
            <option value="">--Select--</option>
            <option value="FirstYear">FirstYear</option>
            <option value="SecondYear">SecondYear</option>
            <option value="ThirdYear">ThirdYear</option>
            <option value="FourthYear">FourthYear</option>
          </select>
        </div>
        <div className="mt-6">
          <button
            className="text-lg p-2 text-gray-50 bg-gray-700 rounded-md"
            type="submit"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
