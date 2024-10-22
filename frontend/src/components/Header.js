import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-white to-slate-300 py-10 shadow-md fixed top-0 w-full z-50 h-1/5 rounded-lg">
      <nav className="container mx-auto flex justify-around items-center">
        <Link to="/" className="text-black text-3xl font-bold">
          Blog App
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-black hover:text-slate-800 text-2xl">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/create" className="text-black hover:text-slate-800 text-2xl">
                  Create Post
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-slate-800 text-2xl"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-black hover:text-slate-800 text-2xl">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-black hover:text-slate-800 text-2xl">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
