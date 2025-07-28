/**
 * Calculate reading time for a given text
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
	// Remove HTML tags and extra whitespace
	const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
	
	// Count words
	const wordCount = cleanText.split(' ').filter(word => word.length > 0).length;
	
	// Calculate reading time
	const readingTime = Math.ceil(wordCount / wordsPerMinute);
	
	return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Generate meta description from post content if not provided
 * @param content - The post content (markdown or HTML)
 * @param maxLength - Maximum length of description (default: 160 characters)
 * @returns Auto-generated meta description
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
	// Remove markdown syntax and HTML tags
	const cleanContent = content
		.replace(/#{1,6}\s+/g, '') // Remove markdown headers
		.replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
		.replace(/\*([^*]+)\*/g, '$1') // Remove italic markdown
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
	
	// If content is shorter than max length, return as is
	if (cleanContent.length <= maxLength) {
		return cleanContent;
	}
	
	// Find the last complete sentence within the limit
	const truncated = cleanContent.substring(0, maxLength);
	const lastSentenceEnd = Math.max(
		truncated.lastIndexOf('.'),
		truncated.lastIndexOf('!'),
		truncated.lastIndexOf('?')
	);
	
	if (lastSentenceEnd > maxLength * 0.6) {
		// If we found a sentence ending in the latter part, use it
		return truncated.substring(0, lastSentenceEnd + 1).trim();
	}
	
	// Otherwise, find the last complete word
	const lastSpace = truncated.lastIndexOf(' ');
	if (lastSpace > 0) {
		return truncated.substring(0, lastSpace).trim() + '...';
	}
	
	// Fallback: hard truncate
	return truncated.trim() + '...';
}

/**
 * Extract keywords from content for meta keywords tag
 * @param content - The post content
 * @param tags - Existing tags
 * @param maxKeywords - Maximum number of keywords to extract
 * @returns Comma-separated keywords string
 */
export function generateMetaKeywords(content: string, tags: string[] = [], maxKeywords: number = 10): string {
	// Common stop words to exclude
	const stopWords = new Set([
		'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
		'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
		'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
		'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
	]);
	
	// Clean and extract words
	const cleanContent = content
		.replace(/<[^>]*>/g, ' ')
		.replace(/[^a-zA-Z\s]/g, ' ')
		.toLowerCase();
	
	const words = cleanContent.split(/\s+/)
		.filter(word => word.length > 3 && !stopWords.has(word));
	
	// Count word frequency
	const wordCount = words.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);
	
	// Sort by frequency and get top keywords
	const keywords = Object.entries(wordCount)
		.sort(([, a], [, b]) => b - a)
		.slice(0, maxKeywords - tags.length)
		.map(([word]) => word);
	
	// Combine with existing tags
	const allKeywords = [...tags, ...keywords];
	
	return allKeywords.slice(0, maxKeywords).join(', ');
}