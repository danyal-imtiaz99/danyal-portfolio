"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    Eye,
    Calendar,
    Code,
    ExternalLink,
    Star,
    CheckCircle,
    Clock,
    Rocket,
    Search,
    Filter,
    LogOut,
    User,
    Settings
} from 'lucide-react';

const AdminPage = () => {
    const [adminEnabled, setAdminEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    // Check if admin is enabled
    // TEMPORARY FIX - Check if admin is enabled
    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                // For local development, always enable admin
                if (window.location.hostname === 'localhost') {
                    setAdminEnabled(true);
                    setLoading(false);
                    return;
                }

                // For production, check the API
                const response = await fetch('/api/admin/status');

                if (response.ok) {
                    const data = await response.json();
                    console.log('Admin status response:', data);
                    setAdminEnabled(data.enabled);
                } else {
                    console.error('Failed to check admin status:', response.status);
                    setAdminEnabled(false);
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                // For testing purposes, enable admin if there's an error locally
                if (window.location.hostname === 'localhost') {
                    setAdminEnabled(true);
                } else {
                    setAdminEnabled(false);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    // Load projects from API
    const loadProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadProjects();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsAuthenticated(true);
                localStorage.setItem('adminAuth', data.token);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        setCredentials({ username: '', password: '' });
    };

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('adminAuth');
        if (token && adminEnabled) {
            setIsAuthenticated(true);
        }
    }, [adminEnabled]);

    const saveProject = async (projectData) => {
        try {
            const method = editingProject ? 'PUT' : 'POST';
            const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                await loadProjects();
                setShowProjectModal(false);
                setEditingProject(null);
            } else {
                alert('Error saving project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project');
        }
    };

    const deleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`/api/projects/${projectId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    await loadProjects();
                } else {
                    alert('Error deleting project');
                }
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Error deleting project');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'live': return 'bg-green-100 text-green-800 border-green-200';
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'upcoming': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'live': return <Rocket size={14} />;
            case 'completed': return <CheckCircle size={14} />;
            case 'in-progress': return <Clock size={14} />;
            case 'upcoming': return <Calendar size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const ProjectModal = () => {
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            tech: '',
            status: 'upcoming',
            highlights: [''],
            githubUrl: '',
            liveUrl: '',
            startDate: '',
            endDate: ''
        });

        useEffect(() => {
            if (editingProject) {
                setFormData({
                    ...editingProject,
                    tech: editingProject.tech.join(', '),
                    highlights: editingProject.highlights || ['']
                });
            }
        }, [editingProject]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!formData.title || !formData.description || !formData.tech) {
                alert('Please fill in all required fields');
                return;
            }

            const projectData = {
                ...formData,
                tech: formData.tech.split(',').map(t => t.trim()),
                highlights: formData.highlights.filter(h => h.trim() !== ''),
                id: editingProject?.id || Date.now(),
                createdAt: editingProject?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            saveProject(projectData);
        };

        const addHighlight = () => {
            setFormData({
                ...formData,
                highlights: [...formData.highlights, '']
            });
        };

        const updateHighlight = (index, value) => {
            const newHighlights = [...formData.highlights];
            newHighlights[index] = value;
            setFormData({ ...formData, highlights: newHighlights });
        };

        const removeHighlight = (index) => {
            const newHighlights = formData.highlights.filter((_, i) => i !== index);
            setFormData({ ...formData, highlights: newHighlights });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowProjectModal(false);
                                    setEditingProject(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="live">Live</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Technologies (comma-separated) *
                            </label>
                            <input
                                type="text"
                                value={formData.tech}
                                onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                placeholder="React, Node.js, MongoDB, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Highlights
                            </label>
                            {formData.highlights.map((highlight, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={highlight}
                                        onChange={(e) => updateHighlight(index, e.target.value)}
                                        placeholder="Enter project highlight..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formData.highlights.length > 1 && (
                                        <button
                                            onClick={() => removeHighlight(index)}
                                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={addHighlight}
                                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Add Highlight
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Live URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.liveUrl}
                                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowProjectModal(false);
                                    setEditingProject(null);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {editingProject ? 'Update Project' : 'Create Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Show loading spinner
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Show 404 if admin is disabled
    if (!adminEnabled) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <a
                        href="/"
                        className="text-blue-600 hover:text-blue-700 underline"
                    >
                        ← Back to Portfolio
                    </a>
                </div>
            </div>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                        <p className="text-gray-600 mt-2">Sign in to manage your portfolio</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show admin interface
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Settings className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-900">Portfolio Admin</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Welcome, Admin</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
                        <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
                    </div>
                    <button
                        onClick={() => setShowProjectModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add New Project
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="live">Live</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)}
                                            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() => {
                                                setEditingProject(project);
                                                setShowProjectModal(true);
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                            title="Edit Project"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                            >
                        {tech}
                      </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{project.tech.length - 3} more
                      </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900 transition-colors"
                                                title="View on GitHub"
                                            >
                                                <Code size={16} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900 transition-colors"
                                                title="View Live"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {project.startDate && new Date(project.startDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'Get started by adding your first project'
                            }
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
                            <button
                                onClick={() => setShowProjectModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Add Your First Project
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Project Modal */}
            {showProjectModal && <ProjectModal />}
        </div>
    );
};

export default AdminPage;