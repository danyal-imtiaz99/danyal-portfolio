#!/bin/bash

echo "🚀 FIXING EVERYTHING AT ONCE..."

# 1. Create all required directories
mkdir -p app/api/admin/login
mkdir -p app/api/admin/status
mkdir -p app/api/projects/[id]
mkdir -p projectData

# 2. Remove any incorrect files
rm -f app/admin/login/route.js 2>/dev/null
rm -f app/admin/status/route.js 2>/dev/null
rm -f data/projects.json 2>/dev/null
rm -f projectData/projects.json 2>/dev/null

# 3. Create projects.json with correct data
cat > projectData/projects.json << 'EOF'
[
  {
    "id": 1,
    "title": "URL Shortener Platform",
    "description": "Full-stack URL shortening service built from scratch and deployed to production with automated CI/CD pipeline",
    "tech": ["Java", "Spring Boot", "React", "PostgreSQL", "Hibernate", "JPA", "Shell"],
    "status": "live",
    "highlights": [
      "Built complete backend and frontend architecture using modern tech stack",
      "Implemented automated CI/CD pipeline with GitHub Actions for seamless deployment",
      "Deployed to production with version control integration and automated testing"
    ],
    "githubUrl": "https://github.com/danyal-imtiaz99/url-shortener",
    "liveUrl": "https://url-shortener.danyalimtiaz.com",
    "startDate": "2024-01-15",
    "endDate": "2024-03-20",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Monitoring Dashboard for Reports",
    "description": "Enterprise-grade monitoring solution providing real-time system metrics and automated reporting capabilities",
    "tech": ["Java", "Spring MVC", "RESTful APIs", "JavaScript", "Real-time Processing"],
    "status": "completed",
    "highlights": [
      "Developed comprehensive API endpoints for system monitoring and analytics",
      "Created real-time dashboard with live data visualization and alerting",
      "Built automated report generation system with customizable metrics"
    ],
    "githubUrl": "https://github.com/danyal-imtiaz99/monitoring-dashboard",
    "liveUrl": "",
    "startDate": "2023-08-10",
    "endDate": "2023-12-15",
    "createdAt": "2023-08-10T09:00:00Z",
    "updatedAt": "2023-08-10T09:00:00Z"
  }
]
EOF

# 4. Create admin login route
cat > app/api/admin/login/route.js << 'EOF'
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio123';
        const adminEnabled = process.env.ENABLE_ADMIN === 'true' || process.env.NODE_ENV === 'development';

        if (!adminEnabled) {
            return NextResponse.json({ success: false, message: 'Admin access disabled' }, { status: 403 });
        }

        if (username === adminUsername && password === adminPassword) {
            const token = btoa(`${username}:${Date.now()}`);
            return NextResponse.json({ success: true, token, message: 'Login successful' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
    }
}
EOF

# 5. Create admin status route
cat > app/api/admin/status/route.js << 'EOF'
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const adminEnabled = process.env.ENABLE_ADMIN === 'true' || process.env.NODE_ENV === 'development';
        return NextResponse.json({ enabled: adminEnabled, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error in admin status check:', error);
        return NextResponse.json({ enabled: false, error: 'Failed to check admin status' }, { status: 500 });
    }
}
EOF

# 6. Create projects API route
cat > app/api/projects/route.js << 'EOF'
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
EOF

# 7. Create projects [id] route
cat > app/api/projects/[id]/route.js << 'EOF'
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
EOF

echo "✅ ALL FILES CREATED!"
echo "🔥 PORTFOLIO FIXED!"
echo ""
echo "📁 Created directories:"
echo "   - app/api/admin/login/"
echo "   - app/api/admin/status/"
echo "   - app/api/projects/[id]/"
echo "   - projectData/"
echo ""
echo "📄 Created files:"
echo "   - projectData/projects.json (with sample data)"
echo "   - app/api/admin/login/route.js"
echo "   - app/api/admin/status/route.js"
echo "   - app/api/projects/route.js"
echo "   - app/api/projects/[id]/route.js"
echo ""
echo "🚀 NOW RUN: npm run dev"
echo "🌐 Go to: http://localhost:3000"
echo "🔑 Admin: http://localhost:3000/admin (admin/portfolio123)"
echo ""
echo "DONE! NO MORE BULLSHIT! 🎉"
