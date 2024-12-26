// pages/resources.js
import { useState } from 'react';
import { createClient } from 'contentful';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Resources.module.css';
import { Card } from '../components/ui/card';

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
      content_type: 'resource',
      order: '-sys.createdAt',
    });

    return {
      props: {
        resources: response.items || [],
        error: null,
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {
        resources: [],
        error: 'Failed to load resources',
      },
    };
  }
}

const Resources = ({ resources = [], error = null }) => {
  const [expandedCards, setExpandedCards] = useState({});

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'application/pdf':
        return '📄';
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      case 'application/vnd.ms-powerpoint':
        return '📊';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        return '📝';
      default:
        return '📁';
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getPlainTextLength = (markdown) => {
    return markdown
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~`#>|-]/g, '')
      .trim()
      .length;
  };

  const truncateMarkdown = (markdown = '', maxLength = 150) => {
    if (!markdown) return '';
    
    const paragraphs = markdown.split('\n\n');
    let currentLength = 0;
    let truncatedParagraphs = [];

    for (const paragraph of paragraphs) {
      const plainTextLength = getPlainTextLength(paragraph);
      if (currentLength + plainTextLength <= maxLength) {
        truncatedParagraphs.push(paragraph);
        currentLength += plainTextLength;
      } else {
        if (truncatedParagraphs.length === 0) {
          const words = paragraph.split(' ');
          let truncatedParagraph = '';
          for (const word of words) {
            const wordLength = getPlainTextLength(word);
            if (currentLength + wordLength <= maxLength) {
              truncatedParagraph += (truncatedParagraph ? ' ' : '') + word;
              currentLength += wordLength;
            } else {
              break;
            }
          }
          truncatedParagraphs.push(truncatedParagraph + '...');
        }
        break;
      }
    }

    return truncatedParagraphs.join('\n\n');
  };

  const handleDownload = (url) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Resources</h1>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  if (!Array.isArray(resources) || resources.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Resources</h1>
        <div className={styles.emptyState}>
          No resources available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resources</h1>
      <div className={styles.resourcesGrid}>
        {resources.map((resource) => {
          if (!resource?.fields) return null;

          const isExpanded = expandedCards[resource.sys?.id];
          const description = resource.fields.description || '';
          const fileType = resource.fields.file?.fields?.file?.contentType;
          const fileSize = resource.fields.file?.fields?.file?.details?.size;
          const shouldTruncate = getPlainTextLength(description) > 150;

          return (
            <Card
              key={resource.sys?.id || Math.random()}
              className={styles.resourceCard}
            >
              <div className={styles.resourceContent}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceIcon}>
                    {getFileIcon(fileType)}
                  </span>
                  <div className={styles.resourceHeaderText}>
                    <h3 className={styles.resourceTitle}>
                      {resource.fields.title}
                    </h3>
                    <span className={styles.resourceDate}>
                      {formatDate(resource.sys?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className={styles.resourceBody}>
                  <div className={styles.resourceDescription}>
                    <div className={styles.markdownContent}>
                      <ReactMarkdown>
                        {isExpanded ? description : truncateMarkdown(description)}
                      </ReactMarkdown>
                    </div>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(resource.sys.id)}
                        className={styles.readMoreButton}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.resourceFooter}>
                  <span className={styles.fileSize}>
                    {fileSize
                      ? `${(fileSize / (1024 * 1024)).toFixed(1)} MB`
                      : ''}
                  </span>
                  <button
                    onClick={() =>
                      handleDownload(resource.fields.file?.fields?.file?.url)
                    }
                    className={styles.downloadButton}
                  >
                    Download
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;