import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppContext } from './contexts/appContext';

interface EnhancedMetaProps {
	title?: string;
	description?: string;
	image?: string;
	canonicalUrl?: string;
	keywords?: string;
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	section?: string;
	tags?: string[];
	type?: 'website' | 'article';
	twitterCreator?: string;
	noindex?: boolean;
}

export const Meta = ({
	title,
	description,
	image,
	canonicalUrl,
	keywords,
	author,
	publishedTime,
	modifiedTime,
	section,
	tags,
	type = 'website',
	twitterCreator,
	noindex = false,
}: EnhancedMetaProps = {}) => {
	const { publication, post, page } = useAppContext();
	const router = useRouter();
	const { metaTags, favicon } = publication;
	
	// Build canonical URL
	const baseUrl = publication.url;
	const currentPath = router.asPath.split('?')[0];
	const canonical = canonicalUrl || `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
	
	// Build title
	const pageTitle = title || 
		(post?.seo?.title || post?.title) || 
		(page?.title) || 
		publication.displayTitle || 
		publication.title;
	const fullTitle = currentPath === '/' ? pageTitle : `${pageTitle} - ${publication.title}`;
	
	// Build description
	const pageDescription = description || 
		(post?.seo?.description || post?.subtitle || post?.brief) || 
		publication.descriptionSEO || 
		publication.title || 
		`${publication.author.name}'s Blog`;
	
	// Build image URL
	const pageImage = image || 
		(post?.ogMetaData?.image || post?.coverImage?.url) || 
		publication.ogMetaData?.image || 
		publication.preferences?.logo;
	
	// Build keywords
	const pageKeywords = keywords || 
		(tags && tags.join(', ')) || 
		(post?.tags && post.tags.map((tag: any) => tag.name).join(', '));
	
	// Author information
	const pageAuthor = author || 
		(post?.author?.name) || 
		publication.author.name;
	
	// Twitter handle
	const twitterSite = publication.integrations?.fbPixelID ? 
		`@hashnode` : undefined; // Fallback since twitterHandle not in schema
	const twitterCreatorHandle = twitterCreator;

	const defaultFavicons = (
		<>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
			<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="theme-color" content="#000" />
		</>
	);

	return (
		<Head>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={pageDescription} />
			{pageKeywords && <meta name="keywords" content={pageKeywords} />}
			{pageAuthor && <meta name="author" content={pageAuthor} />}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			
			{/* Canonical URL */}
			<link rel="canonical" href={canonical} />
			
			{/* Robots */}
			{noindex ? (
				<meta name="robots" content="noindex, nofollow" />
			) : (
				<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
			)}
			
			{/* Open Graph Meta Tags */}
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={pageDescription} />
			<meta property="og:url" content={canonical} />
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={publication.title} />
			{pageImage && <meta property="og:image" content={pageImage} />}
			{pageImage && <meta property="og:image:width" content="1200" />}
			{pageImage && <meta property="og:image:height" content="630" />}
			{pageImage && <meta property="og:image:alt" content={pageTitle} />}
			<meta property="og:locale" content="en_US" />
			
			{/* Article-specific Open Graph tags */}
			{type === 'article' && (
				<>
					{publishedTime && <meta property="article:published_time" content={publishedTime} />}
					{modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
					{pageAuthor && <meta property="article:author" content={pageAuthor} />}
					{section && <meta property="article:section" content={section} />}
					{tags?.map((tag, index) => (
						<meta key={index} property="article:tag" content={tag} />
					))}
				</>
			)}
			
			{/* Twitter Card Meta Tags */}
			<meta name="twitter:card" content={pageImage ? "summary_large_image" : "summary"} />
			{twitterSite && <meta name="twitter:site" content={twitterSite} />}
			{twitterCreatorHandle && <meta name="twitter:creator" content={twitterCreatorHandle} />}
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={pageDescription} />
			{pageImage && <meta name="twitter:image" content={pageImage} />}
			{pageImage && <meta name="twitter:image:alt" content={pageTitle} />}
			
			{/* Additional Meta Tags */}
			<meta name="generator" content="Hashnode Blog Starter Kit" />
			<meta name="referrer" content="no-referrer-when-downgrade" />
			
			{/* DNS Prefetch & Preconnect */}
			<link rel="dns-prefetch" href="//cdn.hashnode.com" />
			<link rel="dns-prefetch" href="//fonts.googleapis.com" />
			<link rel="dns-prefetch" href="//fonts.gstatic.com" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			
			{/* Favicons */}
			{favicon ? <link rel="icon" type="image/png" href={favicon} /> : defaultFavicons}
			<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
			
			{/* RSS Feed */}
			<link rel="alternate" type="application/rss+xml" title={`${publication.title} RSS Feed`} href="/feed.xml" />
			
			{/* Font Optimization */}
			<link
				rel="preload"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
				as="style"
			/>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			/>
			
			{/* Custom Meta Tags from Hashnode */}
			{metaTags && parse(metaTags)}
		</Head>
	);
};
