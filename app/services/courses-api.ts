const API_URL = 'http://10.0.0.109:8000';

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
