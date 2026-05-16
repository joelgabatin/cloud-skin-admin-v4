'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { ROLES } from '@/lib/constants';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showRoleSelector, setShowRoleSelector] = useState(true);

  const roles: UserRole[] = ['admin', 'receptionist', 'practitioner', 'accountant'];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelector(false);
  };

  const handleBackToRoles = () => {
    setShowRoleSelector(true);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password, selectedRole);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.login}>
      {/* Left Panel - Branding */}
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <div className={styles.logoPlate}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" fill="#fff" rx="8" />
              <circle cx="16" cy="16" r="10" fill="#2D6A9F" />
            </svg>
          </div>
          <h1 className={styles.brandH1}>Cloud Skin</h1>
          <p className={styles.brandSub}>Admin Portal</p>
          <p className={styles.brandDesc}>Clinic + Wellness Management System</p>

          {showRoleSelector && (
            <div className={styles.roleSection}>
              <p className={styles.roleLabel}>Select your role to continue</p>
              <div className={styles.roleList}>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={styles.roleBtn}
                  >
                    <div className={styles.roleAvatar} style={{ backgroundColor: ROLES[role].color }}>
                      {ROLES[role].label.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.roleName}>{ROLES[role].label}</div>
                      <div className={styles.roleEmail}>{role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            {!showRoleSelector && (
              <button
                type="button"
                onClick={handleBackToRoles}
                className={styles.backBtn}
              >
                ← Back
              </button>
            )}
            <h2 className={styles.formH1}>Sign in</h2>
            <p className={styles.formSub}>
              Signing in as <strong>{ROLES[selectedRole].label}</strong>
            </p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className={`${styles.field} ${styles.password}`}>
            <label htmlFor="password">Password</label>
            <div className={styles.pwWrap}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.pwToggle}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className={styles.forgot}>
            <a href="#">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.btnSignin} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? '⏳ Signing in...' : 'Sign in'}
          </button>

          <div className={styles.formFoot}>
            Don&apos;t have an account? <a href="#">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
