import { FilesRequest } from '../../types/filesProps';
import { API_URL } from './api';

export const fetchFiles = async (userUid: string, folderId: string) => {
  try {
    const response = await fetch(`${API_URL}/get-files/${userUid}&${folderId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar arquivos');
    }

    return response.json();
  } catch (error) {
    console.log('Erro na requisição:', error);
    throw error;
  }
};
export const createFile = async (newFile: FilesRequest) => {
  const response = await fetch(`${API_URL}/create-file`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFile),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar arquivo');
  }
  return response.json();
};

export const deleteFile = async (
  userUid: string,
  fileId: string,
  folderId: string
) => {
  const response = await fetch(
    `${API_URL}/delete-file/${userUid}/${fileId}/${folderId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao excluir arquivo');
  }
  return response.json();
};
