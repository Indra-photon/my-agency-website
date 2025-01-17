import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram, Facebook, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const YOUR_SERVICE_ID = import.meta.env.VITE_YOUR_SERVICE_ID;
const YOUR_TEMPLATE_ID = import.meta.env.VITE_YOUR_TEMPLATE_ID;
const YOUR_PUBLIC_ID = import.meta.env.VITE_YOUR_PUBLIC_ID;

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await emailjs.sendForm(
        YOUR_SERVICE_ID, 
        YOUR_TEMPLATE_ID, 
        form.current, 
        YOUR_PUBLIC_ID
      );
      
      setSuccess(true);
      form.current.reset();
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Failed to send email:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Let's <span className="text-blue-400">Connect</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a href="mailto:devdoots.dev@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                      devdoots.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a href="tel:+917384178159" className="text-white hover:text-blue-400 transition-colors">
                      +91 7384178159
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">
                      Kolkata,<br />West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/indranil-maiti-7542941b7/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://x.com/Nil_phy_dreamer" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="https://www.instagram.com/indra_d_cogniz_clicker/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://www.facebook.com/indranil.maiti.564/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400">
                Message sent successfully! We promise you to get back within 1 hour.
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;