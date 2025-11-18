
import AttendanceTable from '@/components/AttendanceTable';
import { OneLessonPage } from '@/components/OneLessonPage';
import { lessonAttendanceStart } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';

type lessonType = {
  params: {
    lessonId: string;
  };
};

export default async function StronaGlowna({ params }: lessonType) {
  const { lessonId } = await params;

  return (
    <>
      <AttendanceTable lessonId={lessonId}></AttendanceTable>
      <OneLessonPage lessonId={lessonId}></OneLessonPage>
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
