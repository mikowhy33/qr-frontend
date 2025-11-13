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
