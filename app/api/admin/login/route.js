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
