"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DialogPrimitive = require("@radix-ui/react-dialog");
var tailwind_merge_1 = require("tailwind-merge");
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
var CommentsSheet = function (_a) {
    var children = _a.children, hideSheet = _a.hideSheet;
    var _b = (0, react_1.useState)(false), isMounted = _b[0], setIsMounted = _b[1];
    (0, react_1.useEffect)(function () {
        setIsMounted(true);
    }, []);
    return (<DialogPrimitive.Root open>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay onClick={hideSheet} className={(0, tailwind_merge_1.twJoin)('fixed inset-0 z-50 bg-slate-900 opacity-0 transition-opacity ease-out dark:bg-slate-600', isMounted && 'opacity-50 duration-300')}/>
        <DialogPrimitive.Content className={(0, tailwind_merge_1.twJoin)('fixed top-0 bottom-0 right-0 z-50 w-full transform-gpu overflow-auto border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-l dark:border-slate-700 dark:bg-slate-900 md:w-108', 
        // When the sheet is mounted, we want to slide it in from the right.
        !isMounted ? 'translate-x-full md:translate-x-108' : 'translate-x-0')}>
          {children}
          <DialogPrimitive.Close onClick={hideSheet} className="absolute top-3 right-3 z-50" asChild>
            <hn_button_1.default variant="transparent" className="p-2">
              <svgs_1.CloseSVG className="h-5 w-5 fill-current"/>
            </hn_button_1.default>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>);
};
exports.default = CommentsSheet;
