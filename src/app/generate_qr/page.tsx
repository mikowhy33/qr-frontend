import { auth } from '@clerk/nextjs/server';

// in future dynamic
const lessonId = 'les_abc123';

async function getDataFromBackend(token: string | null) {
  // if no token
  if (!token) {
    throw new Error('no token');
  }

  const apiURL = `http://localhost:3000/api/lessons/${lessonId}/attendance/start`;

  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // always fresh data
      cache: 'no-store',
    });

    // if response isnt fine we give an error
    if (!res.ok) {
      let errData;
      try {
        errData = await res.json();
      } catch {
        errData = await res.text();
      }
      console.error('Backend error:', res.status, errData);
      return null; 
    }

    // if res ok we return it
    return res.json();
  } catch (e) {
    console.log(`ERROR WITH FETCHNG! ${e}`);
    return null;
  }
}

export default async function StronaGlowna() {
  // we got our authObj
  const authObj = await auth();

  const userToken = await authObj.getToken();

  // console.log(userToken)

  const myClasses = await getDataFromBackend(userToken);

  return (
    <>
      <div>
        {myClasses ? <pre>{JSON.stringify(myClasses, null, 2)}</pre> : <p style={{ color: 'red' }}>Couldnt get the QR token</p>}
      </div>
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
