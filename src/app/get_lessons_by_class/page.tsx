import { Card } from '@/components/ui/card';
import { getLessons, getUserRole } from '@/services/api';
import { lessonInfo, userInfo } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';





export default async function getLessonAttendance({ searchParams }: { searchParams: { classId: string } }) {


  const { classId } = await searchParams;

  const lessons= await getLessons(classId);
  
  const userRole=await getUserRole();

  if(!lessons){
    return <p>Server error...</p>;
  }

  if(!userRole){
    return <p>Server error</p>
  }

  return (
    <>
      {userRole.role == 'teacher' && lessons ? (
        <>
          {/* Object.entries to make from a obj a table of little tables [key]:value
          
          ex:
          const user = 
          {
            name: "Joe",
            age: 30,
          };
          
          after enties:
          [
            [ "name", "Miki" ],
            [ "age", 30 ],
            [ "isStudent", false ]
          ]
          */}
          <div>{userRole.role}</div>
          <div className="flex flex-wrap justify-center gap-8 m-4 ">
            {lessons.map((lesson, index) => (
              <Card
                // asChild allows to take all styles and formats from Card but behaves as a link, whole card is clickable not only the link
                asChild
                key={index}
                className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* we pass the lesson id, for which the qr code shall be generated */}
                <Link href={`/generate_qr?lessonId=${lesson.id}`}>
                  {Object.entries(lesson).map(([key, value]) => (
                    <div key={key} className="p-1">
                      <p key={key}>
                        <strong>{key}</strong>: {value}
                      </p>
                    </div>
                  ))}
                </Link>
                {/* <p key={index}>{lesson.id}</p> */}
              </Card>
            ))}
          </div>
        </>
      ) : (
     
        <>
          <div className="flex flex-wrap justify-center gap-8 m-4 ">
            {lessons.map((lesson, index) => (
              <Card
                asChild
                key={index}
                className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* we pass the lesson id, for which the qr code shall be generated */}
                <Link href={`/scan_qr`}>
                  {Object.entries(lesson).map(([key, value]) => (
                    <div key={key} className="p-1">
                      <p key={key}>
                        <strong>{key}</strong>: {value}
                      </p>
                    </div>
                  ))}
                </Link>

                {/* <p key={index}>{lesson.id}</p> */}
              </Card>
            ))}
          </div>
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
