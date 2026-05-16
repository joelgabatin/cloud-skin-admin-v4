// User Roles
export type UserRole = 'admin' | 'receptionist' | 'practitioner' | 'accountant';

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  clinic?: string;
}

// Auth Context Interface
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Appointment Statuses
export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'cancelled' | 'completed';

// Appointment Interface
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  practitioner: string;
  date: string;
  time: string;
  service: string;
  status: AppointmentStatus;
  notes?: string;
}

// Patient Status
export type PatientStatus = 'active' | 'inactive' | 'archived';

// Patient Interface
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: PatientStatus;
  joinDate: string;
  lastVisit?: string;
  image?: string;
}

// Staff Status
export type StaffStatus = 'active' | 'inactive' | 'archived';

// Staff Interface
export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  status: StaffStatus;
  joinDate: string;
  image?: string;
  isVisiting?: boolean;
}

// Service Interface
export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // in minutes
  description?: string;
  isActive: boolean;
}

// Package Interface
export interface Package {
  id: string;
  name: string;
  price: number;
  sessions: number;
  description?: string;
  isActive: boolean;
}

// Dashboard Stats
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  totalPatients: number;
  totalRevenue: number;
}
