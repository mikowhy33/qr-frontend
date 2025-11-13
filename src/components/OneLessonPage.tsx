'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { lessonAttendanceStart } from '@/types/classType';

export const OneLessonPage = (params: any) => {
  const lessonToken = params.lessonToken;
  const expirationDate = params.expirationDate;
  const { getToken } = useAuth();

  const[testAids,setTestAids]=useState<any>('');

  const lessonId = params.lessonId;

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

  let infoAboutQrCode;
  const generateADISBOOGERSSHIT = async () => {

    const userToken = await getToken();

    infoAboutQrCode = await getDataFromBackend(userToken, lessonId);

    setTestAids(infoAboutQrCode);
  };

  const [QRGenerated, setQRGenerated] = useState<any>('');

  async function getQRCode(token: string | null) {
    const res = await fetch(`http://localhost:3001/api/QR_code_GENERATION?token=${token}`, {
      cache: 'no-store',
    });

    const data = await res.json();

    setQRGenerated(data);
  }

  console.log(QRGenerated);
  return (
    <>
      <p style={{ color: 'red' }}>Nie udało się załadować kodu QR.</p>

      <div>{lessonToken}</div>
      <div>{expirationDate}</div>

      <button onClick={() => getQRCode(lessonToken)}>Click me</button>

      <img src={QRGenerated.qr} className="w-[300px] h-[300px]"></img>

      <div>AIDS BOOGERS SHIT NIG</div>
      <button onClick={() => generateADISBOOGERSSHIT()}>Click me</button>
      {testAids ? <pre>{JSON.stringify(testAids, null, 2)}</pre> : <p style={{ color: 'red' }}>Couldnt get the QR token</p>}


      <img src={testAids.qr} className="w-[300px] h-[300px]"></img>
    </>
  );
};
