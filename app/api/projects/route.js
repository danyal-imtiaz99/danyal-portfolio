import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

// Ensure data directory exists
const ensureDataDir = () => {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

// Initialize with sample data if file doesn't exist
const initializeData = () => {
    ensureDataDir();

    if (!fs.existsSync(DATA_FILE)) {
        const sampleData = [
            {
                id: 1,
                title: "URL Shortener Platform",
                description: "Full-stack URL shortening service built from scratch and deployed to production with automated CI/CD pipeline",
                tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Hibernate", "JPA", "Shell"],
                status: "live",
                highlights: [
                    "Built complete backend and frontend architecture using modern tech stack",
                    "Implemented automated CI/CD pipeline with GitHub Actions for seamless deployment",
                    "Deployed to production with version control integration and automated testing"
                ],
                githubUrl: "https://github.com/danyal-imtiaz99/url-shortener",
                liveUrl: "https://url-shortener.danyalimtiaz.com",
                startDate: "2024-01-15",
                endDate: "2024-03-20",
                createdAt: "2024-01-15T10:00:00Z",
                updatedAt: "2024-01-15T10:00:00Z"
            },
            {
                id: 2,
                title: "Monitoring Dashboard for Reports",
                description: "Enterprise-grade monitoring solution providing real-time system metrics and automated reporting capabilities",
                tech: ["Java", "Spring MVC", "RESTful APIs", "JavaScript", "Real-time Processing"],
                status: "completed",
                highlights: [
                    "Developed comprehensive API endpoints for system monitoring and analytics",
                    "Created real-time dashboard with live data visualization and alerting",
                    "Built automated report generation system with customizable metrics"
                ],
                githubUrl: "https://github.com/danyal-imtiaz99/monitoring-dashboard",
                liveUrl: "",
                startDate: "2023-08-10",
                endDate: "2023-12-15",
                createdAt: "2023-08-10T09:00:00Z",
                updatedAt: "2023-08-10T09:00:00Z"
            }
        ];

        fs.writeFileSync(DATA_FILE, JSON.stringify(sampleData, null, 2));
    }
};

// Read projects from file
const readProjects = () => {
    initializeData();
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading projects:', error);
        return [];
    }
};

// Write projects to file
const writeProjects = (projects) => {
    ensureDataDir();
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing projects:', error);
        return false;
    }
};

// GET - Fetch all projects
export async function GET() {
    try {
        const projects = readProjects();
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error in GET /api/projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Create new project
export async function POST(request) {
    try {
        const projectData = await request.json();
        const projects = readProjects();

        // Generate new ID
        const newId = Math.max(...projects.map(p => p.id), 0) + 1;

        const newProject = {
            ...projectData,
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        projects.push(newProject);

        if (writeProjects(projects)) {
            return NextResponse.json(newProject, { status: 201 });
        } else {
            return NextResponse.json(
                { error: 'Failed to save project' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error in POST /api/projects:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}