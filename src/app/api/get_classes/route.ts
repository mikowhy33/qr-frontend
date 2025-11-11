
import { NextRequest, NextResponse } from 'next/server';

// function to get things from backend
export async function GET(request:NextRequest) {
  try {
    
    // authentication from headers!
    const authHeader=request.headers.get('Authorization')


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Not authenticated: No token provided from page.tsx' }, { status: 401 });
    }

    // were getting the token out
    const token=authHeader.split(' ')[1]

    // in future has 2 change, prob hosted on vercel
    const API_URL = 'http://localhost:3000/api/classes';

    console.log(`[Frontend Server]  ${API_URL}`);
    
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // cache: 'no-store' always fresh data
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`[Backend API] Backend error: ${res.status}`, errorData);
      throw new Error(`API backend error: ${res.status} - ${errorData}`);
    }

    const data = await res.json();

    // we filter to return only id and name!
    const filtered=data.map((c: any) => ({
      id:c.id,
      name: c.name,
      description: c.description,
    }));

    // if all ok
      return NextResponse.json(filtered);
  } catch (error) {
    console.error('[Frontend Server] fetching issue:', error);
   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
