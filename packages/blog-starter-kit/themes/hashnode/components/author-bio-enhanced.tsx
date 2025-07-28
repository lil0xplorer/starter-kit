import Image from 'next/legacy/image';
import Link from 'next/link';
import { PostFullFragment } from '../generated/graphql';

interface AuthorBioProps {
	author: PostFullFragment['author'];
	className?: string;
	showBio?: boolean;
	showFollowCount?: boolean;
}

export const AuthorBio = ({ 
	author, 
	className = '', 
	showBio = true, 
	showFollowCount = false 
}: AuthorBioProps) => {
	if (!author) return null;

	// Generate JSON-LD for Person schema
	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: author.name,
		url: author.profilePicture ? author.profilePicture : undefined,
		image: author.profilePicture,
		description: author.bio?.html,
		sameAs: [
			author.socialMediaLinks?.twitter ? `https://twitter.com/${author.socialMediaLinks.twitter}` : null,
		].filter(Boolean),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
			<div className={`author-bio ${className}`}>
				<div className="flex items-start space-x-4">
					{author.profilePicture && (
						<div className="flex-shrink-0">
							<Image
								className="rounded-full"
								src={author.profilePicture}
								alt={`${author.name}'s profile picture`}
								width={64}
								height={64}
								quality={90}
								placeholder="blur"
								blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyepW4nzWPEsOUMjjYoOp/eFAAAAAHYsruIkdJF/9k="
							/>
						</div>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex items-center space-x-2">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
								{author.name}
							</h3>
						</div>
						
						{showBio && author.bio?.html && (
							<div 
								className="mt-2 text-sm text-gray-600 dark:text-gray-400 prose prose-sm dark:prose-invert"
								dangerouslySetInnerHTML={{ __html: author.bio.html }}
							/>
						)}
						
						{/* Social Media Links */}
						{author.socialMediaLinks?.twitter && (
							<div className="mt-3 flex space-x-3">
								<Link
									href={`https://twitter.com/${author.socialMediaLinks.twitter}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
									aria-label={`${author.name} on Twitter`}
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};