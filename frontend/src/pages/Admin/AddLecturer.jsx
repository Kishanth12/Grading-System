import { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useParams } from "react-router-dom";

const AddLecturer = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    lecturerId: "",
    department: "",
  });

  const { addLecturer } = useAdminStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLecturer(userId, formData);
  };

  return (
    <div>
      <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Add Lecturer</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">lecturerId</span>
          </label>
          <input
            value={formData.lecturerId}
            onChange={(e) =>
              setFormData({ ...formData, lecturerId: e.target.value })
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
            className="ml-6 text-md text-gray-950"
            name="department"
          >
            <option value="">--Select--</option>
            <option value="HNDIT">HNDIT</option>
            <option value="HNDE">HNDE</option>
            <option value="HNDA">HNDA</option>
          </select>
        </div>
        <div className="mt-6">
          <button
            className="text-lg p-2 text-gray-50 bg-gray-700 rounded-md"
            type="submit"
          >
            Add Lecturer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLecturer;
