import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo2.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center ml-5 gap-3 text-white duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center ml-5 px-1 gap-3  p-0.7 font-extrabold text-white transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-gray-700 text-white h-full overflow-y-scroll min-w-110 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-50 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="hover:scale-105 w-19 h-10" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <AiFillHome />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-black font-bold border-2 rounded-full mx-5 bg-gray-400 2xl:text-xl">Discover Categories :</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} alt="cate-img" className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-9 mb-5 hover:scale-105 text-white gap-2 p-2 items-center bg-sky-900 rounded-full shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-7 h-7 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
      </div>
  );
};

export default Sidebar;