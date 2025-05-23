import React from "react";
import { Link } from "react-router"; 
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="bg-neutral text-neutral-content p-5">
      <div className="footer sm:footer-horizontal ">
          <aside>
          <h6 className="footer-title">TastLog</h6> {/* Added footer-title for branding */}
          <p>
            Turn Your Recipes Into a Global Feast
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to='https://www.facebook.com/' target="_blank" ><FaFacebook size={25} /></Link>
            <Link to='https://www.youtube.com/' target="_blank" ><FaYoutube size={25}/></Link> {/* Corrected YouTube URL */}
            <Link to='https://x.com/' target="_blank" ><FaXTwitter size={25} /></Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Phone: +123 456 7890</a>
          <a className="link link-hover">Email: info@testlog.com</a>
          <a className="link link-hover">Address: 123 Recipe Lane, Food City, FC 12345</a>
        </nav>
      </div>
        <div className="text-center mt-10">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Taselog
          </p>
        </div>
      </footer>
      
    </div>
  );
};

export default Footer;
