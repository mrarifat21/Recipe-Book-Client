import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const Mainlayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <ToastContainer />
            <header>
             <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>

            <footer >
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Mainlayout;