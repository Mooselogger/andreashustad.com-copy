// components/Layout.js

import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '@/styles/Layout.module.css';
import { Analytics } from "@vercel/analytics/react"

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Analytics />
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
