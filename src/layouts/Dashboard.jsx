import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/myrecipes", label: "My Recipes" },
    { to: "/dashboard/addrecipe", label: "Add Recipe" },
    { to: "/", label: "Back to Home" },
  ];

  return (
    <>
    <div className="w-11/12 mx-auto bg-black ">

    
    {/* <Navbar></Navbar> */}
      {/* Mobile Top Bar */}
      <div className="bg-base-100 text-base-content flex items-center justify-between p-4 md:hidden border-b border-base-300  ">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="btn btn-square btn-ghost"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="flex  min-h-screen bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-base-100 border-r border-base-300 dark:bg-base-200 dark:border-base-400 p-6 space-y-6 transform
            md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) =>
                  `block rounded-md px-4 py-2 transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content font-semibold"
                      : "hover:bg-primary/20 hover:text-primary"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 bg-base-100 dark:bg-base-200 rounded-lg shadow-md">
          <Outlet />
        </main>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
