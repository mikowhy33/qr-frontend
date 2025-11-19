'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

import { useEffect, useRef, useState } from 'react';
import { LessonAttendance } from '@/types/classType';
import { getLessonAttendance } from '@/services/api';

export default function AttendanceTable(params: any) {
  const [lessonAttendanceInfo, LessonsetAttendanceInfo] = useState<LessonAttendance | null>(null);

  const buttonRef = useRef<any>('');

  const refreshDataAttendance = async () => {
    // fetch to services/api for our attendance!
    const dataAttendance: LessonAttendance | null = await getLessonAttendance(params.lessonId);

    LessonsetAttendanceInfo(dataAttendance);
  };

  // button will be refreshed every 10 seconds!
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     buttonRef.current.click();
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      <button onClick={refreshDataAttendance} ref={buttonRef}>
        Refresh the attendance manually
      </button>
      <p>{lessonAttendanceInfo?.lessonId}</p>

      <div className="bg-gray-100 p-4 m-4 rounded border border-red-500">
        <p className="font-bold text-red-500">DEBUGGER :</p>
        <pre className="text-xs overflow-auto">{JSON.stringify(lessonAttendanceInfo, null, 2)}</pre>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <Table className="max-w-6xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Present</TableHead>
              <TableHead className="text-right">Time arrived</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lessonAttendanceInfo?.attendees.map((stud) => (
              <TableRow key={stud.studentId}>
                <TableCell className="font-medium">{stud.studentId}</TableCell>
                <TableCell>{stud.name}</TableCell>
                <TableCell>{stud.status}</TableCell>
                <TableCell className="text-right">{stud.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}




/*

export const OneLessonPage = (params: any) => {


  const [QRGenerated, setQRGenerated] = useState<any>('');
  const [expirationTime, setExpirationTime] = useState<any>(0);
  const [MinutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [viewInfo, setViewInfo] = useState(false);
  
  const lessonId = params.lessonId;
  const [infoAboutStartOfAttendance, setinfoAboutStartOfAttendance] = useState<lessonAttendanceStart | null>();

  const generateNewSession = async () => {
    if (secondsLeft !== 0) {
      setViewInfo(true);
      return;
    }

    const QRCodeBasedInfo = await startAttendtance(lessonId);

    if (!QRCodeBasedInfo) {
      alert('Couldnt get data, try again.');
      return;
    }

    setinfoAboutStartOfAttendance(QRCodeBasedInfo);
    const QRCODE = await getQRCode(QRCodeBasedInfo?.token ?? null);
    setQRGenerated(QRCODE);
    setExpirationTime(QRCodeBasedInfo?.expiresAt);

    const exp = new Date(QRCodeBasedInfo.expiresAt).getTime();
    const now = Date.now();
    const diffMs = exp - now;
    const diffSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSec / 60);

    setMinutesLeft(minutes);
    setSecondsLeft(diffSec);
    setTimerStarted(true);
    // Ukrywamy ostrzeżenie po udanym starcie
    setViewInfo(false); 
  };

  useEffect(() => {
    if (timerStarted === false) return;

    const interval = setInterval(() => {
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
  
  // Sprawdzamy czy przycisk powinien być aktywny
  const isButtonDisabled = secondsLeft !== 0 && !firstRender;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      
{

//       <div className="flex flex-col items-center justify-center gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
//         
//         <button
//           onClick={() => generateNewSession()}
//           disabled={isButtonDisabled}
//           className={`
//             relative px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300
//             flex items-center gap-2
//             ${isButtonDisabled 
//               ? 'bg-slate-400 cursor-not-allowed opacity-80' 
//               : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1 active:scale-95'
//             }
//           `}
//         >
//         
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75zM16.5 19.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75z" />
//           </svg>
          
//           {isButtonDisabled ? `Wait ${secondsLeft}s` : 'Generate QR Code'}
//         </button>

//       
//         {viewInfo && (
//           <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 animate-pulse">
//             ⚠️ You can reset the QR code after the time ends!
//           </div>
//         )}

//        
        <div className={`transition-all duration-500 ${QRGenerated ? 'opacity-100 scale-100' : 'opacity-50 scale-95 blur-sm'}`}>
            {QRGenerated ? (
                 <img 
                    src={QRGenerated.qr} 
                    alt="QR Code"
                    className="w-[300px] h-[300px] rounded-xl border-4 border-slate-800 shadow-2xl"
                 />
            ) : (
                <div className="w-[300px] h-[300px] bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    No QR Code Active
                </div>
            )}
        </div>

//        
//         <div className="text-center space-y-1">
//             <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Time Remaining</p>
//             <p className={`text-4xl font-mono font-bold ${secondsLeft < 10 && secondsLeft > 0 ? 'text-red-600' : 'text-slate-800'}`}>
//                 {(secondsLeft != 0 || firstRender == true) ? `${secondsLeft}s` : "Expired"}
//             </p>
//         </div>
//       </div>

//      
//       <div className="flex justify-center">
//         <button 
//             onClick={() => useTestState((prev) => prev + 1)}
//             className="px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-sm text-sm font-medium flex items-center gap-2"
//         >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
//             </svg>
//             Force Refresh ({testState})
//         </button>
//       </div>
      
//     </div>
//   );
*/