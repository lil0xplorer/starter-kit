import { useState, useEffect } from 'react';

interface AccessibilitySettingsProps {
	className?: string;
}

export const AccessibilitySettings = ({ className = '' }: AccessibilitySettingsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontSize, setFontSize] = useState('normal');
	const [highContrast, setHighContrast] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);

	useEffect(() => {
		// Load saved preferences
		const savedFontSize = localStorage.getItem('accessibility-font-size') || 'normal';
		const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
		const savedReduceMotion = localStorage.getItem('accessibility-reduce-motion') === 'true';

		setFontSize(savedFontSize);
		setHighContrast(savedHighContrast);
		setReduceMotion(savedReduceMotion);

		// Apply settings
		applyAccessibilitySettings(savedFontSize, savedHighContrast, savedReduceMotion);
	}, []);

	const applyAccessibilitySettings = (font: string, contrast: boolean, motion: boolean) => {
		const root = document.documentElement;

		// Font size
		root.classList.remove('font-size-small', 'font-size-large', 'font-size-xlarge');
		if (font !== 'normal') {
			root.classList.add(`font-size-${font}`);
		}

		// High contrast
		if (contrast) {
			root.classList.add('high-contrast');
		} else {
			root.classList.remove('high-contrast');
		}

		// Reduce motion
		if (motion) {
			root.classList.add('reduce-motion');
		} else {
			root.classList.remove('reduce-motion');
		}
	};

	const handleFontSizeChange = (newSize: string) => {
		setFontSize(newSize);
		localStorage.setItem('accessibility-font-size', newSize);
		applyAccessibilitySettings(newSize, highContrast, reduceMotion);
	};

	const handleHighContrastToggle = () => {
		const newHighContrast = !highContrast;
		setHighContrast(newHighContrast);
		localStorage.setItem('accessibility-high-contrast', newHighContrast.toString());
		applyAccessibilitySettings(fontSize, newHighContrast, reduceMotion);
	};

	const handleReduceMotionToggle = () => {
		const newReduceMotion = !reduceMotion;
		setReduceMotion(newReduceMotion);
		localStorage.setItem('accessibility-reduce-motion', newReduceMotion.toString());
		applyAccessibilitySettings(fontSize, highContrast, newReduceMotion);
	};

	const resetSettings = () => {
		setFontSize('normal');
		setHighContrast(false);
		setReduceMotion(false);
		localStorage.removeItem('accessibility-font-size');
		localStorage.removeItem('accessibility-high-contrast');
		localStorage.removeItem('accessibility-reduce-motion');
		applyAccessibilitySettings('normal', false, false);
	};

	return (
		<div className={`accessibility-settings ${className}`}>
			{/* Accessibility Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="
					fixed bottom-4 right-4 z-50
					w-12 h-12 rounded-full
					bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
					text-white shadow-lg
					focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
					transition-colors duration-200
				"
				aria-label="Open accessibility settings"
				aria-expanded={isOpen}
				aria-controls="accessibility-panel"
			>
				<svg 
					className="w-6 h-6 mx-auto" 
					fill="currentColor" 
					viewBox="0 0 20 20" 
					aria-hidden="true"
				>
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
				</svg>
			</button>

			{/* Accessibility Panel */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={() => setIsOpen(false)}
						aria-hidden="true"
					/>
					
					{/* Panel */}
					<div
						id="accessibility-panel"
						className="
							fixed bottom-20 right-4 z-50
							w-80 max-w-[calc(100vw-2rem)]
							bg-white dark:bg-gray-800
							rounded-lg shadow-xl border border-gray-200 dark:border-gray-700
							p-6
						"
						role="dialog"
						aria-label="Accessibility settings"
						aria-modal="true"
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
								Accessibility Settings
							</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
								aria-label="Close accessibility settings"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
						</div>

						{/* Font Size */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Font Size
							</label>
							<div className="grid grid-cols-4 gap-2">
								{[
									{ value: 'small', label: 'Small' },
									{ value: 'normal', label: 'Normal' },
									{ value: 'large', label: 'Large' },
									{ value: 'xlarge', label: 'XLarge' },
								].map((option) => (
									<button
										key={option.value}
										onClick={() => handleFontSizeChange(option.value)}
										className={`
											px-3 py-2 text-xs rounded border
											transition-colors duration-200
											${fontSize === option.value
												? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-300'
												: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
											}
										`}
										aria-pressed={fontSize === option.value}
									>
										{option.label}
									</button>
								))}
							</div>
						</div>

						{/* High Contrast */}
						<div className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={highContrast}
									onChange={handleHighContrastToggle}
									className="
										w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
										focus:ring-blue-500 focus:ring-2
										dark:bg-gray-700 dark:border-gray-600
									"
								/>
								<span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
									High Contrast Mode
								</span>
							</label>
						</div>

						{/* Reduce Motion */}
						<div className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={reduceMotion}
									onChange={handleReduceMotionToggle}
									className="
										w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
										focus:ring-blue-500 focus:ring-2
										dark:bg-gray-700 dark:border-gray-600
									"
								/>
								<span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
									Reduce Motion
								</span>
							</label>
						</div>

						{/* Reset Button */}
						<button
							onClick={resetSettings}
							className="
								w-full px-4 py-2 text-sm
								bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
								text-gray-700 dark:text-gray-300
								rounded border border-gray-300 dark:border-gray-600
								transition-colors duration-200
							"
						>
							Reset to Defaults
						</button>
					</div>
				</>
			)}
		</div>
	);
};