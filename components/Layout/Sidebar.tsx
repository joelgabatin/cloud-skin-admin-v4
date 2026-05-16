'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { NAVIGATION_MENU } from '@/lib/constants';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  if (!user) return null;

  const menuItems = NAVIGATION_MENU[user.role];

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#2D6A9F" rx="8" />
            <circle cx="16" cy="16" r="10" fill="#5BC0EB" />
          </svg>
        </div>
        <div>
          <div className={styles.logoText}>Cloud Skin</div>
          <div className={styles.logoSubtext}>Admin</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenu === item.label;

            return (
              <li key={item.label}>
                {hasSubmenu ? (
                  <>
                    <button
                      className={`${styles.menuItem} ${active ? styles.active : ''}`}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <span className={styles.icon}>{item.icon}</span>
                      <span className={styles.label}>{item.label}</span>
                      <span className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}>
                        ›
                      </span>
                    </button>
                    {isExpanded && (
                      <ul className={styles.submenu}>
                        {item.submenu.map((subitem) => (
                          <li key={subitem.label}>
                            <Link
                              href={subitem.href}
                              className={`${styles.submenuItem} ${isActive(subitem.href) ? styles.active : ''}`}
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.menuItem} ${active ? styles.active : ''}`}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
