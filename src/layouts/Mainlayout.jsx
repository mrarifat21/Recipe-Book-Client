import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Mainlayout = () => {
    return (
        <div>
            <header>
             <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>

            <footer>
                
            </footer>
        </div>
    );
};

export default Mainlayout;