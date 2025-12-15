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
                // dont care abt it we can create it freely
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


  {/* <UserComponent
        userId={1}
        first_name="yoo"
        age={0}
        email="nnn"
        city="krakow"

      ></UserComponent> */}

// export const UserComponent = ({
//   userId,
//   first_name,
//   address,
//   age,
//   city,
//   email,
//   last_name,
//   phone,
//   state,
//   zip,
// }: {
//   userId: number;
//   first_name: string;
//   last_name?: string;
//   age: number;
//   email: string | undefined;
//   phone?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
// }) => {
//   if (!first_name && !last_name) return null;

// const elements=[city,state,zip,age,email,phone]

//   const Thefunction = (elements:(string | number | undefined)[]) => {
    
//     const notUndefinedValues=[];

//     for(const element of elements){

//       element!==undefined? notUndefinedValues.push(element):null;


//     }

//     console.log(notUndefinedValues.length);
//     console.log(notUndefinedValues);

//     return notUndefinedValues.join(',')

//   }
  
//   return (
//     <>
//       <div>
//         <div>User profile</div>
//         {userId && (
//           <div>
//             <div className="flex gap-x-2">
//               {/* zzzzzz
//               {address !== undefined ? <p>{address} ,</p> : null}
//               {city !== undefined ? <p>{city} ,</p> : null}
//               {state !== undefined ? <p>{state} ,</p> : null}
//               {zip !== undefined ? <p>{zip} ,</p> : null}
//               {age !== undefined ? <p>{age} ,</p> : null}
//               {email !== undefined ? <p>{email} ,</p> : null}
//               {phone !== undefined ? <p>{phone} ,</p> : null} */}

//               {Thefunction(elements)}
//               {/* {city}, {state}, {zip}, {age}, {email}, {phone} */}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
