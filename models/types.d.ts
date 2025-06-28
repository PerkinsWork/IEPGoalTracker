export interface Student {
  id: string;
  name: string;
  grade: string;
}

export interface Goal {
  id: string;
  studentId: string;
  description: string;
}

export interface Entry {
  id: string;
  goalId: string;
  date: string; // ISO date
  value: number;
}
