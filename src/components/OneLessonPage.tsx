'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { lessonAttendanceStart } from '@/types/classType';

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
  const res = await fetch(`http://localhost:3001/api/QR_code_GENERATION?token=${token}`, {
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

export const OneLessonPage = (params: any) => {
  // const lessonToken = params.lessonToken;
  // const expirationDate = params.expirationDate;

  const [testSPY, setSPY] = useState<any>('');
  const [QRGenerated, setQRGenerated] = useState<any>('');

  const lessonId = params.lessonId;

  const { getToken } = useAuth();

  const generateMEEEDIC = async () => {
    const userToken = await getToken();

    const infoAboutQrCode = await getDataFromBackend(userToken, lessonId);

    const QRCODE = await getQRCode(infoAboutQrCode?.token ?? null);
    setSPY(infoAboutQrCode);
    setQRGenerated(QRCODE);
  };

  console.log(QRGenerated);
  return (
    <>
      <p style={{ color: 'red' }}>Nie udało się załadować kodu QR.</p>

      {/* <div>{lessonToken}</div>
      <div>{expirationDate}</div>

      <button onClick={() => getQRCode(lessonToken)}>Click me</button> */}

      {/* <img src={QRGenerated.qr} className="w-[300px] h-[300px]"></img> */}

      <div>BZBZBZBZZB</div>
      <button onClick={() => generateMEEEDIC()}>Click me</button>
      {testSPY ? <pre>{JSON.stringify(testSPY, null, 2)}</pre> : <p style={{ color: 'red' }}>Couldnt get the QR token</p>}

      <div className=' flex align-center justify-center'>
        <img src={QRGenerated.qr} className=" w-[300px] h-[300px]"></img>
      </div>
    </>
  );
};
