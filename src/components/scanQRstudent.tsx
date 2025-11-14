'use client'; // To musi być komponent kliencki

import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';


// NOTE IN STRCIT MODE THIS WILL RENDER TWICE, THERE IS NOTHING WE CAN DO ABOUT IT
// ITS THE LIBRARY ISSUE NOT OURS, IN BUILD MODE IT WILL WORK JUST FINE!


type Props = {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (errorMessage: string) => void;
};

export const QrScanner = ({ onScanSuccess, onScanError }: Props) => {
  const qrcodeRegionId = 'html5qr-code-full-region';

  // a reference to a code
  const ref = useRef<Html5QrcodeScanner | boolean>(false);

  useEffect(() => {
    if (ref.current === true) return;

    ref.current = true;

    // we create an instance of the scanner
    const html5QrcodeScanner = new Html5QrcodeScanner(
      // this is the location where it will be rendered
      qrcodeRegionId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false,
    );

    // when rendered render these two functions
    // when function succes we return success when not a failure!
    html5QrcodeScanner.render(
      // when success
      (decodedText, decodedResult) => {
        // decodedText is our qr lessonid!

        // success, we stop scanning
        html5QrcodeScanner.clear();

        // we send it
        onScanSuccess(decodedText);
      },

      // on issue we do nothing
      (errorMessage) => {},
    );

    // cleanup after unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('FAILED TO CLEAR', error);
      });
      ref.current = false;
    };
  }, []);

  return (
    <>
      {/* we return it */}
      <div id={qrcodeRegionId}></div>
    </>
  );
};



