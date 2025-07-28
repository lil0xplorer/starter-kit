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
exports.getServerSideProps = void 0;
exports.default = Post;
var head_1 = require("next/head");
var tailwind_merge_1 = require("tailwind-merge");
var react_1 = require("react");
var urql_1 = require("urql");
var next_urql_1 = require("next-urql");
var appContext_1 = require("../../components/contexts/appContext");
var header_1 = require("../../components/header");
var layout_1 = require("../../components/layout");
var graphql_1 = require("../../generated/graphql");
var ExternalLinkSVG_1 = require("../../components/icons/svgs/ExternalLinkSVG");
var client_1 = require("../../lib/api/client");
var publication_posts_1 = require("../../components/publication-posts");
var publication_footer_1 = require("../../components/publication-footer");
var INITIAL_LIMIT = 6;
function Post(_a) {
    var _b, _c;
    var publication = _a.publication, posts = _a.posts, tag = _a.tag, slug = _a.slug, currentMenuId = _a.currentMenuId;
    var title = "#".concat(tag.name, " - ").concat(publication.title);
    var _d = (0, react_1.useState)(null), after = _d[0], setAfter = _d[1];
    var _e = (0, urql_1.useQuery)({
        query: graphql_1.TagInitialDocument,
        variables: { host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST, slug: slug, first: INITIAL_LIMIT, after: after },
        requestPolicy: 'cache-first',
    })[0], data = _e.data, fetching = _e.fetching;
    var postData = ((_b = data === null || data === void 0 ? void 0 : data.publication) === null || _b === void 0 ? void 0 : _b.posts) || posts;
    var fetchedOnce = postData.edges.length > INITIAL_LIMIT;
    var fetchMore = function () {
        if (postData.pageInfo.hasNextPage) {
            setAfter(postData.edges[postData.edges.length - 1].cursor);
        }
    };
    return (<appContext_1.AppProvider publication={publication}>
			<layout_1.Layout>
				<head_1.default>
					<title>{title}</title>
				</head_1.default>
				<header_1.Header currentMenuId={currentMenuId} isHome={false}/>
				<div className={(0, tailwind_merge_1.twJoin)('blog-content-area feed-width', 'mx-auto md:w-2/3', !!((_c = publication.about) === null || _c === void 0 ? void 0 : _c.html) && 'mt-12')}>
					<div className={(0, tailwind_merge_1.twJoin)('blog-series-card mt-12 mb-16', publication.preferences.layout === 'grid' ? 'px-4 lg:px-8' : 'px-4 lg:px-16')}>
						<div className="flex w-full min-w-0 flex-col flex-wrap items-center md:flex-row xl:flex-nowrap">
						<div className="mb-5 w-full min-w-0 xl:mb-0 xl:flex-1 xl:pr-8">
							<span className="blog-series-label mb-2 font-semibold uppercase tracking-tight text-slate-600 dark:text-slate-400">
							Tag
							</span>
							<div className="truncate ">
							<h1 className="blog-series-title mb-2 pb-px font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
								{tag.name}
							</h1>
							<p className="text-lg text-slate-600 dark:text-slate-400">#{tag.slug}</p>
							</div>
						</div>
						{tag && (<div className="flex w-full flex-col items-start xl:w-auto xl:items-end xl:text-right">
							<a className="mb-2 flex flex-row items-center whitespace-nowrap rounded-lg border bg-white px-4 py-2 font-medium text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700" href={"https://hashnode.com/n/".concat(tag.slug)} aria-label="See more articles from tag on Hashnode" target="_Blank" rel="noopener">
								<span>More content</span>
								<ExternalLinkSVG_1.default className="ml-1 h-4 w-4 fill-current"/>
							</a>
							<p className="text-sm text-slate-700 dark:text-slate-400">Read more stories on Hashnode</p>
						</div>)}
						</div>
					</div>
					{posts.edges.length > 0 && (<div className="my-10 flex flex-col items-center justify-center">
						<hr className="w-full border-t dark:border-slate-800"/>
						<p className="-mt-5 bg-white p-2 font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
							Articles with this tag
						</p>
						</div>)}
					<publication_posts_1.default publication={publication} posts={postData} fetchMore={fetchMore} fetchedOnce={fetchedOnce} fetching={fetching}/>{' '}
				</div>
				<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>
			</layout_1.Layout>
		</appContext_1.AppProvider>);
}
var getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, res, query, resolvedUrl, resolvedPath, queryHost, ssrCache, urqlClient, currentMenu, host, slug, data, _a, publication, tag, posts, menu, i, menuItem, _b, pathname, menuItemHost, isLinkOnSameDomain, pathnameMatches;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                req = ctx.req, res = ctx.res, query = ctx.query;
                resolvedUrl = ctx.resolvedUrl;
                resolvedPath = resolvedUrl.split('?')[0];
                queryHost = query["x-host"];
                ssrCache = (0, client_1.createSSRExchange)();
                urqlClient = (0, next_urql_1.initUrqlClient)((0, client_1.getUrqlClientConfig)(ssrCache), false);
                currentMenu = '';
                host = queryHost || req.headers.host;
                slug = query.slug;
                return [4 /*yield*/, urqlClient
                        .query(graphql_1.TagInitialDocument, {
                        host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                        slug: slug,
                        first: INITIAL_LIMIT, after: null
                    }, {
                        fetchOptions: {
                            headers: (0, client_1.createHeaders)({ byPassCache: false }),
                        },
                        requestPolicy: 'network-only',
                    })
                        .toPromise()];
            case 1:
                data = (_c.sent()).data;
                _a = data || {}, publication = _a.publication, tag = _a.tag;
                if (!publication || !tag) {
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                posts = (publication || {}).posts;
                if (!posts || posts.edges.length === 0) {
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                menu = publication.preferences.navbarItems || [];
                for (i = 0; i < menu.length; i++) {
                    menuItem = menu[i];
                    if (menuItem.type === 'link') {
                        _b = new URL(menuItem.url), pathname = _b.pathname, menuItemHost = _b.host;
                        isLinkOnSameDomain = menuItemHost === host;
                        pathnameMatches = resolvedPath === pathname;
                        if (pathnameMatches && isLinkOnSameDomain) {
                            currentMenu = menuItem.id;
                            break;
                        }
                    }
                }
                return [2 /*return*/, {
                        props: {
                            publication: publication,
                            posts: posts,
                            tag: tag,
                            slug: slug,
                            currentMenuId: currentMenu
                        },
                    }];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
