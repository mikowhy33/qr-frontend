import { getUserRole } from '@/services/api';

export const InfoAboutUser = async () => {
  const InfoAboutUser = await getUserRole();

  return (
    <>
      <div className="flex flex-col items-end mr-4 mb-4">
        <span className="font-bold">{InfoAboutUser?.name}</span>
        <span className="text-sm text-gray-500">{InfoAboutUser?.email}</span>
        <span className="uppercase text-xs">{InfoAboutUser?.role}</span>
      </div>
    </>
  );
};
