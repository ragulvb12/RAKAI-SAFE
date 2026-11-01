export type UserRole = 'USER' | 'POLICE' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  jurisdiction?: string;
  badge_number?: string;
  is_active: boolean;
  created_at: string;
}

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
  notify_sms: boolean;
  notify_whatsapp: boolean;
  created_at?: string;
}

export interface LocationSnapshot {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  recorded_at: string;
}

export type IncidentStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED' | 'FALSE_ALARM';
export type IncidentMode = 'SIREN' | 'SILENT' | 'SHAKE' | 'HOTKEY';

export interface EmergencyIncident {
  id: string;
  user_id: string;
  mode: IncidentMode;
  status: IncidentStatus;
  initial_latitude: number;
  initial_longitude: number;
  current_latitude: number;
  current_longitude: number;
  accuracy_meters: number;
  jurisdiction?: string;
  assigned_police_id?: string;
  responder_notes?: string;
  created_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
  user?: User;
  assigned_police?: User;
  location_snapshots: LocationSnapshot[];
  notifications?: NotificationLog[];
}

export interface InfrastructurePlace {
  id: string;
  category: 'POLICE_STATION' | 'HOSPITAL' | 'SAFE_HAVEN';
  name: string;
  name_tamil?: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  jurisdiction: string;
  operating_hours: string;
  is_verified: boolean;
}

export interface StreetlightSegment {
  id: string;
  street_name: string;
  jurisdiction: string;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  lighting_status: 'WELL_LIT' | 'MODERATELY_LIT' | 'POORLY_LIT' | 'UNVERIFIED';
  total_lights: number;
  functional_lights: number;
  is_verified: boolean;
  source: string;
  last_inspected_at?: string;
}

export interface RouteWaypoint {
  latitude: number;
  longitude: number;
  label?: string;
}

export interface WalkingRoute {
  distance_meters: number;
  estimated_minutes: number;
  lighting_safety_score: number;
  lighting_summary: string;
  waypoints: RouteWaypoint[];
  segments: StreetlightSegment[];
  nearby_safe_havens: InfrastructurePlace[];
  safety_advisory: string;
}

export interface NotificationLog {
  id: string;
  incident_id?: string;
  user_id: string;
  recipient_name: string;
  recipient_phone: string;
  channel: string;
  status: string;
  message_body: string;
  provider_reference?: string;
  provider_status_code?: string;
  created_at: string;
}

export interface AuditEvent {
  id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

export interface SystemStats {
  total_users: number;
  total_incidents: number;
  active_incidents: number;
  resolved_incidents: number;
  police_officers: number;
  verified_safe_places: number;
  total_streetlights: number;
  sms_delivery_rate: number;
}
