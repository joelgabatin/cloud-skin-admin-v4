'use client';

import { useAuth } from '@/lib/auth-context';
import StatCard from '@/components/Common/StatCard';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {user.name}! 👋</h1>
          <p className={styles.subtitle}>
            Here&apos;s what&apos;s happening with your clinic today.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.statsGrid}>
          <StatCard label="Total Appointments" value="24" change="12% from last month" />
          <StatCard label="Pending Approvals" value="8" change="" />
          <StatCard label="Total Patients" value="156" change="5% from last month" />
          <StatCard label="Revenue (This Month)" value="$12,450" change="8% from last month" />
        </div>
      </section>

      {/* Recent Appointments */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Appointments</h2>
          <a href="/appointments" className={styles.viewAll}>
            View all →
          </a>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Practitioner</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sarah Johnson</td>
                <td>Dr. Maria</td>
                <td>Facial Treatment</td>
                <td>Today, 2:00 PM</td>
                <td>
                  <span className={`${styles.badge} ${styles.confirmed}`}>
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr>
                <td>Emma Davis</td>
                <td>Dr. Alex</td>
                <td>Chemical Peel</td>
                <td>Today, 3:30 PM</td>
                <td>
                  <span className={`${styles.badge} ${styles.pending}`}>
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td>John Smith</td>
                <td>Dr. Maria</td>
                <td>Consultation</td>
                <td>Tomorrow, 10:00 AM</td>
                <td>
                  <span className={`${styles.badge} ${styles.confirmed}`}>
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr>
                <td>Lisa Wang</td>
                <td>Dr. James</td>
                <td>Laser Treatment</td>
                <td>Tomorrow, 1:00 PM</td>
                <td>
                  <span className={`${styles.badge} ${styles.inProgress}`}>
                    In Progress
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <a href="/appointments" className={styles.actionCard}>
            <div className={styles.actionIcon}>📅</div>
            <div className={styles.actionTitle}>New Appointment</div>
            <div className={styles.actionDesc}>Schedule a new appointment</div>
          </a>
          <a href="/patients" className={styles.actionCard}>
            <div className={styles.actionIcon}>👥</div>
            <div className={styles.actionTitle}>Add Patient</div>
            <div className={styles.actionDesc}>Register new patient</div>
          </a>
          <a href="/pos" className={styles.actionCard}>
            <div className={styles.actionIcon}>💳</div>
            <div className={styles.actionTitle}>New Transaction</div>
            <div className={styles.actionDesc}>Process payment</div>
          </a>
          <a href="/reports" className={styles.actionCard}>
            <div className={styles.actionIcon}>📊</div>
            <div className={styles.actionTitle}>View Reports</div>
            <div className={styles.actionDesc}>Check analytics</div>
          </a>
        </div>
      </section>
    </div>
  );
}
