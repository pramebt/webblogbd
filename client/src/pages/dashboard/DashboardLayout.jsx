import React from "react";

import SideNavbar from "../../components/layout/SideNavbar";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <div>
      <div className="flex flex-row py-10">
        <SideNavbar />
        <div className="flex-1 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
