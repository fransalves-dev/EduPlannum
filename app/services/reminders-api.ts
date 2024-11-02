import { ReminderRequest } from '../../types/remindersProps';
import { API_URL } from './api';

export const fetchReminders = async (userUid: string, courseId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/get-reminders/${userUid}&${courseId}`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar lembretes.');
    }

    return response.json();
  } catch (error) {
    console.log('Erro na requisição:', error);
    throw error;
  }
};
export const createReminder = async (newReminder: ReminderRequest) => {
  const response = await fetch(`${API_URL}/create-reminder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReminder),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar lembrete');
  }
  return response.json();
};
export const updateReminder = async (
  userUid: string,
  reminderId: string,
  newMessage: string
) => {
  const response = await fetch(
    `${API_URL}/update-reminder/${userUid}&${reminderId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_message: newMessage }),
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao atualizar lembrete');
  }
  return response.json();
};
export const deleteReminder = async (
  userUid: string,
  reminderId: string,
  courseId: string
) => {
  const response = await fetch(
    `${API_URL}/delete-reminder/${userUid}/${reminderId}/${courseId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao excluir lembrete');
  }
  return response.json();
};
