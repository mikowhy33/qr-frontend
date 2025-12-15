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

  // button will be refreshed every 10 seconds!
  useEffect(() => {
    const interval = setInterval(() => {
      buttonRef.current.click();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/*  our box telling all below centered giving space and ofc max-w  */}
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <div className="flex flex-col items-start ml-2  justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight ">Attendance List</h2>
          <button
            onClick={refreshDataAttendance}
            ref={buttonRef}
            className=" 
                    rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
                    focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                    border border-input bg-background shadow-sm  hover:bg-gray-100 hover:text-accent-foreground h-9 px-4 py-2"
          >
            Refresh the attendance manually
          </button>
          <p>{lessonAttendanceInfo?.lessonId}</p>
        </div>

        <div className=" flex flex-col justify-center items-center">
          <Table className="max-w-6xl mx-auto overflow-y-auto">
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
                  <TableCell className="font-medium font-mono text-xs text-gray-500">{stud.studentId}</TableCell>
                  <TableCell>{stud.name}</TableCell>
                  <TableCell>
                 
                    <p className="bg-green-400 rounded  w-fit px-1 py-0.5 font-semibold ">{stud.status}</p>
                  </TableCell>
                  <TableCell className="text-right text-gray">
                    {' '}
                    {new Date(stud.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-gray-100 p-4 m-4 rounded border border-red-500">
          <p className="font-bold text-red-500">DEBUGGER :</p>
          <pre className="text-xs overflow-auto max-h-[100px]">{JSON.stringify(lessonAttendanceInfo, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
