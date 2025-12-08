'use client';

import { deleteAClass } from '@/services/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type ClassId = {
  classId: string;
};

export const DeleteClass = ({ classId }: ClassId) => {
  const searchPar = useSearchParams();

  const searchParams = searchPar.get('className');
  console.log(classId);

  // move to a maybe father component and then display nicely?
  const [isDeleting, setIsDeleting] = useState(false);

  // hook to move the user
  const router = useRouter();

  const DeleteSingleClass = async () => {
    // to make sure someone doesn't click it by accident
    if (!confirm('Are you sure you want to delete this class?')) return;

    setIsDeleting(true);
    try {
      await deleteAClass(classId);

      // pushing user to main page
      router.push('/');
    } catch (error) {
      console.error('Failed to delete class:', error);
      setIsDeleting(false);
      alert('Something went wrong while deleting.');
    }
  };

  return (
    <>
      <div className="w-max-md lg:w-md">
        <button
          className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 rounded-2xl
             cursor-pointer hover:scale-105 transition-transform duration-300 bg-red-200 border border-red-500"
          onClick={DeleteSingleClass}
        >
          Click to delete the class: <strong>{searchParams}</strong>
        </button>
      </div>
    </>
  );
};
