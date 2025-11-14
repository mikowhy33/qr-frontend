import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// post since we are sending data here
export async function POST(request: NextRequest) {
  try {
    // user token from auth from clerk
    const { getToken } = await auth();
    const userToken = await getToken();
    if (!userToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Camera toekn from the user (containing the token for a specific lesson)
    const body = await request.json();
    const qrToken = body.token;
    if (!qrToken) {
      return NextResponse.json({ error: 'QR Token is required' }, { status: 400 });
    }

    // 3. real backend fetch with all the tokens
    const API_URL = 'http://localhost:3000/api/attendance/scan';
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`, // stud token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: qrToken }), // qr token
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Backend error');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
