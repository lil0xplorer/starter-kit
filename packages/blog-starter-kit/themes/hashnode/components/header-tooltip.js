"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RadixTooltip = require("@radix-ui/react-tooltip");
var tailwind_merge_1 = require("tailwind-merge");
var HeaderTooltip = function (props) {
    var tooltipClassName = props.tooltipClassName, tooltipText = props.tooltipText, children = props.children;
    return (<RadixTooltip.Provider delayDuration={800}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className={(0, tailwind_merge_1.twJoin)(tooltipClassName, 'z-50 rounded-md px-3 py-2 text-xs', 'bg-slate-800 text-white dark:bg-white dark:text-slate-900')} side="bottom" align="center" avoidCollisions sideOffset={8}>
            {tooltipText}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>);
};
exports.default = HeaderTooltip;
