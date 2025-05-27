import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const location = useLocation();

  const handleClick = () => setIsOpen((prev) => !prev);

  const linkClass = (path) =>
    `px-3 py-1 rounded-xl font-medium transition duration-300 ${
      location.pathname === path
        ? "bg-[linear-gradient(to_right,_#000409,_#3E6CB2)] text-white shadow-md"
        : "hover:bg-white/10 hover:text-[#eaaa3c] text-white"
    }`;

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        onClick={handleClick}
        className="fixed top-4 left-4 z-50 md:hidden flex flex-col items-center justify-center"
      >
        <span
          className={`bg-black block h-0.5 w-6 rounded transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`bg-black block h-0.5 w-6 my-1 rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-black block h-0.5 w-6 rounded transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-4 w-[50%] bg-gradient-to-br from-[#001B3D] to-[#3E6CB2] text-white shadow-xl rounded-2xl p-5 md:hidden transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-120"
        }`}
      >
        <ul className="space-y-4 text-sm">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              onClick={handleClick}
              className="block w-full px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Home
            </NavLink>
          </li>

          {/* Blog */}
          <li>
            <button
              onClick={() => setOpenBlog((v) => !v)}
              className="flex justify-between items-center w-full px-4 py-2 font-semibold hover:text-[#eaaa3c] transition"
            >
              <span>Blog</span>
              <span>{openBlog}</span>
            </button>
            <div
              className={`ml-4 mt-2 flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${
                openBlog ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <NavLink
                to="/dashboard/blog"
                onClick={handleClick}
                className="px-4 py-1 rounded hover:bg-white/10 transition"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/blog/manage"
                onClick={handleClick}
                className="px-4 py-1 rounded hover:bg-white/10 transition"
              >
                Manage
              </NavLink>
              <NavLink
                to="/dashboard/blog/post"
                onClick={handleClick}
                className="px-4 py-1 rounded hover:bg-white/10 transition"
              >
                Post
              </NavLink>
            </div>
          </li>

          {/* Project */}
          <li>
            <button
              onClick={() => setOpenProject((v) => !v)}
              className="flex justify-between items-center w-full px-4 py-2 font-semibold hover:text-[#eaaa3c] transition"
            >
              <span>Project</span>
              <span>{openProject}</span>
            </button>
            <div
              className={`ml-4 mt-2 flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${
                openProject ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <NavLink
                to="/dashboard/project/manage"
                onClick={handleClick}
                className="px-4 py-1 rounded hover:bg-white/10 transition"
              >
                Manage
              </NavLink>
              <NavLink
                to="/dashboard/project/post"
                onClick={handleClick}
                className="px-4 py-1 rounded hover:bg-white/10 transition"
              >
                Post
              </NavLink>
            </div>
          </li>
        </ul>
      </div>

      {/* Sidebar desktop */}
      <nav className="hidden md:flex bg-gradient-to-br from-[#001B3D] to-[#006FFF]/80 text-white w-64 min-h-screen ml-10 rounded-[30px] shadow-2xl">
        <div className="px-6 w-full h-full flex flex-col items-start justify-start py-10 space-y-6">
          {/* Logo */}
          <div className="w-full flex justify-center items-center mb-8">
            <NavLink to="/" className="flex justify-center items-center">
              <img
                src="/assets/images/logobd.svg"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
            </NavLink>
          </div>

          {/* Blog Menu */}
          <div className="w-full">
            <button
              onClick={() => setOpenBlog((v) => !v)}
              className="w-full flex items-center justify-between text-left text-white font-semibold hover:text-[#eaaa3c] transition"
            >
              <span>Blog</span>
              <span
                className={`transition-transform duration-300 ${
                  openBlog ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openBlog ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <div className="ml-4 flex flex-col space-y-2">
                <NavLink to="/dashboard/blog" className={linkClass("/dashboard/blog")}>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/blog/manage"
                  className={linkClass("/dashboard/blog/manage")}
                >
                  Manage
                </NavLink>
                <NavLink
                  to="/dashboard/blog/post"
                  className={linkClass("/dashboard/blog/post")}
                >
                  Post
                </NavLink>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-b border-white/30"></div>

          {/* Project Menu */}
          <div className="w-full">
            <button
              onClick={() => setOpenProject((v) => !v)}
              className="w-full flex items-center justify-between text-left text-white font-semibold hover:text-[#eaaa3c] transition"
            >
              <span>Project</span>
              <span
                className={`transition-transform duration-300 ${
                  openProject ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openProject ? "max-h-32 mt-2" : "max-h-0"
              }`}
            >
              <div className="ml-4 flex flex-col space-y-2">
                <NavLink
                  to="/dashboard/project/manage"
                  className={linkClass("/dashboard/project/manage")}
                >
                  Manage
                </NavLink>
                <NavLink
                  to="/dashboard/project/post"
                  className={linkClass("/dashboard/project/post")}
                >
                  Post
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;
