import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  // Local state for currentUser and searchTerm
  const [currentUser, setCurrentUser] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handle form submission for search
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    // navigate(/search?${searchQuery});
  };

  // Load current user from localStorage or other source on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')); // Example of getting current user from localStorage
    if (user) {
      setCurrentUser(user);
    }

    // Sync search term with URL params
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-100 shadow-md mb-10'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/home'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>SafeSite</span>
          <span className='text-slate-700'>Plus+</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-200 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-800'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/home'>
            <li className='hidden sm:inline text-gray-700 hover:text-yellow-400'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-gray-700 hover:text-yellow-400'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-gray-700 hover:text-yellow-400'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}