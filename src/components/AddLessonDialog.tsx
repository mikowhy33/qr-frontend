'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { LessonCreationForm } from './LessonsForm';

type ClassId = {
  classId: string;
};

export const AddLessonDialog = ({ classId }: ClassId) => {
  const searchParams = useSearchParams();
  // console.log(searchParams);

  // const decoded=decodeURIComponent(searchParams)

  const searchParCut = searchParams.get('className');

  const [showTheForm, setShowTheForm] = useState(false);

  return (
    <>
      <div className='w-max-md lg:w-md'>
        <button
          className="w-full h-full min-h-18 max-w-sm flex flex-col items-center text-center m-2 p-2 rounded-2xl
             cursor-pointer hover:scale-105 transition-transform duration-300 bg-indigo-50/50 border border-indigo-100"
          onClick={() => setShowTheForm((prev) => !prev)}
        >
          Click to create new lesson for class: <strong>{searchParCut}</strong>{' '}
        </button>

        {showTheForm===true?<LessonCreationForm classId={classId} setShowTheForm={setShowTheForm}></LessonCreationForm>:null}

      </div>
    </>
  );
};
