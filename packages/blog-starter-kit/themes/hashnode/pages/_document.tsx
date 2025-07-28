import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Optional: Google Site Verification Meta Tag (replace with your actual code if needed) */}
				<meta name="google-adsense-account" content="ca-pub-8155500837029256" />

				{/* Google AdSense Script */}
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155500837029256"
					crossOrigin="anonymous"
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
