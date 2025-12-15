
import AttendanceTable from '@/components/AttendanceTable';
import { OneLessonPage } from '@/components/OneLessonPage';
import { lessonAttendanceStart } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';

type lessonType = {
  searchParams: {
    lessonId: string;
  };
};

export default async function StronaGlowna({ searchParams }: lessonType) {
  const { lessonId } = await searchParams;

  return (
    <>
      <AttendanceTable lessonId={lessonId}></AttendanceTable>
      <OneLessonPage lessonId={lessonId}></OneLessonPage>
    </>
  );
}
