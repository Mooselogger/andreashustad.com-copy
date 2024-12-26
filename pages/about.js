// pages/about.js

import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react'; // Add this import
import client from '@/lib/contentful';
import styles from '@/styles/About.module.css';
import AboutSection from '@/components/AboutSection';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ThemeContext } from '@/contexts/ThemeContext'; // Add this import

export async function getStaticProps() {
  try {
    const res = await client.getEntries({
      content_type: 'about',
      'fields.aboutTitle': 'About me', // Ensure exact match
      include: 1, // Fetch linked entries
      limit: 1, // Fetch only one main entry
    });

    console.log('getStaticProps - Fetched Entries:', res.items);

    if (!res.items.length) {
      console.log('getStaticProps - No entries found matching the filter.');
      return { notFound: true };
    }

    const aboutData = res.items[0].fields;

    console.log('getStaticProps - About Data:', aboutData);

    return {
      props: {
        aboutData,
      },
      revalidate: 60, // ISR: Revalidate every minute
    };
  } catch (error) {
    console.error('getStaticProps - Error fetching About data:', error);
    return { notFound: true };
  }
}

const AboutPage = ({ aboutData }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { aboutTitle, aboutContent, aboutProfileImage, aboutSections } =
    aboutData;

  const fullTitle = `${aboutTitle} | Andreas Hustad`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{fullTitle}</title>
        <meta
          name="description"
          content="Learn more about Andreas Hustad, his background, and his professional journey."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta
          property="og:description"
          content="Learn more about Andreas Hustad, his background, and his professional journey."
        />
        {aboutProfileImage && (
          <meta
            property="og:image"
            content={`https:${aboutProfileImage.fields.file.url}`}
          />
        )}
        <meta property="og:url" content="https://andreashustad.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta
          name="twitter:description"
          content="Learn more about Andreas Hustad, his background, and his professional journey."
        />
        {aboutProfileImage && (
          <meta
            name="twitter:image"
            content={`https:${aboutProfileImage.fields.file.url}`}
          />
        )}
      </Head>

      <section
        className={`${styles.aboutHeader} ${isDarkMode ? styles.dark : styles.light}`}
      >
        <div className={styles.profileImage}>
          {aboutProfileImage && (
            <Image
              src={`https:${aboutProfileImage.fields.file.url}`}
              alt={aboutProfileImage.fields.title || 'Profile Image'}
              width={300}
              height={300}
              className={styles.profilePic}
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
        </div>
        <div className={styles.aboutContent}>
          <h1 className={styles.title}>{aboutTitle}</h1>
          <div className={styles.content}>
            {documentToReactComponents(aboutContent)}
          </div>
        </div>
      </section>

      {/* Render Multiple About Sections */}
      {aboutSections && aboutSections.length > 0 ? (
        aboutSections.map((section) => (
          <AboutSection key={section.sys.id} section={section.fields} />
        ))
      ) : (
        <p>No additional sections available.</p>
      )}
    </div>
  );
};

export default AboutPage;
