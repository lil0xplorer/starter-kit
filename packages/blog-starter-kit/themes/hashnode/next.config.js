const { request, gql } = require('graphql-request');

const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com';
const HASHNODE_ADVANCED_ANALYTICS_URL = 'https://user-analytics.hashnode.com';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

const getBasePath = () => {
	if (BASE_URL && BASE_URL.indexOf('/') !== -1) {
		return BASE_URL.substring(BASE_URL.indexOf('/'));
	}
	return undefined;
};

const getRedirectionRules = async () => {
	// Skip during build if no host is configured or if we're in a CI environment
	if (!host || process.env.CI || process.env.NODE_ENV === 'development') {
		console.log('Skipping redirection rules fetch during build');
		return [];
	}
	
	try {
		const query = gql`
			query GetRedirectionRules {
				publication(host: "${host}") {
					id
					redirectionRules {
						source
						destination
						type
					}
				}
			}
		`;

		const data = await request(GQL_ENDPOINT, query);

		if (!data.publication) {
			console.warn('Please ensure you have set the env var NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST correctly.');
			return [];
		}

		const redirectionRules = data.publication.redirectionRules;

		// convert to next.js redirects format
		const redirects = redirectionRules
			.filter((rule) => {
				// Hashnode gives an option to set a wildcard redirect,
				// but it doesn't work properly with Next.js
				// the solution is to filter out all the rules with wildcard and use static redirects for now
				return rule.source.indexOf('*') === -1;
			})
			.map((rule) => {
				return {
					source: rule.source,
					destination: rule.destination,
					permanent: rule.type === 'PERMANENT',
				};
			});

		return redirects;
	} catch (error) {
		console.warn('Failed to fetch redirection rules:', error.message);
		return [];
	}
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
	transpilePackages: ['@starter-kit/utils'],
	basePath: getBasePath(),
	experimental: {
		scrollRestoration: true,
		// Performance optimizations
		optimizeCss: true,
		optimizePackageImports: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
	},
	// Enhanced image optimization for better Core Web Vitals
	images: {
		unoptimized: false, // Enable image optimization for better performance
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: false,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
			{
				protocol: 'https',
				hostname: '*.hashnode.com',
			},
		],
	},
	// Performance and security headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
			{
				source: '/sitemap.xml',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=86400, stale-while-revalidate=43200',
					},
				],
			},
			{
				source: '/robots.txt',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=86400, stale-while-revalidate=43200',
					},
				],
			},
			{
				source: '/rss.xml',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=1800',
					},
				],
			},
		];
	},
	// Compression and bundling optimizations
	compress: true,
	poweredByHeader: false,
	generateEtags: true,
	async rewrites() {
		return [
			{
				source: '/ping/data-event',
				destination: `${ANALYTICS_BASE_URL}/api/data-event`,
			},
			{
				source: '/api/analytics',
				destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
			},
		];
	},
	async redirects() {
		try {
			return await getRedirectionRules();
		} catch (error) {
			console.warn('Failed to fetch redirection rules:', error.message || error);
			return [];
		}
	},
};

module.exports = config;
