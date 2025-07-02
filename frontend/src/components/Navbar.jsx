import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);


  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      <img
        onClick={() => navigate('/')}
        className='w-28 sm:w-32 object-contain cursor-pointer flex-shrink-0 px-2'
        src={assets.logo}
        alt='Logo'
      />

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-start gap-3 sm:gap-5 font-medium'>
        <NavLink to='/' className='group'>
          <li className='relative py-1'>
            Home
            <span className='absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-2/5 h-0.5 bg-primary transition-all duration-300'></span>
          </li>
        </NavLink>
        <NavLink to='/doctors' className='group'>
          <li className='relative py-1'>
            All Doctors
            <span className='absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-2/5 h-0.5 bg-primary transition-all duration-300'></span>
          </li>
        </NavLink>
        <NavLink to='/about' className='group'>
          <li className='relative py-1'>
            About
            <span className='absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-2/5 h-0.5 bg-primary transition-all duration-300'></span>
          </li>
        </NavLink>
        <NavLink to='/contact' className='group'>
          <li className='relative py-1'>
            Contact
            <span className='absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-2/5 h-0.5 bg-primary transition-all duration-300'></span>
          </li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='relative group hidden md:flex items-center gap-2 cursor-pointer'>
            <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt='Profile' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/appointment')} className='hover:text-black cursor-pointer'>Appointments</p>
                <p onClick={() => logout()} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* Hamburger Icon for Mobile */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-7 h-7 cursor-pointer md:hidden ml-2'
          src={assets.menu_icon}
          alt='Menu'
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed md:hidden top-0 right-0 w-full min-h-screen z-30 transition-all duration-300 bg-white ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-300'>
          <img className='w-28' src={assets.logo} alt='Logo' />
          <img
            className='w-7'
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt='Close Menu'
          />
        </div>

        <ul className='flex flex-col items-center gap-3 mt-6 px-4 text-lg font-medium'>
          <NavLink onClick={() => setShowMenu(false)} to='/'>
            <p className='px-6 py-3 rounded-lg w-full text-center hover:bg-primary hover:text-white transition'>Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
            <p className='px-6 py-3 rounded-lg w-full text-center hover:bg-primary hover:text-white transition'>All Doctors</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'>
            <p className='px-6 py-3 rounded-lg w-full text-center hover:bg-primary hover:text-white transition'>About</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'>
            <p className='px-6 py-3 rounded-lg w-full text-center hover:bg-primary hover:text-white transition'>Contact</p>
          </NavLink>

          {token ? (
            <>
              <hr className='w-full border-t my-2' />
              <p onClick={() => { navigate('/profile'); setShowMenu(false); }} className='px-6 py-3 w-full text-center hover:bg-primary hover:text-white cursor-pointer'>My Profile</p>
              <p onClick={() => { navigate('/appointment'); setShowMenu(false); }} className='px-6 py-3 w-full text-center hover:bg-primary hover:text-white cursor-pointer'>Appointments</p>
              <p onClick={() => { setToken(false); setShowMenu(false); }} className='px-6 py-3 w-full text-center hover:bg-primary hover:text-white cursor-pointer'>Logout</p>
            </>
          ) : (
            <p onClick={() => { navigate('/login'); setShowMenu(false); }} className='px-6 py-3 w-full text-center hover:bg-primary hover:text-white cursor-pointer'>Sign Up</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
