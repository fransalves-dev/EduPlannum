import { CourseRequest } from '../../types/coursesProps';
import { API_URL } from './api';

export const fetchCourses = async (userUid: string) => {
  try {
    const response = await fetch(`${API_URL}/get-courses/${userUid}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar matérias');
    }

    return response.json();
  } catch (error) {
    console.log('Erro na requisição:', error);
    throw error;
  }
};
export const createCourse = async (newCourse: CourseRequest) => {
  const response = await fetch(`${API_URL}/create-course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCourse),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar matéria');
  }
  return response.json();
};
export const updateCourse = async (
  userUid: string,
  courseId: string,
  newName: string,
  newDay: string
) => {
  const response = await fetch(
    `${API_URL}/update-course/${userUid}&${courseId}?new_name=${newName}&new_day=${newDay}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao atualizar matéria');
  }
  return response.json();
};
export const deleteCourse = async (userUid: string, courseId: string) => {
  const response = await fetch(
    `${API_URL}/delete-course/${userUid}&${courseId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao excluir matéria');
  }
  return response.json();
};
