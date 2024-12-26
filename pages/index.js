// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; // Using CSS Modules for styling

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Head section for SEO, title, and favicon */}
      <Head>
        <title>Andreas Hustad - Personal Website</title>
        <meta
          name="description"
          content="Welcome to the personal website of Andreas Hustad. Explore projects, blog posts, portfolio, and more."
        />
        <meta
          name="keywords"
          content="Andreas Hustad, Personal Website, Technology, Management, Blog, Portfolio"
        />
        <meta name="author" content="Andreas Hustad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Andreas Hustad - Personal Website" />
        <meta
          property="og:description"
          content="Explore the personal projects, blog posts, and more from Andreas Hustad."
        />
        <meta property="og:image" content="/images/og-image.webp" />
        <meta property="og:url" content="https://andreashustad.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Andreas Hustad - Personal Website"
        />
        <meta
          property="twitter:description"
          content="Explore the personal projects, blog posts, and more from Andreas Hustad."
        />
        <meta property="twitter:image" content="/images/og-image.webp" />

        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Hero content */}
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero-bg.webp"
            alt="Hero Background"
            fill
            style={{ objectFit: 'cover' }}
            className={styles.Image}
            quality={75}
            priority
          />
        </div>
        <div className={styles.heroContent}>
          <h1>Welcome to My Personal Website</h1>
          <p>Discover my work, projects, and thoughts.</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className={styles.introduction}>
        <div className={styles.introContent}>
          <div className={styles.profileImage}>
            <Image
              src="/images/Andreas.webp"
              alt="Andreas Hustad"
              width={150}
              height={150}
              className={styles.profilePic}
              style={{ objectFit: 'cover' }} // Moved objectFit to style
            />
          </div>
          <div className={styles.introText}>
            <h2>Hi, I&apos;m Andreas Hustad!</h2>
            <p>
              I&apos;m passionate about technology, management, and creativity.
              This website is my personal space to share my projects, ideas, and
              adventures. Whether it&apos;s professional insights or my latest
              travel pictures, I enjoy sharing my journey with others.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
