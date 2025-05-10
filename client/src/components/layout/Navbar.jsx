import React,{useState} from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border border-gray-400 bg-white flex justify-between items-center fixed  px-5 md:px-20  w-full h-20 z-10">
      <a href="/">bdblog</a>
      <ul className="hidden md:flex space-x-10">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blogs">Blogs</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <div
        className={`absolute top-16 right-0 bg-black text-white shadow-lg rounded-lg p-5 md:hidden transition-transform duration-300 ease-in-out 
                ${isOpen ? "translate-x-0" : "translate-x-full"} z-40`}
      >
        <ul className="space-y-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={handleClick}
        className="md:hidden flex flex-col justify-center items-center "
      >
        <span
          className={`bg-black block transition-all duration-300 ease-out 
                        h-0.5 w-5 rounded-sm ${
                          isOpen
                            ? "rotate-45 translate-y-1"
                            : "-translate-y-0.5"
                        }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out 
                        h-0.5 w-5 rounded-sm my-0.5 ${
                          isOpen ? "opacity-0" : "opacity-100"
                        }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out 
                        h-0.5 w-5 rounded-sm ${
                          isOpen
                            ? "-rotate-45 -translate-y-1"
                            : "translate-y-0.5"
                        }`}
        ></span>
      </button>
    </nav>
  );
};

export default Navbar;
