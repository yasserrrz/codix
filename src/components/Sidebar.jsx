import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  RiLogoutBoxRLine
} from 'react-icons/ri';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { icon: RiDashboardLine, text: 'Dashboard', path: '/' },
    { icon: RiTeamLine, text: 'All Employees', path: '/employees' },
    { icon: RiBuilding4Line, text: 'All Departments', path: '/departments' },
    { icon: RiTimeLine, text: 'Attendance', path: '/attendance' },
    { icon: RiMoneyDollarCircleLine, text: 'Payroll', path: '/payroll' },
    { icon: RiFileListLine, text: 'Leaves', path: '/leaves' },
    { icon: RiBriefcaseLine, text: 'Jobs', path: '/jobs' },
    { icon: RiUserSearchLine, text: 'Candidates', path: '/candidates' },
    { icon: RiSettings4Line, text: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-[#003366] text-gray-300
        transform transition-transform duration-300 ease-in-out z-40
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-blue-900">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3T3F7uercWMAQUzWaIQgMHniRVpndr.png" alt="enGaz" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleSidebar}
              className={`
                flex items-center px-6 py-2.5 text-sm
                hover:bg-blue-900/50 transition-colors
                ${location.pathname === item.path ? 'bg-blue-900/50 text-white' : ''}
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-6">
          <button className="flex items-center text-sm text-gray-300 hover:text-white">
            <RiLogoutBoxRLine className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
