"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var link_1 = require("next/link");
var react_perfect_scrollbar_1 = require("react-perfect-scrollbar");
var DropdownPrimitive = require("@radix-ui/react-dropdown-menu");
var tailwind_merge_1 = require("tailwind-merge");
var svgs_1 = require("./icons/svgs");
var const_1 = require("../utils/const");
var PublicationNavLinksDropdown = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./publication-nav-links-dropdown'); }); }, {
    ssr: false,
});
function PublicationNavLinks(props) {
    var _a, _b;
    var currentActiveMenuItemId = props.currentActiveMenuItemId, isHome = props.isHome, enabledPages = props.enabledPages, navbarItems = props.navbarItems;
    var navItemsRef = (0, react_1.useRef)(__spreadArray(__spreadArray([
        { label: 'home', url: '/', isActive: !currentActiveMenuItemId && isHome }
    ], navbarItems.map(function (item) {
        var isCustomMenuItemActive = currentActiveMenuItemId && item.id === currentActiveMenuItemId;
        return __assign(__assign({}, item), { isActive: isCustomMenuItemActive });
    }), true), [
        (enabledPages === null || enabledPages === void 0 ? void 0 : enabledPages.newsletter)
            ? { label: 'newsletter', url: '/newsletter', isActive: currentActiveMenuItemId === 'newsletter' }
            : null
    ], false).filter(function (item) { return item; }));
    var extraNavItems = navItemsRef.current.slice(const_1.MAX_MAIN_NAV_LINKS);
    var activeDropdownMenuItem = extraNavItems.find(function (item) { return item === null || item === void 0 ? void 0 : item.isActive; });
    var isActiveItemInDropdown = !!activeDropdownMenuItem;
    var showMoreDropdown = ((_a = navItemsRef.current) === null || _a === void 0 ? void 0 : _a.length) - const_1.MAX_MAIN_NAV_LINKS > 1;
    var numMainNavItemsToRender = ((_b = navItemsRef.current) === null || _b === void 0 ? void 0 : _b.length) - const_1.MAX_MAIN_NAV_LINKS === 1 ? const_1.MAX_MAIN_NAV_LINKS + 1 : const_1.MAX_MAIN_NAV_LINKS;
    var customNavbarItems = navItemsRef.current && navItemsRef.current.length > 0
        ? navItemsRef.current.slice(0, numMainNavItemsToRender).map(function (item) {
            if (!item.url)
                return null;
            return (<link_1.default className={(0, tailwind_merge_1.twJoin)(item.isActive ? 'blog-nav-active' : 'blog-nav', 'group flex items-center justify-center border-b-2 border-transparent px-2 capitalize focus:outline-none', item.isActive
                    ? 'border-black dark:border-slate-50'
                    : '')} key={item.label} href={item.url}>
              <span className={(0, tailwind_merge_1.twJoin)('blog-nav-text', 'mb-2 block rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring', 'text-slate-900 hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800', item.isActive
                    ? 'font-semibold text-opacity-100 dark:text-opacity-100'
                    : 'font-medium text-opacity-70 dark:text-opacity-70')}>
                {item.label}
              </span>
            </link_1.default>);
        })
        : null;
    return (<react_perfect_scrollbar_1.default className="overflow-hidden">
      <nav className="relative flex flex-row flex-nowrap items-end whitespace-nowrap px-2 pt-2">
        {customNavbarItems}

        {showMoreDropdown ? (<DropdownPrimitive.Root>
            <DropdownPrimitive.Trigger asChild>
              <button aria-label="Toggle more links" type="button" className={(0, tailwind_merge_1.twJoin)(isActiveItemInDropdown ? 'blog-nav-active' : 'blog-nav', 'group ml-2 border-b-2 border-transparent focus:outline-none active:outline-none', isActiveItemInDropdown
                ? 'border-black dark:border-slate-50'
                : '')}>
                <div className={(0, tailwind_merge_1.twJoin)('blog-nav-text', 'mb-2 flex flex-row items-center rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring', 'text-black hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800', isActiveItemInDropdown
                ? 'font-semibold text-opacity-100 dark:text-opacity-100'
                : 'font-medium text-opacity-70 dark:text-opacity-70')}>
                  <span className="capitalize">
                    {isActiveItemInDropdown ? "".concat(activeDropdownMenuItem === null || activeDropdownMenuItem === void 0 ? void 0 : activeDropdownMenuItem.label) : 'More'}
                  </span>
                  <svgs_1.ChevronDownV2SVG className="ml-1 h-5 w-5 stroke-current"/>
                </div>
              </button>
            </DropdownPrimitive.Trigger>
            {/* If there's only one extra nav item, render the extra one in main nav instead of using the dropdown */}
            {showMoreDropdown ? <PublicationNavLinksDropdown extraNavbarItems={extraNavItems}/> : null}
          </DropdownPrimitive.Root>) : null}
      </nav>
    </react_perfect_scrollbar_1.default>);
}
exports.default = PublicationNavLinks;
