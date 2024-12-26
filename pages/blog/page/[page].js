// pages/blog/page/[page].js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/lib/contentful.js';
import styles from '@/styles/BlogPage.module.css';

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export async function getStaticPaths() {
  try {
    const res = await client.getEntries({
      content_type: 'blogPosts',
    });

    const postsPerPage = 5;
    const totalPages = Math.ceil(res.items.length / postsPerPage);

    const paths = Array.from({ length: totalPages }, (_, index) => ({
      params: { page: (index + 1).toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const postsPerPage = 5;
    const currentPage = parseInt(params.page, 10);
    const skip = (currentPage - 1) * postsPerPage;

    const res = await client.getEntries({
      content_type: 'blogPosts',
      limit: postsPerPage,
      skip: skip,
      order: '-fields.blogPublishedDate',
    });

    // Serialize the dates before sending as props
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
        currentPage,
        totalPages: Math.ceil(res.total / postsPerPage),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog posts for page:', error);
    return { notFound: true };
  }
}

const BlogPage = ({ posts, currentPage, totalPages }) => {
  const pageTitle = `Blog | Page ${currentPage} of ${totalPages} | Andreas Hustad`;

  if (!Array.isArray(posts)) {
    return <div>No posts available</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Discover page ${currentPage} of our blog posts.`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={`Page ${currentPage} of Andreas Hustad's blog posts.`}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Page {currentPage} of {totalPages}
        </p>
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

        <div className={styles.pagination}>
          {currentPage > 1 && (
            <Link
              href={`/blog/page/${currentPage - 1}`}
              className={styles.paginationLink}
            >
              ← Previous
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className={styles.paginationLink}
            >
              Next →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
