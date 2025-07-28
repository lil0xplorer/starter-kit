"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var tailwind_merge_1 = require("tailwind-merge");
var appContext_1 = require("./contexts/appContext");
var custom_button_1 = require("./custom-button");
var header_blog_search_1 = require("./header-blog-search");
var header_left_sidebar_1 = require("./header-left-sidebar");
var publication_logo_1 = require("./publication-logo");
var publication_nav_links_1 = require("./publication-nav-links");
var publication_social_links_1 = require("./publication-social-links");
var Header = function (props) {
    var _a, _b;
    var currentMenuId = props.currentMenuId, isHome = props.isHome;
    var publication = (0, appContext_1.useAppContext)().publication;
    return (<header className="blog-header relative z-50 w-full border-b border-black/10 bg-white bg-opacity-70 dark:border-white/10 dark:bg-slate-900 dark:bg-opacity-70">
			<div className="container mx-auto px-2 md:px-4 2xl:px-10">
				<div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:mb-4">
					<div className="flex flex-row items-center py-1">
						{/* Navigation for mobile view */}
						<div className={(0, tailwind_merge_1.twJoin)('md:hidden', 'dark:text-white')}>
							<header_left_sidebar_1.default publication={publication}/>
						</div>
						<div className="hidden md:block">
							<publication_logo_1.default publication={publication} size="lg" withProfileImage/>
						</div>
					</div>

					<div className={(0, tailwind_merge_1.twJoin)('flex flex-row items-center', 'dark:text-white')}>
						<header_blog_search_1.default publication={publication}/>
						<custom_button_1.Button as="a" href="#" type="primary" label="Sign up"/>
					</div>
				</div>

				{/* Logo for mobile view */}
				<div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
					<publication_logo_1.default publication={publication} size="xl"/>
				</div>

				<div className="blog-sub-header" data-testid="blog-sub-header">
					{/* Desktop */}
					<div className="justify-betweem mx-0 mb-2 hidden w-full flex-row items-center md:flex">
						<publication_social_links_1.default links={publication.links}/>
					</div>
					{/* Mobile view */}
					<div className="mb-2 flex w-full flex-col items-center md:hidden">
						<publication_social_links_1.default links={publication.links}/>
					</div>
				</div>

				<div className="relative mt-8 hidden flex-row items-center justify-center overflow-hidden text-base md:flex" data-tom="hidden md:flex relative flex-row items-center justify-center overflow-hidden text-base mt-8">
					<publication_nav_links_1.default isHome={isHome} currentActiveMenuItemId={currentMenuId} enabledPages={(_a = publication.preferences) === null || _a === void 0 ? void 0 : _a.enabledPages} navbarItems={((_b = publication.preferences) === null || _b === void 0 ? void 0 : _b.navbarItems) || []}/>
				</div>
			</div>
		</header>);
};
exports.Header = Header;
