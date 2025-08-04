"use client";

import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, Code, Database, Server, Award, Calendar, ChevronRight, Star, Sparkles, Zap, Rocket, CheckCircle, Clock } from 'lucide-react';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Enhanced projects with removed ones and updated ChatSphere status
    const projects = [
        {
            id: 1,
            title: "URL Shortener Platform",
            description: "Production-ready URL shortening service with automated CI/CD pipeline and enterprise-grade monitoring",
            tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "GitHub Actions"],
            status: "live",
            highlights: [
                "Deployed to production with 99.9% uptime and real-time monitoring",
                "Built complete CI/CD pipeline with GitHub Actions and automated testing",
                "Full-stack architecture serving thousands of users daily"
            ],
            githubUrl: "https://github.com/danyal-imtiaz99/url-shortener",
            liveUrl: "https://url-shortener.danyalimtiaz.com"
        },
        {
            id: 2,
            title: "ChatSphere - Real-time Messaging Platform",
            description: "Scalable messaging platform built with Go, featuring WebSocket connections and goroutine-based broadcasting",
            tech: ["Go", "WebSockets", "MongoDB", "Docker", "JWT", "Goroutines"],
            status: "in-progress",
            highlights: [
                "Architected scalable messaging platform using Go WebSocket connections and goroutine-based broadcasting",
                "Implemented custom connection pooling supporting concurrent users with fast message delivery",
                "Built JWT-based authentication middleware with bcrypt encryption and spam detection algorithms"
            ],
            githubUrl: "",
            liveUrl: ""
        },
        {
            id: 3,
            title: "Legacy System Migration Toolkit",
            description: "Java-based data migration toolkit for legacy insurance systems with automated validation and rollback capabilities",
            tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "ExecutorService"],
            status: "completed",
            highlights: [
                "Developed data migration toolkit for legacy insurance systems using Java Spring Boot",
                "Automated migration of policy records with validation and rollback capabilities",
                "Built comprehensive error reporting and parallel processing with ExecutorService for efficient migrations"
            ],
            githubUrl: "",
            liveUrl: ""
        }
    ];

    const loading = false;

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Enhanced skills with tech radar data
    const techRadarData = [
        // Backend
        { name: "Java", proficiency: 95, years: 4, category: "Backend", x: 150, y: 100, connections: ["Spring Boot", "PostgreSQL", "Microservices"] },
        { name: "Go", proficiency: 80, years: 1, category: "Backend", x: 200, y: 150, connections: ["Docker", "Microservices", "Redis"] },
        { name: "Spring Boot", proficiency: 90, years: 3, category: "Backend", x: 100, y: 180, connections: ["Java", "PostgreSQL", "Docker"] },
        { name: "Microservices", proficiency: 85, years: 2, category: "Backend", x: 250, y: 120, connections: ["Java", "Go", "Docker", "AWS"] },

        // Database
        { name: "PostgreSQL", proficiency: 88, years: 3, category: "Database", x: 80, y: 250, connections: ["Java", "Spring Boot", "AWS"] },
        { name: "MongoDB", proficiency: 75, years: 2, category: "Database", x: 180, y: 280, connections: ["Go", "Docker"] },
        { name: "Redis", proficiency: 70, years: 2, category: "Database", x: 280, y: 200, connections: ["Go", "AWS"] },

        // Cloud
        { name: "AWS", proficiency: 78, years: 2, category: "Cloud", x: 320, y: 160, connections: ["Docker", "Kubernetes", "PostgreSQL"] },
        { name: "Docker", proficiency: 82, years: 2, category: "Cloud", x: 220, y: 220, connections: ["Go", "AWS", "Kubernetes"] },
        { name: "Kubernetes", proficiency: 65, years: 1, category: "Cloud", x: 350, y: 210, connections: ["Docker", "AWS"] },

        // Frontend
        { name: "React", proficiency: 75, years: 2, category: "Frontend", x: 120, y: 320, connections: ["JavaScript"] },
        { name: "JavaScript", proficiency: 80, years: 3, category: "Frontend", x: 160, y: 350, connections: ["React"] }
    ];

    const categoryColors = {
        "Backend": "#3b82f6", // blue
        "Database": "#10b981", // green
        "Cloud": "#f59e0b", // yellow
        "Frontend": "#8b5cf6" // purple
    };

    const experience = [
        {
            title: "Software Engineer",
            company: "Anwins",
            period: "September 2022 – May 2024",
            location: "Remote Full-time",
            achievements: [
                "Architected microservices-based insurance claim processing system using Java Spring Boot handling 8K+ daily transactions; designed distributed service communication with event sourcing and CQRS on AWS infrastructure, reducing claim processing time from 3 days to same-day resolution",
                "Developed Java Spring Boot RESTful APIs with JWT authentication and PostgreSQL database integration; built middleware stack handling 12+ partner integrations with Docker containerization, reducing client-side errors by 35% and improving system stability",
                "Explored Go language with Gin framework for microservices optimization; prototyped concurrent processing modules using Go routines and Redis caching on AWS, demonstrating 25% faster response times in proof-of-concept testing"
            ]
        },
        {
            title: "Software Development Engineer",
            company: "Wells Fargo",
            period: "December 2021 – September 2022",
            location: "Remote Full-time",
            achievements: [
                "Optimized PostgreSQL database performance through strategic indexing and query refactoring using pgAdmin tools; reduced average query execution time by 45% and eliminated timeout issues on customer account lookups during peak hours",
                "Developed Python automation scripts with pandas library for transaction monitoring and PostgreSQL report generation; automated daily reconciliation processes using Jenkins CI/CD, saving 8 hours of manual work weekly and reducing human errors by 60%",
                "Assisted in building C++ server components using STL libraries for high-frequency transaction processing on Linux; contributed to core banking infrastructure improvements with Git version control under senior developer guidance"
            ]
        },
        {
            title: "Application Engineer",
            company: "Mindtree",
            period: "January 2021 – December 2021",
            location: "Remote Full-time",
            achievements: [
                "Built Java Spring Boot applications following enterprise standards with comprehensive exception handling and JUnit testing; created reusable components and libraries deployed via Jenkins pipelines that accelerated development cycles by 20% across 4 teams",
                "Developed Python automation scripts with SQLAlchemy ORM for PostgreSQL data validation and reporting; automated client data audits and generated weekly compliance reports using Linux cron jobs, saving 12 hours of manual work per cycle"
            ]
        }
    ];

    const certifications = [
        "AWS Cloud Fundamentals (2024)",
        "Google Cloud Platform Fundamentals (2024)",
        "HackerRank Java Certification (2024)",
        "HackerRank Python Certification (2024)",
        "Go Development - Coursera Specialization (2024)",
        "GitHub Projects Portfolio (2024)"
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Enhanced status display with proper icons
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'live': return { text: '🚀 Live & Production Ready', icon: <Rocket size={14} />, color: 'bg-green-900/30 text-green-300 border-green-800' };
            case 'completed': return { text: '✅ Completed', icon: <CheckCircle size={14} />, color: 'bg-blue-900/30 text-blue-300 border-blue-800' };
            case 'in-progress': return { text: '🔄 In Progress', icon: <Clock size={14} />, color: 'bg-yellow-900/30 text-yellow-300 border-yellow-800' };
            case 'upcoming': return { text: '📅 Upcoming', icon: <Calendar size={14} />, color: 'bg-purple-900/30 text-purple-300 border-purple-800' };
            default: return { text: '✅ Production Ready', icon: <CheckCircle size={14} />, color: 'bg-blue-900/30 text-blue-300 border-blue-800' };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                ></div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl z-50 border-b border-slate-800/50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                            <Sparkles className="inline mr-2" size={20} />
                            Danyal Imtiaz
                        </div>
                        <div className="hidden md:flex space-x-8">
                            {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize hover:text-blue-400 transition-all duration-300 hover:scale-110 relative group ${
                                        activeSection === section ? 'text-blue-400' : 'text-gray-300'
                                    }`}
                                >
                                    {section}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                                        activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                <div className={`max-w-4xl mx-auto px-4 text-center z-10 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                            Danyal Imtiaz
                        </h1>
                        <div className="absolute -top-4 -right-4 text-yellow-400 animate-bounce">
                            <Zap size={24} />
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 hover:text-white transition-colors duration-300">
                        Software Engineer
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed hover:text-gray-300 transition-colors duration-300">
                        Software Engineer specializing in Java, Go, and distributed systems. Expert in microservices architecture, cloud infrastructure, and high-performance applications. Proven track record building enterprise-scale solutions processing thousands of daily transactions with 99.9% uptime.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: "https://github.com/danyal-imtiaz99", icon: Github, text: "GitHub", color: "bg-gray-800 hover:bg-gray-700" },
                            { href: "https://www.linkedin.com/in/danyal-imtiaz/", icon: Linkedin, text: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
                            { href: "https://x.com/DanyalImtiaz1", icon: Twitter, text: "Twitter", color: "bg-gray-800 hover:bg-gray-700" },
                            { href: "https://www.hackerrank.com/profile/danyal_imtiaz99", icon: Award, text: "HackerRank", color: "bg-green-600 hover:bg-green-700" }
                        ].map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`flex items-center gap-2 ${link.color} px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform`}
                            >
                                <link.icon size={20} />
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced About Section */}
            <section id="about" className="py-20 bg-slate-800/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-4 hover:text-blue-400 transition-colors">
                                    <MapPin className="text-blue-400" size={20} />
                                    <span className="text-gray-300">Tulsa, OK, USA</span>
                                </div>
                                <div className="flex items-center gap-3 mb-4 hover:text-blue-400 transition-colors">
                                    <Mail className="text-blue-400" size={20} />
                                    <span className="text-gray-300">danyal.imtiaz99@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                                    <Phone className="text-blue-400" size={20} />
                                    <span className="text-gray-300">+1 (918) 841-0766</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                                    <Award size={20} />
                                    Education
                                </h3>
                                <div className="space-y-3">
                                    <div className="hover:text-white transition-colors duration-300">
                                        <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                                        <p className="text-gray-400">Northeastern State University, Tulsa, OK</p>
                                        <p className="text-gray-400">September 2015 – May 2019 | GPA: 3.4/4.0</p>
                                        <p className="text-gray-500 text-sm mt-2">Relevant Coursework: Data Structures & Algorithms, Database Systems, Software Engineering, Operating Systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
                                    <Code size={20} />
                                    Interactive Tech Stack
                                </h3>

                                {/* Tech Radar Visualization */}
                                <div className="relative w-full h-96 bg-slate-800/30 rounded-lg p-4 overflow-hidden">
                                    <svg width="100%" height="100%" className="absolute inset-0">
                                        {/* Animated connections */}
                                        {techRadarData.map((tech, i) =>
                                            tech.connections.map((connName, j) => {
                                                const connTech = techRadarData.find(t => t.name === connName);
                                                if (!connTech) return null;
                                                return (
                                                    <line
                                                        key={`${i}-${j}`}
                                                        x1={tech.x}
                                                        y1={tech.y}
                                                        x2={connTech.x}
                                                        y2={connTech.y}
                                                        stroke={categoryColors[tech.category]}
                                                        strokeWidth="1"
                                                        opacity="0.2"
                                                        className="hover:opacity-60 transition-all duration-300"
                                                    />
                                                );
                                            })
                                        )}

                                        {/* Technology nodes */}
                                        {techRadarData.map((tech, i) => (
                                            <g key={i} className="group cursor-pointer">
                                                <circle
                                                    cx={tech.x}
                                                    cy={tech.y}
                                                    r={Math.max(8, tech.proficiency / 6)}
                                                    fill={categoryColors[tech.category]}
                                                    className="hover:scale-125 transition-all duration-300"
                                                    opacity="0.8"
                                                />
                                                <text
                                                    x={tech.x}
                                                    y={tech.y - 20}
                                                    textAnchor="middle"
                                                    className="text-xs fill-white font-medium group-hover:text-blue-300 transition-colors"
                                                >
                                                    {tech.name}
                                                </text>

                                                {/* Tooltip on hover */}
                                                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <rect
                                                        x={tech.x - 35}
                                                        y={tech.y + 15}
                                                        width="70"
                                                        height="30"
                                                        fill="rgba(15, 23, 42, 0.95)"
                                                        stroke={categoryColors[tech.category]}
                                                        strokeWidth="1"
                                                        rx="4"
                                                    />
                                                    <text
                                                        x={tech.x}
                                                        y={tech.y + 27}
                                                        textAnchor="middle"
                                                        className="text-xs fill-white"
                                                    >
                                                        {tech.proficiency}%
                                                    </text>
                                                    <text
                                                        x={tech.x}
                                                        y={tech.y + 38}
                                                        textAnchor="middle"
                                                        className="text-xs fill-gray-300"
                                                    >
                                                        {tech.years}yr{tech.years > 1 ? 's' : ''}
                                                    </text>
                                                </g>
                                            </g>
                                        ))}
                                    </svg>

                                    {/* Legend */}
                                    <div className="absolute bottom-2 left-2 flex gap-4 text-xs">
                                        {Object.entries(categoryColors).map(([category, color]) => (
                                            <div key={category} className="flex items-center gap-1">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <span className="text-gray-300">{category}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* GitHub Activity Section */}
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
                                        <Github size={18} />
                                        GitHub Activity
                                    </h4>

                                    {/* Status Ticker */}
                                    <div className="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-green-400 text-sm font-medium">Currently building:</span>
                                            <span className="text-white text-sm">ChatSphere (Go + WebSockets)</span>
                                        </div>
                                    </div>

                                    {/* GitHub Contribution Graph */}
                                    <div className="bg-slate-800/30 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-400">2024 Contributions</span>
                                            <span className="text-sm text-gray-400">🟢 Active Developer</span>
                                        </div>

                                        {/* Simulated GitHub heatmap */}
                                        <div className="grid grid-cols-52 gap-1">
                                            {Array.from({ length: 365 }, (_, i) => {
                                                const intensity = Math.random();
                                                let bgColor = 'bg-slate-700';
                                                if (intensity > 0.7) bgColor = 'bg-green-500';
                                                else if (intensity > 0.5) bgColor = 'bg-green-600';
                                                else if (intensity > 0.3) bgColor = 'bg-green-700';
                                                else if (intensity > 0.1) bgColor = 'bg-green-800';

                                                return (
                                                    <div
                                                        key={i}
                                                        className={`w-2 h-2 ${bgColor} rounded-sm hover:scale-150 transition-all duration-200 cursor-pointer`}
                                                        title={`${Math.floor(intensity * 10)} contributions`}
                                                    />
                                                );
                                            })}
                                        </div>

                                        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                                            <span>Less</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-slate-700 rounded-sm"></div>
                                                <div className="w-2 h-2 bg-green-800 rounded-sm"></div>
                                                <div className="w-2 h-2 bg-green-700 rounded-sm"></div>
                                                <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                                            </div>
                                            <span>More</span>
                                        </div>

                                        {/* GitHub Stats */}
                                        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                                            <div>
                                                <div className="text-xl font-bold text-green-400">287</div>
                                                <div className="text-xs text-gray-400">Contributions</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-blue-400">52</div>
                                                <div className="text-xs text-gray-400">Week Streak</div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-purple-400">15</div>
                                                <div className="text-xs text-gray-400">Repositories</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Experience Section */}
            <section id="experience" className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <div className="space-y-8">
                        {experience.map((job, index) => (
                            <div key={index} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm group">
                                <div className="flex flex-wrap justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{job.title}</h3>
                                        <p className="text-xl text-gray-300 group-hover:text-white transition-colors">{job.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                                            <Calendar size={16} />
                                            {job.period}
                                        </p>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{job.location}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {job.achievements.map((achievement, i) => (
                                        <div key={i} className="flex gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                            <ChevronRight className="text-blue-400 mt-1 flex-shrink-0 group-hover:text-blue-300" size={16} />
                                            <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Projects Section */}
            <section id="projects" className="py-20 bg-slate-800/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Technical Projects & Go Development Portfolio
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => {
                            const statusInfo = getStatusDisplay(project.status);
                            return (
                                <div key={project.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:scale-105 backdrop-blur-sm group">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                                        <span className={`text-sm px-2 py-1 rounded border flex items-center gap-1 ${statusInfo.color}`}>
                        {statusInfo.icon}
                                            {statusInfo.text}
                      </span>
                                    </div>
                                    <p className="text-gray-400 mb-4 font-mono text-sm group-hover:text-gray-300 transition-colors">{project.tech.join(', ')}</p>
                                    <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-white transition-colors">{project.description}</p>

                                    {project.highlights && project.highlights.length > 0 && (
                                        <div className="space-y-2 mb-4">
                                            {project.highlights.map((highlight, i) => (
                                                <div key={i} className="flex gap-2 group-hover:translate-x-1 transition-transform duration-300">
                                                    <Star className="text-yellow-400 flex-shrink-0 mt-1 group-hover:animate-pulse" size={14} />
                                                    <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{highlight}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                            >
                                                <Code size={16} />
                                                <span className="text-sm">Code</span>
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                            >
                                                <ExternalLink size={16} />
                                                <span className="text-sm">Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Enhanced Certifications */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-center mb-8 text-blue-400 flex items-center justify-center gap-2">
                            <Award className="text-yellow-400" size={24} />
                            Cloud & Programming Certifications
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm group"
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Award className="text-yellow-400 group-hover:animate-pulse" size={16} />
                                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{cert}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Let's Connect
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 hover:text-gray-300 transition-colors">
                        I&apos;m always interested in discussing new opportunities and challenging projects.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            { href: "mailto:danyal.imtiaz99@gmail.com", icon: Mail, text: "Email Me", color: "bg-blue-600 hover:bg-blue-700" },
                            { href: "https://www.linkedin.com/in/danyal-imtiaz/", icon: Linkedin, text: "LinkedIn", color: "bg-slate-800 hover:bg-slate-700" },
                            { href: "https://github.com/danyal-imtiaz99", icon: Github, text: "GitHub", color: "bg-slate-800 hover:bg-slate-700" }
                        ].map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`flex items-center gap-2 ${link.color} px-8 py-4 rounded-lg transition-all duration-300 text-lg hover:scale-110 hover:shadow-2xl transform`}
                            >
                                <link.icon size={20} />
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="bg-slate-900/80 py-8 border-t border-slate-800 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-400 hover:text-white transition-colors duration-300">
                        © 2024 Danyal Imtiaz. Built with React & Next.js
                    </p>
                </div>
            </footer>
            <Analytics />

            <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        </div>
    );
};

export default Portfolio;