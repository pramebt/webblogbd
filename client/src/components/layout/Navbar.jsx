import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleClick = () => setIsOpen((o) => !o);

  // ฟังก์ชันช่วยสร้างคลาส active
  const linkClass = (path) =>
    `px-3 py-1 rounded-4xl transition ${
      location.pathname === path
        ? "bg-[#eaaa3c] text-white"
        : "hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white/50 backdrop-blur flex justify-between items-center fixed px-5 md:px-20 w-full h-20 z-10">
      <NavLink to="/" className="font-bold text-xl">BLOD</NavLink>

      {/* Desktop */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <NavLink to="/" className={linkClass("/")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs" className={linkClass("/blogs")}>
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={linkClass("/about")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/project" className={linkClass("/project")}>
            Project
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={linkClass("/contact")}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu overlay */}
      <div
        className={`absolute top-20  right-0 bg-white text-black shadow-lg rounded-lg p-5 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <ul className="space-y-4">
          <li>
            <NavLink to="/" className={linkClass("/")} onClick={handleClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className={linkClass("/blogs")} onClick={handleClick}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass("/about")} onClick={handleClick}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass("/contact")} onClick={handleClick}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Hamburger */}
      <button onClick={handleClick} className="md:hidden flex flex-col items-center">
        <span
          className={`bg-black block h-0.5 w-5 rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        />
        <span
          className={`bg-black block h-0.5 w-5 rounded-sm my-0.5 transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-black block h-0.5 w-5 rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        />
      </button>
    </nav>
  );
};

export default Navbar;
