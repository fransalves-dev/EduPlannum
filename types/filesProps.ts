export interface FilesResponse {
  id: string;
  name: string;
  folder_id: string;
  folder_name: string;
  type: string;
  typeLocation: string;
  link: string | null;
  id_storage: string | null;
  user_uid: string;
}

export interface FilesRequest {
  name: string;
  folder_id: string;
  folder_name: string;
  type: string;
  typeLocation: string;
  link: string | null;
  id_storage: string | null;
  user_uid: string;
}
