import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {
  try {
    // we get the lessonId from searchParams
    const lessonId = request.nextUrl.searchParams.get('lessonId');

    // console.log(lessonId)

    // from headers we get the token
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    const apiURL = `http://localhost:3000/api/lessons/${lessonId}/attendance/start`;

    // we fetch the data from the real server!
    const res = await fetch(apiURL, {
      method: 'POST',
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

    return NextResponse.json(data);
  } catch (e: any) {
    console.error('[Frontend Server] fetching issue:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
