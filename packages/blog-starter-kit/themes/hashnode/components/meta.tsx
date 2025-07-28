import parse from 'html-react-parser';
import Head from 'next/head';

import { useAppContext } from './contexts/appContext';

export const Meta = () => {
	const { publication } = useAppContext();
	const { metaTags, favicon, title, descriptionSEO, url } = publication;
	
	// Enhanced default favicons with additional sizes
	const defaultFavicons = (
		<>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
			<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
			<link rel="shortcut icon" href="/favicon/favicon.ico" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
			<meta name="theme-color" content="#000" />
		</>
	);

	// Enhanced SEO meta tags
	const seoTags = (
		<>
			{/* Essential meta tags */}
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="format-detection" content="telephone=no" />
			<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
			
			{/* Enhanced Open Graph tags */}
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content={title} />
			<meta property="og:locale" content="en_US" />
			{url && <meta property="og:url" content={url} />}
			
			{/* Enhanced Twitter Card tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={url} />
			
			{/* Additional SEO tags */}
			<meta name="author" content={title} />
			<meta name="publisher" content={title} />
			<link rel="canonical" href={url} />
			
			{/* RSS and Sitemap */}
			<link rel="alternate" type="application/rss+xml" title={`${title} RSS Feed`} href="/rss.xml" />
			<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
			
			{/* Preconnect to external domains for performance */}
			<link rel="preconnect" href="https://cdn.hashnode.com" />
			<link rel="preconnect" href="https://gql.hashnode.com" />
			<link rel="dns-prefetch" href="https://cdn.hashnode.com" />
			<link rel="dns-prefetch" href="https://gql.hashnode.com" />
			
			{/* Security headers */}
			<meta name="referrer" content="strict-origin-when-cross-origin" />
		</>
	);

	return (
		<Head>
			{favicon ? <link rel="icon" type="image/png" href={favicon} /> : defaultFavicons}
			{seoTags}
			{metaTags && parse(metaTags)}
		</Head>
	);
};
