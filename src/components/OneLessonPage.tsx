'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export const OneLessonPage = (params: any) => {
  
  const lessonToken=params.lessonToken;
  const expirationDate=params.expirationDate;

  
  const [QRGenerated,setQRGenerated]=useState<any>('')

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

      <button onClick={()=>getQRCode(lessonToken)}>Click me</button>

      <img src={QRGenerated.qr} className='w-[300px] h-[300px]'></img>
      
    </>
  );
};
