import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isHomePage = path === "/";
  const isChatPage = path === "/chat";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-8 py-5 transition-colors duration-300 backdrop-blur-md ${
          isHomePage
            ? "text-black bg-white" // Transparent over hero image
            : "text-black bg-white/80 shadow-sm" // White, visible on all other pages including chat
        }`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">EmoCalm</Link>
        </div>

        {/* Centered Menu */}
        <ul className="hidden md:flex space-x-10 text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link
              to="/assessment"
              className={`hover:text-blue-600 transition-colors ${
                isHomePage ? "hover:text-blue-200" : ""
              }`}
            >
              Assessment
            </Link>
          </li>
          <li>
            <Link
              to="/find-therapist"
              className={`hover:text-blue-600 transition-colors ${
                isHomePage ? "hover:text-blue-200" : ""
              }`}
            >
              Find a Practitioner
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={`hover:text-blue-600 transition-colors ${
                isHomePage ? "hover:text-blue-200" : ""
              }`}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`hover:text-blue-600 transition-colors ${
                isHomePage ? "hover:text-blue-200" : ""
              }`}
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Ask Chat Button — Always visible */}
        <Link
          to="/chat"
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            isHomePage
              ? "bg-black/90 text-white hover:bg-white"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          Ask Chat
        </Link>

        {/* Hamburger for mobile */}
        <div
          className={`md:hidden cursor-pointer text-3xl ml-4 ${
            isHomePage ? "text-white" : "text-black"
          }`}
        >
          &#9776;
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;
