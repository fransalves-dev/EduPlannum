export interface CourseObjectResponse {
  name: string;
  day_week: string;
  folders: string[] | null;
  reminders: string[] | null;
  number_folders: number;
  number_reminders: number;
  user_uid: string;
  id: string;
}
