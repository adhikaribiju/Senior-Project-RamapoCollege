import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';


/*
Footer()
NAME
    Footer
SYNOPSIS
    Footer();
DESCRIPTION
    This React component renders a footer section for the website. The footer includes a logo, site description, navigation links, 
    social media icons, and a copyright notice. The layout is responsive, using a flexbox structure to adapt to different screen sizes, 
    with links and icons styled for hover effects to enhance interactivity.
RETURNS
    Returns a responsive footer with site information, navigation links, and social media links.
*/


const Footer = () => {
  return (
    <footer className="bg-grey py-8">
      <div className="container mx-auto px-4">
  <div className="flex flex-col md:flex-row justify-between items-center">
    {/* Logo and Description */}
    <a href="/" className="flex items-center gap-2 text-2xl">
      <img
        src="images/rcnj.png" 
        alt="Logo eventDescription"      
        width="29"
        height="30"
      />
      <div className="flex flex-col items-start">
        <Link to="/" className="text-2xl font-bold text-blue">
          Ramapo Patro
        </Link>
        <p className="text-sm text-gray-600">Bringing your favorite events.</p> 
      </div>
    </a>

    {/* Navigation Links */}
    <div className="flex space-x-4 mb-4 md:mb-0">
      <div className="text-black-400 hover:text-blue hover:cursor-pointer">
        About Us
      </div>
      <div className="text-black-400 hover:text-blue hover:cursor-pointer">
        Events
      </div>
      <div className="text-black-400 hover:text-blue hover:cursor-pointer">
        Contact
      </div>
      <div className="text-black-400 hover:text-blue hover:cursor-pointer">
        Privacy Policy
      </div>
    </div>

    {/* Social Media Icons */}
    <div className="flex space-x-4">
      <a href="https://facebook.com" className="text-blue hover:text-grey">
        <FaFacebookF />
      </a>
      <a href="https://twitter.com" className="text-blue hover:text-grey">
        <FaTwitter />
      </a>
      <a href="https://instagram.com" className="text-blue hover:text-grey">
        <FaInstagram />
      </a>
      <a href="https://linkedin.com" className="text-blue hover:text-grey">
        <FaLinkedinIn />
      </a>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-8 text-center text-blue-500">
    <p>&copy; {new Date().getFullYear()} Ramapo Patro. All rights reserved.</p>
  </div>
</div>
</footer>
  )
};

export default Footer;
