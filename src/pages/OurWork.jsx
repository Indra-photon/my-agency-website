import React, { useState } from 'react';
import WebDevelopment from '../components/WebDevelopment';
import SocialMediaMarketing from '../components/SocialMediaMarketing'

const OurWork = () => {
  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'social-media', label: 'Social Media Marketing' },
    { id: 'seo', label: 'SEO Projects' },
    { id: 'photography', label: 'Product Photography' },
    { id: 'ugc', label: 'UGC Ads' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const renderContent = () => {
    switch(activeCategory) {
        case 'web-dev':
            return <WebDevelopment />;
        case 'social-media':
            return <SocialMediaMarketing />;
        case 'all':
            return (
                <>
                    <div className="space-y-16">
                        <section>
                            <h2 className="text-2xl font-bold mb-8">Web Development</h2>
                            <WebDevelopment />
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold mb-8">Social Media Marketing</h2>
                            <SocialMediaMarketing />
                        </section>
                    </div>
                </>
            );
        default:
            return (
                <div className="text-center text-gray-400">
                    <p>Content for {categories.find(cat => cat.id === activeCategory)?.label} coming soon</p>
                </div>
            );
    }
};

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-blue-400">Work</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across different domains
          </p>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="sticky top-16 bg-black/95 backdrop-blur-sm z-40 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 py-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300
                    ${activeCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicators */}
      <div className="hidden md:block">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      {/* Work Display */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default OurWork;