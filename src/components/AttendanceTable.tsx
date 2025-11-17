'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

import { useEffect, useRef, useState } from 'react';
import { LessonAttendance } from '@/types/classType';
import { getLessonAttendance } from '@/services/api';

export default function AttendanceTable(params: any) {
  const [lessonAttendanceInfo, LessonsetAttendanceInfo] = useState<LessonAttendance | null>(null);

  const buttonRef = useRef<any>('');

  const refreshDataAttendance = async () => {
    // fetch to services/api for our attendance!
    const dataAttendance: LessonAttendance | null = await getLessonAttendance(params.lessonId);

    LessonsetAttendanceInfo(dataAttendance);
  };

  // button will be refreshed every 10 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     buttonRef.current.click();
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      <button onClick={refreshDataAttendance} ref={buttonRef}>
        Refresh the attendance manually
      </button>
      <p>{lessonAttendanceInfo?.lessonId}</p>

      <div className="bg-gray-100 p-4 m-4 rounded border border-red-500">
        <p className="font-bold text-red-500">DEBUGGER :</p>
        <pre className="text-xs overflow-auto">{JSON.stringify(lessonAttendanceInfo, null, 2)}</pre>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <Table className="max-w-6xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Present</TableHead>
              <TableHead className="text-right">Time arrived</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lessonAttendanceInfo?.attendees.map((stud) => (
              <TableRow key={stud.studentId}>
                <TableCell className="font-medium">{stud.studentId}</TableCell>
                <TableCell>{stud.name}</TableCell>
                <TableCell>{stud.status}</TableCell>
                <TableCell className="text-right">{stud.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
