import type { EmployeeId, TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type ShiftModel = {
  id: EmployeeId;
  date: string;
  starttime: string;
  endtime: string;
};
