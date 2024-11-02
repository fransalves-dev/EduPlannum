export interface CourseResponse {
  name: string;
  day_week: string;
  folders: string[] | null;
  reminders: string[] | null;
  number_folder: number;
  number_reminder: number;
  user_uid: string;
  id: string;
}
export interface CourseRequest {
  name: string;
  day_week: string;
  folders: string[] | null;
  reminders: string[] | null;
  number_folder: number;
  number_reminder: number;
  user_uid: string;
}
