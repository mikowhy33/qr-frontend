'use client';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Student } from '@/types/classType';


type Props={
  listOfAllStudentsInDataBase:Student[] | null
}

export const ListOfAllStudents = ({listOfAllStudentsInDataBase}:Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = listOfAllStudentsInDataBase?.filter((student) => {
    // empty=show all
    if (searchTerm === '') return true;

    const searchLower = searchTerm.toLowerCase();

    // checking if email/id/name has the text
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.id.toLowerCase().includes(searchLower)
    );
  });
  return (
    <div
      className=" bg-white max-w-md w-full max-h-96 text-center p-6 overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 "
      onClick={(e) => e.stopPropagation()}
    >
      <p className="mb-6 ">List of ALL students:</p>
      <input
        type="text"
        name=""
        id=""
        className="border mb-4 border-black p-1"
        placeholder="Search by name,email or ID"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className=" border-b-2 border-black"></p>
      <ScrollArea className="overflow-y-auto">
        <ul className=" pl-5 space-y-8">
          {filteredList?.map((student) => (
            <div key={student.id}>
              <div className="flex ">
                <p className="mr-auto font-bold">ID:</p> <p className="ml-auto">{student.id}</p>
              </div>
              <div className="flex justify-around">
                <p className="mr-auto font-bold">Name:</p> <p className="ml-auto">{student.name}</p>
              </div>
              <div className="flex justify-around">
                <p className="mr-auto font-bold">Email:</p> <p className="ml-auto">{student.email}</p>
              </div>
              <hr />
            </div>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
