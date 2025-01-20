import React from 'react';
import { MessageSquare, CalendarCheck, Rocket, Mail, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom'

const ProjectProcess = () => {
  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      title: "Get in Touch",
      description: "Reach out to us via email or social media. Tell us about your project idea and goals.",
      highlight: "Quick Response Guaranteed"
    },
    {
      id: 2,
      icon: CalendarCheck,
      title: "Discovery Meeting",
      description: "Schedule a detailed discussion where we'll understand your requirements, vision, and project specifics.",
      highlight: "Free Consultation"
    },
    {
      id: 3,
      icon: Rocket,
      title: "Project Kickoff",
      description: "Once aligned on goals and approach, we'll start bringing your vision to life.",
      highlight: "Seamless Process"
    }
  ];

  return (
    <div className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your <span className="text-blue-400">Project</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into reality with our simple three-step process. We make getting started easy and straightforward.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent transform translate-x-1/2">
                  <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-400" />
                </div>
              )}

              {/* Step Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="text-blue-400" size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {step.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full">
                    {step.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <Mail className="text-blue-400" size={24} />
            <div className="text-left">
              <h4 className="text-white font-semibold">Ready to Begin?</h4>
              <p className="text-gray-400">
                Email us at{' '}
                <a 
                  href="mailto:your@email.com" 
                  className="text-blue-400 hover:underline"
                >
                  devdoots.dev@gmail.com
                </a>
              </p>
            </div>
            <div>
            <Link to = '/contact-us'>
            <button className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Contact Now
            </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProcess;