'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const [secondsLeft, setSecondsLeft] = useState(5);

  const router = useRouter();

  // cannot mix responsibilities of states one is responsible for one thing, we cant end counting in one
  // and at the same time redirect!

  //  one state for counting 
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  // other for redirecting
  useEffect(() => {
    if (secondsLeft === 0) {
      router.push('/');
    }
  }, [secondsLeft, router]);
  return (
    <>
      <div className="flex flex-col items-center justify-center  p-4 text-center">
        <p className="text-xl font-semibold text-red-600">ACCESS DENIED! ⛔</p>
        <p className="mt-2 text-gray-600">You dont have access to this page in {secondsLeft} seconds you will be redirected.</p>
      </div>
    </>
  );
}
