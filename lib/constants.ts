import { UserRole } from './types';

// Role definitions
export const ROLES: Record<UserRole, { label: string; color: string }> = {
  admin: { label: 'Admin', color: '#2D6A9F' },
  receptionist: { label: 'Receptionist', color: '#047A7A' },
  practitioner: { label: 'Practitioner', color: '#F59E0B' },
  accountant: { label: 'Accountant', color: '#10A960' },
};

// Navigation menu structure per role
export const NAVIGATION_MENU: Record<UserRole, NavigationItem[]> = {
  admin: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Appointments', href: '/appointments', icon: 'Calendar', submenu: [
      { label: 'All', href: '/appointments' },
      { label: 'Pending', href: '/appointments/pending' },
      { label: 'Confirmed', href: '/appointments/confirmed' },
      { label: 'In Progress', href: '/appointments/in-progress' },
      { label: 'Cancelled', href: '/appointments/cancelled' },
    ]},
    { label: 'Patients', href: '/patients', icon: 'Users', submenu: [
      { label: 'All', href: '/patients' },
      { label: 'Active', href: '/patients/active' },
      { label: 'Inactive', href: '/patients/inactive' },
      { label: 'Archive', href: '/patients/archive' },
    ]},
    { label: 'Staff', href: '/staff', icon: 'Users2', submenu: [
      { label: 'All', href: '/staff' },
      { label: 'Practitioners', href: '/staff' },
      { label: 'Visiting', href: '/staff/visiting' },
      { label: 'Archive', href: '/staff/archive' },
    ]},
    { label: 'Inventory', href: '/inventory', icon: 'Package', submenu: [
      { label: 'Stock Levels', href: '/inventory' },
      { label: 'Purchase Orders', href: '/inventory/po' },
      { label: 'Suppliers', href: '/inventory/suppliers' },
      { label: 'Count Sheets', href: '/inventory/count-sheets' },
    ]},
    { label: 'Services', href: '/services', icon: 'Sparkles' },
    { label: 'Packages', href: '/packages', icon: 'Gift' },
    { label: 'POS', href: '/pos', icon: 'ShoppingCart' },
    { label: 'Payments', href: '/payments', icon: 'CreditCard' },
    { label: 'Vouchers', href: '/vouchers', icon: 'Ticket' },
    { label: 'Blog', href: '/blog', icon: 'BookOpen', submenu: [
      { label: 'Posts', href: '/blog' },
      { label: 'New Post', href: '/blog/new' },
    ]},
    { label: 'Messages', href: '/messages', icon: 'MessageSquare' },
    { label: 'Reviews', href: '/reviews', icon: 'Star' },
    { label: 'Reports', href: '/reports', icon: 'BarChart3' },
    { label: 'Website', href: '/website', icon: 'Globe', submenu: [
      { label: 'Overview', href: '/website' },
      { label: 'About', href: '/website/about' },
      { label: 'Gallery', href: '/website/gallery' },
      { label: 'Services', href: '/website/services' },
      { label: 'Blog', href: '/website/blog' },
      { label: 'Promotions', href: '/website/promotions' },
      { label: 'Contact', href: '/website/contact' },
    ]},
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ],
  receptionist: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Appointments', href: '/appointments', icon: 'Calendar', submenu: [
      { label: 'All', href: '/appointments' },
      { label: 'Pending', href: '/appointments/pending' },
      { label: 'Confirmed', href: '/appointments/confirmed' },
    ]},
    { label: 'Patients', href: '/patients', icon: 'Users', submenu: [
      { label: 'All', href: '/patients' },
      { label: 'Active', href: '/patients/active' },
    ]},
    { label: 'POS', href: '/pos', icon: 'ShoppingCart' },
    { label: 'Vouchers', href: '/vouchers', icon: 'Ticket' },
    { label: 'Messages', href: '/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ],
  practitioner: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Appointments', href: '/appointments', icon: 'Calendar', submenu: [
      { label: 'All', href: '/appointments' },
      { label: 'Pending', href: '/appointments/pending' },
      { label: 'In Progress', href: '/appointments/in-progress' },
    ]},
    { label: 'Patients', href: '/patients', icon: 'Users' },
    { label: 'Messages', href: '/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ],
  accountant: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Payments', href: '/payments', icon: 'CreditCard' },
    { label: 'Reports', href: '/reports', icon: 'BarChart3' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ],
};

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  submenu?: NavigationItem[];
}

// Status colors
export const STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B',
  confirmed: '#10A960',
  'in-progress': '#2D6A9F',
  cancelled: '#DC2626',
  completed: '#10A960',
  active: '#10A960',
  inactive: '#888888',
  archived: '#D0D0D0',
};

// Status labels
export const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  cancelled: 'Cancelled',
  completed: 'Completed',
  active: 'Active',
  inactive: 'Inactive',
  archived: 'Archived',
};
