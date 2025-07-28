import Script from 'next/script';

interface GoogleAnalyticsProps {
	gaId?: string;
}

export const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
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
					});
				`}
			</Script>
		</>
	);
};

// Hook for tracking custom events
export const useGoogleAnalytics = (gaId?: string) => {
	const trackEvent = (action: string, category: string, label?: string, value?: number) => {
		if (!gaId || typeof window === 'undefined' || !window.gtag) return;

		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		});
	};

	const trackPageView = (url: string, title?: string) => {
		if (!gaId || typeof window === 'undefined' || !window.gtag) return;

		window.gtag('config', gaId, {
			page_path: url,
			page_title: title,
		});
	};

	return { trackEvent, trackPageView };
};

// Extend window object for TypeScript
declare global {
	interface Window {
		gtag: (command: string, targetId: string, config?: any) => void;
	}
}