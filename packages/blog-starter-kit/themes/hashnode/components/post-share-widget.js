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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var react_dropdown_menu_1 = require("@radix-ui/react-dropdown-menu");
var react_use_1 = require("react-use");
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
var styles_1 = require("../utils/const/styles");
var toast_1 = require("../utils/toast");
var urls_1 = require("../utils/urls");
var post_floating_bar_tooltip_wrapper_1 = require("./post-floating-bar-tooltip-wrapper");
/**
 * Can be used for both Draft preview page and Single post page
 */
var PostShareWidget = function (props) {
    var shareText = props.shareText, post = props.post, draft = props.draft;
    var _a = (0, react_use_1.useCopyToClipboard)(), _ = _a[0], copyToClipboard = _a[1];
    var _b = (0, react_1.useState)(false), isShareOpen = _b[0], setIsShareOpen = _b[1];
    if (post && draft) {
        throw new Error('You cannot provide both post and draft');
    }
    if (!post && !draft) {
        throw new Error('Provide at least Post or Draft');
    }
    var entity = post || draft;
    var getAbsolutePostURL = function () {
        if (post) {
            return (0, urls_1.createPostUrl)(__assign(__assign({}, entity), { partOfPublication: true }), entity.publication);
        }
        if (draft) {
            return (0, urls_1.createDraftPreviewUrl)(entity.id.toString());
        }
        return '';
    };
    var absolutePostURL = getAbsolutePostURL();
    var copyPermalink = function () {
        copyToClipboard(absolutePostURL);
        (0, toast_1.showToast)('success', "Copied ".concat(post ? 'article permalink' : 'draft preview link', " "));
    };
    (0, react_1.useEffect)(function () {
        if (!isShareOpen)
            return;
    }, [isShareOpen]);
    return (<react_dropdown_menu_1.Root open={isShareOpen} onOpenChange={setIsShareOpen}>
      <post_floating_bar_tooltip_wrapper_1.default label="Share this article">
        <react_dropdown_menu_1.Trigger aria-label="Share this article" className="outline-none! cursor-pointer rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <svgs_1.ShareSVGV2 className="h-4 w-4 stroke-current text-slate-800 dark:text-slate-50 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"/>
        </react_dropdown_menu_1.Trigger>
      </post_floating_bar_tooltip_wrapper_1.default>
      <react_dropdown_menu_1.Portal>
        <react_dropdown_menu_1.Content sideOffset={16} className="z-50 w-40 rounded-xl border border-slate-200 bg-white px-1 py-2 text-sm font-semibold text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-700 dark:text-slate-50">
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <hn_button_1.default variant="transparent" className={(0, tailwind_merge_1.twJoin)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 text-sm font-normal dark:hover:bg-slate-800')} onClick={copyPermalink} aria-label={"Copy ".concat(post ? 'article permalink' : 'draft link')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.LinkSVGV2 className="h-5 w-4 fill-current text-slate-600 dark:text-slate-200"/>
              </span>
              {/* Draft link is technically not a permalink so changed the wording for draft preview links, toast message is also adjusted accordingly */}
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">
                {post ? 'Permalink' : 'Draft link'}
              </span>
            </hn_button_1.default>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"https://twitter.com/share?url=".concat(encodeURIComponent("".concat(absolutePostURL, "?ref=twitter-share")), "&text=").concat(encodeURIComponent(shareText))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.TwitterXSVG className="h-7 w-4 stroke-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">Twitter</span>
            </a>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"http://www.reddit.com/submit?url=".concat(encodeURIComponent(absolutePostURL), "&title=").concat(encodeURIComponent(entity.title))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.RedditSVGV2 className="h-7 w-4 fill-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">Reddit</span>
            </a>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"https://www.linkedin.com/cws/share?url=".concat(encodeURIComponent(absolutePostURL))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.LinkedInSVGV2 className="h-7 w-4 fill-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">LinkedIn</span>
            </a>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"http://news.ycombinator.com/submitlink?u=".concat(encodeURIComponent(absolutePostURL), "&t=").concat(encodeURIComponent(entity.title))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.HackernewsSVGV2 className="h-5 w-4 fill-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">Hacker News</span>
            </a>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(absolutePostURL))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.FacebookSVGRound className="h-5 w-4 fill-current stroke-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">Facebook</span>
            </a>
          </react_dropdown_menu_1.Item>
          <react_dropdown_menu_1.Item className="outline-none!" asChild>
            <a href={"https://api.whatsapp.com/send?text=".concat(encodeURIComponent(entity.title), " ").concat(encodeURIComponent(absolutePostURL))} onClick={function () { }} target="_blank" rel="noopener" className={(0, tailwind_merge_1.twMerge)(styles_1.dropdownMenu, 'flex flex-wrap rounded px-2 font-normal dark:hover:bg-slate-800')}>
              <span className="flex h-5 w-5 items-center justify-center">
                <svgs_1.WhatsappSVG className="h-5 w-4 fill-current stroke-current text-slate-600 dark:text-slate-200"/>
              </span>
              <span className="px-2 font-normal text-slate-700 dark:text-slate-100">WhatsApp</span>
            </a>
          </react_dropdown_menu_1.Item>
        </react_dropdown_menu_1.Content>
      </react_dropdown_menu_1.Portal>
    </react_dropdown_menu_1.Root>);
};
exports.default = PostShareWidget;
