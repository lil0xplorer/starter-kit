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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostHeader = void 0;
var dayjs_1 = require("dayjs");
var localizedFormat_1 = require("dayjs/plugin/localizedFormat");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
var dynamic_1 = require("next/dynamic");
var link_1 = require("next/link");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var image_1 = require("@starter-kit/utils/image");
// @ts-ignore
var handle_math_jax_1 = require("@starter-kit/utils/handle-math-jax");
var images_1 = require("../utils/const/images");
var image_2 = require("../utils/image");
var co_authors_modal_1 = require("./co-authors-modal");
var custom_image_1 = require("./custom-image");
var profile_image_1 = require("./profile-image");
var toc_render_design_1 = require("./toc-render-design");
var OtherPostsOfAccount = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./other-posts-of-account'); }); }, { ssr: false });
var AboutAuthor = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./about-author'); }); }, { ssr: false });
var useEmbeds_1 = require("@starter-kit/utils/renderer/hooks/useEmbeds");
var embed_1 = require("@starter-kit/utils/renderer/services/embed");
var react_2 = require("react");
var svgs_1 = require("./icons/svgs");
// @ts-ignore
var trigger_custom_widget_embed_1 = require("@starter-kit/utils/trigger-custom-widget-embed");
var urls_1 = require("../utils/urls");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.extend(localizedFormat_1.default);
var PostFloatingMenu = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./post-floating-bar'); }); }, { ssr: false });
var PostCommentsSidebar = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./post-comments-sidebar'); }); }, { ssr: false });
var PublicationSubscribeStandOut = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./publication-subscribe-standout'); }); }, {
    ssr: false,
});
var PostHeader = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    var post = _a.post, morePosts = _a.morePosts;
    var postContentEle = (0, react_1.useRef)(null);
    var _1 = (0, react_1.useState)('totalReactions'), selectedFilter = _1[0], setSelectedFilter = _1[1];
    var toc = ((_c = (_b = post.features) === null || _b === void 0 ? void 0 : _b.tableOfContents) === null || _c === void 0 ? void 0 : _c.isEnabled)
        ? (_e = (_d = post.features) === null || _d === void 0 ? void 0 : _d.tableOfContents) === null || _e === void 0 ? void 0 : _e.items.flat()
        : [];
    var memoizedPostContent = (0, react_1.useMemo)(function () { var _a; return (0, image_2.imageReplacer)((_a = post.content) === null || _a === void 0 ? void 0 : _a.html, true); }, [(_f = post.content) === null || _f === void 0 ? void 0 : _f.html]);
    var _2 = (0, react_1.useState)(false), showCommentsSheet = _2[0], setShowCommentsSheet = _2[1];
    var tags = ((_g = post.tags) !== null && _g !== void 0 ? _g : []).map(function (tag) {
        return {
            _id: tag.id,
            slug: tag.slug,
            name: tag.name,
            isActive: true,
            isApproved: true,
        };
    });
    var shareText = "".concat(post.title, "\r\n{ by ").concat(((_h = post.author.socialMediaLinks) === null || _h === void 0 ? void 0 : _h.twitter)
        ? "@".concat((_j = post.author.socialMediaLinks) === null || _j === void 0 ? void 0 : _j.twitter.substring(((_k = post.author.socialMediaLinks) === null || _k === void 0 ? void 0 : _k.twitter.lastIndexOf('/')) + 1).replace('@', ''))
        : post.author.name, " } from @hashnode");
    var handleOpenComments = function () {
        setShowCommentsSheet(true);
    };
    var filteredPostsWithoutCurrentPost = morePosts.filter(function (postNode) { return postNode.node.id !== post.id; });
    var top3FilteredPosts = filteredPostsWithoutCurrentPost.slice(0, 3);
    var _3 = (0, react_1.useState)(false), setMobMount = _3[1];
    var _4 = (0, react_1.useState)(false), canLoadEmbeds = _4[0], setCanLoadEmbeds = _4[1];
    (0, useEmbeds_1.useEmbeds)({ enabled: canLoadEmbeds });
    var absolutePostURL = (0, urls_1.createPostUrl)(post, post.publication);
    if (post.hasLatexInPost) {
        setTimeout(function () {
            (0, handle_math_jax_1.default)(true);
        }, 500);
    }
    var _5 = (0, react_1.useState)(false), isCoAuthorModalVisible = _5[0], setIsCoAuthorModalVisible = _5[1];
    var closeCoAuthorModal = function () {
        setIsCoAuthorModalVisible(false);
    };
    var openCoAuthorModal = function () {
        setIsCoAuthorModalVisible(true);
    };
    (0, react_1.useEffect)(function () {
        if (screen.width <= 425) {
            setMobMount(true);
        }
        if (!post) {
            return;
        }
        // TODO:
        // More of an alert, did this below to wrap async funcs inside useEffect
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, embed_1.loadIframeResizer)()];
                    case 1:
                        _b.sent();
                        (0, trigger_custom_widget_embed_1.triggerCustomWidgetEmbed)((_a = post.publication) === null || _a === void 0 ? void 0 : _a.id.toString());
                        setCanLoadEmbeds(true);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var authorsArray = __spreadArray([post.author], (post.coAuthors || []), true);
    return (<react_2.Fragment>
			<div className="blog-article-page container relative mx-auto grid grid-cols-8">
				<div className="col-span-full lg:col-span-6 lg:col-start-2">
					{/* Top cover */}
					{((_l = post.coverImage) === null || _l === void 0 ? void 0 : _l.url) && !post.preferences.stickCoverToBottom && (<div className="relative">
							<custom_image_1.default className="mb-0 block w-full" placeholder="blur" originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage.url, __assign({ w: 1600, h: 840 }, (!post.coverImage.isPortrait ? { c: 'thumb' } : { fill: 'blur' })))} blurDataURL={(0, image_2.getBlurHash)((0, image_1.resizeImage)(post.coverImage.url, __assign(__assign({}, images_1.blurImageDimensions), (!post.coverImage.isPortrait ? { c: 'thumb' } : { fill: 'blur' }))))} width={1600} height={840} alt={post.title} priority layout="responsive"/>
						</div>)}

					{/* Article title */}
					<div className={(0, tailwind_merge_1.twJoin)("font-heading mt-6 break-words px-4 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl", post.subtitle ? "mb-5" : "mb-8 md:mb-14")}>
						<h1 className="leading-snug" data-query="post-title">
							{post.title}
						</h1>
					</div>

					{/* Article subtitle */}
					{post.subtitle && (<div className="font-heading mb-8 px-4 text-center md:mb-14 md:px-5 lg:px-8 xl:px-20">
							<h2 className="text-2xl leading-snug text-slate-700 dark:text-slate-400 md:text-3xl xl:text-3xl">
								{post.subtitle}
							</h2>
						</div>)}

					<div className="relative z-20 mb-8 flex flex-row flex-wrap items-center justify-center px-4 md:-mt-7 md:mb-14 md:text-lg last:md:mb-10">
						<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
							{authorsArray.map(function (coAuthor, index) {
            var _a;
            return (<div key={(_a = coAuthor.id) === null || _a === void 0 ? void 0 : _a.toString()} style={{ zIndex: index + 1 }} className={(0, tailwind_merge_1.twJoin)('overflow-hidden rounded-full  bg-slate-200  dark:bg-white/20 md:mr-3', index > 0 ? 'hidden md:block' : '', authorsArray.length === 1
                    ? 'h-10 w-10 md:h-12 md:w-12'
                    : 'h-8 w-8 border-2 border-slate-100 dark:border-slate-800 md:h-9 md:w-9 [&:not(:first-of-type)]:-ml-3 md:[&:not(:first-of-type)]:-ml-6 ')}>
									<profile_image_1.default user={coAuthor} width="200" height="200" hoverDisabled={true}/>
								</div>);
        })}
							{post.coAuthors && post.coAuthors.length > 0 && (<button onClick={openCoAuthorModal} style={{ zIndex: (_m = post.coAuthors) === null || _m === void 0 ? void 0 : _m.length }} className="border-1-1/2 relative -ml-3 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-slate-100 bg-slate-100 px-1 group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 dark:text-white group-hover:dark:border-slate-700 md:hidden">
									<p className="truncate text-xs font-normal">+{post.coAuthors.length}</p>
								</button>)}
							{!((_o = post.coAuthors) === null || _o === void 0 ? void 0 : _o.length) && (<a href={"https://hashnode.com/@".concat(post.author.username)} className="ml-2 font-semibold text-slate-600 dark:text-white md:ml-0">
									<span>{post.author.name}</span>
								</a>)}
							{post.coAuthors && post.coAuthors.length > 0 && (<button onClick={openCoAuthorModal} className="ml-2 text-left font-semibold text-slate-600 hover:underline dark:text-white">
									<span>{post.author.name}</span>
									{post.coAuthors && (<span className="font-normal">
											{' '}
											<br className="block sm:hidden"/>
											with {post.coAuthors.length} co-author{post.coAuthors.length === 1 ? '' : 's'}
										</span>)}
								</button>)}
						</div>
						<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
							<span className="mx-3 hidden font-bold text-slate-500 md:block">&middot;</span>
							<link_1.default href={absolutePostURL} className="tooltip-handle text-slate-700 dark:text-slate-400" data-title={"".concat((0, dayjs_1.default)(post.publishedAt).format('MMM D, YYYY HH:mm'))}>
								<span>{(0, dayjs_1.default)(post.publishedAt).format('MMM D, YYYY')}</span>
							</link_1.default>
							{((_r = (_q = (_p = post.publication) === null || _p === void 0 ? void 0 : _p.features) === null || _q === void 0 ? void 0 : _q.readTime) === null || _r === void 0 ? void 0 : _r.isEnabled) && (<>
									<span className="mx-3 block font-bold text-slate-500">&middot;</span>
									<p className="flex flex-row items-center text-slate-700 dark:text-slate-400">
										<svgs_1.BookOpenSVG className="mr-2 h-5 w-5 fill-current opacity-75"/>
										<span>{post.readTimeInMinutes} min read</span>
									</p>
								</>)}
						</div>
					</div>
					{((_s = post.coverImage) === null || _s === void 0 ? void 0 : _s.url) && post.preferences.stickCoverToBottom && (<div className="relative my-8 md:my-14">
							<custom_image_1.default className="mb-0 block w-full" placeholder="blur" originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage.url, __assign({ w: 1600, h: 840 }, (!post.coverImage.isPortrait ? { c: 'thumb' } : { fill: 'blur' })))} blurDataURL={(0, image_2.getBlurHash)((0, image_1.resizeImage)(post.coverImage.url, __assign(__assign({}, images_1.blurImageDimensions), (!post.coverImage.isPortrait ? { c: 'thumb' } : { fill: 'blur' }))))} width={1600} height={840} alt={post.title} layout="responsive"/>
						</div>)}
				</div>
			</div>
			<div className="blog-content-wrapper article-main-wrapper container relative z-30 mx-auto grid grid-flow-row grid-cols-8 xl:gap-6 2xl:grid-cols-10">
				<section className="blog-content-main z-20 col-span-8 mb-10 px-4 md:z-10 lg:col-span-6 lg:col-start-2 lg:px-0 xl:col-span-6 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
					<div className="relative">
						{((_u = (_t = post.features) === null || _t === void 0 ? void 0 : _t.tableOfContents) === null || _u === void 0 ? void 0 : _u.isEnabled) && ((_x = (_w = (_v = post.features) === null || _v === void 0 ? void 0 : _v.tableOfContents) === null || _w === void 0 ? void 0 : _w.items) === null || _x === void 0 ? void 0 : _x.length) > 0 && <toc_render_design_1.default list={toc}/>}

						{/* {isPublicationPost && renderPinnedWidgets(props.widgets, 'top')} */}

						<div id="post-content-parent" className="relative mb-10 pb-14">
							{memoizedPostContent && (<div id="post-content-wrapper" ref={postContentEle} className="prose prose-lg min-h-30 dark:prose-dark xl:prose-xl mx-auto mb-10 break-words" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
                __html: memoizedPostContent,
            }}/>)}

							{/* {props.isPublicationPost && renderPinnedWidgets(props.widgets, 'bottom')} */}

							<PostFloatingMenu isPublicationPost={true} post={post} shareText={shareText} openComments={handleOpenComments} list={toc}/>
						</div>

						{post.publication && ((_0 = (_z = (_y = post.publication) === null || _y === void 0 ? void 0 : _y.features) === null || _z === void 0 ? void 0 : _z.newsletter) === null || _0 === void 0 ? void 0 : _0.isEnabled) && (<PublicationSubscribeStandOut />)}

						{tags.length > 0 && (<div className="mb-5 flex w-full flex-row flex-wrap justify-center md:mb-0">
								{tags.map(function (tag) { return (<link_1.default className="mb-2 mr-3 rounded-lg border bg-slate-100 px-2 py-1 text-base font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700" key={tag._id} href={"/tag/".concat(tag.slug, "?source=tags_bottom_blogs")}>
										<span>{tag.name}</span>
									</link_1.default>); })}
							</div>)}

						<AboutAuthor />
					</div>
				</section>
			</div>
			{/* More posts from current post's author/publication rendered here */}
			{/* TODO: Below breaking on failed nw request */}
			{!post.series && <OtherPostsOfAccount post={post} morePosts={top3FilteredPosts}/>}
			{showCommentsSheet && (<PostCommentsSidebar hideSidebar={function () { return setShowCommentsSheet(false); }} isPublicationPost={true} selectedFilter={selectedFilter} post={post}/>)}
			{isCoAuthorModalVisible && <co_authors_modal_1.default closeModal={closeCoAuthorModal}/>}
		</react_2.Fragment>);
};
exports.PostHeader = PostHeader;
