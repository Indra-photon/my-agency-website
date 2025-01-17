import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  // Testimonial data - you can move this to a separate data file
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc",
      company: "TechStart Inc",
      content: "Their web development work transformed our online presence. The attention to detail and commitment to excellence is outstanding.",
      rating: 5,
      image: "/path-to-image.jpg" // Add actual image path
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Global Solutions",
      content: "The social media strategy they developed helped us increase our engagement by 300%. Exceptional service and results!",
      rating: 5,
      image: "/path-to-image.jpg"
    },
    {
      id: 3,
      name: "Emma Williams",
      position: "E-commerce Manager",
      company: "Retail Plus",
      content: "Outstanding SEO work! Our organic traffic has doubled in just three months. Highly recommend their expertise.",
      rating: 5,
      image: "/path-to-image.jpg"
    },
    {
      id: 4,
      name: "David Martinez",
      position: "Product Owner",
      company: "Innovation Labs",
      content: "The UGC campaign they created went viral and generated incredible ROI. They truly understand modern marketing.",
      rating: 5,
      image: "/path-to-image.jpg"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Brand Director",
      company: "Fashion Forward",
      content: "Their product photography elevated our brand image significantly. Professional, creative, and reliable.",
      rating: 5,
      image: "/path-to-image.jpg"
    }
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="bg-black py-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-blue-400">Clients</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients about their experience working with us.
          </p>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Sliding Container */}
        <div className="flex animate-scroll-left py-8">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-none w-[90%] sm:w-[45%] lg:w-[30%] px-4"
            >
              <div className="bg-gray-900 rounded-xl p-6 h-full border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                {/* Quote Icon */}
                <Quote className="text-blue-400 mb-4" size={24} />

                {/* Testimonial Content */}
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                    <p className="text-blue-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;