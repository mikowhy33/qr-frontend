import { NextRequest, NextResponse } from 'next/server';

// in future dynamic
// let classId = 'cmhud37ns0001ezk4td8gdasc';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');

    /*
      authHeader is right now a string, by splitting we split the 1 and second part
      then we get into the second part: 

      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      ex:

      * const parts = authHeader.split(' ');
     * // 'parts' rn a table: ["Bearer", "eyJhbGciOiJIUzI1NiJ9"]
     * 
      and then we get the second value 

    */
    const token = authHeader?.split(' ')[1];


    const classId=request.nextUrl.searchParams.get('classId')
    

    console.log(classId)
    // const classId=

    const apiURL = `http://localhost:3000/api/classes/${classId}/lessons`;

    // fetching from real base
    const res = await fetch(apiURL, {
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
    return NextResponse.json(data);
  } catch (e: any) {
    console.error('[Frontend Server] fetching issue:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
