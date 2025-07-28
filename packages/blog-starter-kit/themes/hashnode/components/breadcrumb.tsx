import Link from 'next/link';
import { ChevronRightSVG_16x16 } from './icons';

const HomeIcon = ({ className = '' }: { className?: string }) => (
	<svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
	</svg>
);

interface BreadcrumbItem {
	name: string;
	url: string;
	isCurrentPage?: boolean;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

export const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
	if (items.length === 0) return null;

	// Always include home as first item if not already present
	const breadcrumbItems = items[0]?.name !== 'Home' 
		? [{ name: 'Home', url: '/' }, ...items]
		: items;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbItems.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<nav 
				aria-label="Breadcrumb" 
				className={`mb-4 ${className}`}
				role="navigation"
			>
				<ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
					{breadcrumbItems.map((item, index) => (
						<li key={index} className="flex items-center">
							{index > 0 && (
								<ChevronRightSVG_16x16 className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
							)}
							{item.isCurrentPage ? (
								<span 
									className="font-medium text-gray-900 dark:text-gray-100"
									aria-current="page"
								>
									{index === 0 && <HomeIcon className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
									{item.name}
								</span>
							) : (
								<Link 
									href={item.url}
									className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
									title={`Go to ${item.name}`}
								>
									{index === 0 && <HomeIcon className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
									{item.name}
								</Link>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
};