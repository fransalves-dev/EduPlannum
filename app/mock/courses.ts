import { CourseResponse } from '../../types/coursesProps';

export const mockCourses: CourseResponse[] = [
  {
    id: '01',
    name: 'Matemática',
    day_week: 'Segunda-feira',
    folders: ['1', '2', '3'],
    reminders: ['1', '2'],
    number_folder: 3,
    number_reminder: 2,
    user_uid: 'ydP06QeInCTLITTSw1me5IbZyL42',
  },
  {
    id: '02',
    name: 'Sociologia',
    day_week: 'Terça-feira',
    folders: null,
    reminders: null,
    number_folder: 0,
    number_reminder: 0,
    user_uid: 'ydP06QeInCTLITTSw1me5IbZyL42',
  },
];
