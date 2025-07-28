"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("next/link");
var tailwind_merge_1 = require("tailwind-merge");
var svgs_1 = require("./icons/svgs");
var PublicationSidebarNavLinkItem = function (_a) {
    var href = _a.href, label = _a.label, isActive = _a.isActive;
    return (<link_1.default href={href} className={(0, tailwind_merge_1.twJoin)(isActive ? 'blog-nav-active font-semibold' : 'blog-nav', 'focus-ring-base mb-1 flex w-full flex-row items-center justify-between rounded p-3 font-medium text-slate-700 transition-colors duration-100 hover:bg-slate-100 active:opacity-100 dark:text-slate-200 dark:hover:bg-slate-800', 'focus-ring-colors-base')}>
      <span>{label}</span>
      {isActive ? <svgs_1.CheckSVG className="h-5 w-5 fill-current text-slate-600 dark:text-white"/> : null}
    </link_1.default>);
};
function PublicationSidebarNavLinks(props) {
    var currentActiveMenuItemId = props.currentActiveMenuItemId, isHome = props.isHome, isBadge = props.isBadge, enabledPages = props.enabledPages, navbarItems = props.navbarItems;
    var isHomePage = !currentActiveMenuItemId && isHome;
    var isNewsletterPage = currentActiveMenuItemId && currentActiveMenuItemId === 'newsletter';
    return (<nav className="pb-8">
      <PublicationSidebarNavLinkItem href="/" label="Home" isActive={!!isHomePage}/>

      {navbarItems && navbarItems.length > 0
            ? navbarItems.map(function (navItem) {
                if (!navItem.url)
                    return null;
                var customTabIsActive = currentActiveMenuItemId && navItem.id === currentActiveMenuItemId;
                return (<PublicationSidebarNavLinkItem key={navItem.id} href={navItem.url} label={navItem.label} isActive={!!customTabIsActive}/>);
            })
            : null}
      {(enabledPages === null || enabledPages === void 0 ? void 0 : enabledPages.newsletter) ? (<PublicationSidebarNavLinkItem href="/newsletter" label="Newsletter" isActive={!!isNewsletterPage}/>) : null}
    </nav>);
}
exports.default = PublicationSidebarNavLinks;
