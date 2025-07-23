import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Check environment variable - only enabled when ENABLE_ADMIN is true
        const adminEnabled = process.env.ENABLE_ADMIN === 'true';

        console.log('Admin check - ENABLE_ADMIN:', process.env.ENABLE_ADMIN);
        console.log('Admin enabled:', adminEnabled);

        return NextResponse.json({
            enabled: adminEnabled,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in admin status check:', error);
        return NextResponse.json({
            enabled: false,
            error: 'Failed to check admin status'
        }, { status: 500 });
    }
}