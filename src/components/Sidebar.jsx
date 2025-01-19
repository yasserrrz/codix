import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardLine,
  RiTeamLine,
  RiBuilding4Line,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiFileListLine,
  RiBriefcaseLine,
  RiUserSearchLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import LogoImage from "../assets/Frame 1261158013.png";

const menuItems = [
  { icon: RiDashboardLine, text: "Dashboard", path: "/" },
  { icon: RiTeamLine, text: "All Employees", path: "/" },
  { icon: RiBuilding4Line, text: "All Departments", path: "/departments" },
  { icon: RiTimeLine, text: "Attendance", path: "/attendance" },
  { icon: RiMoneyDollarCircleLine, text: "Payroll", path: "/payroll" },
  { icon: RiFileListLine, text: "Leaves", path: "/leaves" },
  { icon: RiBriefcaseLine, text: "Jobs", path: "/jobs" },
  { icon: RiUserSearchLine, text: "Candidates", path: "/candidates" },
  { icon: RiSettings4Line, text: "Settings", path: "/settings" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#003366] overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 mt-5 flex items-center justify-center ">
          <img
            src={LogoImage}
            alt="enGaz"
            className="w-[150px] h-[54px] object-contain"
          />
        </div>

        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-2 py-3 mb-2  text-base font-medium rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-[#FFFFFF33] text-white  rounded-none rounded-tr-lg rounded-br-lg border-l-[3px] border-[#FFFFF] box-sizing-border"
                  : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
              }`}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            >
              <item.icon
                className={`mr-4 flex-shrink-0 h-6 w-6 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full">
          <button className="flex items-center px-4 py-3 text-gray-300 hover:bg-blue-900/30 hover:text-white transition-colors w-full">
            <RiLogoutBoxRLine className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
