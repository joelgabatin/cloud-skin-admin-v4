'use client'

import React, { useState } from 'react'
import { LinkButton } from './Button'
import styles from './Navbar.module.css'

interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  logo?: string
  brandName?: string
  tagline?: string
  links?: NavLink[]
  accountLink?: string
  bookLink?: string
  onBookClick?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  brandName = 'Cloud Skin',
  tagline = 'Clinic + Wellness',
  links = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  accountLink = '/account',
  bookLink = '/booking',
  onBookClick,
}) => {
  const [activeLink, setActiveLink] = useState(links.find(l => l.active)?.href || links[0].href)

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoRow}>
        {logo && (
          <img src={logo} alt={brandName} className={styles.logo} />
        )}
        <div className={styles.brandInfo}>
          <div className={styles.wordmark}>{brandName}</div>
          <div className={styles.tagline}>{tagline}</div>
        </div>
      </div>

      <div className={styles.links}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
            onClick={() => setActiveLink(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.right}>
        <LinkButton
          variant="text-blue"
          size="sm"
          href={accountLink}
          className={styles.account}
        >
          My Account
        </LinkButton>
        <LinkButton
          variant="primary-teal"
          size="sm"
          href={bookLink}
          onClick={onBookClick}
        >
          Book Now
        </LinkButton>
      </div>
    </nav>
  )
}
