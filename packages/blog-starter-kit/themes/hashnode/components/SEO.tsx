import Head from 'next/head';
import React from 'react';

/**
 * SEO Component for Hashnode Headless CMS Blog Starter Kit
 * 
 * This component provides comprehensive SEO optimization including:
 * - Meta tags (title, description, keywords)
 * - OpenGraph tags for social media sharing
 * - Twitter Cards for Twitter sharing
 * - Canonical URLs for duplicate content prevention
 * - JSON-LD structured data
 * 
 * Usage Examples:
 * 
 * 1. Basic homepage usage:
 * <SEO 
 *   title="My Blog"
 *   description="Welcome to my tech blog"
 *   url="https://myblog.com"
 * />
 * 
 * 2. Blog post usage with Hashnode CMS data:
 * <SEO 
 *   title={post.title}
 *   description={post.brief || post.subtitle}
 *   url={`https://myblog.com/${post.slug}`}
 *   image={post.coverImage?.url}
 *   article={{
 *     publishedTime: post.publishedAt,
 *     modifiedTime: post.updatedAt,
 *     author: post.author.name,
 *     tags: post.tags.map(tag => tag.name)
 *   }}
 * />
 * 
 * 3. Static page usage:
 * <SEO 
 *   title="About Us | My Blog"
 *   description="Learn more about our team and mission"
 *   url="https://myblog.com/about"
 * />
 */

interface ArticleData {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

interface SEOProps {
  /** Page title - will be used for both <title> and og:title */
  title: string;
  
  /** Meta description - should be 150-160 characters for best results */
  description: string;
  
  /** Canonical URL of the page - helps prevent duplicate content issues */
  url: string;
  
  /** Image URL for social media sharing (OpenGraph and Twitter) */
  image?: string;
  
  /** Site name - defaults to publication title from Hashnode */
  siteName?: string;
  
  /** Twitter handle without @ symbol */
  twitterHandle?: string;
  
  /** Article-specific data for blog posts */
  article?: ArticleData;
  
  /** Additional keywords for meta keywords tag */
  keywords?: string[];
  
  /** Custom JSON-LD structured data */
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  siteName = 'Hashnode Blog',
  twitterHandle,
  article,
  keywords = [],
  structuredData
}) => {
  // Ensure title is not too long (recommended max 60 characters)
  const pageTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  
  // Ensure description is not too long (recommended max 160 characters)
  const metaDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;
  
  // Generate JSON-LD structured data
  const generateStructuredData = () => {
    if (structuredData) {
      return structuredData;
    }
    
    const baseData = {
      '@context': 'https://schema.org',
      '@type': article ? 'Article' : 'WebPage',
      headline: title,
      description: metaDescription,
      url,
      ...(image && { image }),
    };
    
    if (article) {
      return {
        ...baseData,
        '@type': 'Article',
        ...(article.publishedTime && { datePublished: article.publishedTime }),
        ...(article.modifiedTime && { dateModified: article.modifiedTime }),
        ...(article.author && {
          author: {
            '@type': 'Person',
            name: article.author,
          },
        }),
        ...(article.tags && article.tags.length > 0 && { keywords: article.tags }),
      };
    }
    
    return baseData;
  };

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Keywords meta tag (less important for modern SEO but still useful) */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL - important for preventing duplicate content issues */}
      <link rel="canonical" href={url} />
      
      {/* OpenGraph tags for social media sharing */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      
      {/* OpenGraph image */}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={title} />
        </>
      )}
      
      {/* Article-specific OpenGraph tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      
      {/* Twitter handle */}
      {twitterHandle && (
        <>
          <meta name="twitter:site" content={`@${twitterHandle}`} />
          <meta name="twitter:creator" content={`@${twitterHandle}`} />
        </>
      )}
      
      {/* Twitter image */}
      {image && (
        <meta name="twitter:image" content={image} />
      )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
    </Head>
  );
};

export default SEO;