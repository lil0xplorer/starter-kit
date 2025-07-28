"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DropdownMenu = require("@radix-ui/react-dropdown-menu");
var svgs_1 = require("./icons/svgs/");
var scroll_area_1 = require("./scroll-area");
var tailwind_merge_1 = require("tailwind-merge");
function PublicationNavLinksDropdown(props) {
    var extraNavbarItems = props.extraNavbarItems;
    return (<DropdownMenu.Portal>
      <DropdownMenu.Content align="end" className="z-50 mt-2 w-64 overflow-hidden whitespace-normal rounded-xl border bg-white py-2 capitalize text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <scroll_area_1.default>
          <div className="max-h-72">
            {extraNavbarItems.length
            ? extraNavbarItems.map(function (navItem, index) { return (<react_1.default.Fragment key={"".concat(navItem.label, "-").concat(index)}>
                    <DropdownMenu.DropdownMenuItem asChild>
                      <a href={navItem.url} className={(0, tailwind_merge_1.twJoin)(navItem.isActive ? 'blog-nav-more-item-active' : 'blog-nav-more-item', 'flex flex-row items-center justify-between px-4 py-3 font-medium hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-700 dark:focus:bg-slate-700', navItem.isActive && 'font-bold')}>
                        <span>{navItem.label}</span>
                        {navItem.isActive ? (<svgs_1.CheckSVG className="h-5 w-5 fill-current text-blue-600 dark:text-white"/>) : null}
                      </a>
                    </DropdownMenu.DropdownMenuItem>
                    {index !== extraNavbarItems.length - 1 ? (<hr className="h-px w-full border-none bg-slate-200 dark:bg-slate-700"/>) : null}
                  </react_1.default.Fragment>); })
            : null}
          </div>
        </scroll_area_1.default>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>);
}
exports.default = PublicationNavLinksDropdown;
