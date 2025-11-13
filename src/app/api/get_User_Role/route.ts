import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  const userToken = request.nextUrl.searchParams.get('userToken');

  const res = await fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data=await res.json();

  return NextResponse.json(data);
}
