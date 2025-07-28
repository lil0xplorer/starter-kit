import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';
import { AccessibilitySettings } from './accessibility-settings';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			
			{/* Skip link for screen readers */}
			<a href="#main-content" className="skip-link">
				Skip to main content
			</a>
			
			<div className="min-h-screen bg-white dark:bg-neutral-950">
				<main id="main-content">{children}</main>
			</div>
			
			<Analytics />
			<Integrations />
			<AccessibilitySettings />
		</>
	);
};
