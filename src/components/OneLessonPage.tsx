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

  const [isDisbaled, setIsDisabled] = useState(false);

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
    setIsDisabled(true);
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
          setIsDisabled(false);
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

  // const isButtonDisabled = secondsLeft !== 0 && !firstRender;
  console.log(QRGenerated);
  return (
    <>
      {/* a container that will get all the stuff in good place */}
      <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
        <div>{JSON.stringify(infoAboutStartOfAttendance)}</div>

        {/* we are telling of everything in column and centered, but in addition we use a nice trick of styling which is using a white background, a 
        shadow, and a border which is only 5% darker than the background */}
        <div className=" flex flex-col items-center justify-center gap-6 bg-white rounded-2xl shadow-lg border border-slate-100 ">
          <button
            onClick={() => generateNewSession()}
            // relative is 4 future, doesnt to anything rn, transition- all tells no matter what changes
            // dont do it right away, duration we tell for how it will last
            className={`relative px-8 py-4 my-7 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center gap-2 ${
              isDisbaled
                ? // opacity so its kinda mist
                  'bg-slate-400  opacity-80'
                : // translate we move item up, scale-95 means on active (when we click) it gets little bit smaller
                  'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1 active:scale-90'
            }`}
          >
            Request the QR code
          </button>

          {viewInfo == false ? null : (
            <p className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
              ⚠️ You can reset the QR code after the time ends!
            </p>
          )}

          {/* we are limiting the size of things, aspect-square says no matter what it has to be a square */}
          <div className="w-full max-w-[300px] aspect-square mx-auto my-4">
            {/* has the max width height of parent, anythign changes he will do the animation which will last 500ms */}
            <div className={` w-full h-full transition-all duration-500 ${QRGenerated ? 'opacity-100 scale-100' : 'opacity-50 scale-95 '}`}>
              {QRGenerated ? (
                <img
                  src={QRGenerated.qr}
                  alt="QR Code"
                  // contain so the img (qr code) will always fill the img
                  className="w-full h-full  object-contain  rounded-xl border-4 border-slate-800 shadow-2xl"
                />
              ) : (
                <div className="w-full h-full  bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  No QR Code Active
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-1 mb-4">
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Time Remaining</p>
            <p className={`text-4xl font-mono font-bold ${secondsLeft < 10 && secondsLeft > 0 ? 'text-red-600' : 'text-slate-800'}`}>
              {secondsLeft != 0 || firstRender == true ? `${secondsLeft}s` : 'Expired'}{' '}
            </p>
          </div>
        </div>
        {/* <button onClick={() => useTestState((prev) => prev + 1)}>Refresh</button>
        <div>{testState}zz</div> */}
      </div>
    </>
  );
};
