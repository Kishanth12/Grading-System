import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import AddStudent from "./pages/Admin/AddStudent";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AddUser from "./pages/Admin/AddUser";
import AddLecturer from "./pages/Admin/AddLecturer";
import AddSubject from "./pages/Admin/AddSubject";
import Lecturer from "./pages/Admin/Lecturer";
import LecturerInfo from "./pages/Admin/LecturerInfo";
import Students from "./pages/Admin/Students";
import Subjects from "./pages/Admin/Subjects";
import StudentInfo from "./pages/Admin/StudentInfo";
import AddGrade from "./pages/Lecturer/AddGrade";
import { axiosInstance } from "./lib/axios";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      if (res.data.success) {
        setAuthUser(res.data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen">
      <NavBar
        authUser={authUser}
        setAuthUser={setAuthUser}
        role={authUser?.role}
      />
      <hr />
      <Routes>
        <Route
          path="/lecturerInfo/:id"
          element={
            authUser?.role === "admin" ? (
              <LecturerInfo />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/studentInfo/:id"
          element={
            authUser?.role === "admin" ? (
              <StudentInfo />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/addGrade/:id"
          element={
            authUser?.role === "lecturer" ? (
              <AddGrade />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !authUser ? (
              <Login setAuthUser={setAuthUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/*"
          element={
            authUser ? (
              <div className="flex w-full">
                <SideBar role={authUser?.role} />
                <div className="w-[75%] mx-auto ml-10 text-gray-800 text-base">
                  <Routes>
                    <Route
                      path="/adminHome"
                      element={
                        authUser ? <AdminHome /> : <Navigate to="/login" />
                      }
                    />
                    <Route
                      path="/addStudent/:userId"
                      element={
                        authUser?.role === "admin" ? (
                          <AddStudent />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/registerUser"
                      element={
                        authUser?.role === "admin" ? (
                          <AddUser />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/addLecturer/:userId"
                      element={
                        authUser?.role === "admin" ? (
                          <AddLecturer />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/lecturers"
                      element={
                        authUser?.role === "admin" ? (
                          <Lecturer />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/students"
                      element={
                        authUser?.role === "admin" ? (
                          <Students />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/subjects"
                      element={
                        authUser?.role === "admin" ? (
                          <Subjects />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/addSubject"
                      element={
                        authUser?.role === "admin" ? (
                          <AddSubject />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                   
                  </Routes>
                </div>
              </div>
            ) : (
              <ErrorPage />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
