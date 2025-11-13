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

  // we receive the qr code
  const data = await res.json();

  return data;
}

export const OneLessonPage = (params: any) => {
  // const lessonToken = params.lessonToken;
  // const expirationDate = params.expirationDate;

  const [infoAboutAttendanceSession, setinfoAboutAttendanceSession] = useState<any>('');
  const [QRGenerated, setQRGenerated] = useState<any>('');

  // lesson we are currently on
  const lessonId = params.lessonId;

  const { getToken } = useAuth();

  const generateNewSession = async () => {
    const userToken = await getToken();

    const infoAboutQrCode = await getDataFromBackend(userToken, lessonId);

    const QRCODE = await getQRCode(infoAboutQrCode?.token ?? null);
    setinfoAboutAttendanceSession(infoAboutQrCode);
    setQRGenerated(QRCODE);
  };

  console.log(QRGenerated);
  return (
    <>
      <div className=" flex flex-col items-center justify-center ">
        <button onClick={() => generateNewSession()}>Click me</button>
        {infoAboutAttendanceSession ? (
          <p>{JSON.stringify(infoAboutAttendanceSession, null, 2)}</p>
        ) : (
          <p style={{ color: 'red' }}>You haven't generated the qr code yet</p>
        )}
        <img src={QRGenerated.qr} className=" w-[300px] h-[300px]"></img>

      </div>
    </>
  );
};
