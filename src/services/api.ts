'use server';

import { backendFetch } from '@/lib/backend';

import {
  attendanceScan,
  BackendClassResponse,
  classInfo,
  CreatedClass,
  LessonAttendance,
  lessonAttendanceStart,
  lessonInfo,
  Student,
  SuccessResponseCreatedClass,
  SuccessResponseCreatedLesson,
  userInfo,
} from '@/types/classType';

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
export const getLessons = async (classId: string) => {
  const data = await backendFetch<lessonInfo[]>(`/api/classes/${classId}/lessons`);

  if (!data) return null;

  const filtered = data.map((c) => ({
    id: c.id,
    lessonId: c.classId,
    topic: c.topic,
    date: c.date,
    startTime: c.startTime,
    endTime: c.endTime,
  }));

  // console.log(data)

  return filtered;
};

// geeting a userRole
export const getUserRole = async () => {
  const data = await backendFetch<userInfo>(`/api/users/me`);

  if (!data) return null;

  return data;
};

// based on a lessonId we get the attendance
export const getLessonAttendance = async (lessonId: string) => {
  const data = await backendFetch<LessonAttendance>(`/api/lessons/${lessonId}/attendance`);

  // console.log(data + 'BZZ');

  if (!data) return null;

  return data;
};

// we start a attendance, response will be a token:'someidtoken' expirestAt:'dateasstring'
export const startAttendtance = async (lessonId: string) => {
  const data = await backendFetch<lessonAttendanceStart>(`/api/lessons/${lessonId}/attendance/start`, {
    method: 'POST',
  });

  if (!data) return null;

  return data;
};

// info abt qrToken which the teacher has created!
export const scanAttendance = async (qrToken: string) => {
  const data = await backendFetch<attendanceScan>(`/api/attendance/scan`, {
    method: 'POST',
    body: JSON.stringify({ token: qrToken }),
  });

  if (!data) return null;

  return data;
};

// creating a class
export const createClass = async (name: string, description: string) => {
  const data = await backendFetch<SuccessResponseCreatedClass>('/api/classes', {
    method: 'POST',
    // parsing the data
    body: JSON.stringify({ name: name, description: description }),
  });

  if (!data) return null;

  return data;
};

// creating a lesson based on the classId
export const createLesson = async (classId: string, topic: string, date: string, startTime: string, endTime: string) => {
  const data = await backendFetch<SuccessResponseCreatedLesson>(`/api/classes/${classId}/lessons`, {
    method: 'POST',
    body: JSON.stringify({ topic, date, startTime, endTime }),
  });

  if (!data) return null;

  return data;
};

// deleting a lesson
export const deleteAClass = async (classId: string) => {
  const data = await backendFetch(`/api/classes/${classId}`, {
    method: 'DELETE',
  });

  if (!data) return null;

  return data;
};

export const enrollStudent = async (classId: string, userId: string, name: string, email: string) => {
  const data = await backendFetch(`/api/classes/${classId}/enroll`, {
    method: 'POST',
    body: JSON.stringify({ userId, name, email }),
  });

  if (!data) return null;

  return data;
};


export const getAllStudents=async ()=>{

  const data =await backendFetch<Student[]|null>(`/api/users/students`);

  if(!data) return null;

  return data;

}