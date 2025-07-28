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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Post;
exports.getStaticProps = getStaticProps;
exports.getStaticPaths = getStaticPaths;
var graphql_request_1 = require("graphql-request");
var error_1 = require("next/error");
var head_1 = require("next/head");
var dayjs_1 = require("dayjs");
var container_1 = require("../../components/container");
var appContext_1 = require("../../components/contexts/appContext");
var post_page_navbar_1 = require("../../components/post-page-navbar");
var layout_1 = require("../../components/layout");
var graphql_1 = require("../../generated/graphql");
var publication_footer_1 = require("../../components/publication-footer");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var custom_image_1 = require("../../components/custom-image");
var image_1 = require("../../utils/image");
var images_1 = require("../../utils/const/images");
var profile_image_1 = require("../../components/profile-image");
var svgs_1 = require("../../components/icons/svgs");
var getReadTime_1 = require("../../utils/getReadTime");
var autolinker_1 = require("../../utils/autolinker");
var draft_floating_menu_1 = require("../../components/draft-floating-menu");
var markdownToHtml_1 = require("@starter-kit/utils/renderer/markdownToHtml");
var toc_render_design_1 = require("../../components/toc-render-design");
function Post(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var publication = _a.publication, draft = _a.draft;
    var headerRef = (0, react_1.useRef)(null);
    if (!draft) {
        return <error_1.default statusCode={404}/>;
    }
    var title = "".concat(draft.title, " - Hashnode");
    var highlightJsMonokaiTheme = '.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';
    var navPositionStyles = 'relative transform-none md:sticky md:top-0 md:left-0 md:backdrop-blur-lg';
    var readTime = draft && (0, getReadTime_1.default)((_b = draft.content) === null || _b === void 0 ? void 0 : _b.markdown);
    var content = (0, markdownToHtml_1.markdownToHtml)(((_c = draft.content) === null || _c === void 0 ? void 0 : _c.markdown) || '');
    var postContent = autolinker_1.default.link(content, {
        twitter: true,
        truncate: 45,
        className: 'autolinkedURL',
        replaceFn: function (_autolinker, match) {
            // eslint-disable-next-line default-case
            switch (match.getType()) {
                case 'twitter':
                    // eslint-disable-next-line no-unreachable,no-case-declarations
                    var username = match.getTwitterHandle();
                    return (
                    // eslint-disable-next-line no-unreachable
                    "<a href=\"https://hashnode.com/@".concat(username, "\" class=\"user-mention\" target=\"_blank\" rel=\"noopener\">@").concat(username, "</a>"));
            }
        },
    });
    var allTags = draft.tags;
    var toc = ((_e = (_d = draft.features) === null || _d === void 0 ? void 0 : _d.tableOfContents) === null || _e === void 0 ? void 0 : _e.isEnabled) ? (_g = (_f = draft.features) === null || _f === void 0 ? void 0 : _f.tableOfContents) === null || _g === void 0 ? void 0 : _g.items.flat() : [];
    return (<appContext_1.AppProvider publication={publication}>
			<layout_1.Layout>
				<header ref={headerRef} className={(0, tailwind_merge_1.twJoin)('blog-header', 'z-50 w-full border-b', navPositionStyles, 'border-black/10 bg-white bg-opacity-70 dark:border-white/10 dark:bg-slate-900 dark:bg-opacity-70')}>
					<post_page_navbar_1.default publication={publication} ref={headerRef}/>
				</header>
				<container_1.Container>
					<head_1.default>
						<title>{title}</title>
						<link rel="canonical" href={draft.canonicalUrl || ''}/>
						<style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }}></style>
					</head_1.default>
					<main className="blog-post-detail-card pb-24">
						<article className="blog-article-page">
							<div className="container relative mx-auto grid grid-cols-8">
								<div className="col-span-full lg:col-span-6 lg:col-start-2">
									{/* Top cover. StickCovertobottom use-case is not built yet */}
									{((_h = draft.coverImage) === null || _h === void 0 ? void 0 : _h.url) && (<div className="relative">
										<custom_image_1.default className="mb-0 block w-full" placeholder="blur" originalSrc={draft.coverImage.url} src={(0, image_1.resizeImage)(draft.coverImage.url, __assign({ w: 1600, h: 840 }, (false ? { c: 'thumb' } : { fill: 'blur' })))} blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(draft.coverImage.url, __assign(__assign({}, images_1.blurImageDimensions), (false ? { c: 'thumb' } : { fill: 'blur' }))))} width={1600} height={840} alt={draft.title || ''} layout="responsive" priority/>
									</div>)}

									{/* Article title */}
									<div className={(0, tailwind_merge_1.twJoin)("mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl", draft.subtitle ? "mb-5" : "mb-8 md:mb-14")}>
									<h1 className="leading-snug" data-query="post-title">
										{draft.title}
									</h1>
									</div>

									 {/* Article subtitle */}
									 {draft.subtitle && (<div className="mb-8 px-4 text-center font-heading md:mb-14 md:px-5 lg:px-8 xl:px-20">
										<h2 className="text-2xl leading-snug text-slate-700 dark:text-slate-400 md:text-3xl xl:text-3xl">
										{draft.subtitle}
										</h2>
									</div>)}

									<div className="relative z-20 mb-8 flex flex-row flex-wrap items-center justify-center px-4 md:-mt-7 md:mb-14 md:text-lg">
										<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
											<div className="mr-2 h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-white/20 md:mr-3 md:h-12 md:w-12">
											<profile_image_1.default user={draft.author} width="200" height="200" hoverDisabled={true}/>
											</div>
											<a href={"https://hashnode.com/@".concat(draft.author.username)} className="font-medium text-slate-900 dark:text-white">
											<span>{draft.author.name}</span>
											</a>
										</div>
										<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
											<span className="mx-3 hidden font-bold text-slate-500 md:block">&middot;</span>
											<a className="tooltip-handle text-slate-700 dark:text-slate-400" data-title={"".concat((0, dayjs_1.default)(draft.updatedAt).format('MMM D, YYYY HH:mm'))}>
											<span>{(0, dayjs_1.default)(draft.updatedAt).format('MMM D, YYYY')}</span>
											</a>
											<span className="mx-3 block font-bold text-slate-500">&middot;</span>
											{((_k = (_j = publication.features) === null || _j === void 0 ? void 0 : _j.readTime) === null || _k === void 0 ? void 0 : _k.isEnabled) && (<p className="flex flex-row items-center text-slate-700 dark:text-slate-400">
												<svgs_1.BookOpenSVG className="mr-2 h-5 w-5 fill-current opacity-75"/>
												<span>{readTime} min read</span>
											</p>)}
										</div>
									</div>
								</div>
							</div>
							<div className="blog-content-wrapper article-main-wrapper container relative z-30 mx-auto grid grid-flow-row grid-cols-8 xl:gap-6 2xl:grid-cols-10">
								<section className="blog-content-main relative z-20 col-span-8 mb-10 px-4 md:z-10 lg:col-span-6 lg:col-start-2 lg:px-0 xl:col-span-6 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
									<div className="relative">
									{draft.features.tableOfContents.isEnabled && <toc_render_design_1.default list={toc}/>}
									{postContent && (<div id="post-content-parent" className="relative mb-10 pb-14">
											<div id="post-content-wrapper" className="prose prose-lg mx-auto mb-10 min-h-30 break-words dark:prose-dark xl:prose-xl" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
                __html: (0, image_1.imageReplacer)(postContent),
            }}/>

											<draft_floating_menu_1.default draft={draft} list={toc}/>
										</div>)}
									{allTags.length > 0 && (<div className="mb-5 flex w-full flex-row flex-wrap justify-center md:mb-0">
										{allTags.map(function (tag) {
                var _a;
                return (<a className="mb-2 mr-3 rounded-lg border bg-slate-100 px-2 py-1 text-base font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700" key={(_a = tag._id) === null || _a === void 0 ? void 0 : _a.toString()} href={"/tag/".concat(tag.slug)}>
											<span>{tag.name}</span>
											</a>);
            })}
										</div>)}
									</div>
								</section>
							</div>
						</article>
					</main>
				</container_1.Container>
				<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>
			</layout_1.Layout>
		</appContext_1.AppProvider>);
}
function getStaticProps(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var _c, dataDraft, dataPublication, publication, draft;
        var params = _b.params;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, graphql_request_1.default)(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT, graphql_1.DraftByIdDocument, {
                            id: params.id,
                        }),
                        (0, graphql_request_1.default)(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT, graphql_1.PublicationByHostDocument, {
                            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                        }),
                    ])];
                case 1:
                    _c = _d.sent(), dataDraft = _c[0], dataPublication = _c[1];
                    publication = dataPublication.publication;
                    draft = dataDraft.draft;
                    return [2 /*return*/, {
                            props: {
                                draft: draft,
                                publication: publication,
                            },
                            revalidate: 1,
                        }];
            }
        });
    });
}
function getStaticPaths() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    paths: [],
                    fallback: 'blocking',
                }];
        });
    });
}
