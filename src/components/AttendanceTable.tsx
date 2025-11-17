'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

import { useEffect, useRef, useState } from 'react';
import { LessonAttendance } from '@/types/classType';

async function getAttendance(lessonId: string) {
  const res = await fetch(`http://localhost:3001/api/get_lesson_attendance?lessonId=${lessonId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return [];
  }

  const data = await res.json();

  console.log(data);

  return data;
}

export default function AttendanceTable(params: any) {
  const [lessonattendanceInfo, LessonsetAttendanceInfo] = useState<LessonAttendance | null>(null);

  const buttonRef = useRef<any>('');

  const refreshDataAttendance = async () => {
    const dataattendance: LessonAttendance = await getAttendance(params.lessonId);
    console.log(dataattendance + 'ATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTENDAAANCE');
    LessonsetAttendanceInfo(dataattendance);
  };

  // button will be refreshed every 10 seconds
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
      <button onClick={refreshDataAttendance} ref={buttonRef}>
        Refresh the attendance manually
      </button>
      <p>{lessonattendanceInfo?.lessonId}</p>
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
            {lessonattendanceInfo?.attendees.map((stud) => (
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
