import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	priority?: boolean;
	quality?: number;
	fill?: boolean;
	sizes?: string;
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
	loading?: 'lazy' | 'eager';
	onLoad?: () => void;
	onError?: () => void;
}

export const OptimizedImage = ({
	src,
	alt,
	width,
	height,
	className = '',
	priority = false,
	quality = 75,
	fill = false,
	sizes,
	placeholder = 'empty',
	blurDataURL,
	loading = 'lazy',
	onLoad,
	onError,
}: OptimizedImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Generate a blur placeholder if none provided
	const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=';

	const handleLoad = () => {
		setIsLoading(false);
		onLoad?.();
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
		onError?.();
	};

	// Fallback for broken images
	if (hasError) {
		return (
			<div 
				className={`bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center ${className}`}
				style={{ width, height }}
			>
				<svg
					className="w-8 h-8 text-neutral-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		);
	}

	const imageProps = {
		src,
		alt,
		onLoad: handleLoad,
		onError: handleError,
		priority,
		quality,
		...(placeholder === 'blur' && {
			placeholder: 'blur' as const,
			blurDataURL: blurDataURL || defaultBlurDataURL,
		}),
		...(sizes && { sizes }),
		...(loading && !priority && { loading }),
		className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
	};

	if (fill) {
		return (
			<Image
				{...imageProps}
				fill
			/>
		);
	}

	if (width && height) {
		return (
			<Image
				{...imageProps}
				width={width}
				height={height}
			/>
		);
	}

	// For responsive images without explicit dimensions
	return (
		<div className="relative w-full" style={{ aspectRatio: '16/9' }}>
			<Image
				{...imageProps}
				fill
				style={{ objectFit: 'cover' }}
			/>
		</div>
	);
};

// Hook for generating optimized image URLs
export const useOptimizedImageUrl = (url: string, options: { width?: number; height?: number; quality?: number } = {}) => {
	if (!url) return url;
	
	// If it's already a Hashnode CDN URL, we can optimize it
	if (url.includes('cdn.hashnode.com')) {
		const params = new URLSearchParams();
		if (options.width) params.set('w', options.width.toString());
		if (options.height) params.set('h', options.height.toString());
		if (options.quality) params.set('q', options.quality.toString());
		
		const paramString = params.toString();
		return paramString ? `${url}?${paramString}` : url;
	}
	
	return url;
};