export interface FolderResponse {
  name: string;
  course_id: string;
  course_name: string;
  files: string[] | null;
  todo: string[] | null;
  number_file: number;
  number_todo: number;
  user_uid: string;
  id: string;
}

export interface FolderRequest {
  name: string;
  course_id: string;
  course_name: string;
  files: string[] | null;
  todo: string[] | null;
  number_file: number;
  number_todo: number;
  user_uid: string;
}
