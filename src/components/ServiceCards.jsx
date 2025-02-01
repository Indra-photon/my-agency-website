import React, { useState } from 'react';
import { Code, Share2, Search, Camera, Sparkles, Calendar1 } from 'lucide-react';

const ServiceCards = () => {
  const services = [
    {
      title: "Web Development",
      icon: Code,
      description: "Custom websites that convert visitors into customers. From landing pages to full-scale web applications.",
      features: ["Responsive Design", "Custom CMS", "E-commerce Solutions"]
    },
    {
      title: "SEO Optimization",
      icon: Search,
      description: "Data-driven SEO strategies to boost your rankings and attract qualified organic traffic.",
      features: ["Keyword Research", "Technical SEO", "Content Optimization"]
    },
    {
      title: "Social Media Marketing",
      icon: Share2,
      description: "Strategic social media campaigns that build engagement and drive real business results.",
      features: ["Content Strategy", "Community Management", "Paid Advertising"]
    },
    {
      title: "Social Media Management",
      icon: Calendar1,
      description: "Strategic social media posts regularly on different platforms to bring your audinece.",
      features: ["Attractive Content Design", "Content Management", "Regular Data Driven Posting"]
    },
    // {
    //   title: "Product Photography",
    //   icon: Camera,
    //   description: "Professional product photography that makes your offerings stand out in the digital marketplace.",
    //   features: ["Studio Photography", "Lifestyle Shots", "360° Product Views"]
    // },
    // {
    //   title: "Viral UGC Ads",
    //   icon: Sparkles,
    //   description: "Authentic user-generated content that resonates with your audience and drives engagement.",
    //   features: ["Creative Direction", "UGC Creation", "Campaign Management"]
    // }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full min-h-screen bg-black p-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Our Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="group relative transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className={`
                relative p-6 h-full rounded-2xl
                bg-gray-900 bg-opacity-50 backdrop-blur-lg
                border border-gray-800
                shadow-lg
                transform transition-transform duration-300
              `}
              style={{
                transformStyle: 'preserve-3d',
                transform: hoveredIndex === index 
                  ? 'rotateY(10deg) rotateX(5deg)' 
                  : 'rotateY(0deg) rotateX(0deg)',
              }}
            >
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{
                  background: 'linear-gradient(45deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.2) 100%)',
                  filter: 'blur(4px)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                    <service.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100">{service.title}</h3>
                </div>

                <p className="text-gray-400">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button> */}
              </div>

              {/* Shine effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(37,99,235,0.1) 45%, rgba(37,99,235,0.2) 50%, rgba(37,99,235,0.1) 55%, transparent 60%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;