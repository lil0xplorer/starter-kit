"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var buttonSizes = {
    small: 'px-2 text-sm',
    big: 'px-4 py-2 text-lg',
};
var buttonStyles = {
    transparent: {
        default: (0, tailwind_merge_1.twJoin)('rounded-full border border-transparent px-3 py-1 text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200', 'hover:bg-slate-200 disabled:opacity-50 hover:dark:bg-slate-700', 'flex flex-row items-center focus:outline-none'),
        active: 'text-blue-600 dark:text-blue-600',
        disabled: 'opacity-50 cursor-not-allowed',
    },
    'transparent-outline': {
        default: (0, tailwind_merge_1.twJoin)('rounded-full border border-slate-200 px-3 py-1 text-base font-medium leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-200', 'hover:bg-slate-200 disabled:opacity-50 hover:dark:bg-slate-700', 'flex flex-row items-center focus:outline-none'),
        active: 'text-white bg-blue-600 hover:bg-blue-600 border-blue-600',
        disabled: 'opacity-50 cursor-not-allowed',
    },
    primary: {
        default: (0, tailwind_merge_1.twJoin)('rounded-full border border-blue-600 bg-blue-600 px-3 py-1 text-center text-base font-medium leading-relaxed text-white transition-colors duration-150', 'hover:bg-opacity-90 hover:shadow-lg focus:outline-none disabled:opacity-50'),
        active: 'text-white bg-blue-600 hover:bg-blue-500 hover:dark:bg-blue-500',
        disabled: 'opacity-50 cursor-not-allowed',
    },
    'primary-outline': {
        default: (0, tailwind_merge_1.twJoin)('rounded-full border border-blue-600 px-3 py-1 text-center text-base font-medium leading-relaxed transition-colors duration-150 dark:border-blue-500', "flex flex-row items-center justify-center text-blue-600 focus:outline-none\n    dark:text-blue-500", // Extra added, instead of sending from parent component
        'hover:bg-blue-50 disabled:opacity-50 hover:dark:bg-slate-800'),
        active: 'text-white bg-blue-600 hover:bg-blue-500 hover:dark:bg-blue-500',
        disabled: 'opacity-50 cursor-not-allowed',
    },
};
/**
 * Button component
 * @param {string} props.value Button value
 * @param {string=} props.variant Button variant
 * @returns {React.Reactnode} Button
 */
var Index = react_1.default.forwardRef(function (props, ref) {
    var size = props.size, active = props.active, as = props.as, href = props.href, disabled = props.disabled, children = props.children, className = props.className, restOfTheProps = __rest(props, ["size", "active", "as", "href", "disabled", "children", "className"]);
    // use 'primary' as a fallback if a not supported variant is passed
    var _a = props.variant, variant = _a === void 0 ? 'primary' : _a;
    if (!(variant in buttonStyles)) {
        variant = 'primary';
    }
    var styles = buttonStyles[variant];
    if (as === 'a') {
        delete restOfTheProps.type;
        return (<a ref={ref} href={href} className={(0, tailwind_merge_1.twMerge)(styles.default, active && styles.active, disabled && styles.disabled, size && buttonSizes[size], className)} 
        // TODO: need to make this dynamic
        {...restOfTheProps}>
        {children}
      </a>);
    }
    return (<button ref={ref} disabled={disabled} className={(0, tailwind_merge_1.twMerge)(styles.default, active && styles.active, disabled && styles.disabled, size && buttonSizes[size], className)} 
    // TODO: need to make this dynamic
    type="button" {...restOfTheProps}>
      {/* {value} */}
      {children}
    </button>);
});
Index.displayName = 'Button';
Index.defaultProps = {
    variant: 'primary',
    active: false,
    disabled: false,
    size: undefined,
    type: 'button',
    as: null,
    href: '#',
};
exports.default = Index;
