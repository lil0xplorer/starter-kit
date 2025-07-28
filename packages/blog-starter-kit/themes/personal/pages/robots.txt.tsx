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
Crawl-delay: 1

# Important files
Allow: /sitemap.xml
Allow: /feed.xml
Allow: /rss.xml

# Static assets
Allow: /favicon.ico
Allow: /robots.txt
Allow: /_next/static/

# Disallow query parameters and unnecessary paths
Disallow: /*?*
Disallow: /api/
Disallow: /preview/
Disallow: /_next/
Disallow: /dashboard

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /
Disallow: /api/
Disallow: /dashboard

# Bing specific
User-agent: bingbot
Allow: /
Crawl-delay: 1

# AI crawlers - be more restrictive
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Social media crawlers - allow for previews
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

# SEO and monitoring tools
User-agent: AhrefsBot
Crawl-delay: 10
Allow: /

User-agent: SemrushBot
Crawl-delay: 10
Allow: /

User-agent: MJ12bot
Crawl-delay: 10
Allow: /

# Archive crawlers
User-agent: ia_archiver
Allow: /

# Sitemaps
Sitemap: ${sitemapUrl}
  `.trim();

	res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
	res.setHeader('content-type', 'text/plain');
	res.write(robotsTxt);
	res.end();

	return { props: {} };
};

export default RobotsTxt;
