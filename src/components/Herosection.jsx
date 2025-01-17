import React, { useState } from 'react';
import WebsiteAnalyzer from './WebsiteAnalyzer';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleAnalyze = (e) => {
    e.preventDefault();
    console.log('Analyzing website:', websiteUrl);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient orbs/blobs in background */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        {/* Top label */}
        <div className="text-center mb-6">
          <span className="inline-block px-6 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
          Where Strategy Meets Creativity, Results Happen
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-white to-blue-400 text-transparent bg-clip-text">
            Crafting Digital Excellence for Your Brand
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl text-center max-w-3xl mx-auto mb-12">
          Transform your online presence with our expert web development and 
          social media management services.
        </p>

        {/* Website analyzer form */}
        <div className="max-w-2xl mx-auto mb-8">
          <WebsiteAnalyzer />
          <p className="text-gray-500 text-sm mt-2 text-center">
            Get a free analysis of your website's performance, SEO, and best practices
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <button className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-glow-pulse"></div>
            <Link to = '/contact-us'>
              <div className="relative px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                Start Your Project
              </div>
            </Link>
          </button>
          {/* <button className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-glow-pulse-delayed"></div>
            <Link to = '/work'>
              <div className="relative px-8 py-3 bg-transparent hover:bg-gray-900 text-white border border-gray-800 rounded-lg transition-colors duration-200">
                Explore Services
              </div>
            </Link>
          </button> */}
        </div>
      </div>

      {/* Decorative grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes glow-pulse {
          0% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.25;
          }
        }

        @keyframes glow-pulse-delayed {
          0% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.15;
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .animate-glow-pulse-delayed {
          animation: glow-pulse-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes button-glow {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5),
                        0 0 10px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
                        0 0 20px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5),
                        0 0 10px rgba(59, 130, 246, 0.3);
          }
        }

        .animate-glow-blue {
          animation: button-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;