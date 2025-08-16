import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    phoneNo: "",
    address: "",
  });

  const [profilePicFile, setProfilePicFile] = useState(null);

  const addUsers = async (data) => {
    try {
      const res = await axiosInstance.post("/admin/register", data);
      toast.success("User Added");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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
    data.append("phoneNo", formData.phoneNo);
    data.append("address", formData.address);
    if (profilePicFile) {
      data.append("profilePic", profilePicFile);
    }

    const newUser = await addUsers(data);
    if (newUser?._id) {
      if (formData.role === "student") {
        navigate(`/addStudent/${newUser._id}`);
      } else if (formData.role === "lecturer") {
        navigate(`/addLecturer/${newUser._id}`);
      } else if (formData.role === "admin") {
        toast.success("Admin user registered successfully");
      }

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
        phoneNo: "",
        address: "",
      });
      setProfilePicFile(null);
    }
  };

  return (
    <div>
      <div className="text-3xl font-bold text-gray-700 mt-6">
        <h1>Register User</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start">
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
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Email</span>
          </label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="ml-16 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
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
            className="ml-8 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="password"
            name="password"
            required
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Phone No</span>
          </label>
          <input
            value={formData.phoneNo}
            onChange={(e) =>
              setFormData({ ...formData, phoneNo: e.target.value })
            }
            className="ml-6 w-56 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
            type="tel"
            required
          />
        </div>
        <div className="mt-6">
          <label>
            <span className="text-xl text-gray-700">Address</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="ml-10 w-56 h-10 p-1 border-2 border-gray-500 hover:border-gray-950 rounded-md"
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
            required
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
