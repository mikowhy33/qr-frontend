
import AccessDenied from '@/components/ActionDenied';
import AttendanceTable from '@/components/AttendanceTable';
import { OneLessonPage } from '@/components/OneLessonPage';
import { getUserRole } from '@/services/api';
import { lessonAttendanceStart } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type lessonType = {
  params: {
    lessonId: string;
  };
};

export default async function StronaGlowna({ params }: lessonType) {
  const { lessonId } = await params;

  const data = await getUserRole();

  if (!data) {
     
     // no data redirect to homepage 
      return redirect('/');
    }
  
    // student has no right to get to the classCreationForm, if somehow he gets here 
    // he will be redirected to a special component which will send him to a homepage after 5 secs (user friendly info)
    if (data.role === 'student') {
      return <AccessDenied/>

    }
  return (
    <>
      <AttendanceTable lessonId={lessonId}></AttendanceTable>
      <OneLessonPage lessonId={lessonId}></OneLessonPage>
    </>
  );
}


