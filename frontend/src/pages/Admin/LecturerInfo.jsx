import { useParams } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import { useEffect } from "react";

const LecturerInfo = () => {
  const { id } = useParams();
  const { lecturers,listLecturer} = useAdminStore();

  useEffect(()=>{
     listLecturer()
  },[])

  const lecturer = lecturers.find((l) => l._id === id);

  if (!lecturer) {
    return <p>loading</p>;
  }
  return (
    <div className="h-[calc(100vh-100px)] w-11/12 mx-auto  bg-white shadow-lg rounded-2xl mt-2">
      <div className="flex">
        <div className="w-[25%] h-full flex justify-end items-center mt-4  ">
          <div className="rounded-xl flex justify-center items-center border-2 w-[300px] aspect-square border-gray-400">
            <img
              src={lecturer.userId.profilePic}
              alt=""
              className="rounded-xl w-full h-full  object-cover object-top"
            />
          </div>
        </div>
        <div className="w-[50%]"> 
        <div className="ml-10 border-2">
          <div className="mt-8">
            <label>
              <span className="text-lg">Lecturer Id</span>
            </label>
            <input
              value={lecturer.lecturerId}
              type="text"
              className="w-60 border-2 border-gray-400 rounded-md p-2 ml-12"
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
              className="w-60 border-2 border-gray-400 rounded-md p-2 ml-4"
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
              className="w-60 border-2 border-gray-400 rounded-md p-2 ml-10"
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
              className="w-60 border-2 border-gray-400 rounded-md p-2 ml-10"
              readOnly
            />
          </div>
        </div>
        <div>
          <div><h1>Assigned Subjects</h1></div>
          <div>
            <table>
              <thead>
                <tr>
                <th>Sub Code</th>
                <th>Subject Name</th>
                <th>batch</th>
                <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td></td>
                <td></td>
                <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <div className="mt-6 w-[25%] border-2">
        <div>
          <div>
            <div className="text-center">
              <h1 className="text-2xl">Contact Information</h1>
            </div>
          </div>
          <div className="flex flex-col ml-2 mt-4">
            <div>
              <label>
                <span className="text-lg text-gray-900">Email</span>
              </label>
              <input
                type="text"
                value={lecturer.userId.email}
                className="w-60 border-2 border-gray-400 rounded-md p-2 ml-6"
                readOnly
              />
            </div>
            <div className="mt-2">
              <label>
                <span className="text-lg text-gray-900">Phone No</span>
              </label>
              <input
                type="text"
                value={lecturer.userId.phoneNo}
                className="w-60 border-2 border-gray-400 rounded-md p-2 ml-8"
                readOnly
              />
            </div>
            <div className="mt-2">
              <label>
                <span className="text-lg text-gray-900">Address</span>
              </label>
              <input
                type="text"
                value={lecturer.userId.address}
                className="w-60 border-2 border-gray-400 rounded-md p-2 ml-24"
                readOnly
              />
            </div>
          </div>
        </div>
        <div>
          <div><h1>Statistics</h1></div>
          <div><h1>Students Taught</h1></div>
          <div><h1>Total Batch</h1></div>
        </div>
        </div>
      </div>

      <div className="text-lg ml-20 mt-6">
        <button className="p-2 bg-red-600 font-semibold rounded-md hover:bg-red-700 hover:text-gray-100 text-gray-950">
          Delete Lecturer
        </button>
        <button className="p-2 bg-red-600 font-semibold rounded-md hover:bg-red-700 hover:text-gray-100 text-gray-950">
          Edit Lecturer
        </button>
      </div>
    </div>
  );
};

export default LecturerInfo;
