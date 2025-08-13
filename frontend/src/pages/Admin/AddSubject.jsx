import { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useParams } from "react-router-dom";

const AddSubject = () => {
  const [formData, setFormData] = useState({
    subCode: "",
    name: "",
    credit: "",
    department:'',
    semester:'',
  });

  const { addSubject } = useAdminStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSubject(formData);
  };
  return (
    <div>
      <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Add Subjects</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">subCode</span>
          </label>
          <input
            value={formData.subCode}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, subCode: e.target.value })
            }
            className="ml-6 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
          
          />
        </div>
         <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">name</span>
          </label>
          <input
            value={formData.name}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="ml-6 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
          
          />
        </div>
         <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">credit</span>
          </label>
          <input
            value={formData.credit}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, credit: e.target.value })
            }
            className="ml-6 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
          
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
          <label>
            <span className="text-xl text-gray-700">Select Semester</span>
          </label>
          <select
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
            className="ml-14 text-md text-gray-950"
            name="batch"
          >
            <option value="">--Select--</option>
            <option value="FirstYear">First Semester</option>
            <option value="SecondYear">Second Semester</option>
            <option value="ThirdYear">Third Semester</option>
            <option value="FourthYear">Fourth Semester</option>
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

export default AddSubject;
