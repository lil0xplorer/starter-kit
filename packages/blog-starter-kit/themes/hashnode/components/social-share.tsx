import { useState } from 'react';
import { PostFullFragment, PublicationFragment } from '../generated/graphql';

interface SocialShareProps {
	post: PostFullFragment;
	publication: PublicationFragment;
	className?: string;
}

export const SocialShare = ({ post, publication, className = '' }: SocialShareProps) => {
	const [copied, setCopied] = useState(false);

	const shareUrl = post.url;
	const shareTitle = post.title;
	const shareText = post.brief || post.title;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const shareLinks = [
		{
			name: 'Twitter',
			url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
			icon: (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			),
			color: 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
		},
		{
			name: 'Facebook',
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
			icon: (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
				</svg>
			),
			color: 'hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
		},
		{
			name: 'LinkedIn',
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
			icon: (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
				</svg>
			),
			color: 'hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
		},
		{
			name: 'Reddit',
			url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
			icon: (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path d="M16.5 10.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5c0 .28.22.5.5.5s.5-.22.5-.5zM15.5 12c-.28 0-.5.22-.5.5 0 .68-.42 1.19-.97 1.19s-.97-.51-.97-1.19c0-.28-.22-.5-.5-.5s-.5.22-.5.5c0 1.24.89 2.19 1.97 2.19s1.97-.95 1.97-2.19c0-.28-.22-.5-.5-.5zM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5.9 12.8c-.05 1.09-.48 2.54-1.62 3.59-.22.21-.57.2-.78-.01-.21-.21-.2-.56.01-.77.81-.74 1.17-1.75 1.21-2.51.01-.31.26-.55.57-.54.31.01.55.26.54.57-.01.22-.01.43-.01.67 0-.22 0-.44.01-.67 0-.31-.23-.56-.54-.57-.31-.01-.56.23-.57.54-.04.76-.4 1.77-1.21 2.51-.21.21-.22.56-.01.77.21.21.56.22.78.01 1.14-1.05 1.57-2.5 1.62-3.59z"/>
				</svg>
			),
			color: 'hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20 dark:hover:text-orange-400'
		},
	];

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: shareTitle,
					text: shareText,
					url: shareUrl,
				});
			} catch (err) {
				console.error('Error sharing:', err);
			}
		}
	};

	// JSON-LD for share actions
	const shareActionJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ShareAction',
		target: shareUrl,
		object: {
			'@type': 'Article',
			name: shareTitle,
			url: shareUrl,
		},
		agent: {
			'@type': 'Person',
			name: 'Reader',
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(shareActionJsonLd) }}
			/>
			<div className={`social-share ${className}`} role="group" aria-label="Share article">
				<h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
					Share this article
				</h3>
				
				<div className="flex flex-wrap gap-2">
					{shareLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className={`
								inline-flex items-center justify-center w-10 h-10 rounded-lg
								border border-gray-200 dark:border-gray-700
								text-gray-600 dark:text-gray-400
								transition-colors duration-200
								${link.color}
							`}
							aria-label={`Share on ${link.name}`}
							title={`Share on ${link.name}`}
						>
							{link.icon}
						</a>
					))}
					
					{/* Copy Link Button */}
					<button
						onClick={copyToClipboard}
						className={`
							inline-flex items-center justify-center w-10 h-10 rounded-lg
							border border-gray-200 dark:border-gray-700
							text-gray-600 dark:text-gray-400
							transition-colors duration-200
							hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200
							${copied ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700' : ''}
						`}
						aria-label="Copy link to clipboard"
						title={copied ? 'Copied!' : 'Copy link'}
					>
						{copied ? (
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
						) : (
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
								<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
							</svg>
						)}
					</button>
					
					{/* Native Share Button (if supported) */}
					{navigator.share && (
						<button
							onClick={handleNativeShare}
							className="
								inline-flex items-center justify-center w-10 h-10 rounded-lg
								border border-gray-200 dark:border-gray-700
								text-gray-600 dark:text-gray-400
								transition-colors duration-200
								hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200
							"
							aria-label="Share via device options"
							title="Share"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
							</svg>
						</button>
					)}
				</div>
			</div>
		</>
	);
};