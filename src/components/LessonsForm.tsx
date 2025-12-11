'use client';
import { createLesson } from '@/services/api';
import { SuccessResponseCreatedLesson } from '@/types/classType';
import { useRef, useState } from 'react';

type ClassId = {
  classId: string;
  setShowTheForm: (val: boolean) => void;
};

export const LessonCreationForm = ({ classId, setShowTheForm }: ClassId) => {
  const [infoFromBackend, setInfoFromBackend] = useState<SuccessResponseCreatedLesson | null>();

  // const reference = useRef<any>('');

  const [displayErrors, setDisplayErrors] = useState(false);

  const [error, setError] = useState(false);

  const [emptyName, setEmptyName] = useState('');
  const [emptyDate, setEmptyDate] = useState('');
  const [emptystartTime, setEmptyStartTime] = useState('');
  const [emptyendTime, setEmptyEndTime] = useState('');

  // const [clicktoclose,setclicktoclose]=useState(false)

  return (
    <>
      <div
        // fixed always positions element relative to the browser window, inset-0 will get the background all the way on the screen
        className="fixed top-[64px]  overflow-y-auto right-0 left-0 bottom-0  flex flex-col items-center  py-12 px-4 sm:px-6 lg:px-8 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowTheForm(false)}
      >
      {/* <div className="mt-4 ">zz</div> */}
        {/* main cart of the form */}

        <div
          className="max-w-md  w-full m-2 space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100"
          // the click ends here it doesnt go up so we dont close the form when clicking on things inside this input
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-end">
              <button onClick={() => setShowTheForm(false)} className="text-gray-500 hover:text-black cursor-pointer">
                ✕ Close
              </button>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Create New Lesson</h2>
            <p className="mt-2 text-sm text-slate-600">Fill in the details to create a new lesson.</p>
          </div>

          {/* where the form starts */}
          <form
            action=""
            className="mt-4 space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();

              setDisplayErrors(true);

              const form = e.currentTarget;
              console.log(form);
              const formData = new FormData(e.currentTarget);

              console.log(formData);

              // need 2 parse as string bcs formData return FormDataEntryValue|null, so File|string|null
              const name = formData.get('nameOfLesson') as string;
              const date = formData.get('dateOfLesson') as string;
              const startTime = formData.get('startTime') as string;
              const endTime = formData.get('endTime') as string;

              setEmptyName(name);
              setEmptyDate(date);
              setEmptyStartTime(startTime);
              setEmptyEndTime(endTime);

              const requiredFields = ['nameOfLesson', 'dateOfLesson', 'startTime', 'endTime'];

              console.log(name, date, startTime, endTime + '11', 'BZZ');

              // console.log(requiredFields);
              for (const field of requiredFields) {
                const value = formData.get(field);

                if (!value || value == '') {
                  // were getting input based on the name of all elements. this return INPUT!
                  const inputEl = form.elements.namedItem(field) as HTMLInputElement;
                  // we can focus an input
                  inputEl?.focus();
                  setError(true);
                  return;
                }
              }

              setError(false);

              const data = await createLesson(classId, name, date, startTime, endTime);

              if (!data) {
                throw new Error('Couldnt create the lesson');
              }
              setInfoFromBackend(data);
              form.reset();
            }}
          >
            {/* Input 1: Name */}
            <div className="flex flex-col">
              <label htmlFor="nameOfLesson" className="mb-2 text-sm font-medium text-slate-700">
                Topic of the lesson
              </label>
              <input
                type="text"
                id="nameOfLesson"
                placeholder="Variables"
                name="nameOfLesson"
                // ref={reference}
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${
                  error && emptyName === '' ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
            </div>

            {displayErrors && emptyName === '' && <p className="text-red-500">This field is required!</p>}
            {/* {displayErrors==true?emptyName!==""?null: <p className="text-red-500">This field is required!</p>:null} */}

            {/* Input 2: Date */}
            <div className="flex flex-col">
              <label htmlFor="dateOfLesson" className="mb-2 text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="Date"
                id="dateOfLesson"
                name="dateOfLesson"
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${
                  error && emptyDate === '' ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              ></input>
            </div>
            {displayErrors && emptyDate === '' && <p className="text-red-500">This field is required!</p>}

            <div className="flex flex-col">
              <label htmlFor="startTime" className="mb-2 text-sm font-medium text-slate-700">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${
                  error && emptystartTime === '' ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              ></input>
            </div>
            {displayErrors && emptystartTime === '' && <p className="text-red-500">This field is required!</p>}

            <div className="flex flex-col">
              <label htmlFor="endTime" className="mb-2 text-sm font-medium text-slate-700">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${
                  error && emptyendTime === '' ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              ></input>
            </div>
            {displayErrors && emptyendTime === '' && <p className="text-red-500">This field is required!</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md hover:shadow-lg"
            >
              Create Lesson
            </button>
          </form>
        </div>

        {infoFromBackend && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            <p className="font-bold text-green-600">Success! Lesson Created 🎉</p>
            {/* <p className="text-sm">Response: {infoFromBackend.response}</p> */}
            {/* <p className="text-xs text-green-600 mt-1">ID: {infoFromBackend.id}</p> */}
          </div>
        )}
      </div>
    </>
  );
};
