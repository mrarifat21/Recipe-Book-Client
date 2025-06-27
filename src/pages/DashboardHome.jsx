import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalItems: 0,
    myItems: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res1 = await fetch(`${import.meta.env.VITE_API_URL}/addrecipes`);
        const all = await res1.json();

        const res2 = await fetch(`${import.meta.env.VITE_API_URL}/myrecipes/${user.email}`);
        const mine = await res2.json();

        const res3 = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const users = await res3.json();

        setStats({
          totalItems: all.length,
          myItems: mine.length,
          totalUsers: users.length,
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    if (user?.email) {
      fetchStats();
    }
  }, [user]);

  return (
    <div className="w-11/12 mx-auto p-6 bg-base-100 dark:bg-base-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-base-content dark:text-base-content">
        📊 Dashboard Overview
      </h2>

      {/* User Info */}
      <div className="mb-8 bg-base-100 dark:bg-base-300 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-base-content dark:text-base-content">
          👤 Logged-in User Info
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-base-300 dark:border-base-400"
          />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-lg font-medium text-base-content dark:text-base-content">
              <strong>Name:</strong> {user?.displayName}
            </p>
            <p className="text-base text-base-content/70 dark:text-base-content/70">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-400">
            Total Items
          </h4>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">
            {stats.totalItems}
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-400">
            My Items
          </h4>
          <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">
            {stats.myItems}
          </p>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2 text-purple-800 dark:text-purple-400">
            Total Users
          </h4>
          <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">
            {stats.totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
