import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import pic3 from '../../public/avoron.png'
import pic1 from '../../public/portfolio_pr_dubai.png'
import pic2 from '../../public/photography-site.jpg'


const WebDevelopment = () => {
  const projects = [
    {
        id: 1,
        title: "Avoron, an E-commerce site",
        description: "An elegant website designed to showcase avoron's unique products and sell using whatsapp",
        techStack: ["React", "Tailwind CSS", "Node", "Express", "Framer Motion", "Appwrite"],
        liveLink: "https://www.avoron.in/",
        githubLink: "https://github.com/Dev-Sisyphus/Photography-Website",
        image: pic3,
        category: "Full Stack"
      },
      {
        id: 2,
        title: "Portfolio Site, a Photographer Lens",
        description: "An elegant portfolio website designed to showcase photographic work with smooth animations and responsive design.",
        techStack: ["React", "Tailwind CSS", "Node", "Express", "Framer Motion"],
        liveLink: "https://photography-website-ruby.vercel.app/",
        githubLink: "https://github.com/Dev-Sisyphus/Photography-Website",
        image: pic2,
        category: "Full Stack"
      },
    {
      id: 3,
      title: "Facility Management Services, Dubai",
      description: "A comprehensive web application for ABS Dreams, showcasing facility management services with modern design and functionality.",
      techStack: ["React", "Tailwind CSS", "Node", "Express", "Framer Motion"],
      liveLink: "https://www.absdreamsfacilities.com/",
      githubLink: "https://github.com/gohan-gb/Facility-Management-Site",
      image: pic1,
      category: "Frontend"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
        >
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />
          </div>

          {/* Project Content */}
          <div className="p-6 space-y-4">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md flex items-center gap-1"
                >
                  <Code size={12} />
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-xl transition-all duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default WebDevelopment;