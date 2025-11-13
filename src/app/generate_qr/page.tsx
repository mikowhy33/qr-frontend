import { OneLessonPage } from '@/components/OneLessonPage';
import { lessonAttendanceStart } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';

type lessonType = {
  searchParams: {
    lessonId: string;
  };
};

async function getDataFromBackend(token: string | null, lessonId: string) {
  // fetch the token and expiration date from our next.js backend
  const res = await fetch(`http://localhost:3001/api/get_qr_code_info?lessonId=${lessonId}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return null;
  }

  const data: lessonAttendanceStart = await res.json();

  return data;
}

async function getQRCode(token: string | null) {
  const res = await fetch(`http:localhost:3001/api/QR_code_GENERATION?token=${token}`, {
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

export default async function StronaGlowna({ searchParams }: lessonType) {
  const { lessonId } = await searchParams;

  // we got our authObj
  const authObj = await auth();

  const userToken = await authObj.getToken();

  // we get info about token which is the token itself and when it expires
  const infoAboutQrCode = await getDataFromBackend(userToken, lessonId);

  const lessonToken = infoAboutQrCode?.token;
  const expirationDate=infoAboutQrCode?.expiresAt;

  // qr code generated based on the token we got for the lesson
  // MOVED TO A COMPONENT IN A WHILE!
  const qrGenerated = await getQRCode(lessonToken??null);

  // console.log(userToken)
  // console.log(lessonId)
  return (
    <>
      <div>
        {infoAboutQrCode ? <pre>{JSON.stringify(infoAboutQrCode, null, 2)}</pre> : <p style={{ color: 'red' }}>Couldnt get the QR token</p>}

        <img src={qrGenerated.qr}></img>
      </div>

      <OneLessonPage lessonToken={lessonToken} expirationDate={expirationDate}></OneLessonPage>
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
