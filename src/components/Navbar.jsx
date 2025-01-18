import React, { useEffect, useRef, useState } from "react";
import { use } from "react";
import {
  RiNotification3Line,
  RiSettings4Line,
  RiArrowDownSLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import UserImage from "../assets/790e98129931897251abd3915a931233.jpeg";

const Navbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const UserMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UserMenuRef.current && !UserMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#003366] shadow-sm rounded-br-[16px] rounded-bl-[16px] lg:rounded-bl-[0px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <RiMenu3Line className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <RiSettings4Line className="h-6 w-6" />
            </button>
            <button className="ml-3 p-2 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <RiNotification3Line className="h-6 w-6" />
            </button>
            <div className="ml-3 relative" ref={UserMenuRef}>
              <div>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={UserImage}
                    alt="User avatar"
                  />
                  <RiArrowDownSLine className="ml-1 h-5 w-5 text-gray-400" />
                </button>
              </div>
              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
