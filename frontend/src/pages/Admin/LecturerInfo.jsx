import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { Mail, Phone, MapPinHouse } from "lucide-react";
import toast from "react-hot-toast";

const LecturerInfo = () => {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);

  const lecturerInfo = async (lecturerId) => {
    try {
      const res = await axiosInstance.get(`/admin/lecturerInfo/${lecturerId}`);
      setLecturer(res.data.lecturer);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    lecturerInfo(id);
  }, []);

  if (!lecturer) {
    return <p>loading</p>;
  }
  return (
    <div className="h-[calc(100vh-140px)]  mx-auto  bg-white shadow-lg rounded-2xl mt-1">
      <div className="flex">
        <div className="w-[25%] h-full flex-col justify-end items-center mt-4  ">
          <div className="rounded-xl flex justify-center items-center border-2 w-[300px] aspect-square border-gray-400">
            <img
              src={lecturer.userId.profilePic}
              alt=""
              className="rounded-xl w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-lg flex flex-col mt-6">
            <Link to={`/editLecturer/${lecturer._id}`}>
              <button className="p-2 bg-green-600 font-semibold rounded-md hover:bg-green-700 w-[300px] transition-all duration-200 text-white ">
                Edit Lecturer
              </button>
            </Link>
            <button className="p-2 mt-2 bg-red-600 font-semibold rounded-md hover:bg-red-700 hover:text-gray-100 transition-all duration-200 w-[300px] text-white">
              Delete Lecturer
            </button>
          </div>
        </div>
        <div className="w-[50%] h-[50%] ml-4">
          <div>
            <div className="text-center mt-4">
              <h1 className="text-gray-950 text-2xl font-bold">
                Lecturer Details
              </h1>
            </div>
            <div className="mt-6">
              <label>
                <span className="text-lg">Lecturer Id</span>
              </label>
              <input
                value={lecturer.lecturerId}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-12"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Lecturer Name</span>
              </label>
              <input
                value={lecturer.userId.fullName}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-4"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Department</span>
              </label>
              <input
                value={lecturer.department}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-10"
                readOnly
              />
            </div>
            <div className="mt-4">
              <label>
                <span className="text-lg">Date Joined</span>
              </label>
              <input
                value={new Date(lecturer.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                type="text"
                className="w-60 border-2 border-gray-400 rounded-md p-1 ml-10"
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-center mt-4">
              <h1 className="text-gray-950 text-xl font-bold">
                Assigned Subjects
              </h1>
            </div>
            <div className="mt-2 ml-4">
              {lecturer.assignedSubjects &&
              lecturer.assignedSubjects.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {lecturer.assignedSubjects.map((subject) => (
                    <li key={subject._id} className="text-gray-700">
                      <span className="font-semibold pr-2">Code:</span>{" "}
                      {subject.subCode} <br />
                      <span className="font-semibold pl-5 pr-2">Name:</span>{" "}
                      {subject.name} <br />
                      <span className="font-semibold pl-5 pr-2">Department:</span>{" "}
                      {subject.department}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No subjects assigned</p>
              )}
            </div>
          </div>
        </div>
        <div className=" w-[25%] h-[60%]">
          <div className="mt-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Contact Information</h1>
            </div>
            <div className="flex flex-col ml-2 mt-4">
              <div className="flex">
                <Mail className="text-gray-600" />
                <p className="pl-2">{lecturer.userId.email}</p>
              </div>
              <div className="mt-4 flex">
                <Phone className="text-gray-600" />
                <p className="pl-2">{lecturer.userId.phoneNo}</p>
              </div>
              <div className="mt-4 flex">
                <MapPinHouse className="text-gray-600" />
                <p className="pl-2">{lecturer.userId.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center text-xl font-bold">
              <h1>Statistics</h1>
            </div>
            <div className="flex flex-row justify-between items-center mt-2 font-semibold">
              <div className="ml-6">
                <h1>Students Taught</h1>
              </div>
              <div className="mr-10">
                <h1>Total Batch</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerInfo;
