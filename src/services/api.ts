import { backendFetch } from '@/lib/backend';

import { BackendClassResponse, classInfo, LessonAttendance, userInfo } from '@/types/classType';

// getting classes

export const getClasses = async () => {
  const data = await backendFetch<BackendClassResponse[]>('/api/classes');

  if (!data) return null;

  // filtration, only neccesarry data
  const filtered: classInfo[] = data?.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
  }));

  return filtered;
};
