import { ReminderResponse } from '../../types/remindersProps';

export const mockReminder: ReminderResponse = {
  id: '01',
  name: 'Prova',
  course_id: '01',
  course_name: 'Matemática',
  folder_id: '02',
  folder_name: 'Trabalhos G1',
  file_id: '03',
  file_name: 'Estudo',
  timeReminder: new Date('10/05/2024 15:00'),
  message: 'Estudar',
  user_uid: 'user',
};
