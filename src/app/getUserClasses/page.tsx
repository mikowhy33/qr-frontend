import { auth } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';
import { Card } from '@/components/ui/card';
import { classInfo } from '@/types/classType';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getClasses } from '@/services/api';

// main component
export default async function userClasses() {
  // ! a fetch for classes to services/api !
  const classes = await getClasses();

  if (!classes) {
    return <p>Server error...</p>;
  }

  // we render the data
  return (
    <div>
      {/* <h1>Classes</h1>
      <p>
        Data from <strong>{`http://localhost:3000/api/classes`}</strong>:
      </p> */}

      {classes ? (
        // Data as JSON
        <>
          <pre className="whitespace-pre-wrap break-all bg-gray-100 p-2 rounded text-xs overflow-hidden">
            {JSON.stringify(classes, null, 2)}
          </pre>


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
            {classes.map((class1, index) => (
              <Card
                // asChild allows to take all styles and formats from Card but behaves as a link, whole card is clickable not only the link
                asChild
                key={index}
                className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/get_lessons_by_class?classId=${class1.id}`}>
                  {Object.entries(class1).map(([key, value]) => (
                    <div key={key} className="p-1">
                      <p key={key}>
                        <strong>{key}</strong>: {value}
                      </p>
                    </div>
                  ))}
                </Link>
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
