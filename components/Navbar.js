// components/Navbar.js

import { useContext, useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Navbar.module.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import Image from 'next/image';
import { ThemeContext } from '@/contexts/ThemeContext';

const LogoImage = memo(({ isDarkMode, onClick }) => (
  <Image
    src={isDarkMode ? '/images/Logo-white.webp' : '/images/Logo-black.webp'}
    alt="Andreas Hustad Logo"
    width={150}
    height={50}
    priority
    className={styles.logoImage}
    style={{
      maxWidth: '150px',
      width: 'auto',
      height: '50px',
    }}
    onClick={onClick}
  />
));

LogoImage.displayName = 'LogoImage';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.nav}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} onClick={closeMenu}>
            <LogoImage isDarkMode={isDarkMode} onClick={closeMenu} />
          </Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul
          className={`${styles.navLinks} ${isOpen ? styles.navLinksActive : ''}`}
        >
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${
                router.pathname === '/' ? styles.activeLink : ''
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${styles.navLink} ${
                router.pathname === '/about' ? styles.activeLink : ''
              }`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog/page/1" // Updated href to point to /blog/page/1
              className={`${styles.navLink} ${
                router.pathname.startsWith('/blog') ? styles.activeLink : ''
              }`}
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/resources"
              className={`${styles.navLink} ${
                router.pathname === '/resources' ? styles.activeLink : ''
              }`}
              onClick={closeMenu}
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`${styles.navLink} ${
                router.pathname === '/contact' ? styles.activeLink : ''
              }`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              className={styles.darkModeButton}
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
