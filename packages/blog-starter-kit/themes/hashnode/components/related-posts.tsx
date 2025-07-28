import Link from 'next/link';
import Image from 'next/legacy/image';
import { PostFullFragment, MorePostsEdgeFragment } from '../generated/graphql';
import { ReadingTime } from './reading-time';
import { resizeImage } from '../utils/image';

interface RelatedPostsProps {
	currentPost: PostFullFragment;
	morePosts: MorePostsEdgeFragment[];
	className?: string;
}

export const RelatedPosts = ({ currentPost, morePosts, className = '' }: RelatedPostsProps) => {
	if (!morePosts || morePosts.length === 0) return null;

	// Filter out the current post and limit to 3 related posts
	const relatedPosts = morePosts
		.filter(post => post.node.id !== currentPost.id)
		.slice(0, 3);

	if (relatedPosts.length === 0) return null;

	// Generate JSON-LD for related posts
	const relatedPostsJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Related Articles',
		numberOfItems: relatedPosts.length,
		itemListElement: relatedPosts.map((post, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: post.node.url,
			name: post.node.title,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedPostsJsonLd) }}
			/>
			<section className={`related-posts ${className}`} aria-label="Related articles">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
					Related Articles
				</h2>
				
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{relatedPosts.map((post) => (
						<article 
							key={post.node.id}
							className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<Link href={post.node.url} className="block">
								{post.node.coverImage?.url && (
									<div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
										<Image
											src={resizeImage(post.node.coverImage.url, { w: 400, h: 200, c: 'thumb' })}
											alt={`Cover image for ${post.node.title}`}
											width={400}
											height={200}
											className="object-cover"
											placeholder="blur"
											blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyepW4nzWPEsOUMjjYoOp/eFAAAAAHYsruIkdJF/9k="
										/>
									</div>
								)}
								
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
										{post.node.title}
									</h3>
									
									{post.node.brief && (
										<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
											{post.node.brief}
										</p>
									)}
									
									<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
										<div className="flex items-center space-x-2">
											{post.node.author.profilePicture && (
												<Image
													src={post.node.author.profilePicture}
													alt={`${post.node.author.name}'s profile`}
													width={20}
													height={20}
													className="rounded-full"
												/>
											)}
											<span>{post.node.author.name}</span>
										</div>
										
										<ReadingTime 
											readTimeInMinutes={post.node.readTimeInMinutes} 
											showIcon={false}
											className="text-xs"
										/>
									</div>
									
									{post.node.tags && post.node.tags.length > 0 && (
										<div className="mt-3 flex flex-wrap gap-1">
											{post.node.tags.slice(0, 2).map((tag) => (
												<span
													key={tag.id}
													className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
												>
													#{tag.name}
												</span>
											))}
											{post.node.tags.length > 2 && (
												<span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
													+{post.node.tags.length - 2}
												</span>
											)}
										</div>
									)}
								</div>
							</Link>
						</article>
					))}
				</div>
			</section>
		</>
	);
};