import { auth } from '@clerk/nextjs/server';

// in future dynamic
let classId = 'cmhud37ns0001ezk4td8gdasc';

export async function getAllClassesId(myClasses: any) {
  classId = myClasses.map((c: any) => c.id);
  console.log(classId); // ["cmhud37ns0001ezk4td8gdasc"]
}

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

  if (!data || !Array.isArray(data)) {
    return <></>;
  }

  return (
    <>
      {data.map((item, idx) => (
        <div key={idx}>
          <p>{typeof item === 'string' ? item : JSON.stringify(item)}</p>
        </div>
      ))}
    </>
  );
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
