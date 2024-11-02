import { useToast } from '@gluestack-ui/themed';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ToastCreateSucess from '../components/courses/toasts';
import {
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from '../services/courses-api';

export const useCourses = (userUid: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCourses(userUid),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};

export const useCreateCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.show({
        placement: 'bottom',
        render: ToastCreateSucess,
      });
    },
  });
};

export const useUpdateCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      userUid: string;
      courseId: string;
      newName: string;
      newDay: string;
    }) =>
      updateCourse(
        params.userUid,
        params.courseId,
        params.newName,
        params.newDay
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.show({
        placement: 'bottom',
        render: ToastCreateSucess,
      });
    },
  });
};

export const useDeleteCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { userUid: string; courseId: string }) =>
      deleteCourse(params.userUid, params.courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.show({
        placement: 'bottom',
        render: ToastCreateSucess,
      });
    },
  });
};
