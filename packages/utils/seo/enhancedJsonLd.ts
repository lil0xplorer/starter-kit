/**
 * Generate comprehensive website/organization schema
 */
export function addWebsiteJsonLd(publication: any) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${publication.url}#website`,
		url: publication.url,
		name: publication.title,
		description: publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`,
		publisher: {
			'@type': publication.isTeam ? 'Organization' : 'Person',
			'@id': `${publication.url}#${publication.isTeam ? 'organization' : 'person'}`,
			name: publication.isTeam ? publication.title : publication.author.name,
			url: publication.url,
			...(publication.preferences?.logo && {
				logo: {
					'@type': 'ImageObject',
					url: publication.preferences.logo,
				},
			}),
			...(publication.author && !publication.isTeam && {
				image: publication.author.profilePicture,
			}),
		},
		potentialAction: [
			{
				'@type': 'SearchAction',
				target: {
					'@type': 'EntryPoint',
					urlTemplate: `${publication.url}/search?q={search_term_string}`,
				},
				'query-input': 'required name=search_term_string',
			},
		],
		...(publication.links?.length > 0 && {
			sameAs: publication.links.map((link: any) => link.url),
		}),
	};
	
	return schema;
}

/**
 * Generate breadcrumb schema for navigation
 */
export function addBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url,
		})),
	};
	
	return schema;
}

/**
 * Generate author profile schema
 */
export function addAuthorJsonLd(author: any, publication: any) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `https://hashnode.com/@${author.username}#person`,
		name: author.name,
		url: `https://hashnode.com/@${author.username}`,
		...(author.profilePicture && {
			image: {
				'@type': 'ImageObject',
				url: author.profilePicture,
			},
		}),
		...(author.bio && {
			description: author.bio.text,
		}),
		...(author.socialMediaLinks && {
			sameAs: Object.values(author.socialMediaLinks).filter(Boolean),
		}),
		worksFor: {
			'@type': publication.isTeam ? 'Organization' : 'Person',
			name: publication.title,
			url: publication.url,
		},
	};
	
	return schema;
}

/**
 * Enhanced article schema with more comprehensive data
 */
export function addEnhancedArticleJsonLd(publication: any, post: any) {
	const tags = (post.tags ?? []).map((tag: any) => tag.name);
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': post.url,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': post.url,
		},
		headline: post.title,
		name: post.title,
		description: post.seo?.description || post.subtitle || post.brief,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			'@type': 'Person',
			'@id': `https://hashnode.com/@${post.author?.username}#person`,
			name: post.author?.name,
			url: `https://hashnode.com/@${post.author?.username}`,
			...(post.author?.profilePicture && {
				image: {
					'@type': 'ImageObject',
					url: post.author.profilePicture,
				},
			}),
		},
		publisher: {
			'@type': publication.isTeam ? 'Organization' : 'Person',
			'@id': `${publication.url}#${publication.isTeam ? 'organization' : 'person'}`,
			name: publication.isTeam ? publication.title : publication.author.name,
			url: publication.url,
			...(publication.preferences?.logo && {
				logo: {
					'@type': 'ImageObject',
					url: publication.preferences.logo,
				},
			}),
		},
		...(post.coverImage?.url && {
			image: {
				'@type': 'ImageObject',
				url: post.coverImage.url,
				width: 1200,
				height: 630,
			},
		}),
		url: post.url,
		isPartOf: {
			'@type': 'Blog',
			'@id': `${publication.url}#blog`,
			name: publication.title,
			description: publication.descriptionSEO || publication.title,
			url: publication.url,
		},
		...(tags.length > 0 && {
			keywords: tags,
		}),
		...(post.readTimeInMinutes && {
			timeRequired: `PT${post.readTimeInMinutes}M`,
		}),
		...(post.subtitle && {
			alternativeHeadline: post.subtitle,
		}),
		wordCount: post.content?.markdown ? post.content.markdown.split(/\s+/).length : undefined,
		commentCount: post.responseCount || 0,
		...(post.series && {
			isPartOf: {
				'@type': 'BlogPosting',
				name: post.series.name,
				url: `${publication.url}/series/${post.series.slug}`,
			},
		}),
	};
	
	return schema;
}

/**
 * Generate FAQ schema if the post contains FAQ content
 */
export function addFAQJsonLd(faqItems: Array<{ question: string; answer: string }>) {
	if (!faqItems || faqItems.length === 0) return null;
	
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
	
	return schema;
}