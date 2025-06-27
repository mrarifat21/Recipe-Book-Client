import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Mainlayout = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <header className="sticky top-0 z-100">
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Mainlayout;
