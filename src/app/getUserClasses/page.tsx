import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getAllClassesId } from '../get_lessons_by_class/page';
import { json } from 'stream/consumers';

async function getClasses(token: string | null) {
  if (!token) {
    console.error('You cant get classes without a token');
    return [];
  }

  const res = await fetch('http://localhost:3001/api/get_classes', {
    cache: 'no-store',
    // we pass the token
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return [];
  }

  return res.json();
}

// main component
export default async function StronaGlowna() {
  // we get the authentication object, has 2 be awaited
  const authObject = await auth();

  // not logged in no access!
  if (!authObject.userId) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // we're logged in, we getting the token
  // token is created based on a user session
  const token = await authObject.getToken();

  // if we dont have a token err
  if (!token) {
    throw new Error('No token!');
  }

  // function to get all classes!
  const myClasses = await getClasses(token);

  // we render the data
  return (
    <div>
      <h1>Classes</h1>
      <p>
        Data from <strong>{`http://localhost:3000/api/classes`}</strong>:
      </p>

      {myClasses ? (
        // Data as JSON
        <pre>{JSON.stringify(myClasses, null, 2)}</pre>
      ) : (
        // if issue
        <p style={{ color: 'red' }}>Data couldnt be fetched, check server</p>
      )}
    </div>
  );
}
