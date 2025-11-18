'use client';
import { createClass } from '@/services/api';
import { SuccessResponseCreatedClass } from '@/types/classType';
import { useRef, useState } from 'react';


export const ClassCreationForm = () => {
  const [infoFromBackend, setInfoFromBackend] = useState<SuccessResponseCreatedClass | null>();

  const reference = useRef<any>('');
  const [emptyNameField, setEmptyNameField] = useState(false);

  return (
    <div className=" flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* main cart of the form */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Create New Class</h2>
          <p className="mt-2 text-sm text-slate-600">Fill in the details to start a new attendance list.</p>
        </div>

        {/* where the form starts */}
        <form
          action=""
          className="mt-8 space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(e.currentTarget);

            console.log(formData);
            const name = formData.get('nameOfClass');
            const description = formData.get('nameOfDescription');

            console.log(name, description);

            if (!name) {
              setEmptyNameField(true);
              reference.current.focus();
              return;
            } else {
              setEmptyNameField(false);
            }
            // we have 2 make sure name/description is a string not a null before parsing it to a function
            // if name is string we return if not we parse and if name is null by default it will be ''
            const nameStr = typeof name == 'string' ? name : String(name ?? '');

            const descriptionStr = typeof description === 'string' ? description : String(description ?? '');

            const data = await createClass(nameStr, descriptionStr);

            if (!data) {
              throw new Error('Couldnt create the lesson');
            }
            setInfoFromBackend(data);
            form.reset();
          }}
        >
          {/* Input 1: Name */}
          <div className="flex flex-col">
            <label htmlFor="nameOfClass" className="mb-2 text-sm font-medium text-slate-700">
              Class Name
            </label>
            <input
              type="text"
              id="nameOfClass"
              placeholder="e.g. Biology 101"
              name="nameOfClass"
              ref={reference}
              className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${
                emptyNameField ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
          </div>
          {emptyNameField === false ? null : <p className="text-red-500">This field is required!</p>}

          {/* Input 2: Description */}
          <div className="flex flex-col">
            <label htmlFor="descriptionOfClass" className="mb-2 text-sm font-medium text-slate-700">
              Description (optional)
            </label>
            <textarea
              id="descriptionOfClass"
              rows={3}
              name="nameOfDescription"
              placeholder="Brief description of the subject..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md hover:shadow-lg"
          >
            Create Class
          </button>
        </form>
      </div>

      {infoFromBackend && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
          <p className="font-bold">Success! Class Created 🎉</p>
          <p className="text-sm">Name: {infoFromBackend.name}</p>
          <p className="text-xs text-green-600 mt-1">ID: {infoFromBackend.id}</p>
        </div>
      )}
    </div>
  );
};
