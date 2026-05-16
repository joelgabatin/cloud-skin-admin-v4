'use client';

import styles from './page.module.css';

const mockPatients = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(555) 123-4567', status: 'active', joinDate: '2024-01-15' },
  { id: '2', name: 'Emma Davis', email: 'emma@email.com', phone: '(555) 234-5678', status: 'active', joinDate: '2024-02-20' },
  { id: '3', name: 'Jessica Brown', email: 'jessica@email.com', phone: '(555) 345-6789', status: 'inactive', joinDate: '2023-11-10' },
];

export default function PatientsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>Manage patient records</p>
        </div>
        <button className={styles.primaryBtn}>+ New Patient</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockPatients.map((patient) => (
              <tr key={patient.id}>
                <td className={styles.patientName}>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.joinDate}</td>
                <td>
                  <span className={`${styles.badge} ${styles[patient.status]}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
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
