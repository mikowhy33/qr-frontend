// table of these kind of objects
export type classInfo = {
  id: string;
  name: string;
  description: string;
};

export type BackendClassResponse = {
  id: string;
  name: string;
  description: string;
  // we dont want these fields from server
  created_at?: string; 
  teacher_id?: string;
  is_archived?: boolean;
};

export type lessonInfo = {
  id: string;
  classId: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type lessonAttendanceStart = {
  token: string;
  expiresAt: Date;
};

export type userInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type attendanceScan = {
  status: string;
  message: string;
  lessonId: string;
};

// One student on a list
export type Attendee = {
  studentId: string;
  name: string;
  timestamp: string;
  status: string;
};

// whole response from the api!
export type LessonAttendance = {
  lessonId: string;
  attendees: Attendee[];
};


export type CreatedClass={
  name:string,
  description:string
}


export type SuccessResponseCreatedClass={
  id:string,
  teacherId:string,
  name:string,
  description:string
}

export type SuccessResponseCreatedLesson={
  response:string;
}