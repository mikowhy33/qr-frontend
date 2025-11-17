import { backendFetch } from '@/lib/backend';

import { BackendClassResponse, classInfo, LessonAttendance, lessonInfo, userInfo } from '@/types/classType';

// getting classes

export const getClasses = async () => {
  const data = await backendFetch<BackendClassResponse[]>('/api/classes');

  if (!data) return null;

  // filtration, only neccesarry data
  // we make a new obj
  const filtered = data.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
  }));

  return filtered;
};


// based on a classId we get lessons
export const getLessons=async(classId:string)=>{

  const data= await backendFetch<lessonInfo>(`/api/classes/${classId}/lessons`)

  if(!data) return null;

  // console.log(data)

  return data;

}



export const getUserRole =async()=>{

  const data= await backendFetch<userInfo>(`/api/users/me`)

  if(!data ) return null;

  return data;

}