import { Card } from '@/components/ui/card';
import Link from 'next/link';

type GenericListProps<T> = {
  items: T[];
  
  // func that takes our item (class/less) and returns link 2 it!
  getLink: (item: T) => string;
};

// we will take anything (any obj) as long as it has an 'id' field!
export const GenericList = <T extends { id: string | number }>(params: GenericListProps<T>) => {
  const { items } = params;
  const { getLink } = params;

 

  if (!items || items.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data to display.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 m-4 ">
      
        {items?.map((item, index) => (
          <Card
            // asChild allows to take all styles and formats from Card but behaves as a link, whole card is clickable not only the link!
            asChild
            key={index}
            className="w-full max-w-sm flex flex-col items-center text-center m-2 p-2
             cursor-pointer hover:scale-105 transition-transform duration-300 bg-indigo-50/50 border border-indigo-100"
          >
          

            <Link href={getLink(item)}>
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="p-1">
                  <p key={key}>
                    <strong>{key}</strong>: {String(value)}
                  </p>
                </div>
              ))}
            </Link>
          
          </Card>
        ))}
      </div>
    </>
  );
};

