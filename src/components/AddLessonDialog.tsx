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

  // na przycisk delegujemy a jak nie to nie

  return (
    <>
      <div>
        <button
          className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 rounded-2xl
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
