import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { addBreadcrumbJsonLd } from '@starter-kit/utils/seo/enhancedJsonLd';
import { useAppContext } from './contexts/appContext';

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface BreadcrumbProps {
	customBreadcrumbs?: BreadcrumbItem[];
	showJsonLd?: boolean;
}

export const Breadcrumb = ({ customBreadcrumbs, showJsonLd = true }: BreadcrumbProps) => {
	const { publication, post, page } = useAppContext();
	const router = useRouter();
	
	// Generate breadcrumbs based on current route
	const generateBreadcrumbs = (): BreadcrumbItem[] => {
		if (customBreadcrumbs) {
			return customBreadcrumbs;
		}
		
		const breadcrumbs: BreadcrumbItem[] = [
			{ name: 'Home', url: publication.url }
		];
		
		const path = router.asPath;
		
		if (path.startsWith('/tag/')) {
			const tagSlug = path.split('/')[2];
			breadcrumbs.push({
				name: `Tag: ${tagSlug}`,
				url: `${publication.url}/tag/${tagSlug}`
			});
		} else if (path.startsWith('/series/')) {
			const seriesSlug = path.split('/')[2];
			breadcrumbs.push({
				name: 'Series',
				url: `${publication.url}/series`
			});
			breadcrumbs.push({
				name: seriesSlug,
				url: `${publication.url}/series/${seriesSlug}`
			});
		} else if (post) {
			// For blog posts
			// Note: series field not available in current schema, skip for now
			
			breadcrumbs.push({
				name: post.title,
				url: post.url
			});
		} else if (page) {
			// For static pages
			breadcrumbs.push({
				name: page.title,
				url: `${publication.url}/${page.slug}`
			});
		}
		
		return breadcrumbs;
	};
	
	const breadcrumbs = generateBreadcrumbs();
	
	// Don't show breadcrumbs if there's only the home page
	if (breadcrumbs.length <= 1) {
		return null;
	}
	
	return (
		<>
			{showJsonLd && (
				<Head>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(addBreadcrumbJsonLd(breadcrumbs)),
						}}
					/>
				</Head>
			)}
			<nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
				{breadcrumbs.map((crumb, index) => (
					<div key={crumb.url} className="flex items-center">
						{index > 0 && (
							<svg
								className="w-4 h-4 mx-2 text-neutral-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						)}
						{index === breadcrumbs.length - 1 ? (
							<span className="font-medium text-neutral-900 dark:text-neutral-100">
								{crumb.name}
							</span>
						) : (
							<Link
								href={crumb.url.replace(publication.url, '')}
								className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
							>
								{crumb.name}
							</Link>
						)}
					</div>
				))}
			</nav>
		</>
	);
};