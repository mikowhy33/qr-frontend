import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const lessonId = request.nextUrl.searchParams.get('lessonId');

    console.log(lessonId +'PPIPIPIPIPIPIPI')
    const objAut = await auth();

    
      const { getToken } = await auth();
    const userToken = await getToken();
    
    "http://localhost:3000/api/lessons/cmhywp2ai0007ezkcy8hfs60k/attendance"
    

    console.log(userToken+'TOOOOOKEN')

    const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}/attendance`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`[Backend API] Backend error: ${res.status}`, errorData);

      throw new Error(`API backend error: ${res.status} - ${errorData}`);
    }
    const data = await res.json();

    return NextResponse.json(data);
  } catch (e: any) {
    console.error('[Frontend Server] fetching issue:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
