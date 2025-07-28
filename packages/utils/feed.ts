import RSS from 'rss';

const NON_ASCII_REGEX = /[\u{0080}-\u{FFFF}]/gu;

export const constructRSSFeedFromPosts = (
	publication: any,
	posts: any[],
	currentCursor: string | null,
	nextCursor: string | null,
) => {
	const baseUrl = publication.url;

	const customElements = [
		{
			'atom:link': {
				_attr: {
					rel: 'first',
					href: `${baseUrl}/rss.xml`,
				},
			},
		},
		{
			'atom:link': {
				_attr: {
					rel: 'self',
					href: `${baseUrl}/rss.xml${currentCursor ? `?after=${currentCursor}` : ''}`,
					type: 'application/rss+xml'
				},
			},
		},
		{
			'atom:link': {
				_attr: {
					rel: 'alternate',
					href: baseUrl,
					type: 'text/html'
				},
			},
		},
	];
	if (nextCursor) {
		customElements.push({
			'atom:link': {
				_attr: {
					rel: 'next',
					href: `${baseUrl}/rss.xml${nextCursor ? `?after=${nextCursor}` : ''}`,
				},
			},
		});
	}

	// Enhanced RSS feed configuration
	const feedConfig = {
		title: `${publication.title || `${publication.author!.name}'s blog`}`,
		description: publication.descriptionSEO || publication.about?.html || `${publication.author!.name}'s thoughts and insights`,
		feed_url: `${baseUrl}/rss.xml${currentCursor ? `?after=${currentCursor}` : ''}`,
		site_url: baseUrl,
		image_url: publication.preferences?.logo || publication.ogMetaData?.image,
		language: 'en',
		ttl: 60,
		webMaster: publication.author?.name,
		managingEditor: publication.author?.name,
		generator: 'Hashnode Blog Starter Kit',
		copyright: `© ${new Date().getFullYear()} ${publication.author?.name || publication.title}`,
		custom_elements: customElements,
	};

	const feed = new RSS(feedConfig);

	posts.forEach((post) => {
		// Enhanced RSS item with more metadata
		const itemData: any = {
			title: post.title,
			description: post.seo?.description || post.subtitle || post.brief || post.content?.html?.replace(NON_ASCII_REGEX, '').substring(0, 300) + '...',
			url: post.url,
			guid: post.url, // Use URL as GUID for uniqueness
			categories: post.tags?.map((tag: any) => tag.name) || [],
			author: post.author?.name,
			date: post.publishedAt,
			custom_elements: [],
		};

		// Add cover image
		if (post.coverImage?.url) {
			itemData.enclosure = {
				url: post.coverImage.url,
				type: 'image/jpeg'
			};
			itemData.custom_elements.push({
				'media:thumbnail': {
					_attr: {
						url: post.coverImage.url,
						width: '1200',
						height: '630'
					}
				}
			});
		}

		// Add reading time
		if (post.readTimeInMinutes) {
			itemData.custom_elements.push({
				'hashnode:readTime': post.readTimeInMinutes
			});
		}

		// Add full content for better RSS reader experience
		if (post.content?.html) {
			itemData.custom_elements.push({
				'content:encoded': post.content.html
			});
		}

		// Add publication info
		itemData.custom_elements.push({
			'hashnode:publication': publication.title
		});

		// Add update date if different from published date
		if (post.updatedAt && post.updatedAt !== post.publishedAt) {
			itemData.custom_elements.push({
				'hashnode:lastModified': post.updatedAt
			});
		}

		feed.item(itemData);
	});

	const xml = feed.xml();
	return xml;
};
