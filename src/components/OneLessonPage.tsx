'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { lessonAttendanceStart } from '@/types/classType';
import { time } from 'console';

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


  const [infoAboutAttendanceSession, setinfoAboutAttendanceSession] = useState<any>('');
  const [QRGenerated, setQRGenerated] = useState<any>('');

  const [expirationTime, setExpirationTime] = useState<any>(0);

  const [MinutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [timerStarted, setTimerStarted] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  const [viewInfo,setViewInfo]=useState(false);

  // lesson we are currently on
  const lessonId = params.lessonId;

  const { getToken } = useAuth();

  const generateNewSession = async () => {

    if(secondsLeft!==0){
      setViewInfo(true);
      return;
    }
    const userToken = await getToken();

    const infoAboutQrCode = await getDataFromBackend(userToken, lessonId);

    if (!infoAboutQrCode) {
      alert('Couldnt get data, try again.');
      return;
    }
    const QRCODE = await getQRCode(infoAboutQrCode?.token ?? null);
    setinfoAboutAttendanceSession(infoAboutQrCode);
    setQRGenerated(QRCODE);
    setExpirationTime(infoAboutQrCode?.expiresAt);

    // SETTING THE TIME!
    const exp = new Date(infoAboutQrCode.expiresAt).getTime();

    const now = Date.now();

    const diffMs = exp - now;

    const diffSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSec / 60);

    setMinutesLeft(minutes);
    setSecondsLeft(diffSec);
    setTimerStarted(true);
  };

  useEffect(() => {
    if (timerStarted === false) return;

    const interval = setInterval(() => {
      // if less thank 1 we reset
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerStarted(false);
          setFirstRender(false);
          setViewInfo(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timerStarted]);

  console.log(QRGenerated);
  return (
    <>
      (
      <div className=" flex flex-col items-center justify-center ">
        <button onClick={() => generateNewSession()}>Click me</button>
        {viewInfo==false?null:<p>You can reset the QR code after the time ends!</p>}

        {infoAboutAttendanceSession ? (
          <p>{JSON.stringify(infoAboutAttendanceSession, null, 2)}</p>
        ) : (
          <p style={{ color: 'red' }}>You haven't generated the qr code yet</p>
        )}

        <img src={QRGenerated.qr} className=" w-[300px] h-[300px]"></img>

        <p>{expirationTime}</p>
        <p>{MinutesLeft}</p>
        {secondsLeft != 0 || firstRender == true ? secondsLeft : <p>Time has ended</p>}
      </div>
      )
    </>
  );
};

