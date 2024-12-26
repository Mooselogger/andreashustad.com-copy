// components/LazyVideo.js

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/LazyVideo.module.css'; // Ensure the path alias is correct

const LazyVideo = ({ src, alt }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true); // Fallback: Load video immediately
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing after video is visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the video is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (observer && observer.disconnect) observer.disconnect();
    };
  }, []);

  return (
    <div ref={videoRef} className={styles.videoContainer}>
      {isVisible && (
        <video
          className={styles.videoPlayer}
          controls
          src={src}
          aria-label={alt}
          preload="metadata" // Preload only metadata to save bandwidth
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default LazyVideo;
