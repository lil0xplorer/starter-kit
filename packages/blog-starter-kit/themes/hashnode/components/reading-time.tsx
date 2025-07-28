import { BookOpenSVG } from './icons';

interface ReadingTimeProps {
	readTimeInMinutes?: number;
	className?: string;
	showIcon?: boolean;
}

export const ReadingTime = ({ readTimeInMinutes, className = '', showIcon = true }: ReadingTimeProps) => {
	if (!readTimeInMinutes || readTimeInMinutes === 0) return null;

	const minutes = Math.ceil(readTimeInMinutes);
	const readingText = minutes === 1 ? '1 min read' : `${minutes} min read`;

	return (
		<div className={`flex items-center text-sm text-gray-600 dark:text-gray-400 ${className}`}>
			{showIcon && (
				<BookOpenSVG className="w-4 h-4 mr-1" aria-hidden="true" />
			)}
			<span>{readingText}</span>
		</div>
	);
};