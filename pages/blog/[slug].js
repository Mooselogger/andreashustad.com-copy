// pages/blog/[slug].js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/lib/contentful.js';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '@/styles/BlogPost.module.css';

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

    const paths = res.items
      .filter((item) => item.fields?.blogSlug)
      .map((item) => ({
        params: { slug: item.fields.blogSlug },
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
    const res = await client.getEntries({
      content_type: 'blogPosts',
      'fields.blogSlug': params.slug,
      limit: 1,
    });

    if (!res.items.length) {
      return { notFound: true };
    }

    const post = res.items[0];

    // Serialize the date and ensure all required fields exist
    return {
      props: {
        post: {
          ...post,
          fields: {
            ...post.fields,
            blogPublishedDate: post.fields.blogPublishedDate
              ? new Date(post.fields.blogPublishedDate).toISOString()
              : null,
            blogTitle: post.fields.blogTitle || 'Untitled',
            blogAuthor: post.fields.blogAuthor || 'Anonymous',
            blogExcerpt: post.fields.blogExcerpt || '',
          },
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
}

const BlogPost = ({ post }) => {
  const router = useRouter();
  const { from } = router.query;

  const backLink = from && from.startsWith('/blog') ? from : '/blog/page/1';

  if (!post?.fields) {
    return <div>Error: Post data is unavailable.</div>;
  }

  const {
    blogTitle,
    blogBody,
    blogFeaturedImage,
    blogAuthor,
    blogPublishedDate,
    blogExcerpt,
  } = post.fields;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${blogTitle} | Andreas Hustad`}</title>
        <meta name="description" content={blogExcerpt || ''} />
        <meta property="og:title" content={`${blogTitle} | Andreas Hustad`} />
        <meta property="og:description" content={blogExcerpt || ''} />
        {blogFeaturedImage?.fields?.file?.url && (
          <meta
            property="og:image"
            content={`https:${blogFeaturedImage.fields.file.url}`}
          />
        )}
      </Head>

      <article className={styles.article}>
        <h1 className={styles.title}>{blogTitle}</h1>
        <div className={styles.meta}>
          {blogAuthor && <span>By {blogAuthor}</span>}
          {blogAuthor && blogPublishedDate && <span> | </span>}
          {blogPublishedDate && <span>{formatDate(blogPublishedDate)}</span>}
        </div>

        {blogFeaturedImage?.fields?.file?.url && (
          <div className={styles.featuredImage}>
            <Image
              src={`https:${blogFeaturedImage.fields.file.url}`}
              alt={blogFeaturedImage.fields.title || blogTitle}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        <div className={styles.content}>
          {blogBody && documentToReactComponents(blogBody)}
        </div>

        <div className={styles.backLink}>
          <Link href={backLink}>← Back to Blog</Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
