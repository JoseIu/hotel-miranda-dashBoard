const apiFetch = async (path: string, method: string = 'GET', id?: string) => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;

  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${path}/${id ? id : ''}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export default apiFetch;
