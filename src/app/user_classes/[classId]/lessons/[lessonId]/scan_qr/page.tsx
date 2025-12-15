'use client';


import { QrScanner } from '@/components/scanQRstudent';
import { scanAttendance } from '@/services/api';
import { attendanceScan } from '@/types/classType';
import { useAuth } from '@clerk/nextjs';
import { Html5QrcodeScanner } from 'html5-qrcode';


import { useState } from 'react';

export default function scanQR() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // qrtoken that has been given to us in a token from the qr!
  // we are just defining what we want to do with it
  const handleScanSuccess = async (qrToken: string) => {
    setError(null);

    try {
      // scanning from our generic func in services/api
      const data2: attendanceScan | null = await scanAttendance(qrToken);

      if (!data2) {
        throw new Error('Couldnt get the presence. Possible Server error');
      }

      setScanResult(`Congratulations! ${data2.message} for lesson ${data2.lessonId}  ${data2.status}  `);
      return data2;
    } catch (err: any) {
      let msg = err.message;
      console.error(err);

      if (msg.includes('Already checked in')) {
        msg = 'You have alreadey checked in! ✅';
      }

      setError(msg);
    }
  };

  function onScanFailure(error: string) {
    
  }

  return (
    <>
      <div className="mx-auto mb-2">Please scan the qr Code to mark your attendance</div>

      <QrScanner onScanSuccess={handleScanSuccess} onScanError={onScanFailure}></QrScanner>
      <div className="flex flex-col items-center">
        {error && <p className="text-red-500">Error: {error}</p>}
        {scanResult && <p className="text-green-500">{scanResult}</p>}
      </div>
    </>
  );
}
