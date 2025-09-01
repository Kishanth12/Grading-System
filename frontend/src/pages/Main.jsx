import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Main = ({ authUser, setAuthUser }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar on left */}
      <div className="w-1/5 min-h-screen">
        <SideBar role={authUser.role} />
      </div>

      {/* Right side: Navbar on top + main content below */}
      <div className="w-4/5 flex flex-col">
        {/* Navbar */}
        {authUser ? (
          <div>
            <NavBar
              authUser={authUser}
              setAuthUser={setAuthUser}
              role={authUser.role}
            />
          </div>
        ) : (
          ""
        )}
        {/* Main content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
