'use client';

import styles from './page.module.css';

const mockStaff = [
  { id: '1', name: 'Dr. Maria Garcia', role: 'Practitioner', email: 'maria@clinic.com', status: 'active', joinDate: '2023-05-10' },
  { id: '2', name: 'Dr. Alex Johnson', role: 'Practitioner', email: 'alex@clinic.com', status: 'active', joinDate: '2023-08-15' },
  { id: '3', name: 'Sarah Admin', role: 'Administrator', email: 'sarah@clinic.com', status: 'active', joinDate: '2023-01-20' },
];

export default function StaffPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Staff Management</h1>
          <p className={styles.subtitle}>Manage team members</p>
        </div>
        <button className={styles.primaryBtn}>+ Add Staff</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockStaff.map((staff) => (
              <tr key={staff.id}>
                <td className={styles.staffName}>{staff.name}</td>
                <td>{staff.role}</td>
                <td>{staff.email}</td>
                <td>{staff.joinDate}</td>
                <td>
                  <span className={`${styles.badge} ${styles[staff.status]}`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
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
