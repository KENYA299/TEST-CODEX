const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('asa_admin_token');
}

export function setToken(token) {
  localStorage.setItem('asa_admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('asa_admin_token');
}

export async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    clearToken();
    throw new Error('Unauthorized');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
