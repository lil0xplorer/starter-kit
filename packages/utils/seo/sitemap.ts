export const getSitemap = (publication: any) => {
	let xml =
		'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

	const domain = publication.url;
	const staticPages = publication.staticPages.edges.map((edge: any) => edge.node);
	const posts = publication.posts;

	// Homepage
	xml += '<url>';
	xml += `<loc>${domain}</loc>`;
	xml += '<changefreq>daily</changefreq>';
	xml += '<priority>1.0</priority>';
	if (posts.length > 0) {
		// Use the latest post's publish or update date for homepage lastmod
		const latestDate = posts[0].updatedAt || posts[0].publishedAt;
		xml += `<lastmod>${new Date(latestDate).toISOString()}</lastmod>`;
	}
	xml += '</url>';

	// Blog posts
	for (let i: any = 0; i < posts.length; i += 1) {
		const post = posts[i];
		xml += '<url>';
		xml += `<loc>${domain}/${post.slug}</loc>`;
		xml += '<changefreq>weekly</changefreq>';
		xml += '<priority>0.8</priority>';
		
		// Use updated date if available, otherwise published date
		const lastmod = post.updatedAt || post.publishedAt;
		if (lastmod) {
			xml += `<lastmod>${new Date(lastmod).toISOString()}</lastmod>`;
		}
		
		// Add image information if cover image exists
		if (post.coverImage?.url) {
			xml += '<image:image>';
			xml += `<image:loc>${post.coverImage.url}</image:loc>`;
			xml += `<image:title>${post.title.replace(/[<>&"']/g, '')}</image:title>`;
			if (post.coverImage.attribution) {
				xml += `<image:caption>${post.coverImage.attribution.replace(/[<>&"']/g, '')}</image:caption>`;
			}
			xml += '</image:image>';
		}
		
		xml += '</url>';
	}

	// Static pages
	staticPages.forEach((page: any) => {
		xml += '<url>';
		xml += `<loc>${domain}/${page.slug}</loc>`;
		xml += '<changefreq>monthly</changefreq>';
		xml += '<priority>0.6</priority>';
		
		// Use page updated date if available
		if (page.updatedAt) {
			xml += `<lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>`;
		}
		
		xml += '</url>';
	});

	// Tag pages
	const uniqueTags = new Set<string>();
	for (const post of posts) {
		if (Array.isArray(post.tags)) {
			for (const tag of post.tags) {
				uniqueTags.add(tag.slug);
			}
		}
	}

	uniqueTags.forEach((tagSlug: any) => {
		xml += '<url>';
		xml += `<loc>${domain}/tag/${tagSlug}</loc>`;
		xml += '<changefreq>weekly</changefreq>';
		xml += '<priority>0.4</priority>';
		
		// Find the latest post with this tag for lastmod
		const latestPostWithTag = posts.find((post: any) => 
			post.tags && post.tags.some((tag: any) => tag.slug === tagSlug)
		);
		if (latestPostWithTag) {
			const lastmod = latestPostWithTag.updatedAt || latestPostWithTag.publishedAt;
			xml += `<lastmod>${new Date(lastmod).toISOString()}</lastmod>`;
		}
		
		xml += '</url>';
	});

	// RSS feed
	xml += '<url>';
	xml += `<loc>${domain}/feed.xml</loc>`;
	xml += '<changefreq>daily</changefreq>';
	xml += '<priority>0.5</priority>';
	if (posts.length > 0) {
		const latestDate = posts[0].updatedAt || posts[0].publishedAt;
		xml += `<lastmod>${new Date(latestDate).toISOString()}</lastmod>`;
	}
	xml += '</url>';

	xml += '</urlset>';
	return xml;
};
