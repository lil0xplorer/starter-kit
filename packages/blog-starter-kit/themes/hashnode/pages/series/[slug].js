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
exports.default = Series;
var image_1 = require("@starter-kit/utils/image");
var next_urql_1 = require("next-urql");
var head_1 = require("next/head");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var urql_1 = require("urql");
var appContext_1 = require("../../components/contexts/appContext");
var header_1 = require("../../components/header");
var layout_1 = require("../../components/layout");
var publication_footer_1 = require("../../components/publication-footer");
var publication_posts_1 = require("../../components/publication-posts");
var graphql_1 = require("../../generated/graphql");
var client_1 = require("../../lib/api/client");
var INITIAL_LIMIT = 6;
function Series(_a) {
    var _b, _c, _d, _e, _f;
    var publication = _a.publication, series = _a.series, slug = _a.slug, currentMenuId = _a.currentMenuId;
    var title = "".concat(series.name, " - ").concat(publication.title);
    var _g = (0, react_1.useState)(null), after = _g[0], setAfter = _g[1];
    var _h = (0, urql_1.useQuery)({
        query: graphql_1.SeriesPageInitialDocument,
        variables: {
            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
            slug: slug,
            first: INITIAL_LIMIT,
            after: after,
        },
        requestPolicy: 'cache-first',
    })[0], data = _h.data, fetching = _h.fetching;
    var postData = (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.publication) === null || _b === void 0 ? void 0 : _b.series) === null || _c === void 0 ? void 0 : _c.posts) !== null && _d !== void 0 ? _d : {
        edges: [],
        pageInfo: { hasNextPage: false },
    };
    var posts = postData.edges.map(function (edge) { return edge.node; });
    var fetchedOnce = postData.edges.length > INITIAL_LIMIT;
    var fetchMore = function () {
        if (postData.pageInfo.hasNextPage) {
            setAfter(postData.edges[postData.edges.length - 1].cursor);
        }
    };
    return (<appContext_1.AppProvider publication={publication} series={series}>
			<layout_1.Layout>
				<head_1.default>
					<title>{title}</title>
				</head_1.default>
				<header_1.Header currentMenuId={currentMenuId} isHome={false}/>
				<div className={(0, tailwind_merge_1.twJoin)('blog-content-area feed-width mx-auto md:w-2/3', !!((_e = publication.about) === null || _e === void 0 ? void 0 : _e.html) && 'mt-12')}>
					<div>
						<div className={(0, tailwind_merge_1.twJoin)('blog-series-card mb-16 mt-12', publication.preferences.layout === 'grid' ? 'px-4 lg:px-8' : 'px-4 lg:px-16')}>
							<div className="flex flex-col-reverse flex-wrap items-start md:flex-row">
								<div className={(0, tailwind_merge_1.twJoin)('pr-8', series.coverImage ? 'w-full md:w-1/2' : 'w-full')}>
									<span className="blog-series-label mb-2 font-semibold uppercase tracking-tight text-slate-600 dark:text-slate-400">
										Series
									</span>
									<h1 className="blog-series-title font-heading mb-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl xl:text-5xl">
										{series.name}
									</h1>
									{((_f = series.description) === null || _f === void 0 ? void 0 : _f.html) && (<div className="blog-series-desc prose prose-lg dark:prose-dark mb-5" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: series.description.html }}/>)}
								</div>
								{series.coverImage && (<div className="blog-series-cover-container mb-5 w-full md:mb-0 md:w-1/2">
										{/* custom-style */}
										<div className="blog-series-cover h-32 w-full rounded-lg border bg-cover bg-center bg-no-repeat dark:border-slate-800" style={{
                backgroundImage: "url('".concat((0, image_1.resizeImage)(series.coverImage, {
                    w: 800,
                    c: 'thumb',
                }), "')"),
                width: '100%',
                paddingTop: '52.5%',
            }}/>
									</div>)}
							</div>
						</div>

						{posts.length === 0 && publication.isTeam ? (<div className="mb-6 flex w-full flex-col items-center rounded border-2 border-dashed p-6 dark:border-slate-800">
								<img className="mb-5 block w-56" alt="No posts" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1584017401345/LrrwlBZC0.png"/>
								<p className="text-2xl font-bold leading-snug tracking-tight text-slate-700 dark:text-slate-400">
									No posts yet
								</p>
							</div>) : null}

						{posts.length > 0 && (<div className="my-10 flex flex-col items-center justify-center">
								<hr className="w-full border-t dark:border-slate-800"/>
								<p className="-mt-5 bg-white p-2 font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
									Articles in this series
								</p>
							</div>)}

						<publication_posts_1.default publication={publication} posts={postData} fetchMore={fetchMore} fetchedOnce={fetchedOnce} fetching={fetching}/>
					</div>
				</div>
				<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>
			</layout_1.Layout>
		</appContext_1.AppProvider>);
}
var getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, query, resolvedUrl, params, slug, requestHost, resolvedPath, ssrCache, urqlClient, rawCurrentMenuId, publicationInfo, publication, series, menu, i, menuItem, _a, pathname, host, isLinkOnSameDomain, pathnameMatches;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req = ctx.req, query = ctx.query, resolvedUrl = ctx.resolvedUrl, params = ctx.params;
                slug = params.slug;
                requestHost = query['x-host'] || req.headers.host;
                resolvedPath = resolvedUrl.split('?')[0];
                ssrCache = (0, client_1.createSSRExchange)();
                urqlClient = (0, next_urql_1.initUrqlClient)((0, client_1.getUrqlClientConfig)(ssrCache), false);
                rawCurrentMenuId = '';
                return [4 /*yield*/, urqlClient
                        .query(graphql_1.SeriesPageInitialDocument, {
                        host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                        slug: slug,
                        first: INITIAL_LIMIT,
                        after: null,
                    }, {
                        fetchOptions: {
                            headers: (0, client_1.createHeaders)({ byPassCache: false }),
                        },
                        requestPolicy: 'network-only',
                    })
                        .toPromise()];
            case 1:
                publicationInfo = _b.sent();
                publication = (publicationInfo.data || {}).publication;
                if (!publication) {
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                series = (publication || {}).series;
                if (!series) {
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                if (publication && series) {
                    menu = publication.preferences.navbarItems || [];
                    for (i = 0; i < menu.length; i++) {
                        menuItem = menu[i];
                        if (menuItem.type === 'series' && menuItem.series && menuItem.series.id === series.id) {
                            rawCurrentMenuId = menuItem.id;
                            break;
                        }
                        // check for links that could be mapped to the series page
                        if (menuItem.type === 'link' && menuItem.url && !rawCurrentMenuId) {
                            _a = new URL(menuItem.url), pathname = _a.pathname, host = _a.host;
                            isLinkOnSameDomain = requestHost === host;
                            pathnameMatches = resolvedPath === pathname;
                            if (pathnameMatches && isLinkOnSameDomain) {
                                rawCurrentMenuId = menuItem.id.toString();
                                break;
                            }
                        }
                    }
                }
                return [2 /*return*/, {
                        props: {
                            publication: publication,
                            series: series,
                            slug: slug,
                            urqlState: ssrCache.extractData(),
                            initialLimit: INITIAL_LIMIT,
                            currentMenuId: rawCurrentMenuId,
                        },
                    }];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
