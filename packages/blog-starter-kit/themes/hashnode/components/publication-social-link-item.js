"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
function PublicationSocialLinkItem(props) {
    var href = props.href, labelText = props.labelText, children = props.children, isSidebar = props.isSidebar;
    return (<a href={href} aria-label={labelText} target="_blank" rel="me noopener" className={(0, tailwind_merge_1.twJoin)('focus-ring-base flex flex-row items-center justify-center rounded-full p-2 transition-colors duration-150', isSidebar
            ? 'ring-blue-600 ring-offset-white hover:bg-black/10 dark:ring-offset-slate-800 dark:hover:bg-white/20'
            : '', !isSidebar
            ? 'focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20'
            : '')}>
      {children}
    </a>);
}
exports.default = PublicationSocialLinkItem;
