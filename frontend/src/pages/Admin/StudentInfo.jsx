import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { Mail, Phone, MapPinHouse } from "lucide-react";


const StudentInfo = () => {

    const { id } = useParams();
  const [ student,setStudent] = useState(null);

  const studentInfo = async(studentId)=>{
    try {
      const res = await axiosInstance.get(`/admin/studentInfo/${studentId}`)
      setStudent(res.data.student)
    } catch (error) {
       toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(()=>{
     studentInfo(id)
  },[])



  if (!student) {
    return <p>loading</p>;
  }
  return (
 <div className="h-[calc(100vh-100px)] w-10/12 mx-auto  bg-white shadow-lg rounded-2xl mt-2">
      <div className="flex">
        <div className="w-[25%] h-full flex-col justify-end items-center mt-4  ">
          <div className="rounded-xl flex justify-center items-center border-2 w-[300px] aspect-square border-gray-400">
            <img
              src={student.userId.profilePic}
              alt=""
              className="rounded-xl w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-lg flex flex-col mt-6">
            <button className="p-2 bg-green-600 font-semibold rounded-md hover:bg-green-700 w-[300px] transition-all duration-200 text-white ">
              Edit student
            </button>
            <button className="p-2 mt-2 bg-red-600 font-semibold rounded-md hover:bg-red-700 hover:text-gray-100 transition-all duration-200 w-[300px] text-white">
              Delete student
            </button>
          </div>
        </div>
        <div className="w-[50%] h-[50%] ml-4">
          <div>
            <div className="text-center mt-4">
              <h1 className="text-gray-950 text-2xl font-bold">
                Student Details
              </h1>
            </div>
            <div className="mt-6">
              <label>
                <span className="text-lg">Admission No</span>
              </label>
              <input
                value={student.admissionNo}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-4"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Student Name</span>
              </label>
              <input
                value={student.userId.fullName}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-3"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Department</span>
              </label>
              <input
                value={student.department}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-8"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Date Joined</span>
              </label>
              <input
                value={new Date(student.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-8"
                readOnly
              />
            </div>
          </div>
          {/* <div className="w-full">
            <div className="text-center mt-4">
              <h1 className="text-gray-950 text-xl font-bold">
                Assigned Subjects
              </h1>
            </div>
            <div className="mt-2">
              <table className="divide-y divide-gray-100 rounded-lg shadow-md w-[95%] m overflow-y-auto">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">Sub Code</th>
                    <th className="px-6 py-3 text-left">Subject Name</th>
                    <th className="px-6 py-3 text-left">batch</th>
                    <th className="px-6 py-3 text-left">Semester</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className=" px-6 py-3"></td>
                    <td className=" px-6 py-3"></td>
                    <td className=" px-6 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
        <div className=" w-[25%] h-[60%]">
          <div className="mt-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Contact Information</h1>
            </div>
            <div className="flex flex-col ml-2 mt-6">
              <div className="flex">
                <Mail className="text-gray-600" />
                <p className="pl-2">{student.userId.email}</p>
              </div>
              <div className="mt-4 flex">
                <Phone className="text-gray-600" />
                <p className="pl-2">{student.userId.phoneNo}</p>
              </div>
              <div className="mt-4 flex">
                <MapPinHouse className="text-gray-600" />
                <p className="pl-2">{student.userId.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default StudentInfo