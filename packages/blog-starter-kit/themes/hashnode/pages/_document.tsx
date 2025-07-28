import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Essential meta tags */}
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				
				{/* DNS prefetch for performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="dns-prefetch" href="//cdn.hashnode.com" />
				<link rel="dns-prefetch" href="//gql.hashnode.com" />
				
				{/* Preload critical resources */}
				<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				
				{/* Security headers */}
				<meta name="referrer" content="strict-origin-when-cross-origin" />
				
				{/* Optional: Google Site Verification Meta Tag */}
				{process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
					<meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
				)}
				
				{/* Optional: Bing Site Verification */}
				{process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
					<meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
				)}
				
				{/* Google AdSense (existing) */}
				<meta name="google-adsense-account" content="ca-pub-8155500837029256" />
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155500837029256"
					crossOrigin="anonymous"
				/>
				
				{/* Structured Data for Organization */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: process.env.NEXT_PUBLIC_SITE_TITLE || 'Hashnode Blog',
							url: process.env.NEXT_PUBLIC_BASE_URL || 'https://engineering.hashnode.com',
							logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://engineering.hashnode.com'}/favicon/android-chrome-192x192.png`,
							sameAs: [
								'https://twitter.com/hashnode',
								'https://github.com/Hashnode',
								'https://linkedin.com/company/hashnode',
							].filter(Boolean),
						}),
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<div id="hn-toast" />
			</body>
		</Html>
	);
}
