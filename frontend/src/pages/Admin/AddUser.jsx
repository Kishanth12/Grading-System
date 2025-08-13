import { useRef, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [profilePicFile, setProfilePicFile] = useState(null);

  const { addUsers } = useAdminStore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (profilePicFile) {
      data.append("profilePic", profilePicFile);
    }

    const newUser = await addUsers(data);
    if (newUser?._id) {
      if (formData.role === "student") {
        Navigate(`/addStudent/${newUser._id}`);
      } else if (formData.role === "lecturer") {
        Navigate(`/addLecturer/${newUser._id}`);
      } else if (formData.role === "admin") {
        toast.success("Admin user registered successfully");
      }

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
      });
      setProfilePicFile(null);
    }
  };

  return (
    <div>
      <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Register User</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <label>
            <span className="text-xl text-gray-700">UserName</span>
          </label>
          <input
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className=" ml-5 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="text"
            name="name"
          />
        </div>
        <div className="mt-10">
          <label>
            <span className="text-xl text-gray-700">Email</span>
          </label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="ml-20 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="text"
            name="email"
            required
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Password</span>
          </label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="ml-[2.75rem] w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="password"
            name="password"
            required
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Profile Pic</span>
          </label>
          <input
            onChange={handleImageUpload}
            className="ml-10"
            accept="image/*"
            required
            type="file"
            name="profile"
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Select Role</span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="ml-6 text-md text-gray-950 p-1 bg-gray-400"
          >
            <option value="">--SelectRole--</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>
        </div>
        <div className="mt-6">
          <button
            className="text-lg p-2 text-gray-50 bg-gray-700 rounded-md"
            type="submit"
          >
            Register User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
