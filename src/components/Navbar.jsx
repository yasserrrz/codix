import { useState } from 'react';
import { Badge, Menu, MenuItem } from '@mui/material';
import { RiSettings4Line, RiNotification3Line, RiArrowDownSLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

export default function Navbar({ isOpen, toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleNotificationClick = (event) => setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 left-0 right-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
          
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <RiSettings4Line className="h-6 w-6" />
            </button>
            <button 
              onClick={handleNotificationClick}
              className="ml-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <Badge badgeContent={3} color="error">
                <RiNotification3Line className="h-6 w-6" />
              </Badge>
            </button>
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
            >
              <MenuItem onClick={handleNotificationClose}>Notification 1</MenuItem>
              <MenuItem onClick={handleNotificationClose}>Notification 2</MenuItem>
              <MenuItem onClick={handleNotificationClose}>Notification 3</MenuItem>
            </Menu>
            <div className="ml-4 flex items-center">
              <button
                onClick={handleClick}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <img className="h-8 w-8 rounded-full" src="/placeholder-avatar.jpg" alt="User avatar" />
                <RiArrowDownSLine className="ml-1 h-5 w-5 text-gray-400" />
              </button>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
