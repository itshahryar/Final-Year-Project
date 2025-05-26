import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

// export default function NotificationModal({ isModalOpen, setIsModalOpen, notifications }) {
const NotificationModal =({isModalOpen,setIsModalOpen,notification})=>{
  // Toggle modal visibility
  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to format the time (e.g., "5 minutes ago", "3 seconds ago")
  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - notificationTime) / 1000); // Difference in seconds

    if (differenceInSeconds < 60) return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''} ago`;
    if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minute${Math.floor(differenceInSeconds / 60) !== 1 ? 's' : ''} ago`;
    if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hour${Math.floor(differenceInSeconds / 3600) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(differenceInSeconds / 86400)} day${Math.floor(differenceInSeconds / 86400) !== 1 ? 's' : ''} ago`;
  };

  return (
    <div>
      {/* Notification Icon */}
      <li>
        <FaBell
          className="text-gray-700 hover:text-yellow-400 cursor-pointer"
          onClick={handleNotificationClick}
        />
      </li>

      {/* Notification Modal */}
      {isModalOpen && (
        <div className="absolute top-16 right-5 bg-white opacity-100 shadow-lg rounded-lg p-4 w-80 max-h-96 overflow-y-auto z-50">
          <ul className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-start">
                    {/* Notification Icon */}
                    <div className="mr-3">
                      <FaBell className="text-yellow-400 text-lg" />
                    </div>

                    {/* Notification Content */}
                    <div>
                      {/* Heading */}
                      <h4 className="text-sm font-semibold text-slate-800">{notification.heading}</h4>

                      {/* Description */}
                      <p className="text-xs text-gray-600">{notification.description}</p>

                      {/* Notification Time */}
                      <p className="text-xs text-gray-400 mt-1">{formatTime(notification.time)}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No notifications</li>
            )}
          </ul>
          <Link to="/notification">
            <button
              onClick={() => setIsModalOpen(false)} // Close modal when "View All" is clicked
              className="w-full max-w-xs mx-auto bg-yellow-400 text-white py-2 mt-4 rounded-md hover:bg-yellow-500 transition-all"
            >
              View All
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotificationModal;