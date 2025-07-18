"use client";

import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, Code, Database, Server, Award, Calendar, ChevronRight, Star } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = {
    "Programming Languages": ["Java", "C++", "Python", "C#", "JavaScript", "SQL"],
    "Backend Technologies": [".NET", "ASP.NET", "Spring Boot", "Hibernate", "JPA"],
    "Database Technologies": ["PostgreSQL", "SQL Server", "MongoDB", "Redis"],
    "Cloud Platforms": ["AWS", "Azure", "Google Cloud Platform"],
    "Web Technologies": ["React", "HTML", "CSS", "RESTful APIs", "WebSocket"],
    "Development Tools": ["Git", "GitHub Actions", "Docker", "CI/CD", "Shell Scripting"],
    "Architecture": ["Microservices", "Distributed Systems", "System Design", "API Design"]
  };

  const experience = [
    {
      title: "Software Engineer",
      company: "Anwins",
      period: "Sep 2022 – May 2024",
      location: "Remote",
      achievements: [
        "Redesigned insurance claim processing pipeline using microservices architecture, enabling system to handle 50,000+ daily transactions across 15+ distributed services",
        "Architected scalable RESTful APIs with comprehensive input validation, reducing invalid calls by 70% and improving response times from 3 seconds to under 1 second",
        "Implemented distributed logging framework with correlation IDs across microservices, reducing production issue investigation time from hours to 30 minutes"
      ]
    },
    {
      title: "Software Development Engineer",
      company: "Wells Fargo",
      period: "Dec 2021 – Sep 2022",
      location: "Remote",
      achievements: [
        "Built transaction validation framework with idempotency controls for high-volume banking system processing $2M+ daily across 200,000+ transactions",
        "Optimized PostgreSQL database performance using query analysis and indexing, reducing execution time by 60%",
        "Developed real-time system monitoring tools measuring response time, throughput metrics, and error rates"
      ]
    },
    {
      title: "Application Engineer",
      company: "Mindtree",
      period: "Jan 2021 – Dec 2021",
      location: "Remote",
      achievements: [
        "Built automated data validation and processing tools using Java and Python, handling 1M+ daily records while reducing processing time from 4+ hours to 30 minutes",
        "Developed database query optimization utilities improving report generation performance by 10x",
        "Maintained enterprise application reliability serving 5,000+ concurrent users"
      ]
    }
  ];

  const projects = [
    {
      title: "URL Shortener Platform",
      tech: "Java, Spring Boot, React, PostgreSQL, Hibernate, JPA, Shell",
      description: "Full-stack URL shortening service built from scratch and deployed to production with automated CI/CD pipeline",
      highlights: [
        "Built complete backend and frontend architecture using modern tech stack",
        "Implemented automated CI/CD pipeline with GitHub Actions for seamless deployment",
        "Deployed to production with version control integration and automated testing",
        "Optimized algorithms for efficient URL processing and database operations"
      ],
      status: "🚀 Live & In Progress"
    },
    {
      title: "Monitoring Dashboard for Reports",
      tech: "Java, Spring MVC, RESTful APIs, JavaScript, Real-time Processing",
      description: "Enterprise-grade monitoring solution providing real-time system metrics and automated reporting capabilities",
      highlights: [
        "Developed comprehensive API endpoints for system monitoring and analytics",
        "Created real-time dashboard with live data visualization and alerting",
        "Built automated report generation system with customizable metrics",
        "Implemented scalable architecture supporting multiple data sources"
      ],
      status: "✅ Production Ready"
    }
  ];

  const certifications = [
    "ProgrammingExpert.io Complete Certification (2024)",
    "Amazon Software Development Principles (2025) - Ongoing",
    "Spring Boot API Development (2024)",
    "Java Data Structures & Algorithms (2024)",
    "Google Cloud Platform Fundamentals (2024)",
    "Introduction to Generative AI Specialization (2025)",
    "IBM Software Engineering Foundations (2023)",
    "Meta Back-End Development (2022)"
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Danyal Imtiaz
              </div>
              <div className="hidden md:flex space-x-8">
                {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`capitalize hover:text-blue-400 transition-colors ${
                            activeSection === section ? 'text-blue-400' : 'text-gray-300'
                        }`}
                    >
                      {section}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className={`max-w-4xl mx-auto px-4 text-center z-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Danyal Imtiaz
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Software Engineer
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Software Engineer with 4+ years specializing in distributed systems, microservices architecture, and data processing solutions. Expert in production-level support, team collaboration, and adaptive problem-solving. Proven track record optimizing enterprise applications serving millions of users with 99.9% uptime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/danyal-imtiaz99" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
                <Github size={20} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/danyal-imtiaz/" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="https://x.com/DanyalImtiaz1" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
                <Twitter size={20} />
                Twitter
              </a>
              <a href="https://www.hackerrank.com/profile/danyal_imtiaz99" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
                <Award size={20} />
                HackerRank
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-blue-400" size={20} />
                    <span className="text-gray-300">Tulsa, OK, USA</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="text-blue-400" size={20} />
                    <span className="text-gray-300">danyal.imtiaz99@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-400" size={20} />
                    <span className="text-gray-300">+1 (918) 841-0766</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Education</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                      <p className="text-gray-400">Northeastern State University, Tulsa, OK (2019)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Associate of Science in Computer Science</h4>
                      <p className="text-gray-400">Tulsa Community College, Tulsa, OK (2018)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Technical Skills</h3>
                  <div className="space-y-4">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="font-semibold text-gray-300 mb-2">{category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-800">
                            {skill}
                          </span>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                  <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-400">{job.title}</h3>
                        <p className="text-xl text-gray-300">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 flex items-center gap-2">
                          <Calendar size={16} />
                          {job.period}
                        </p>
                        <p className="text-gray-400">{job.location}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {job.achievements.map((achievement, i) => (
                          <div key={i} className="flex gap-3">
                            <ChevronRight className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                            <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: achievement }}></p>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-slate-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                  <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                      <span className="text-sm bg-green-900/30 text-green-300 px-2 py-1 rounded border border-green-800">
                    {project.status}
                  </span>
                    </div>
                    <p className="text-gray-400 mb-4 font-mono text-sm">{project.tech}</p>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                          <div key={i} className="flex gap-2">
                            <Star className="text-yellow-400 flex-shrink-0 mt-1" size={14} />
                            <p className="text-gray-300 text-sm">{highlight}</p>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-blue-400">Certifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                    <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                      <div className="flex items-center gap-2">
                        <Award className="text-yellow-400" size={16} />
                        <p className="text-gray-300 text-sm">{cert}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              I&apos;m always interested in discussing new opportunities and challenging projects.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:danyal.imtiaz99@gmail.com" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg transition-colors text-lg">
                <Mail size={20} />
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/danyal-imtiaz/" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-lg transition-colors text-lg">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="https://github.com/danyal-imtiaz99" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-lg transition-colors text-lg">
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Danyal Imtiaz. Built with React & Next.js
            </p>
          </div>
        </footer>
        <Analytics />
      </div>
  );
};

export default Portfolio;