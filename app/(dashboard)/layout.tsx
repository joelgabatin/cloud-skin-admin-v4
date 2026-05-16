'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Layout/Sidebar';
import Topbar from '@/components/Layout/Topbar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
