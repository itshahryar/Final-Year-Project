// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function Header() {
//   // Local state for currentUser and searchTerm
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   // Handle form submission for search
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     // navigate(/search?${searchQuery});
//   };

//   // Load current user from localStorage or other source on component mount
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('currentUser')); // Example of getting current user from localStorage
//     if (user) {
//       setCurrentUser(user);
//     }

//     // Sync search term with URL params
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   return (
//     <header className='bg-slate-100 shadow-md mb-10'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//         <Link to='/home'>
//           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//           <span className='text-slate-500'>SafeSite</span>
//           <span className='text-slate-700'>Plus+</span>
//           </h1>
//         </Link>
//         <form
//           onSubmit={handleSubmit}
//           className='bg-slate-200 p-3 rounded-lg flex items-center'
//         >
//           <input
//             type='text'
//             placeholder='Search...'
//             className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-800'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button>
//             <FaSearch />
//           </button>
//         </form>
//         <ul className='flex gap-4'>
//           <Link to='/home'>
//             <li className='hidden sm:inline text-gray-700 hover:text-yellow-400'>
//               Home
//             </li>
//           </Link>
//           <Link to='/about'>
//             <li className='hidden sm:inline text-gray-700 hover:text-yellow-400'>
//               About
//             </li>
//           </Link>
//           <Link to='/profile'>
//             {currentUser ? (
//               <img
//                 className='rounded-full h-7 w-7 object-cover'
//                 src={currentUser.avatar}
//                 alt='profile'
//               />
//             ) : (
//               <li className='text-gray-700 hover:text-yellow-400'>Sign in</li>
//             )}
//           </Link>
//         </ul>
//       </div>
//     </header>
//   );
// }
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotificationModal from './NotificationModal';  // Import the NotificationModal component

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
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

  // Load current user and notifications based on role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
      fetchNotifications(user.role);
    } else {
      // Default to admin notifications if no user is found
      fetchNotifications('admin');
    }
  }, [location.search]);

  // Fetch notifications based on user role (Admin or Supervisor)
  const fetchNotifications = (role) => {
    let allNotifications = [];
    if (role === 'admin') {
      allNotifications = [
        { id: 1, heading: 'Admin Notification 1', description: 'Details of Admin notification 1', time: new Date() - 5000 }, // 5 seconds ago
        { id: 2, heading: 'Admin Notification 2', description: 'Details of Admin notification 2', time: new Date() - 120000 }, // 2 minutes ago
        { id: 3, heading: 'Admin Notification 3', description: 'Details of Admin notification 3', time: new Date() - 7200000 }, // 2 hours ago
        { id: 4, heading: 'Admin Notification 4', description: 'Details of Admin notification 4', time: new Date() - 172800000 }, // 2 days ago
      ];
    } else if (role === 'supervisor') {
      allNotifications = [
        { id: 1, heading: 'Supervisor Notification 1', description: 'Details of Supervisor notification 1', time: new Date() - 10000 },
        { id: 2, heading: 'Supervisor Notification 2', description: 'Details of Supervisor notification 2', time: new Date() - 300000 },
        { id: 3, heading: 'Supervisor Notification 3', description: 'Details of Supervisor notification 3', time: new Date() - 3600000 },
        { id: 4, heading: 'Supervisor Notification 4', description: 'Details of Supervisor notification 4', time: new Date() - 86400000 },
      ];
    }
    // Limit to the 3 most recent notifications
    setNotifications(allNotifications.slice(-3));
  };

  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/home">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">SafeSite</span>
            <span className="text-slate-700">Plus+</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-200 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/home">
            <li className="hidden sm:inline text-gray-700 hover:text-yellow-400">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-gray-700 hover:text-yellow-400">About</li>
          </Link>
          <Link to="/login/supervisor">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="text-gray-700 hover:text-yellow-400">Sign in</li>
            )}
          </Link>

          {/* Render NotificationModal component */}
          <NotificationModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            notifications={notifications}
          />
        </ul>
      </div>
    </header>
  );
}

