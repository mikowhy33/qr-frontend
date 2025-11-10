import { auth } from '@clerk/nextjs/server';

// in future dynamic
const classId = 'class_abc123';

async function getLessonAttendancefunc(token: string | null) {
  if (!token) {
    throw new Error('No token has been aquired');
  }

  const apiURL = `http://localhost:3000/api/classes/${classId}/lessons`;

  try {
    const res = await fetch(apiURL, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store', // always fresh data
    });

    if (!res.ok) {
      let errData;
      try {
        errData = await res.json();
      } catch {
        errData = await res.text();
      }
      console.error('Backend error:', res.status, errData);
      return null; // zamiast rzucać
    }

    return res.json();
  } catch (e) {
    console.log(`ERROR WITH FETCHNG! ${e}`);
    return null;
  }
}

export default async function getLessonAttendance() {
  const authObj = await auth();

  const token = await authObj.getToken();

  const data = await getLessonAttendancefunc(token);

  return <>{data}</>;
}

/*

 const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // cache: 'no-store' always fresh data
      cache: 'no-store',

*/
