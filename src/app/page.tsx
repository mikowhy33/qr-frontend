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
  const classes = await getClasses();

  if (!classes) {
    return <p>Server error...</p>;
  }

  // we render the data
  return (
    <div>
      {classes ? (
        // Data as JSON
        <>
          <pre className="whitespace-pre-wrap break-all bg-gray-100 p-2 rounded text-xs overflow-hidden">
            {JSON.stringify(classes, null, 2)}
          </pre>

          <GenericList items={classes} getLink={(cls) => `/user_classes/${cls.id}`}></GenericList>
        </>
      ) : (
        // if issue
        <p style={{ color: 'red' }}>Data couldnt be fetched, check server</p>
      )}
    </div>
  );
}
