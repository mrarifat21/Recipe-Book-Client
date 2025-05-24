import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allrecipes">All Recipes</NavLink>
      </li>
      <li>
        <NavLink to="/addrecipe">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/myrecipes">My Recipes</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 ">
      <div className="navbar bg-base-100  px-4 md:px-6 lg:px-10 w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className=" items-center text-xl font-bold text-primary flex">
            <img src="https://i.ibb.co.com/tk0SJqp/logo.png" alt="logo" className="w-15 h-15" />
            <h2 className="hidden md:block">TastLog</h2>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer avatar">
                <div className="w-10 rounded-full border border-primary">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User Profile" />
                  ) : (
                    <div className="bg-neutral text-neutral-content flex items-center justify-center h-full">
                      N/A
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="text-center font-medium text-base-content">
                  {user.displayName}
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-left font-semibold hover:text-error"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/registration" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-xl"
          >
            {theme === "dark" ? (
              <IoSunnySharp size={22} />
            ) : (
              <MdDarkMode size={22} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
