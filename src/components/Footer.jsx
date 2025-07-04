import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-15  ">
      <div className="footer flex flex-col md:flex-row flex-wrap justify-between gap-8 w-11/12 mx-auto">
        <aside>
          <Link
            to="/"
            className=" items-center text-2xl font-bold text-primary flex"
          >
            <img
              src="https://i.ibb.co.com/tk0SJqp/logo.png"
              alt="logo"
              className="w-15 h-15"
            />
            <h2 className="hidden md:block">TastLog</h2>
          </Link>
          <p className="max-w-xs">
            Turn Your Recipes Into a Global Feast. Share, explore, and savor
            delicious creations.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                size={24}
                className="hover:text-blue-500 transition-colors"
              />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube
                size={24}
                className="hover:text-red-500 transition-colors"
              />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <FaXTwitter
                size={24}
                className="hover:text-white transition-colors"
              />
            </a>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to='/about' className="link link-hover">About us</Link>
          <Link to='/contact' className="link link-hover">Contact</Link>
          <Link to='/allrecipes' className="link link-hover">All Recipes</Link>
          
        </nav>

        <nav>
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Phone: +123 456 7890</a>
          <a className="link link-hover">Email: info@tastlog.com</a>
          <a className="link link-hover">
            123 Recipe Lane, Food City, FC 12345
          </a>
        </nav>
      </div>

      <div className="text-center mt-10 text-lg opacity-80">
        <p>© {new Date().getFullYear()} TastLog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
