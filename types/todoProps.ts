interface Objectives {
  objective: string;
  isChecked: boolean;
}

export interface ToDoResponse {
  id: string;
  name: string;
  folder_id: string;
  folder_name: string;
  type: string;
  timelimit: Date;
  objectives: Objectives[];
  user_uid: string;
}

export interface ToDoRequest {
  name: string;
  folder_id: string;
  folder_name: string;
  type: string;
  timelimit: Date;
  objectives: Objectives[];
  user_uid: string;
}
