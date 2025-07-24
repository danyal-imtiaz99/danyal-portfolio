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
