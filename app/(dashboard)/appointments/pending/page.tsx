'use client';

import styles from '../page.module.css';

const pendingAppointments = [
  {
    id: '2',
    patientName: 'Emma Davis',
    practitioner: 'Dr. Alex',
    service: 'Chemical Peel',
    date: '2024-05-17',
    time: '3:30 PM',
    status: 'pending',
  },
  {
    id: '5',
    patientName: 'Rachel Green',
    practitioner: 'Dr. James',
    service: 'Skin Consultation',
    date: '2024-05-18',
    time: '11:00 AM',
    status: 'pending',
  },
];

export default function PendingAppointmentsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Pending Appointments</h1>
          <p className={styles.subtitle}>Awaiting confirmation</p>
        </div>
        <button className={styles.primaryBtn}>+ New Appointment</button>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.patientName}</td>
                <td>{apt.practitioner}</td>
                <td>{apt.service}</td>
                <td>
                  {apt.date} at {apt.time}
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.pending}`}>
                    Pending
                  </span>
                </td>
                <td>
                  <a href="#" className={styles.actionLink}>
                    Confirm
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
