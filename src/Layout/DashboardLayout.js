import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import UseAdmin from "../Hooks/UseAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = UseAdmin(user?.email);

  return (
    <div>
      <Navbar> </Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content  ">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to={"/dashboard"}>My Appointment </Link>
            </li>
            <li>{isAdmin && <Link to="/dashboard/admin/"> Admin </Link>}</li>
            <li>
              {isAdmin && <Link to="/dashboard/doctor/"> Add Doctors </Link>}
            </li>
            <li>
              {isAdmin && (
                <Link to="/dashboard/manageDoctor/"> Manage Doctors </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
