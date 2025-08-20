import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  SquarePlus,
  ListTree,
  UserRoundPlus,
  UserRoundCog ,
  UserRoundCheck,
  BookOpen ,
} from "lucide-react";
import { assets } from "./../assets/assets";
import { NavLink } from "react-router-dom";


const SideBar = ({role}) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  const navClass = ({ isActive }) =>
    `flex pl-7 py-1 ${
      isActive ? "bg-gray-500 rounded-md text-gray-50" : ""
    }`;

  return (
    <div className="w-[20%]  bg-gray-50 flex flex-col h-[calc(100vh-82px)]">
      <div className="flex-1  overflow-y-auto text-xl text-gray-950">
        <div className=" font-semibold flex justify-center items-center p-2 bg-gray-100">
          <LayoutDashboard />
          <h1 className="ml-4">Dashboard</h1>
        </div>
         {role == "admin" && 
        <div className="mt-9 ">
          <div className="flex justify-between  py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <img src={assets.student} className="w-7" alt="students" />
              <h1 className="pl-2">Students</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("student")}>
              {openSection === "student" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          {openSection === "student" && (
            <div className="mt-3 text-lg">
              <NavLink to="/registerUser" className={navClass}>
                <div className=" py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <SquarePlus />
                    Add Students
                  </div>
                </div>
              </NavLink>
              <NavLink to="/students" className={navClass}>
                <div className="mt-1  py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Students List
                  </div>
                </div>
              </NavLink>
            </div>
          )}
        </div>
        }
        {role == "lecturer" &&
         <div className="mt-9 ">
          <div className="flex justify-between  py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <img src={assets.student} className="w-7" alt="students" />
              <h1 className="pl-2">Lecturer Students</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("student")}>
              {openSection === "student" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          {openSection === "student" && (
            <div className="mt-3 text-lg">
              <NavLink to="/students" className={navClass}>
                <div className="mt-1  py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Students List
                  </div>
                </div>
              </NavLink>
            </div>
          )}
        </div>
        }
        {role == "admin" && 
        <div className="mt-9">
          <div className="flex justify-between py-1 mx-1 rounded-md">
            <div className="pl-7 flex justify-center items-center ">
              <img src={assets.lecturer} className="w-[35px]" alt="lecturer" />
              <h1>Lecturer</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("lecturer")}>
              {" "}
              {openSection === "lecturer" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          {openSection === "lecturer" && (
            <div className="mt-3 text-lg">
              <NavLink to="/registerUser" className={navClass}>
                <div className=" py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <SquarePlus />
                    Add Lecturer
                  </div>
                </div>
              </NavLink>
              <NavLink to="/lecturers" className={navClass}>
                <div className="mt-1 py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Lecturer List
                  </div>
                </div>
              </NavLink>
            </div>
          )}
        </div>
        }
        {role == "admin" && 
        <div className="mt-9">
          <div className="flex justify-between items-center py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <BookOpen />
              <h1 className="pl-2">Subjects</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("subject")}>
              {" "}
              {openSection === "subject" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          {openSection === "subject" ? (
            <div className="mt-3 text-lg">
              <NavLink to="/addSubject" className={navClass}>
                <div className=" py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <SquarePlus />
                     Add Subjects
                  </div>
                </div>
              </NavLink>
              <NavLink to="/subjects" className={navClass}>
                <div className="mt-1 py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Subjects Details
                  </div>
                </div>
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
        }
        {role == "admin" && 
        <div className="mt-9">
          <div className="flex justify-between items-center py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <GraduationCap />
              <h1 className="pl-2">Academic Details</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("grade")}>
              {" "}
              {openSection === "grade" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          {openSection === "grade" ? (
            <div className="mt-3 text-lg">
              <NavLink to="/addGrade" className={navClass}>
                <div className=" py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <SquarePlus />
                    Add Grade
                  </div>
                </div>
              </NavLink>
              <NavLink to="/list" className={navClass}>
                <div className="mt-1 py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Student Grades
                  </div>
                </div>
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
        }
        {role == "admin" && 
        <div className="mt-9">
          <div className="flex justify-between items-center py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <UserRoundCog  />
              <h1 className="pl-2">Account Details</h1>
            </div>
            <button className="pr-1" onClick={() => toggleSection("account")}>
              {" "}
              {openSection === "account" ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          {openSection === "account" ? (
            <div className="mt-3 text-lg">
              {/* <NavLink to="/registerUser" className={navClass}>
                <div className=" py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <UserRoundPlus />
                    Register User
                  </div>
                </div>
              </NavLink> */}
              <NavLink to="/admin" className={navClass}>
                <div className="mt-1 py-1 pl-10">
                  <div className="flex items-center gap-2">
                    <ListTree />
                    Manage Accounts
                  </div>
                </div>
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
       }
      </div>
         <div className="p-3 border-t-2 border-gray-500">
          <div className="flex justify-between items-center py-1 mx-1 rounded-md ">
            <div className="pl-8 flex justify-center items-center ">
              <UserRoundCheck  />
              <h1 className="pl-2 font-semibold">Logged in User</h1>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SideBar;
