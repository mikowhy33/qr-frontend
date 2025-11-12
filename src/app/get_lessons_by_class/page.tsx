import { Card } from '@/components/ui/card';
import { lessonInfo } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// in future dynamic
let classId = 'cmhud37ns0001ezk4td8gdasc';

export async function getAllClassesId(myClasses: any) {
  classId = myClasses.map((c: any) => c.id);
  console.log(classId); // ["cmhud37ns0001ezk4td8gdasc"]
}

async function getLessonAttendancefunc(token: string | null, classId: string) {
  // no token no ride
  if (!token || classId==undefined) {
    throw new Error('No token has been aquired');
  }

  const res = await fetch(`http://localhost:3001/api/get_lessons?classId=${classId}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return [];
  }

  const data = await res.json();

  return data;
}

export default async function getLessonAttendance({ searchParams }: { searchParams: { classId: string } }) {
  const { classId } = await searchParams;

  // we get the authentication object, has 2 be awaited
  const authObject = await auth();

  // not logged in no access, we redirect to a sign in page
  if (!authObject.userId) {
    return redirect('/sign-in');
    // return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const token = await authObject.getToken();

  const myLessons: lessonInfo = await getLessonAttendancefunc(token, classId);
  // console.log(myLessons);

  return (
    <>
      {myLessons ? (
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
          <div className="flex flex-wrap justify-center gap-8 m-4 ">
            {myLessons.map((lesson, index) => (
              <Card
                key={index}
                className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {Object.entries(lesson).map(([key, value]) => (
                  <div key={key} className="p-1">
                    <p key={key}>
                      <strong>{key}</strong>: {value}
                    </p>
                  </div>
                ))}
                {/* <p key={index}>{lesson.id}</p> */}
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p className="text-red-500">YOU HAVE NO LESSONS IN THIS CLASS</p>
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
