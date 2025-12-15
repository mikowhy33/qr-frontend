'use client';

import { useState } from 'react';
import { StudentEnrollForm } from './StudentEnrollForm';


type Props = {
  classId: string;
};

export const AddStudent = ({ classId }: Props) => {
  const [showForm, setShowTheForm] = useState<boolean>(false);

  return (
    <>
      <div className="w-max-md lg:w-md">
        <button
          className="w-full max-w-sm min-h-18 flex flex-col items-center text-center m-2 p-2 rounded-2xl
              cursor-pointer hover:scale-105 transition-transform duration-300 bg-indigo-50/50 border border-indigo-100"
          onClick={() => setShowTheForm((prev) => !prev)}
        >
          <strong className="my-auto">Click to enroll students to this class</strong>
        </button>

        {showForm && (
          <>
            <StudentEnrollForm classId={classId} showTheForm={setShowTheForm}></StudentEnrollForm>
           
          </>
        )}
      </div>
    </>
  );
};
