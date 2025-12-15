'use client';

import { enrollStudent, getAllStudents } from '@/services/api';
import { Student, SuccessResponseCreatedLesson } from '@/types/classType';
import { format } from 'path';
import { ChangeEvent, use, useEffect, useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { StudentEnrollmentForm } from './StudentEnrollmentForm';

type Props = {
  classId: string;
  showTheForm: (val: boolean) => void;
};

export const StudentEnrollForm = ({ classId, showTheForm }: Props) => {
  
  const [listOfStudentsInDataBase, setListOfStudentsInDataBase] = useState<Student[] | null>(null);

  //what user inserted into input
  const [searchTerm, setSearchTerm] = useState('');

  const fetchingStudents = async () => {
    const data = await getAllStudents();
    console.log(data);
    setListOfStudentsInDataBase(data);
  };

  const filteredList = listOfStudentsInDataBase?.filter((student) => {
    // empty=show all
    if (searchTerm === '') return true;

    const searchLower = searchTerm.toLowerCase();

    // checking if email/id/name has the text
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div
        // fixed always positions element relative to the browser window, inset-0 will get the background all the way on the screen
        className="fixed top-[64px]  overflow-y-auto right-0 left-0 bottom-0  bg-black/60 backdrop-blur-sm
        flex flex-col items-center gap-6
           lg:flex-row lg:justify-around py-12 px-4 sm:px-6 lg:px-8"
        onClick={() => showTheForm(false)}
      >
        <StudentEnrollmentForm classId={classId} showTheForm={showTheForm} fetchAllStudents={fetchingStudents}></StudentEnrollmentForm>

        <div
          className=" bg-white max-w-md w-full max-h-96 text-center p-6 overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 "
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-6 ">List of ALL students:</p>
          <input
            type="text"
            name=""
            id=""
            className="border mb-4 border-black p-1"
            placeholder="Search by name,email or ID"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p className=" border-b-2 border-black"></p>
          <ScrollArea className="overflow-y-auto">
            <ul className=" pl-5 space-y-8">
              {filteredList?.map((student) => (
                <div key={student.id}>
                  <div className="flex ">
                    <p className="mr-auto font-bold">ID:</p> <p className="ml-auto">{student.id}</p>
                  </div>
                  <div className="flex justify-around">
                    <p className="mr-auto font-bold">Name:</p> <p className="ml-auto">{student.name}</p>
                  </div>
                  <div className="flex justify-around">
                    <p className="mr-auto font-bold">Email:</p> <p className="ml-auto">{student.email}</p>
                  </div>
                  <hr />
                </div>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
