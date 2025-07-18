import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    (await cookies()).set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ message: 'Authentication cookie set successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error setting authentication cookie:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    (await cookies()).delete('auth_token');
    return NextResponse.json({ message: 'Authentication cookie cleared successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing authentication cookie:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}