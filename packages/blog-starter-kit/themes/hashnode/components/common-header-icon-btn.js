"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonBtnStyles = void 0;
var tailwind_merge_1 = require("tailwind-merge");
var header_tooltip_1 = require("./header-tooltip");
var variants = {
    theme: {
        label: 'Toggle blog theme',
        buttonClassName: 'blog-theme-switcher',
        tooltipText: 'Toggle theme',
        tooltipClassName: 'blog-theme-tooltip',
    },
    search: {
        label: 'Open blog search',
        buttonClassName: 'blog-search-button',
        tooltipText: 'Search blog',
        tooltipClassName: 'blog-search-tooltip',
    },
    leftSidebar: {
        label: 'Open blog links',
        buttonClassName: 'blog-bars-button',
        tooltipText: 'Blog menu',
        tooltipClassName: 'blog-sidebar-tooltip',
    },
};
var getCommonBtnStyles = function () {
    return (0, tailwind_merge_1.twJoin)('focus-ring-base flex flex-row items-center rounded-full font-medium transition duration-100 ease-in-out', 'focus-ring-colors-base hover:bg-black/10 dark:hover:bg-white/20');
};
exports.getCommonBtnStyles = getCommonBtnStyles;
var CommonHeaderIconBtn = function (props) {
    var handleClick = props.handleClick, variant = props.variant, btnRef = props.btnRef, children = props.children;
    var _a = variants[variant], label = _a.label, buttonClassName = _a.buttonClassName, tooltipClassName = _a.tooltipClassName, tooltipText = _a.tooltipText;
    var btnStyles = (0, exports.getCommonBtnStyles)();
    return (<header_tooltip_1.default tooltipClassName={tooltipClassName} tooltipText={tooltipText}>
      <button type="button" aria-label={label} className={(0, tailwind_merge_1.twJoin)(buttonClassName, btnStyles, 'mr-2 p-2')} onClick={handleClick} ref={btnRef}>
        {children}
      </button>
    </header_tooltip_1.default>);
};
exports.default = CommonHeaderIconBtn;
