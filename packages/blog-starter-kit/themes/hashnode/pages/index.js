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
exports.getStaticProps = void 0;
exports.default = Index;
var next_urql_1 = require("next-urql");
var head_1 = require("next/head");
var image_1 = require("next/legacy/image");
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var urql_1 = require("urql");
var addPublicationJsonLd_1 = require("@starter-kit/utils/seo/addPublicationJsonLd");
var og_1 = require("@starter-kit/utils/social/og");
var appContext_1 = require("../components/contexts/appContext");
var header_1 = require("../components/header");
var layout_1 = require("../components/layout");
var modern_layout_posts_1 = require("../components/modern-layout-posts");
var graphql_1 = require("../generated/graphql");
var client_1 = require("../lib/api/client");
var features_posts_1 = require("../components/features-posts");
var publication_footer_1 = require("../components/publication-footer");
var publication_meta_1 = require("../components/publication-meta");
var image_2 = require("../utils/image");
var REVALIDATION_INTERVAL_POST_VIEWS_ACTIVE = 60 * 60; // 1 hour
var REVALIDATION_INTERVAL = 60 * 60 * 24 * 30; // 1 month
var NoPostsImage = function (_a) {
    var _b = _a.alt, alt = _b === void 0 ? '' : _b;
    return (<image_1.default alt={alt} height={500} width={500} src={(0, image_2.resizeImage)('https://cdn.hashnode.com/res/hashnode/image/upload/v1625676910594/d1jtXmfQC.png?auto=compress', { h: 800, w: 800, c: 'thumb' })}/>);
};
function Index(props) {
    var _this = this;
    var _a;
    var host = props.host, publication = props.publication, initialLimit = props.initialLimit;
    var ssrCache = (0, client_1.createSSRExchange)();
    var urqlClient = (0, next_urql_1.initUrqlClient)((0, client_1.getUrqlClientConfig)(ssrCache), false); // TODO: Check why is urqlClient not automatically being passed in props. Ideally, since we are using WithUrqlClient HOC, it should automatically come
    var _b = (0, react_1.useState)(false), fetching = _b[0], setFetching = _b[1];
    var author = publication.author, preferences = publication.preferences, pinnedPost = publication.pinnedPost;
    var dynamicLimit = preferences.layout === 'magazine' ? 12 : 6;
    var data = (0, urql_1.useQuery)({
        query: graphql_1.HomePagePostsDocument,
        variables: { host: host, first: initialLimit, filter: { excludePinnedPost: !!pinnedPost } },
    })[0].data;
    var posts = (data === null || data === void 0 ? void 0 : data.publication).posts;
    var fetchedOnce = posts.edges.length > initialLimit;
    var postsToBeRendered = {
        edges: pinnedPost
            ? [{ node: pinnedPost, cursor: "".concat(pinnedPost.id, "_").concat(pinnedPost.publishedAt) }].concat(posts.edges)
            : posts.edges,
        pageInfo: posts.pageInfo,
    };
    var fetchMore = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setFetching(true);
                    return [4 /*yield*/, urqlClient
                            .query(graphql_1.HomePagePostsDocument, {
                            host: host,
                            first: dynamicLimit,
                            after: posts.pageInfo.endCursor,
                            filter: { excludePinnedPost: !!pinnedPost },
                        })
                            .toPromise()
                            .finally(function () {
                            setFetching(false);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<appContext_1.AppProvider publication={publication}>
			<layout_1.Layout>
				<head_1.default>
					<title>
						{publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}
					</title>
					<meta name="description" content={publication.descriptionSEO || publication.title || "".concat(publication.author.name, "'s Blog")}/>
					<meta property="twitter:card" content="summary_large_image"/>
					<meta property="twitter:title" content={publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}/>
					<meta property="twitter:description" content={publication.descriptionSEO || publication.title || "".concat(publication.author.name, "'s Blog")}/>
					<meta property="og:image" content={publication.ogMetaData.image || (0, og_1.getAutogeneratedPublicationOG)(publication)}/>
					<meta property="twitter:image" content={publication.ogMetaData.image || (0, og_1.getAutogeneratedPublicationOG)(publication)}/>
					<script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify((0, addPublicationJsonLd_1.addPublicationJsonLd)(publication)),
        }}/>
				</head_1.default>
				<header_1.Header isHome={true}/>
				<div>
					{postsToBeRendered.edges.length > 0 ? (<features_posts_1.default posts={postsToBeRendered.edges.map(function (p) { return p.node; }).slice(0, 3)} publication={publication}/>) : null}

					{((_a = publication.about) === null || _a === void 0 ? void 0 : _a.html) ? (<div className="blog-author-container border-b dark:border-slate-800">
							<div className={(0, tailwind_merge_1.twJoin)('blog-author-area feed-width mx-auto md:w-3/4 lg:w-2/3', preferences.layout === 'grid' ? '' : 'px-4 lg:px-8')}>
								<publication_meta_1.default author={author} aboutHTML={publication.about.html} isTeam={publication.isTeam}/>
							</div>
						</div>) : null}

					<div className="blog-content-area feed-width mx-auto md:w-2/3">
						<div>
							{postsToBeRendered.edges.length === 0 ? (<>
									<div className="min-h-30 my-10 flex w-full flex-col items-center px-6 dark:border-slate-800">
										<div className="block">
											<NoPostsImage alt="No Posts"/>
										</div>
									</div>
								</>) : null}
						</div>
					</div>

					{postsToBeRendered.edges.length > 3 ? (<modern_layout_posts_1.default publication={publication} posts={postsToBeRendered} fetchMore={fetchMore} fetchedOnce={fetchedOnce} fetching={fetching}/>) : null}
				</div>
				{publication ? (<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>) : null}
			</layout_1.Layout>
		</appContext_1.AppProvider>);
}
var getStaticProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ssrCache, urqlClient, host, homePageInitialQueryVariables, publicationInfo, publication, subtractValue, initialLimit, homePagePostsVariables, homePagePostsResponse;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                ssrCache = (0, client_1.createSSRExchange)();
                urqlClient = (0, next_urql_1.initUrqlClient)((0, client_1.getUrqlClientConfig)(ssrCache), false);
                host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
                homePageInitialQueryVariables = {
                    host: host,
                };
                return [4 /*yield*/, urqlClient
                        .query(graphql_1.HomePageInitialDocument, homePageInitialQueryVariables, {
                        fetchOptions: {
                            headers: (0, client_1.createHeaders)({ byPassCache: false }),
                        },
                        requestPolicy: 'network-only',
                    })
                        .toPromise()];
            case 1:
                publicationInfo = _c.sent();
                if (publicationInfo.error) {
                    console.error('Error while fetching publication info', {
                        variables: homePageInitialQueryVariables,
                        error: publicationInfo.error,
                    });
                    throw publicationInfo.error;
                }
                if (!((_a = publicationInfo.data) === null || _a === void 0 ? void 0 : _a.publication)) {
                    console.error('Publication not found fetching publication info; returning 404', {
                        variables: homePageInitialQueryVariables,
                    });
                    return [2 /*return*/, {
                            notFound: true,
                            revalidate: REVALIDATION_INTERVAL,
                        }];
                }
                publication = publicationInfo.data.publication;
                subtractValue = publication.pinnedPost ? 1 : 0;
                initialLimit = publication.preferences.layout === 'magazine' ? 12 - subtractValue : 6 - subtractValue;
                homePagePostsVariables = {
                    host: host,
                    first: initialLimit,
                    filter: { excludePinnedPost: !!publication.pinnedPost },
                };
                return [4 /*yield*/, urqlClient
                        .query(graphql_1.HomePagePostsDocument, homePagePostsVariables, {
                        fetchOptions: {
                            headers: (0, client_1.createHeaders)({ byPassCache: false }),
                        },
                        requestPolicy: 'network-only',
                    })
                        .toPromise()];
            case 2:
                homePagePostsResponse = _c.sent();
                if (homePagePostsResponse.error) {
                    console.error('Error while fetching home page posts', {
                        error: homePagePostsResponse.error,
                        variables: homePagePostsVariables,
                    });
                    throw homePagePostsResponse.error;
                }
                if (!((_b = homePagePostsResponse.data) === null || _b === void 0 ? void 0 : _b.publication)) {
                    console.error('Publication not found fetching home page posts; returning 404', {
                        variables: homePagePostsVariables,
                    });
                    return [2 /*return*/, {
                            notFound: true,
                            revalidate: REVALIDATION_INTERVAL,
                        }];
                }
                return [2 /*return*/, {
                        props: {
                            publication: publication,
                            initialLimit: initialLimit,
                            urqlState: ssrCache.extractData(),
                            host: host,
                            isHome: true,
                        },
                        revalidate: 1,
                    }];
        }
    });
}); };
exports.getStaticProps = getStaticProps;
