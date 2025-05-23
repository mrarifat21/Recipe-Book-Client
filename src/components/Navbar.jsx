import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  // const navigate =useNavigate();

  const handleLogOut = () => {
    // console.log("logout clicked");
    logOut()
      .then(() => {
        // navigate('/')
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="allrecipes">All Recipes</NavLink>
      </li>
      <li>
        <NavLink to="addrecipe">Add Recipe</NavLink>
      </li>

      <li>
        <NavLink to="myrecipes">My Recipes</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">TastLog</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-5">
        {/* <Link to="login">Login</Link>
        <Link to="registration">Registration</Link> */}
        {/* ============ */}
        <div>
          <div className="navbar-end gap-5">
            {user ? (
              <>
                {/* <button onClick={handleLogOut}>LogOut</button> */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer avatar">
                    <div className="w-12 rounded-full">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" />
                      ) : (
                        <p>N/A</p>
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-max"
                  >
                    <li className="text-center text-lg font-semibold">
                      {user.displayName}
                    </li>

                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-lg font-semibold hover:text-red-500"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="login">Login</Link>
                <Link to="registration">Registration</Link>
              </>
            )}
          </div>
        </div>
        {/* ============= */}

        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          {/* Sun icon */}
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 10-1.41-1.41zM4 11H3a1 1 0 000 2h1a1 1 0 000-2zm9-7a1 1 0 011-1V3a1 1 0 10-2 0v1a1 1 0 011 1zm-7.05-.64a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41zM17 5.64a1 1 0 001.41-1.41l-.71-.71a1 1 0 00-1.41 1.41l.71.71zM21 11h-1a1 1 0 100 2h1a1 1 0 100-2zm-9 8a1 1 0 01-1 1v1a1 1 0 102 0v-1a1 1 0 01-1-1zm6.36-1.36a1 1 0 00-1.41 0l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 000-1.41zM12 6.5A5.5 5.5 0 1017.5 12 5.51 5.51 0 0012 6.5z" />
          </svg>
          {/* Moon icon */}
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
