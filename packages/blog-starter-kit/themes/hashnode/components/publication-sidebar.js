"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DialogPrimitive = require("@radix-ui/react-dialog");
var publication_sidebar_nav_links_1 = require("./publication-sidebar-nav-links");
var publication_social_links_1 = require("./publication-social-links");
var publication_logo_1 = require("./publication-logo");
var svgs_1 = require("./icons/svgs");
var scroll_area_1 = require("./scroll-area");
var tailwind_merge_1 = require("tailwind-merge");
var commonUtils_1 = require("../utils/commonUtils");
function PublicationSidebar(props) {
    var publication = props.publication, toggleSidebar = props.toggleSidebar, isHome = props.isHome, isBadge = props.isBadge, currentActiveMenuItemId = props.currentActiveMenuItemId, isPostPage = props.isPostPage, triggerRef = props.triggerRef;
    var _a = publication.preferences, enabledPages = _a.enabledPages, navbarItems = _a.navbarItems;
    var _b = (0, react_1.useState)(false), isMounted = _b[0], setIsMounted = _b[1];
    var sidebarHeaderRef = (0, react_1.useRef)(null);
    var userHasSocialLinks = (0, commonUtils_1.doesPublicationHaveSocialLinks)(publication.links);
    (0, react_1.useEffect)(function () {
        setIsMounted(true);
    }, []);
    return (<DialogPrimitive.Root open>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={(0, tailwind_merge_1.twJoin)('fixed inset-0 z-50 bg-slate-900 opacity-0 transition-opacity duration-300 ease-out dark:bg-slate-600 ', isMounted && 'opacity-50')}/>
        <DialogPrimitive.Content onEscapeKeyDown={function () {
            (0, commonUtils_1.blurActiveFocus)();
            toggleSidebar();
            (0, commonUtils_1.returnFocusToElement)(triggerRef);
        }} onCloseAutoFocus={function () { return (0, commonUtils_1.returnFocusToElement)(triggerRef); }} onPointerDownOutside={function () {
            (0, commonUtils_1.blurActiveFocus)();
            toggleSidebar();
        }} className={(0, tailwind_merge_1.twJoin)('fixed bottom-0 left-0 top-0 z-50 flex w-80 transform flex-col border-slate-200 bg-white text-black shadow-2xl duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 dark:text-white', 
        // When the sheet is mounted, we want to slide it in from the left.
        !isMounted ? '-translate-x-96' : 'translate-x-0')}>
          <div ref={sidebarHeaderRef} className="blog-sidebar-header w-full shrink-0 bg-white py-6 dark:bg-slate-900">
            <div className={(0, tailwind_merge_1.twJoin)('flex items-center justify-between pl-8 pr-4', 'dark:text-white')}>
              <publication_logo_1.default publication={publication} size="xs" withProfileImage isPostPage={isPostPage}/>

              <DialogPrimitive.Close asChild>
                <button type="button" aria-label="Close sidebar" onClick={function () {
            toggleSidebar();
            (0, commonUtils_1.returnFocusToElement)(triggerRef);
        }} className={(0, tailwind_merge_1.twJoin)('blog-sidebar-close-button', 'ml-2 rounded-full border border-transparent p-2 font-semibold transition-colors duration-150 focus:outline-none', 'hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/20 dark:focus:bg-white/20')}>
                  <svgs_1.CloseSVG className="h-5 w-5 fill-current"/>
                </button>
              </DialogPrimitive.Close>
            </div>
          </div>

          <scroll_area_1.default>
            <div className="py-10 pl-8 pr-4">
              <h2 className="mb-4 text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">Blog menu</h2>
              <publication_sidebar_nav_links_1.default isHome={isHome} isBadge={isBadge} currentActiveMenuItemId={currentActiveMenuItemId} enabledPages={enabledPages} navbarItems={navbarItems}/>

              {userHasSocialLinks ? (<>
                  <h2 className="mb-4 text-sm font-semibold uppercase leading-6 text-slate-500 dark:text-slate-400">
                    Blog socials
                  </h2>
                  <publication_social_links_1.default links={publication.links} isSidebar/>
                </>) : null}
            </div>
          </scroll_area_1.default>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>);
}
exports.default = PublicationSidebar;
