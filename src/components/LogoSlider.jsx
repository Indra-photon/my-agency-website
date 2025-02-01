import React from 'react';
import pic1 from '../assets/logo1.png'
import pic2 from '../assets/logo2.png'
import pic3 from '../assets/logo3.png'
import pic4 from '../assets/logo4.png'
import pic5 from '../assets/logo5.png'

const LogoSlider = () => {
  const logos = [
    { id: 1, logo: pic1 },
    { id: 1, logo: pic2 },
    { id: 1, logo: pic3 },
    { id: 1, logo: pic4 },
    { id: 1, logo: pic5 },
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">Trusted by</h2>
          <p className="text-gray-400 text-lg">Powering digital success for companies worldwide</p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient Overlay - Left */}
          <div className="hidden md:block absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-black to-transparent"></div>
          
          {/* Gradient Overlay - Right */}
          <div className="hidden md:block absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-black to-transparent"></div>

          <div className="flex gap-16 animate-slide">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-none w-32 h-28 bg-gray-900 rounded-lg flex items-center justify-center group transition-all duration-300 hover:bg-gray-800"
              >
                <div className="text-gray-400 group-hover:text-blue-400 font-medium">
                  <img src={logo.logo} className="h-20" alt="Company logo" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-slide {
            animation: slide 30s linear infinite;
          }

          /* Mobile-specific animation speed */
          @media (max-width: 768px) {
            .animate-slide {
              animation: slide 5s linear infinite;
            }
          }

          .animate-slide:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LogoSlider;