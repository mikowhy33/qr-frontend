import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getAllClassesId } from '../get_lessons_by_class/page';
import { json } from 'stream/consumers';
import { Card } from '@/components/ui/card';
import { classInfo } from '@/types/classType';

async function getClasses(token: string | null) {
  if (!token) {
    console.error('You cant get classes without a token');
    return [];
  }

  const res = await fetch('http://localhost:3001/api/get_classes', {
    cache: 'no-store',
    // we pass the token
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch error:', await res.text());
    return [];
  }

  return res.json();
}

// main component
export default async function StronaGlowna() {
  // we get the authentication object, has 2 be awaited
  const authObject = await auth();

  // not logged in no access, we redirect to a sign in page
  if (!authObject.userId) {
    return NextResponse.redirect('/sign-in');
    // return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // we're logged in, we getting the token
  // token is created based on a user session
  const token = await authObject.getToken();

  // if we dont have a token err
  if (!token) {
    throw new Error('No token!');
  }

  // function to get all classes!
  const myClasses: classInfo = await getClasses(token);

  // we render the data
  return (
    <div>
      <h1>Classes</h1>
      <p>
        Data from <strong>{`http://localhost:3000/api/classes`}</strong>:
      </p>

      {myClasses ? (
        // Data as JSON
        <>
          <pre>{JSON.stringify(myClasses, null, 2)}</pre>
          <div></div>

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
            {myClasses.map((class1, index) => (
              <Card
                key={index}
                className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {Object.entries(class1).map(([key, value]) => (
                  <div className='p-1'>
                    <p key={key}>
                      <strong>{key}</strong>: {value}
                    </p>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </>
      ) : (
        // if issue
        <p style={{ color: 'red' }}>Data couldnt be fetched, check server</p>
      )}
    </div>
  );
}
