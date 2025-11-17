'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { lessonAttendanceStart } from '@/types/classType';
import { time } from 'console';
import { startAttendtance } from '@/services/api';

// in future fetching maybe on client!
async function getQRCode(token: string | null) {
  // WHILE HOSTING THIS HAS TO CHANGE!!
  const res = await fetch(`http://localhost:3001/api/QR_code_GENERATION`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // we receive the qr code
  const data = await res.json();

  return data;
}

export const OneLessonPage = (params: any) => {
  const [QRGenerated, setQRGenerated] = useState<any>('');

  const [expirationTime, setExpirationTime] = useState<any>(0);

  const [MinutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [timerStarted, setTimerStarted] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  const [viewInfo, setViewInfo] = useState(false);

  // lesson we are currently on
  const lessonId = params.lessonId;

  const [infoAboutStartOfAttendance, setinfoAboutStartOfAttendance] = useState<lessonAttendanceStart | null>();

  // function to generate a new QR Code!
  const generateNewSession = async () => {
    if (secondsLeft !== 0) {
      setViewInfo(true);
      return;
    }

    // starting attendance func services/api
    const QRCodeBasedInfo = await startAttendtance(lessonId);

    
    if (!QRCodeBasedInfo) {
      alert('Couldnt get data, try again.');
      return;
    }

    // now just to show it in future info abt this deleted!
    setinfoAboutStartOfAttendance(QRCodeBasedInfo);

    // were getting a blob with our qr code info
    const QRCODE = await getQRCode(QRCodeBasedInfo?.token ?? null);

    // we set the info inside a hook so that we can use it later
    setQRGenerated(QRCODE);
    
    setExpirationTime(QRCodeBasedInfo?.expiresAt);

    // SETTING THE TIME!
    const exp = new Date(QRCodeBasedInfo.expiresAt).getTime();

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

  const [testState, useTestState] = useState(0);
  console.log(QRGenerated);
  return (
    <>
      <div>{JSON.stringify(infoAboutStartOfAttendance)}</div>

      <div className=" flex flex-col items-center justify-center ">
        <button onClick={() => generateNewSession()}>Request the QR code</button>
        {viewInfo == false ? null : <p className=" text-red-500">You can reset the QR code after the time ends!</p>}

        {infoAboutStartOfAttendance ? <p>{JSON.stringify(infoAboutStartOfAttendance, null, 2)}</p> : <p style={{ color: 'red' }}>You haven't generated the qr code yet</p>}

        <img src={QRGenerated.qr} className=" w-[300px] h-[300px]"></img>

        <p>{expirationTime}</p>
        <p>{MinutesLeft}</p>
        {secondsLeft != 0 || firstRender == true ? secondsLeft : <p>Time has ended</p>}
      </div>

      <button onClick={() => useTestState((prev) => prev + 1)}>Refresh</button>
      <div>{testState}zz</div>
    </>
  );
};
