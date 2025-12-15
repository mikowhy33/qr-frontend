'use client';
import { enrollStudent } from '@/services/api';
import { useEffect, useState } from 'react';

type Props = {
  classId: string;
  showTheForm: (val: boolean) => void;
  fetchAllStudents: () => void;
};

export const StudentEnrollmentForm = ({ classId, showTheForm, fetchAllStudents }: Props) => {
  const [infoFromBackend, setInfoFromBackend] = useState<any>();

  
  useEffect(() => {
    fetchAllStudents();
  }, []);

  const submitform = async (formdData: FormData) => {
    const userId = formdData.get('userID') as string;
    const userName = formdData.get('usersname') as string;
    const userEmail = formdData.get('usersemail') as string;

   

    const data = await enrollStudent(classId, userId, userName, userEmail);

    if (!data) {
      throw new Error('Couldnt create the lesson');
    }
    setInfoFromBackend(data);
   
    fetchAllStudents();
  };

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className=" bg-white max-w-md w-full  p-6 rounded-2xl shadow-2xl border border-slate-200 ">
        <div className="flex justify-end ">
          <button onClick={() => showTheForm(false)} className="cursor-pointer">
            {' '}
            ✕ Close
          </button>
        </div>
        <form
          
          action={submitform}
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="userId">userId: </label>
            <input
              type="text"
              id="userId"
              name="userID"
              required
              className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 
              `}
            />

            <label htmlFor="userName">name of student: </label>
            <input
              type="text"
              id="userName"
              name="usersname"
              required
              className={`w-full py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 
              `}
            />

            <label htmlFor="userEmail">student's email: </label>
            <input
              type="text"
              id="userEmail"
              name="usersemail"
              required
              className={`w-full py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 
              `}
            />

            <button
              type="submit"
              className=" className=w-full flex justify-center py-3 mt-2  border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md hover:shadow-lg"
            >
              Submit form
            </button>
          </div>
        </form>
        {infoFromBackend && (
          <div className="mt-8 p-4 z-500 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            <p className="font-bold text-green-600">Success! User enrolled! 🎉</p>
          </div>
        )}
      </div>
    </>
  );
};
