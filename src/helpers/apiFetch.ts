const apiFetch = async <T>(path: string, method: string = 'GET', id?: string | null, data?: T) => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;

  const token = localStorage.getItem('token');

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }
  const response = await fetch(`${BASE_URL}/${path}/${id ? id : ''}`, fetchOptions);

  return response.json();
};

export default apiFetch;
