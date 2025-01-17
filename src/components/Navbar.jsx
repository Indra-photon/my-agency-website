import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Growthlylogo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              <Link to='/'>
              <img src={Logo} alt = '' className='h-20'></img>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a 
                href="/work" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                Our Work
              </a>
              <a 
                href="/contact-us" 
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`
          md:hidden 
          fixed 
          inset-0 
          top-16 
          bg-black/95 
          backdrop-blur-lg
          transform 
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/work"
            className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300 text-center"
            onClick={() => setIsOpen(false)}
          >
            Our Work
          </a>
          <a
            href="#contact"
            className="block px-3 py-4 text-base font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
              Contact Us
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;