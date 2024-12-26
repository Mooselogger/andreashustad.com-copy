// components/AboutSection.js

import Image from 'next/image';
import styles from '@/styles/AboutSection.module.css';
import LazyVideo from '@/components/LazyVideo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutSection = ({ section }) => {
  const { sectionTitle, sectionContent, sectionImage, sectionVideo } = section;

  // Debugging: Log section data
  console.log('AboutSection - section:', section);

  return (
    <section className={styles.section}>
      {sectionImage && (
        <div className={styles.sectionImage}>
          <div className={styles.imageWrapper}>
            <Image
              src={`https:${sectionImage.fields.file.url}`}
              alt={sectionImage.fields.title || `${sectionTitle} Image`}
              width={400}
              height={300}
              className={styles.image}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      )}
      <div className={styles.sectionContent}>
        <h2>{sectionTitle}</h2>
        {/* Correctly render Rich Text content */}
        <div>{documentToReactComponents(sectionContent)}</div>
      </div>
      {sectionVideo && (
        <div className={styles.sectionVideo}>
          <LazyVideo
            src={`https:${sectionVideo.fields.file.url}`}
            alt={`${sectionTitle} Video`}
          />
        </div>
      )}
    </section>
  );
};

export default AboutSection;
