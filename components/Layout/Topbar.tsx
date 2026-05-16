'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import styles from './Topbar.module.css';

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + segments.slice(0, segments.indexOf(segment) + 1).join('/'),
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <header className={styles.topbar}>
      <div className={styles.breadcrumbs}>
        <a href="/dashboard" className={styles.breadcrumbHome}>
          Home
        </a>
        {breadcrumbs.map((crumb, index) => (
          <div key={index}>
            <span className={styles.separator}>/</span>
            <a href={crumb.href} className={styles.breadcrumb}>
              {crumb.label.replace(/-/g, ' ')}
            </a>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {/* Search */}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>

        {/* User Menu */}
        <div className={styles.userMenu}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={styles.userButton}
          >
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
            <div className={styles.userAvatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </button>

          {showUserMenu && (
            <div className={styles.dropdown}>
              <a href="#" className={styles.dropdownItem}>
                Profile
              </a>
              <a href="#" className={styles.dropdownItem}>
                Settings
              </a>
              <button
                onClick={handleLogout}
                className={`${styles.dropdownItem} ${styles.logout}`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
