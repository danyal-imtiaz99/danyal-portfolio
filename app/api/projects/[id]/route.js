import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'projectData', 'projects.json');

const readProjects = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading projects:', error);
        return [];
    }
};

const writeProjects = (projects) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing projects:', error);
        return false;
    }
};

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const projectData = await request.json();
        const projects = readProjects();
        const projectIndex = projects.findIndex(p => p.id == id);

        if (projectIndex === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const updatedProject = {
            ...projectData,
            id: parseInt(id),
            createdAt: projects[projectIndex].createdAt,
            updatedAt: new Date().toISOString()
        };

        projects[projectIndex] = updatedProject;

        if (writeProjects(projects)) {
            return NextResponse.json(updatedProject);
        } else {
            return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in PUT /api/projects/[id]:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const projects = readProjects();
        const projectIndex = projects.findIndex(p => p.id == id);

        if (projectIndex === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const deletedProject = projects[projectIndex];
        projects.splice(projectIndex, 1);

        if (writeProjects(projects)) {
            return NextResponse.json({ message: 'Project deleted successfully', deletedProject });
        } else {
            return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in DELETE /api/projects/[id]:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const projects = readProjects();
        const project = projects.find(p => p.id == id);

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error in GET /api/projects/[id]:', error);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}
