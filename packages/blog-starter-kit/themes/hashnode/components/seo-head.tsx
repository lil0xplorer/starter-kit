import Head from 'next/head';
import { PublicationFragment, PostFullFragment, StaticPageFragment } from '../generated/graphql';

interface SEOHeadProps {
	publication: PublicationFragment;
	post?: PostFullFragment;
	page?: StaticPageFragment;
	currentUrl?: string;
	pageType?: 'home' | 'post' | 'page' | 'tag' | 'author' | 'archive';
	customTitle?: string;
	customDescription?: string;
	customImage?: string;
	noIndex?: boolean;
	breadcrumbs?: Array<{ name: string; url: string }>;
}

export const SEOHead = ({
	publication,
	post,
	page,
	currentUrl,
	pageType = 'home',
	customTitle,
	customDescription,
	customImage,
	noIndex = false,
	breadcrumbs = [],
}: SEOHeadProps) => {
	// Determine title
	const getTitle = () => {
		if (customTitle) return customTitle;
		if (post) return post.seo?.title || post.title;
		if (page) return page.title;
		return publication.title;
	};

	// Determine description  
	const getDescription = () => {
		if (customDescription) return customDescription;
		if (post) return post.seo?.description || post.subtitle || post.brief || '';
		if (page) return page.slug; // Pages don't have descriptions in the schema
		return publication.descriptionSEO || '';
	};

	// Determine image
	const getImage = () => {
		if (customImage) return customImage;
		if (post) {
			return post.ogMetaData?.image || post.coverImage?.url || 
				`${publication.url}/api/og?title=${encodeURIComponent(post.title)}`;
		}
		return publication.ogMetaData?.image || `${publication.url}/api/og`;
	};

	// Determine canonical URL
	const getCanonicalUrl = () => {
		if (currentUrl) return currentUrl;
		if (post) return post.url;
		if (page) return `${publication.url}/${page.slug}`;
		return publication.url;
	};

	// Generate robots content
	const getRobotsContent = () => {
		if (noIndex) return 'noindex, nofollow';
		return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
	};

	// Generate breadcrumb structured data
	const getBreadcrumbJsonLd = () => {
		if (breadcrumbs.length === 0) return null;

		const itemListElement = breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url,
		}));

		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement,
		};
	};

	// Generate reading time for posts
	const getReadingTime = () => {
		if (!post || !post.readTimeInMinutes) return null;
		return Math.ceil(post.readTimeInMinutes);
	};

	const title = getTitle();
	const description = getDescription();
	const image = getImage();
	const canonicalUrl = getCanonicalUrl();
	const robotsContent = getRobotsContent();
	const breadcrumbJsonLd = getBreadcrumbJsonLd();
	const readingTime = getReadingTime();

	return (
		<Head>
			{/* Primary Meta Tags */}
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta name="robots" content={robotsContent} />
			<link rel="canonical" href={canonicalUrl} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={pageType === 'post' ? 'article' : 'website'} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:site_name" content={publication.title} />
			<meta property="og:locale" content="en_US" />

			{/* Article specific Open Graph tags */}
			{post && (
				<>
					<meta property="article:published_time" content={post.publishedAt} />
					{post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
					<meta property="article:author" content={post.author.name} />
					{post.tags?.map((tag) => (
						<meta key={tag.id} property="article:tag" content={tag.name} />
					))}
				</>
			)}

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={canonicalUrl} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />
			<meta property="twitter:image:alt" content={`Cover image for ${title}`} />
			{publication.links?.twitter && (
				<meta property="twitter:site" content={`@${publication.links.twitter}`} />
			)}

			{/* Additional Meta Tags */}
			<meta name="author" content={post?.author.name || publication.author?.name || publication.title} />
			<meta name="publisher" content={publication.title} />
			{readingTime && <meta name="twitter:label1" content="Reading time" />}
			{readingTime && <meta name="twitter:data1" content={`${readingTime} min read`} />}

			{/* Structured Data */}
			{breadcrumbJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
			)}

			{/* Language and regional targeting */}
			<meta httpEquiv="content-language" content="en-US" />
			<link rel="alternate" hrefLang="en" href={canonicalUrl} />
		</Head>
	);
};