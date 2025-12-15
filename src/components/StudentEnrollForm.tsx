'use client';

import { enrollStudent, getAllStudents } from '@/services/api';
import { Student, SuccessResponseCreatedLesson } from '@/types/classType';
import { format } from 'path';
import { ChangeEvent, use, useEffect, useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { StudentEnrollmentForm } from './StudentEnrollmentForm';
import { ListOfAllStudents } from './ListOfAllStudents';

type Props = {
  classId: string;
  showTheForm: (val: boolean) => void;
};

export const StudentEnrollForm = ({ classId, showTheForm }: Props) => {
  const [listOfStudentsInDataBase, setListOfStudentsInDataBase] = useState<Student[] | null>(null);

  const fetchingStudents = async () => {
    const data = await getAllStudents();
    console.log(data);
    setListOfStudentsInDataBase(data);
  };

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

        <ListOfAllStudents listOfAllStudentsInDataBase={listOfStudentsInDataBase}></ListOfAllStudents>
      </div>
    </>
  );
};
