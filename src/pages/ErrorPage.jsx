import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router"; 
const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-6 py-24 text-center dark:bg-gray-950 flex flex-col items-center justify-center">
        <div className="max-w-xl">
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
            ERROR 404
          </p>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Page Not Found
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you’re looking for. It might have been moved or deleted.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              <span>Go Back Home</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
