export interface ReminderResponse {
  id: string;
  name: string;
  course_id: string;
  course_name: string;
  folder_id: string;
  folder_name: string;
  file_id: string;
  file_name: string;
  timeReminder: Date;
  message: string;
  user_uid: string;
}

export interface ReminderRequest {
  name: string;
  course_id: string;
  course_name: string;
  folder_id: string;
  folder_name: string;
  file_id: string;
  file_name: string;
  timeReminder: Date;
  message: string;
  user_uid: string;
}
