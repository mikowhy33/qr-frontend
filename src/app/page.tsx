import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// function to get things from backend
async function getDataFromBackend(token: string | null) {
  // if we dont have a token err
  if (!token) {
    throw new Error('No token!');
  }

  // in future has 2 change, prob hosted on vercel
  const API_URL = 'http://localhost:3000/api/classes';

  console.log(`[Frontend Server]  ${API_URL}`);

  try {
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

    // if all ok
    return res.json();
  } catch (error) {
    console.error('[Frontend Server] fetching issue:', error);
    return null; // if issue we return null
  }
}

// main page component

export default async function StronaGlowna() {
  // we get the authentication object, has 2 be awaites
  const authObject = await auth();

  // double-check if were logged in (we should be bcs middleware is working but is a double-check)
  if (!authObject.userId) {
    return NextResponse.redirect('/sign-in');
    // return <div>You are not logged in</div>;
  }

  // we're logged in, we getting the token
  // token is created based on a user session
  const token = await authObject.getToken();

  // we use our function to get the data
  const myClasses = await getDataFromBackend(token);

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
