import { FolderRequest } from '../../types/foldersProp';
import { API_URL } from './api';

export const fetchFolders = async (userUid: string, courseId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/get-folders/${userUid}/${courseId}`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar pastas');
    }

    return response.json();
  } catch (error) {
    console.log('Erro na requisição:', error);
    throw error;
  }
};
export const createFolder = async (newFolder: FolderRequest) => {
  const response = await fetch(`${API_URL}/create-folder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFolder),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar pasta');
  }
  return response.json();
};
export const updateFolder = async (
  userUid: string,
  folderId: string,
  newName: string
) => {
  const response = await fetch(
    `${API_URL}/update-folder/${userUid}/${folderId}?new_name=${newName}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao atualizar pasta');
  }
  return response.json();
};
export const deleteFolder = async (
  userUid: string,
  courseId: string,
  folderId: string
) => {
  const response = await fetch(
    `${API_URL}/delete-folder/${userUid}/${courseId}/${folderId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Erro ao excluir pasta');
  }
  return response.json();
};
