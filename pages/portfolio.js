// pages/portfolio.js

import Head from 'next/head';
import styles from '@/styles/Portfolio.module.css';

const Portfolio = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio | YourSiteName</title>
        <meta name="description" content="Our work and projects." />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Portfolio</h1>
        <p className={styles.description}>This page is under construction.</p>
        <p className={styles.description}>Please check back later!</p>
      </main>
    </div>
  );
};

export default Portfolio;
