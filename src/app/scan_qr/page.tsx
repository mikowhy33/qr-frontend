'use client';

// To use Html5QrcodeScanner (more info below)
import { QrScanner } from '@/components/scanQRstudent';
import { attendanceScan } from '@/types/classType';
import { useAuth } from '@clerk/nextjs';
import { Html5QrcodeScanner } from 'html5-qrcode';

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from 'html5-qrcode';
import { useState } from 'react';

export default function scanQR() {
  
  const { getToken } = useAuth();

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // token that has been given to us is a token from the qr!
  const handleScanSuccess = async (qrToken: string) => {
    setError(null);

    try {
      // we are getting a user token first
      const userToken = await getToken();

      // console.log(userToken + 'BRBRBBR PATAPIM');

      // we do a fetch to a database
      const res = await fetch('http://localhost:3001/api/post_scan_attendance', {
        // bcs were sending body
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },

        body: JSON.stringify({ token: qrToken }), // Token z QR kodu
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setScanResult(`Congratulations ${data.message} for lesson ${data.lessonId}.  ${data.status}  `);
      return data;
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Wystąpił błąd');
    }
  };

  function onScanFailure(error: string) {
    // console.warn(`Code scan error = ${error}`);
  }

  return (
    <>
      <div>brbrpatapim</div>

      <QrScanner onScanSuccess={handleScanSuccess} onScanError={onScanFailure}></QrScanner>
      <div className="flex flex-col items-center">
        {error && <p className="text-red-500">Error: {error}</p>}
        {scanResult && <p className="text-green-500">{scanResult}</p>}
      </div>
    </>
  );
}
