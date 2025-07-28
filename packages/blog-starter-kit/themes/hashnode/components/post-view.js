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
var dynamic_1 = require("next/dynamic");
var link_1 = require("next/link");
var tailwind_merge_1 = require("tailwind-merge");
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
var localizedFormat_1 = require("dayjs/plugin/localizedFormat");
var svgs_1 = require("./icons/svgs");
var appContext_1 = require("./contexts/appContext");
var profile_image_1 = require("./profile-image");
var image_1 = require("../utils/image");
var custom_image_1 = require("./custom-image");
var images_1 = require("../utils/const/images");
var toc_render_design_1 = require("./toc-render-design");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.extend(localizedFormat_1.default);
var PublicationSubscribeStandOut = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./publication-subscribe-standout'); }); }, { ssr: false });
function PostView(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var postContentEle = (0, react_1.useRef)(null);
    var _post = (0, appContext_1.useAppContext)().post;
    var post = _post;
    var textSelectionSharerEnabled = ((_c = (_b = (_a = post.publication) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.textSelectionSharer) === null || _c === void 0 ? void 0 : _c.isEnabled) || typeof ((_f = (_e = (_d = post.publication) === null || _d === void 0 ? void 0 : _d.features) === null || _e === void 0 ? void 0 : _e.textSelectionSharer) === null || _f === void 0 ? void 0 : _f.isEnabled) === 'undefined';
    var toc = post.features.tableOfContents.items.map(function (item) { return [
        {
            id: item.id,
            level: item.level,
            slug: item.slug,
            title: item.title,
            parentId: item.parentId,
        },
    ]; });
    var memoizedPostContent = (0, react_1.useMemo)(function () { return (0, image_1.imageReplacer)(post.content, true); }, [post.content]);
    return (<main className="blog-post-detail-card pb-24">
        <article>
            <div className="blog-article-page container relative mx-auto grid grid-cols-8">
            <div className="col-span-full lg:col-span-6 lg:col-start-2">
                {/* Top cover */}
                {post.coverImage && post.coverImage.url && !post.preferences.stickCoverToBottom && (<div className="relative">
                    <custom_image_1.default className="mb-0 block w-full" placeholder="blur" originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage, __assign({ w: 1600, h: 840 }, (((_h = !((_g = post.coverImage) === null || _g === void 0 ? void 0 : _g.isPortrait)) !== null && _h !== void 0 ? _h : false) ? { c: 'thumb' } : { fill: 'blur' })))} blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(post.coverImage, __assign(__assign({}, images_1.blurImageDimensions), (((_k = !((_j = post.coverImage) === null || _j === void 0 ? void 0 : _j.isPortrait)) !== null && _k !== void 0 ? _k : false) ? { c: 'thumb' } : { fill: 'blur' }))))} width={1600} height={840} alt={post.title} priority layout="responsive"/>
                </div>)}

                {/* Article title */}
                <div className={(0, tailwind_merge_1.twJoin)("mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl", post.subtitle ? "mb-5" : "mb-8 md:mb-14")}>
                    <h1 className="leading-snug" data-query="post-title">
                        {post.title}
                    </h1>
                </div>

                {/* Article subtitle */}
                {post.subtitle && (<div className="mb-8 px-4 text-center font-heading md:mb-14 md:px-5 lg:px-8 xl:px-20">
                    <h2 className="text-2xl leading-snug text-slate-700 dark:text-slate-400 md:text-3xl xl:text-3xl">
                    {post.subtitle}
                    </h2>
                </div>)}

                <div className="relative z-20 mb-8 flex flex-row flex-wrap items-center justify-center px-4 md:-mt-7 md:mb-14 md:text-lg last:md:mb-10">
                <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
                    <div className="mr-2 h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-white/20 md:mr-3 md:h-12 md:w-12">
                    <profile_image_1.default user={post.author} width="200" height="200" hoverDisabled={props.isPublicationPost}/>
                    </div>
                    <a href={"https://hashnode.com/@".concat(post.author.username)} className="font-medium text-slate-900 dark:text-white">
                    <span>{post.author.name}</span>
                    </a>
                </div>
                <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
                    <span className="mx-3 hidden font-bold text-slate-500 md:block">&middot;</span>
                    <link_1.default href='/' className="tooltip-handle text-slate-700 dark:text-slate-400" data-title={"".concat((0, dayjs_1.default)(new Date(post.publishedAt)).format('MMM D, YYYY HH:mm'))}>
                    <span>{(0, dayjs_1.default)(new Date(post.publishedAt)).format('MMM D, YYYY')}</span>
                    </link_1.default>
                    {((_l = post === null || post === void 0 ? void 0 : post.publication) === null || _l === void 0 ? void 0 : _l.features.readTime.isEnabled) && (<>
                        <span className="mx-3 block font-bold text-slate-500">&middot;</span>
                        <p className="flex flex-row items-center text-slate-700 dark:text-slate-400">
                        <svgs_1.BookOpenSVG className="mr-2 h-5 w-5 fill-current opacity-75"/>
                        <span>{post.readTimeInMinutes} min read</span>
                        </p>
                    </>)}
                </div>
                </div>
                {post.coverImage && post.preferences.stickCoverToBottom && (<div className="relative my-8 md:my-14">
                    <custom_image_1.default className="mb-0 block w-full" placeholder="blur" originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage, __assign({ w: 1600, h: 840 }, (((_o = !((_m = post.coverImage) === null || _m === void 0 ? void 0 : _m.isPortrait)) !== null && _o !== void 0 ? _o : false) ? { c: 'thumb' } : { fill: 'blur' })))} blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(post.coverImage, __assign(__assign({}, images_1.blurImageDimensions), (((_q = !((_p = post.coverImage) === null || _p === void 0 ? void 0 : _p.isPortrait)) !== null && _q !== void 0 ? _q : false) ? { c: 'thumb' } : { fill: 'blur' }))))} width={1600} height={840} alt={post.title} layout="responsive"/>
                </div>)}
            </div>
            </div>
            <div className="blog-content-wrapper article-main-wrapper container relative z-30 mx-auto grid grid-flow-row grid-cols-8 xl:gap-6 2xl:grid-cols-10">
            <section className="blog-content-main z-20 col-span-8 mb-10 px-4 md:z-10 lg:col-span-6 lg:col-start-2 lg:px-0 xl:col-span-6 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
                <div className="relative">

                {post.features.tableOfContents.isEnabled && <toc_render_design_1.default list={toc}/>}

                {/* temporarily hiding the modal */}

                <div id="post-content-parent" className="relative mb-10 pb-14">
                    {memoizedPostContent && (<div id="post-content-wrapper" ref={postContentEle} className="prose prose-lg mx-auto mb-10 min-h-30 break-words dark:prose-dark xl:prose-xl" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
                __html: memoizedPostContent,
            }}/>)}
                </div>

                {post.publication && post.publication.features.newsletter.isEnabled && (<PublicationSubscribeStandOut />)}

                {(post === null || post === void 0 ? void 0 : post.tags) && post.tags.length > 0 && (<div className="mb-5 flex w-full flex-row flex-wrap justify-center md:mb-0">
                    {post.tags.map(function (tag) { return (<a className="mb-2 mr-3 rounded-lg border bg-slate-100 px-2 py-1 text-base font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700" key={tag._id.toString()} href={"/tag/".concat(tag.slug, "?source=tags_bottom_blogs")}>
                        {/* source from app-base.less most likely unused */}
                        <span>{tag.name}</span>
                        </a>); })}
                    </div>)}
                </div>
            </section>
            </div>
            {textSelectionSharerEnabled && (<>
                <div className="absolute h-px w-px overflow-hidden" id="refNode1" style={{ top: "100px", left: "100px" }}>
                &nbsp;
                </div>
                <div className="absolute left-0 top-0 h-px w-px overflow-hidden" id="refNode2"/>
            </>)}
            <div className="container relative z-20 mx-auto grid grid-flow-row grid-cols-8 xl:gap-6 2xl:grid-cols-10">
            </div>
        </article>
    </main>);
}
exports.default = PostView;
