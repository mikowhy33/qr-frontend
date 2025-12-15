import { auth } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';
import { Card } from '@/components/ui/card';
import { classInfo } from '@/types/classType';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getClasses } from '@/services/api';
import { GenericList } from '@/components/Displaying_classes_lessons';


// main component
export default async function userClasses() {
  // ! a fetch for classes to services/api !
  // all classes in a list, only here were takin things from server!
  const classes = await getClasses();

  if (!classes) {
    return <p>Server error...</p>;
  }

  // we render the data
  return (
    <>
      <div>
        {classes ? (
          // Data as JSON
          <>
            <pre className="whitespace-pre-wrap break-all bg-gray-100 p-2 rounded text-xs overflow-hidden">
              {JSON.stringify(classes, null, 2)}
            </pre>

            <GenericList
              items={classes}
              getLink={(cls) => {
              
                const name = cls.name;
                // returning string as requested, we searchParams so we can get the name of class without the need to take it from
                // backend
                return `/user_classes/${cls.id}?className=${encodeURIComponent(name)}`;
              }}
            ></GenericList>
          </>
        ) : (
          // if issue
          <p style={{ color: 'red' }}>Data couldnt be fetched, check server</p>
        )}
      </div>

    
    </>
  );
}
