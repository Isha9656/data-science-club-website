const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string, role?: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  register: async (name: string, email: string, password: string, role?: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  getMe: async () => {
    return apiRequest<any>('/auth/me');
  },
};

// Members API
export const membersAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/members');
  },
  getById: async (id: string) => {
    return apiRequest<any>(`/members/${id}`);
  },
  create: async (member: any) => {
    return apiRequest<any>('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  },
  update: async (id: string, member: any) => {
    return apiRequest<any>(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  },
  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/members/${id}`, {
      method: 'DELETE',
    });
  },
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/events');
  },
  getById: async (id: string) => {
    return apiRequest<any>(`/events/${id}`);
  },
  create: async (event: any) => {
    return apiRequest<any>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },
  update: async (id: string, event: any) => {
    return apiRequest<any>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  },
  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/events/${id}`, {
      method: 'DELETE',
    });
  },
};

// Achievements API
export const achievementsAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/achievements');
  },
  create: async (achievement: any) => {
    return apiRequest<any>('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievement),
    });
  },
  update: async (id: string, achievement: any) => {
    return apiRequest<any>(`/achievements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(achievement),
    });
  },
  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/achievements/${id}`, {
      method: 'DELETE',
    });
  },
};

// Profile API
export const profileAPI = {
  getMe: async () => {
    return apiRequest<any>('/profile/me');
  },
  update: async (profile: any) => {
    return apiRequest<any>('/profile/me', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },
};

// Auth additional APIs
export const authAPIAdditional = {
  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  verifyOTP: async (email: string, otp: string, newPassword: string) => {
    return apiRequest<{ message: string }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest<{ message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Committee API
export const committeeAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/committee');
  },
  getById: async (id: string) => {
    return apiRequest<any>(`/committee/${id}`);
  },
  create: async (member: any) => {
    return apiRequest<any>('/committee', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  },
  update: async (id: string, member: any) => {
    return apiRequest<any>(`/committee/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  },
  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/committee/${id}`, {
      method: 'DELETE',
    });
  },
};

// Event Gallery API
export const eventGalleryAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/event-gallery');
  },
  getById: async (id: string) => {
    return apiRequest<any>(`/event-gallery/${id}`);
  },
  create: async (item: { title: string; description?: string; imageUrl: string; eventId?: string }) => {
    return apiRequest<any>('/event-gallery', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },
  update: async (id: string, item: any) => {
    return apiRequest<any>(`/event-gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  },
  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/event-gallery/${id}`, {
      method: 'DELETE',
    });
  },
};
