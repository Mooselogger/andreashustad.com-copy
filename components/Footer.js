// components/Footer.js

import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import additional icons
import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerText}>
          <p>© 2024 Andreas Hustad. All rights reserved.</p>
        </div>
        <div className={styles.socialIcons}>
          <a
            href="https://www.linkedin.com/in/andreashustad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/andreas_hustad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/andreas_hustad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          {/* Add more social icons if needed */}
        </div>
        <div className={styles.additionalLinks}>
          <Link href="/privacy-policy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className={styles.footerLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

// If Footer accepts props in the future, define propTypes accordingly
Footer.propTypes = {
  // Define prop types here
};
