// components/BlogCard.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/BlogCard.module.css'; // Create this file for the styles

const getImageUrl = (imageField) => {
  if (!imageField) return null;
  if (Array.isArray(imageField) && imageField.length > 0) {
    return `https:${imageField[0].fields.file.url}`;
  }
  return `https:${imageField.fields.file.url}`;
};

const BlogCard = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <Link href={`/blog/${post.fields.blogSlug}`}>
        <div className={styles.postThumbnail}>
          {getImageUrl(post.fields.blogFeaturedImage) && (
            <div className={styles.imageContainer}>
              <Image
                src={getImageUrl(post.fields.blogFeaturedImage)}
                alt={post.fields.blogTitle}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          )}
        </div>
        <div className={styles.postInfo}>
          <h2>{post.fields.blogTitle}</h2>
          <p>{post.fields.blogExcerpt}</p>
          <p className={styles.postDate}>
            Published on{' '}
            {new Date(post.fields.blogPublishedDate).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
