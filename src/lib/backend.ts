import { auth } from '@clerk/nextjs/server';

// our real backend url! IN PRODUCTION THIS HAS TO CHANGE, THIS IS OFC THE SERVER ADDRESS!
const BACKEND_URL = 'http://localhost:3000';

// generic function!

// options by default a {}
// RequestInit is a type containing all possible setting we can parse to a fetch, it can have get, post body, headers etc
export async function backendFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  // automated authorization, were getting the authentication object, and then we get a token out of it

  const authObj = await auth();
  const token = await authObj.getToken();

  if (!token) {
    console.error('BACKEND ERROR, no token or user not logged in');
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    // A POSSIBILITY TO OVERRIDE THE HEADERS IF NEEDED!
    ...options.headers,
  };

  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store', // always fresh data
    });

    if (!res.ok) {
      console.error(`BACKEND ERROR, ${res.status} for ${endpoint}`, await res.text());
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`BACKEND CRITICAL ERROR! ${endpoint} `, error);
    return null;
  }
}


