import { calculateReadingTime } from '@starter-kit/utils/seo/contentUtils';

interface ReadingTimeProps {
	content: string;
	className?: string;
	showIcon?: boolean;
}

export const ReadingTime = ({ content, className = '', showIcon = true }: ReadingTimeProps) => {
	const readingTime = calculateReadingTime(content);
	
	return (
		<span className={`inline-flex items-center text-neutral-600 dark:text-neutral-400 ${className}`}>
			{showIcon && (
				<svg
					className="w-4 h-4 mr-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			)}
			{readingTime} min read
		</span>
	);
};