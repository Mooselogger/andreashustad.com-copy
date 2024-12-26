// pages/blog.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/lib/contentful.js';
import styles from '@/styles/Blog.module.css';

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export async function getStaticProps() {
  try {
    const res = await client.getEntries({
      content_type: 'blogPosts',
      order: '-fields.blogPublishedDate',
    });

    // Serialize the date before sending it as props
    const posts = res.items.map((post) => ({
      ...post,
      fields: {
        ...post.fields,
        blogPublishedDate: post.fields.blogPublishedDate
          ? new Date(post.fields.blogPublishedDate).toISOString()
          : null,
      },
    }));

    return {
      props: {
        posts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { notFound: true };
  }
}

const Blog = ({ posts }) => {
  const blogTitle = 'Andreas Hustad Blog';

  if (!Array.isArray(posts)) {
    return <div>No posts available</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{blogTitle}</title>
        <meta
          name="description"
          content="Read Andreas Hustad's latest blog posts."
        />
        <meta property="og:title" content={blogTitle} />
        <meta
          property="og:description"
          content="Read Andreas Hustad's latest blog posts."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: blogTitle,
            description: "Read Andreas Hustad's latest blog posts.",
            url: 'https://andreashustad.com/blog',
          })}
        </script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>
        <ul className={styles.postList}>
          {posts.map((post) => {
            const {
              blogTitle,
              blogSlug,
              blogExcerpt,
              blogFeaturedImage,
              blogPublishedDate,
            } = post.fields || {};

            if (!blogSlug) return null;

            return (
              <li key={blogSlug} className={styles.postItem}>
                <Link href={`/blog/${blogSlug}`} className={styles.postLink}>
                  {blogFeaturedImage?.fields?.file?.url && (
                    <div className={styles.postImage}>
                      <Image
                        src={`https:${blogFeaturedImage.fields.file.url}`}
                        alt={blogFeaturedImage.fields.title || blogTitle || ''}
                        width={400}
                        height={250}
                        className={styles.image}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}
                  <div className={styles.postContent}>
                    <h2 className={styles.postTitle}>
                      {blogTitle || 'Untitled'}
                    </h2>
                    {blogExcerpt && (
                      <p className={styles.postExcerpt}>{blogExcerpt}</p>
                    )}
                    {blogPublishedDate && (
                      <span className={styles.postDate}>
                        {formatDate(blogPublishedDate)}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Blog;
