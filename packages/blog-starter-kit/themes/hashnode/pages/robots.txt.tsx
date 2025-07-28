import { type GetServerSideProps } from 'next';

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { res } = ctx;
	const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
	if (!host) {
		throw new Error('Could not determine host');
	}

	const sitemapUrl = `https://${host}/sitemap.xml`;
	const robotsTxt = `
User-agent: *
Allow: /

# Specific user agents
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /

# Block AI crawlers if desired (uncomment lines below)
# User-agent: GPTBot
# Disallow: /

# User-agent: ChatGPT-User
# Disallow: /

# User-agent: CCBot
# Disallow: /

# User-agent: FacebookBot
# Disallow: /

# Block common spam bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Allow all other bots
User-agent: *
Allow: /

# Crawl delay (optional - uncomment if needed)
# Crawl-delay: 1

# Sitemap location
Sitemap: ${sitemapUrl}

# Additional sitemaps if they exist
# Sitemap: https://${host}/sitemap-posts.xml
# Sitemap: https://${host}/sitemap-pages.xml
  `.trim();

	res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');
	res.setHeader('content-type', 'text/plain');
	res.write(robotsTxt);
	res.end();

	return { props: {} };
};

export default RobotsTxt;
