import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFile, deleteFile, fetchFiles } from '../services/files-api';

export const useFiles = (userUid: string, folderId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['files'],
    queryFn: () => fetchFiles(userUid, folderId),
  });
  return { data, isLoading, error };
};

export const useCreateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files'] }),
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      userUid: string;
      fileId: string;
      folderId: string;
    }) => deleteFile(params.userUid, params.fileId, params.folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
