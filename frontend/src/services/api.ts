import axios from 'axios';
import {
  User,
  EmergencyContact,
  EmergencyIncident,
  InfrastructurePlace,
  StreetlightSegment,
  WalkingRoute,
  NotificationLog,
  AuditEvent,
  SystemStats,
  IncidentStatus
} from '../types';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rakai_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth failures
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't auto-clear on login attempt failures
      if (!error.config.url.includes('/auth/login')) {
        localStorage.removeItem('rakai_token');
        localStorage.removeItem('rakai_user');
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await api.post<{ access_token: string; user: User }>('/auth/login', credentials);
    return res.data;
  },
  register: async (userData: { name: string; email: string; password: string; phone?: string; role?: string }) => {
    const res = await api.post<{ access_token: string; user: User }>('/auth/register', userData);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },
  updateProfile: async (data: Partial<User>) => {
    const res = await api.put<User>('/auth/me', data);
    return res.data;
  },
};

export const contactsService = {
  getAll: async () => {
    const res = await api.get<EmergencyContact[]>('/contacts');
    return res.data;
  },
  create: async (contact: Omit<EmergencyContact, 'id' | 'user_id' | 'created_at'>) => {
    const res = await api.post<EmergencyContact>('/contacts', contact);
    return res.data;
  },
  update: async (id: string, contact: Partial<EmergencyContact>) => {
    const res = await api.put<EmergencyContact>(`/contacts/${id}`, contact);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  },
};

export const emergencyService = {
  trigger: async (data: {
    mode?: string;
    latitude: number;
    longitude: number;
    accuracy_meters?: number;
    jurisdiction?: string;
  }) => {
    const res = await api.post<EmergencyIncident>('/emergency/trigger', data);
    return res.data;
  },
  updateLocation: async (data: { latitude: number; longitude: number; accuracy?: number }) => {
    const res = await api.post<EmergencyIncident>('/emergency/location', data);
    return res.data;
  },
  end: async () => {
    const res = await api.post<EmergencyIncident>('/emergency/end');
    return res.data;
  },
  getActive: async () => {
    const res = await api.get<EmergencyIncident | null>('/emergency/active');
    return res.data;
  },
  createLocationShare: async (data: { duration_minutes?: number; current_latitude?: number; current_longitude?: number }) => {
    const res = await api.post<{ id: string; token: string; share_url: string; expires_at: string; is_active: boolean }>(
      '/emergency/share-location',
      data
    );
    return res.data;
  },
};

export const incidentsService = {
  getAll: async (params?: { status?: string; jurisdiction?: string }) => {
    const res = await api.get<EmergencyIncident[]>('/incidents', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<EmergencyIncident>(`/incidents/${id}`);
    return res.data;
  },
  updateStatus: async (id: string, data: { status: IncidentStatus; responder_notes?: string }) => {
    const res = await api.put<EmergencyIncident>(`/incidents/${id}/status`, data);
    return res.data;
  },
  assign: async (id: string, police_id: string) => {
    const res = await api.put<EmergencyIncident>(`/incidents/${id}/assign`, { police_id });
    return res.data;
  },
};

export const infrastructureService = {
  getPlaces: async (params?: { category?: string; latitude?: number; longitude?: number; radius_meters?: number }) => {
    const res = await api.get<InfrastructurePlace[]>('/infrastructure/places', { params });
    return res.data;
  },
  getStreetlights: async (params?: { jurisdiction?: string; lighting_status?: string }) => {
    const res = await api.get<StreetlightSegment[]>('/infrastructure/streetlights', { params });
    return res.data;
  },
  analyzeRoute: async (route: {
    start_latitude: number;
    start_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
  }) => {
    const res = await api.post<WalkingRoute>('/infrastructure/route/analyze', route);
    return res.data;
  },
};

export const adminService = {
  getStats: async () => {
    const res = await api.get<SystemStats>('/admin/stats');
    return res.data;
  },
  getUsers: async (role?: string) => {
    const res = await api.get<User[]>('/admin/users', { params: { role } });
    return res.data;
  },
  createPoliceOfficer: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    badge_number: string;
    jurisdiction: string;
  }) => {
    const res = await api.post<User>('/admin/users/police', data);
    return res.data;
  },
  toggleUserStatus: async (id: string, is_active: boolean) => {
    const res = await api.put<User>(`/admin/users/${id}/status`, { is_active });
    return res.data;
  },
  createPlace: async (place: Omit<InfrastructurePlace, 'id' | 'is_verified'>) => {
    const res = await api.post<InfrastructurePlace>('/admin/places', place);
    return res.data;
  },
  createStreetlight: async (seg: Omit<StreetlightSegment, 'id' | 'last_inspected_at'>) => {
    const res = await api.post<StreetlightSegment>('/admin/streetlights', seg);
    return res.data;
  },
  getNotifications: async () => {
    const res = await api.get<NotificationLog[]>('/admin/notifications');
    return res.data;
  },
  getAuditLogs: async () => {
    const res = await api.get<AuditEvent[]>('/admin/audit');
    return res.data;
  },
};

export default api;
