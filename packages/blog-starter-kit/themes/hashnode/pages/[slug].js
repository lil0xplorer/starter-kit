"use strict";
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
exports.getStaticPaths = exports.getStaticProps = void 0;
exports.default = PostOrPage;
var addArticleJsonLd_1 = require("@starter-kit/utils/seo/addArticleJsonLd");
var addPublicationJsonLd_1 = require("@starter-kit/utils/seo/addPublicationJsonLd");
var og_1 = require("@starter-kit/utils/social/og");
var graphql_request_1 = require("graphql-request");
var head_1 = require("next/head");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var container_1 = require("../components/container");
var appContext_1 = require("../components/contexts/appContext");
var header_1 = require("../components/header");
var layout_1 = require("../components/layout");
var post_header_1 = require("../components/post-header");
var post_page_navbar_1 = require("../components/post-page-navbar");
var publication_footer_1 = require("../components/publication-footer");
var static_page_content_1 = require("../components/static-page-content");
var graphql_1 = require("../generated/graphql");
var Post = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var publication = _a.publication, post = _a.post, morePosts = _a.morePosts;
    var highlightJsMonokaiTheme = '.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';
    return (<>
			<head_1.default>
				<title>{((_b = post.seo) === null || _b === void 0 ? void 0 : _b.title) || post.title}</title>
				<link rel="canonical" href={post.url}/>
				<meta name="description" content={((_c = post.seo) === null || _c === void 0 ? void 0 : _c.description) || post.subtitle || post.brief}/>
				<meta property="twitter:card" content="summary_large_image"/>
				<meta property="twitter:title" content={((_d = post.seo) === null || _d === void 0 ? void 0 : _d.title) || post.title}/>
				<meta property="twitter:description" content={((_e = post.seo) === null || _e === void 0 ? void 0 : _e.description) || post.subtitle || post.brief}/>
				<meta property="og:image" content={((_f = post.ogMetaData) === null || _f === void 0 ? void 0 : _f.image) ||
            ((_g = post.coverImage) === null || _g === void 0 ? void 0 : _g.url) ||
            (0, og_1.getAutogeneratedPostOG)(post, publication)}/>
				<meta property="twitter:image" content={((_h = post.ogMetaData) === null || _h === void 0 ? void 0 : _h.image) ||
            ((_j = post.coverImage) === null || _j === void 0 ? void 0 : _j.url) ||
            (0, og_1.getAutogeneratedPostOG)(post, publication)}/>
				<script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify((0, addArticleJsonLd_1.addArticleJsonLd)(publication, post)),
        }}/>
				<style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }}></style>
			</head_1.default>
			<post_header_1.PostHeader post={post} morePosts={morePosts}/>
		</>);
};
var Page = function (_a) {
    var page = _a.page;
    var title = page.title;
    return (<>
			<head_1.default>
				<title>{title}</title>
			</head_1.default>
			<div className="blog-page-area mx-auto min-h-screen px-4 py-8 md:w-2/3 md:p-10">
				<static_page_content_1.default pageContent={page}/>
			</div>
		</>);
};
function PostOrPage(props) {
    var headerRef = (0, react_1.useRef)(null);
    var maybePost = props.type === 'post' ? props.post : null;
    var maybePage = props.type === 'page' ? props.page : null;
    var publication = props.publication;
    var navPositionStyles = 'relative transform-none md:sticky md:top-0 md:left-0 md:backdrop-blur-lg';
    if (props.type === 'post') {
        return (<appContext_1.AppProvider publication={publication} post={props.post}>
				<layout_1.Layout>
					<header ref={headerRef} className={(0, tailwind_merge_1.twJoin)('blog-header', 'z-50 w-full border-b', navPositionStyles, 'border-black/10 bg-white bg-opacity-70 dark:border-white/10 dark:bg-slate-900 dark:bg-opacity-70')}>
						<post_page_navbar_1.default publication={publication} ref={headerRef}/>
					</header>
					<container_1.Container>
						<article className="flex flex-col items-start gap-10 pb-10">
							<Post {...props}/>
						</article>
					</container_1.Container>
					<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>
				</layout_1.Layout>
			</appContext_1.AppProvider>);
    }
    var description = publication.descriptionSEO || publication.title || "".concat(publication.author.name, "'s Blog");
    return (<appContext_1.AppProvider publication={publication} post={maybePost} page={maybePage}>
			<layout_1.Layout>
				<head_1.default>
					<title>
						{publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}
					</title>
					<meta name="description" content={description}/>
					<meta property="twitter:card" content="summary_large_image"/>
					<meta property="twitter:title" content={publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}/>
					<meta property="twitter:description" content={description}/>
					<meta property="og:image" content={publication.ogMetaData.image || (0, og_1.getAutogeneratedPublicationOG)(publication)}/>
					<meta property="twitter:image" content={publication.ogMetaData.image || (0, og_1.getAutogeneratedPublicationOG)(publication)}/>
					<script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify((0, addPublicationJsonLd_1.addPublicationJsonLd)(publication)),
        }}/>
				</head_1.default>
				<header_1.Header isHome={false}/>
				<container_1.Container>
					<article className="flex flex-col items-start gap-10 pb-10">
						<Page {...props}/>
					</article>
				</container_1.Container>
				<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>
			</layout_1.Layout>
		</appContext_1.AppProvider>);
}
var getStaticProps = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var endpoint, host, slug, _c, postData, morePostsData, pageData;
    var _d, _e, _f, _g;
    var params = _b.params;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (!params) {
                    throw new Error('No params');
                }
                endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
                host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
                slug = params.slug;
                return [4 /*yield*/, Promise.all([
                        (0, graphql_request_1.default)(endpoint, graphql_1.SinglePostByPublicationDocument, { host: host, slug: slug }),
                        (0, graphql_request_1.default)(endpoint, graphql_1.MorePostsByPublicationDocument, { first: 4, host: host }),
                    ])];
            case 1:
                _c = _h.sent(), postData = _c[0], morePostsData = _c[1];
                if ((_d = postData.publication) === null || _d === void 0 ? void 0 : _d.post) {
                    return [2 /*return*/, {
                            props: {
                                type: 'post',
                                post: postData.publication.post,
                                morePosts: (_f = (_e = morePostsData.publication) === null || _e === void 0 ? void 0 : _e.posts.edges) !== null && _f !== void 0 ? _f : [],
                                publication: postData.publication,
                            },
                            revalidate: 1,
                        }];
                }
                return [4 /*yield*/, (0, graphql_request_1.default)(endpoint, graphql_1.PageByPublicationDocument, { host: host, slug: slug })];
            case 2:
                pageData = _h.sent();
                if ((_g = pageData.publication) === null || _g === void 0 ? void 0 : _g.staticPage) {
                    return [2 /*return*/, {
                            props: {
                                type: 'page',
                                page: pageData.publication.staticPage,
                                publication: pageData.publication,
                            },
                            revalidate: 1,
                        }];
                }
                return [2 /*return*/, {
                        notFound: true,
                        revalidate: 1,
                    }];
        }
    });
}); };
exports.getStaticProps = getStaticProps;
var getStaticPaths = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, postSlugs;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, graphql_request_1.default)(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT, graphql_1.SlugPostsByPublicationDocument, {
                    first: 10,
                    host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                })];
            case 1:
                data = _c.sent();
                postSlugs = ((_b = (_a = data.publication) === null || _a === void 0 ? void 0 : _a.posts.edges) !== null && _b !== void 0 ? _b : []).map(function (edge) { return edge.node.slug; });
                return [2 /*return*/, {
                        paths: postSlugs.map(function (slug) {
                            return {
                                params: {
                                    slug: slug,
                                },
                            };
                        }),
                        fallback: 'blocking',
                    }];
        }
    });
}); };
exports.getStaticPaths = getStaticPaths;
