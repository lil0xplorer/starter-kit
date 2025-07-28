"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PostFloatingBarTooltipWrapper;
var Tooltip = require("@radix-ui/react-tooltip");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
function PostFloatingBarTooltipWrapper(_a) {
    var children = _a.children, label = _a.label, _b = _a.asChild, asChild = _b === void 0 ? true : _b, _c = _a.labelSide, labelSide = _c === void 0 ? 'top' : _c, _d = _a.contentClassName, contentClassName = _d === void 0 ? '' : _d, delayDuration = _a.delayDuration;
    return (<Tooltip.Root delayDuration={delayDuration || 1000}>
      <Tooltip.Trigger asChild={asChild} className="outline-none">
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={labelSide} sideOffset={15} className={(0, tailwind_merge_1.twMerge)('z-50 rounded-md bg-slate-800 p-2 px-3 text-xs text-white', contentClassName)}>
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>);
}
