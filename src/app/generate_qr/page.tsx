import { lessonAttendanceStart } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';

type lessonType = {
  searchParams: {
    lessonId: string;
  };
};

async function getDataFromBackend(token: string | null, lessonId: string) {
  // fetch to our next.js backend

  const res = await fetch(`http://localhost:3001/api/get_qr_code?lessonId=${lessonId}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return [];
  }

  const data: lessonAttendanceStart = await res.json();

  return data;
}

export default async function StronaGlowna({ searchParams }: lessonType) {
  const { lessonId } = await searchParams;

  // we got our authObj
  const authObj = await auth();

  const userToken = await authObj.getToken();

  const myClasses = await getDataFromBackend(userToken, lessonId);

  // console.log(userToken)
  // console.log(lessonId)
  return (
    <>
      <div>{myClasses ? <pre>{JSON.stringify(myClasses, null, 2)}</pre> : <p style={{ color: 'red' }}>Couldnt get the QR token</p>}</div>
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
