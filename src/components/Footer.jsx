import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../assets/Growthlylogo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text mb-4">
            <Link to='/'>
              <img src={Logo} alt = '' className='h-20'></img>
              </Link>
            </div>
            <p className="text-gray-400 max-w-xs">
              Transforming ideas into digital excellence. Your partner in web development, marketing, and digital growth.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/indranil.maiti.564/" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/Nil_phy_dreamer" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/indra_d_cogniz_clicker/" className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/indranil-maiti-7542941b7/" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Career</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Digital Marketing</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">SEO Optimization</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Content Creation</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Social Media</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:devdoots.dev@gmail.com" className="hover:text-blue-400 transition-colors">
                devdoots.dev@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +91 7384178159 <br />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400" />
                <span>Kolkata, West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Growthly. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;