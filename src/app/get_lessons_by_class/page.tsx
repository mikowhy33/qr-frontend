import { Card } from '@/components/ui/card';
import { lessonInfo, userInfo } from '@/types/classType';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// in future dynamic

// getting the data from real database!
async function getLessonAttendancefunc(token: string | null, classId: string) {
  // no token no ride
  if (!token || classId == undefined) {
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

async function getUserRole(token: string | null) {
  const res = await fetch(`http://localhost:3001/api/get_User_Role?userToken=${token}`);

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

  const userRole: userInfo = await getUserRole(token);

  // Zamiast '+' użyj ','
  console.log('Moja rola:', userRole, 'CSDCSC');
  // console.log(myLessons);

  return (
    <>
      {userRole.role == 'teacher' && myLessons ? (
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
        // IN FUTURE HERE LINK TO TAKE TO SCAN ATTENDANCE TO A SPECIFIC LESSON!
        <>
          <div className="flex flex-wrap justify-center gap-8 m-4 ">
            {myLessons.map((lesson, index) => (
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
