import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppContext } from './contexts/appContext';

interface GoogleAnalyticsProps {
	trackingId?: string;
}

export const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
	const router = useRouter();
	const { publication, post } = useAppContext();
	
	// Use provided trackingId or fallback to publication's GA ID
	const gaId = trackingId || publication.integrations?.gaTrackingID;
	
	useEffect(() => {
		if (!gaId) return;
		
		// Track page views on route change
		const handleRouteChange = (url: string) => {
			// @ts-ignore
			if (typeof window.gtag !== 'undefined') {
				// @ts-ignore
				window.gtag('config', gaId, {
					page_path: url,
					custom_map: {
						custom_parameter_1: 'publication_id',
						custom_parameter_2: 'post_id',
					},
				});
				
				// Send additional context
				// @ts-ignore
				window.gtag('event', 'page_view', {
					publication_id: publication.id,
					publication_title: publication.title,
					...(post && {
						post_id: post.id,
						post_title: post.title,
						post_author: post.author?.name,
						reading_time: post.readTimeInMinutes,
					}),
				});
			}
		};
		
		router.events.on('routeChangeComplete', handleRouteChange);
		
		// Track initial page load
		handleRouteChange(router.asPath);
		
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router, gaId, publication, post]);
	
	// Track custom events
	const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
		if (!gaId || typeof window === 'undefined') return;
		
		// @ts-ignore
		if (typeof window.gtag !== 'undefined') {
			// @ts-ignore
			window.gtag('event', eventName, {
				publication_id: publication.id,
				...parameters,
			});
		}
	};
	
	// Track reading progress
	useEffect(() => {
		if (!post || !gaId) return;
		
		let progressMarkers = [25, 50, 75, 100];
		let trackedMarkers = new Set();
		
		const trackReadingProgress = () => {
			const scrollTop = window.pageYOffset;
			const docHeight = document.body.scrollHeight - window.innerHeight;
			const scrollPercent = Math.round((scrollTop / docHeight) * 100);
			
			progressMarkers.forEach(marker => {
				if (scrollPercent >= marker && !trackedMarkers.has(marker)) {
					trackedMarkers.add(marker);
					trackEvent('reading_progress', {
						post_id: post.id,
						post_title: post.title,
						progress_percent: marker,
					});
				}
			});
		};
		
		window.addEventListener('scroll', trackReadingProgress);
		
		return () => {
			window.removeEventListener('scroll', trackReadingProgress);
		};
	}, [post, gaId]);
	
	if (!gaId) return null;
	
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					
					gtag('config', '${gaId}', {
						page_title: document.title,
						page_location: window.location.href,
						send_page_view: false // We'll handle this manually
					});
					
					// Enhanced ecommerce for blog metrics
					gtag('config', '${gaId}', {
						custom_map: {
							'custom_parameter_1': 'publication_id',
							'custom_parameter_2': 'post_id'
						}
					});
				`}
			</Script>
		</>
	);
};

// Hook for tracking custom events
export const useAnalytics = () => {
	const { publication } = useAppContext();
	
	const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
		const gaId = publication.integrations?.gaTrackingID;
		if (!gaId || typeof window === 'undefined') return;
		
		// @ts-ignore
		if (typeof window.gtag !== 'undefined') {
			// @ts-ignore
			window.gtag('event', eventName, {
				publication_id: publication.id,
				...parameters,
			});
		}
	};
	
	const trackSocialShare = (platform: string, url: string, title: string) => {
		trackEvent('share', {
			method: platform,
			content_type: 'article',
			item_id: url,
			content_title: title,
		});
	};
	
	const trackOutboundLink = (url: string, text?: string) => {
		trackEvent('click', {
			link_url: url,
			link_text: text,
			outbound: true,
		});
	};
	
	const trackSearch = (searchTerm: string, results?: number) => {
		trackEvent('search', {
			search_term: searchTerm,
			...(results !== undefined && { results_count: results }),
		});
	};
	
	return {
		trackEvent,
		trackSocialShare,
		trackOutboundLink,
		trackSearch,
	};
};