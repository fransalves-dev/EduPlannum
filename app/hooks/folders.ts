import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFolder,
  deleteFolder,
  fetchFolders,
  updateFolder,
} from '../services/folders-api';

export const useFolders = (userUid: string, courseId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['folders'],
    queryFn: () => fetchFolders(userUid, courseId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      userUid: string;
      folderId: string;
      newName: string;
    }) => updateFolder(params.userUid, params.folderId, params.newName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      userUid: string;

      courseId: string;
      folderId: string;
    }) => deleteFolder(params.userUid, params.courseId, params.folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};
