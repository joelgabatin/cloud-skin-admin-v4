'use client';

import styles from './page.module.css';

const mockAppointments = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    practitioner: 'Dr. Maria',
    service: 'Facial Treatment',
    date: '2024-05-17',
    time: '2:00 PM',
    status: 'confirmed',
  },
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
    id: '3',
    patientName: 'John Smith',
    practitioner: 'Dr. Maria',
    service: 'Consultation',
    date: '2024-05-18',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: '4',
    patientName: 'Lisa Chen',
    practitioner: 'Dr. Alex',
    service: 'Laser Treatment',
    date: '2024-05-17',
    time: '1:00 PM',
    status: 'inProgress',
  },
];

export default function AppointmentsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>Manage all appointments</p>
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
            {mockAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.patientName}</td>
                <td>{apt.practitioner}</td>
                <td>{apt.service}</td>
                <td>
                  {apt.date} at {apt.time}
                </td>
                <td>
                  <span className={`${styles.badge} ${styles[apt.status]}`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </td>
                <td>
                  <a href="#" className={styles.actionLink}>
                    View
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
