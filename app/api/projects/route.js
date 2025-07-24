import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'projectData', 'projects.json');

const ensureDataDir = () => {
    const dataDir = path.join(process.cwd(), 'projectData');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

const readProjects = () => {
    ensureDataDir();
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading projects:', error);
        return [];
    }
};

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

export async function GET() {
    try {
        const projects = readProjects();
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error in GET /api/projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const projectData = await request.json();
        const projects = readProjects();
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
            return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in POST /api/projects:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
