import { AddLessonDialog } from '@/components/AddLessonDialog';
import { AddStudent } from '@/components/AddStudent';
import { DeleteClass } from '@/components/DeleteClass';
import { GenericList } from '@/components/Displaying_classes_lessons';
import { LessonCreationForm } from '@/components/LessonsForm';
import { Card } from '@/components/ui/card';
import { getLessons, getUserRole } from '@/services/api';
import { lessonInfo, userInfo } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// were getting the params from the link (after? are search params but were not using that)
// ex http://localhost:3001/user_classes/cmhywp2a80001ezkck7e43hf1
export default async function getLessonAttendance({ params }: { params: { classId: string } }) {
  // awaiting classId from params we have in web
  const { classId } = await params;

  const lessons = await getLessons(classId);

  const userRole = await getUserRole();


  

  if (!lessons) {
    return <p>Server error...</p>;
  }

  if (!userRole) {
    return <p>Server error</p>;
  }

  return (
    <>
      {/* cala strona podsiadajaca komponent */}
      {userRole.role == 'teacher' && lessons ? (
        <>
         <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            <AddLessonDialog classId={classId}></AddLessonDialog>
            <DeleteClass classId={classId}></DeleteClass>
            <AddStudent classId={classId}></AddStudent>
          </div>
          <GenericList items={lessons} getLink={(cls) => `/user_classes/${classId}/lessons/${cls.id}`}></GenericList>
        </>
      ) : (
        <>
          <GenericList items={lessons} getLink={(cls) => `/user_classes/${classId}/lessons/${cls.id}/scan_qr`}></GenericList>
        </>
      )}
    </>
  );
}

/*

 const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // cache: 'no-store' always fresh data
      cache: 'no-store',

*/
