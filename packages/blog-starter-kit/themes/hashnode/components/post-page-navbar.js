"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("next/link");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
/* eslint-disable no-nested-ternary */
var common_header_icon_btn_1 = require("./common-header-icon-btn");
var header_blog_search_1 = require("./header-blog-search");
var header_left_sidebar_1 = require("./header-left-sidebar");
var header_tooltip_1 = require("./header-tooltip");
var svgs_1 = require("./icons/svgs/");
var publication_social_links_1 = require("./publication-social-links");
var use_sticky_nav_scroll_1 = require("./use-sticky-nav-scroll");
var custom_button_1 = require("./custom-button");
var publication_logo_1 = require("./publication-logo");
var PostPageNavbar = (0, react_1.forwardRef)(function (props, ref) {
    var publication = props.publication;
    (0, use_sticky_nav_scroll_1.default)({ elRef: ref });
    var commonIconBtnStyles = (0, common_header_icon_btn_1.getCommonBtnStyles)();
    return (<div className="container mx-auto px-2 md:px-4 md:py-1 2xl:px-10">
			<div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:py-4">
				<div className={(0, tailwind_merge_1.twJoin)('mb-2 flex flex-row items-center md:mb-0', 'dark:text-white')}>
					<header_tooltip_1.default tooltipClassName="blog-home-tooltip" tooltipText="Home">
						<link_1.default href="/" aria-label="Back to blog home" className={(0, tailwind_merge_1.twJoin)('blog-back-to-home-button', commonIconBtnStyles, 'mr-2 p-3')}>
							<svgs_1.ChevronLeftSVG className="h-4 w-4 fill-current pr-1"/>
						</link_1.default>
					</header_tooltip_1.default>

					{/* Navigation for mobile view */}
					<div className="mr-2">
						<header_left_sidebar_1.default publication={publication}/>
					</div>

					<div className="hidden md:block">
						<publication_logo_1.default publication={publication} size="sm" withProfileImage isPostPage/>
					</div>
				</div>

				<div className={(0, tailwind_merge_1.twJoin)('flex flex-row items-center', 'dark:text-white')}>
					<header_blog_search_1.default publication={publication}/>
					<custom_button_1.Button as="a" href="#" type="primary" label="Sign up"/>
				</div>
			</div>

			{/* Logo for mobile view */}
			<div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
				<publication_logo_1.default publication={publication} size="xl" isPostPage/>
			</div>

			<div className="blog-sub-header mb-4 md:hidden" data-testid="blog-sub-header">
				{/* Social Links for mobile view */}
				<div className="mt-6">
					<publication_social_links_1.default links={publication.links}/>
				</div>
			</div>
		</div>);
});
PostPageNavbar.displayName = 'PostPageNavbar';
exports.default = PostPageNavbar;
