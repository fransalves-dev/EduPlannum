import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReminder,
  deleteReminder,
  fetchReminders,
  updateReminder,
} from '../services/reminders-api';

export const useReminders = (userUid: string, courseId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: () => fetchReminders(userUid, courseId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReminder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  });
};

export const useUpdateReminder = (
  userUid: string,
  reminderId: string,
  newMessage: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateReminder(userUid, reminderId, newMessage),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  });
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      userUid: string;
      reminderId: string;
      courseId: string;
    }) => deleteReminder(params.userUid, params.reminderId, params.courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};
