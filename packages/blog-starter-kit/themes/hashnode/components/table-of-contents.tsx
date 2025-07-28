import { useState, useEffect } from 'react';
import { PostFullFragment } from '../generated/graphql';

interface TableOfContentsProps {
	post: PostFullFragment;
	className?: string;
}

interface HeadingItem {
	id: string;
	title: string;
	level: number;
	slug: string;
}

export const TableOfContents = ({ post, className = '' }: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>('');
	const [headings, setHeadings] = useState<HeadingItem[]>([]);

	// Extract headings from post content or use the TOC feature if enabled
	useEffect(() => {
		if (post.features.tableOfContents.isEnabled && post.features.tableOfContents.items.length > 0) {
			// Use the GraphQL TOC data if available
			const tocItems = post.features.tableOfContents.items.map(item => ({
				id: item.id,
				title: item.title,
				level: item.level,
				slug: item.slug,
			}));
			setHeadings(tocItems);
		} else {
			// Fallback: extract headings from DOM
			const extractHeadings = () => {
				const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
				const extractedHeadings: HeadingItem[] = [];

				headingElements.forEach((heading, index) => {
					const level = parseInt(heading.tagName.charAt(1));
					const title = heading.textContent || '';
					const slug = title.toLowerCase()
						.replace(/[^a-z0-9 -]/g, '')
						.replace(/\s+/g, '-')
						.replace(/-+/g, '-')
						.trim();
					
					// Ensure unique IDs
					const id = heading.id || `heading-${index}`;
					if (!heading.id) {
						heading.id = id;
					}

					extractedHeadings.push({
						id,
						title,
						level,
						slug,
					});
				});

				setHeadings(extractedHeadings);
			};

			// Wait for content to be rendered
			setTimeout(extractHeadings, 100);
		}
	}, [post]);

	// Track scroll position and highlight active heading
	useEffect(() => {
		const handleScroll = () => {
			const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
			const scrollY = window.scrollY;

			let currentActiveId = '';
			for (let i = headingElements.length - 1; i >= 0; i--) {
				const element = headingElements[i];
				if (element && element.offsetTop <= scrollY + 100) {
					currentActiveId = element.id;
					break;
				}
			}

			setActiveId(currentActiveId);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial call

		return () => window.removeEventListener('scroll', handleScroll);
	}, [headings]);

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	if (headings.length === 0) return null;

	// Generate JSON-LD for article structure
	const articleStructureJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': post.url,
		hasPart: headings.map((heading, index) => ({
			'@type': 'WebPageElement',
			'@id': `${post.url}#${heading.id}`,
			name: heading.title,
			position: index + 1,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructureJsonLd) }}
			/>
			<nav 
				className={`table-of-contents ${className}`}
				aria-label="Table of contents"
				role="navigation"
			>
				<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
					Table of Contents
				</h2>
				
				<ul className="space-y-2">
					{headings.map((heading) => (
						<li
							key={heading.id}
							style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
						>
							<button
								onClick={() => scrollToHeading(heading.id)}
								className={`
									block w-full text-left text-sm py-1 px-2 rounded transition-colors
									${activeId === heading.id
										? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
									}
								`}
								aria-label={`Go to section: ${heading.title}`}
							>
								{heading.title}
							</button>
						</li>
					))}
				</ul>
				
				{/* Schema.org markup for better SEO */}
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'SiteNavigationElement',
						name: 'Table of Contents',
						hasPart: headings.map(heading => ({
							'@type': 'SiteNavigationElement',
							name: heading.title,
							url: `${post.url}#${heading.id}`,
						})),
					})}
				</script>
			</nav>
		</>
	);
};