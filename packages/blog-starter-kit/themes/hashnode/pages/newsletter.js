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
var custom_image_1 = require("../components/custom-image");
var publication_subscribe_standout_1 = require("../components/publication-subscribe-standout");
var image_1 = require("../utils/image");
var appContext_1 = require("../components/contexts/appContext");
var magazine_blog_post_preview_1 = require("../components/magazine-blog-post-preview");
var graphql_1 = require("../generated/graphql");
var client_1 = require("../lib/api/client");
var next_axiom_1 = require("next-axiom");
var next_urql_1 = require("next-urql");
var header_1 = require("../components/header");
var publication_footer_1 = require("../components/publication-footer");
var Newsletter = function (props) {
    var recent3Posts = props.recent3Posts, publication = props.publication, currentMenuId = props.currentMenuId;
    var profile = publication.author;
    var recentPosts = recent3Posts.map(function (post) { return (<magazine_blog_post_preview_1.default key={post.id} post={post} publication={publication}/>); });
    var originalImageSrc = publication.favicon ||
        (profile === null || profile === void 0 ? void 0 : profile.profilePicture) ||
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1600792675173/rY-APy9Fc.png';
    var publicationImageUrl = (0, image_1.resizeImage)(originalImageSrc, { w: 400, h: 400, c: 'face' });
    return (<appContext_1.AppProvider publication={publication}>
      <header_1.Header currentMenuId={currentMenuId} isHome={false}/>
      <div className="blog-page-area mx-auto min-h-screen px-4 pb-8 pt-20 md:px-10 md:pt-20">
        <div className="blog-page-card container relative z-30 mx-auto grid grid-flow-row grid-cols-8 pb-0 2xl:grid-cols-10">
          <div className="col-span-full">
            <span className="mx-auto -mb-10 block h-32 w-32 overflow-hidden rounded-full">
              <custom_image_1.default originalSrc={originalImageSrc} src={publicationImageUrl} alt={publication.title || (profile === null || profile === void 0 ? void 0 : profile.name)} className="block w-full" width={400} height={400} priority layout="responsive"/>
            </span>
            <publication_subscribe_standout_1.default />
          </div>
        </div>
        {recent3Posts && recent3Posts.length > 0 && (<>
            <div className="blog-more-articles mt-10">
              <h3 className="mb-3 text-center font-heading text-xl font-bold text-slate-900 dark:text-slate-50">
                Recent articles
              </h3>
            </div>
            <div className="blog-articles-container container mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-2 lg:grid-cols-3 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
              {recentPosts}
            </div>
          </>)}
      </div>
      {publication ? (<publication_footer_1.default authorName={publication.author.name} title={publication.title} imprint={publication.imprint} disableFooterBranding={publication.preferences.disableFooterBranding} isTeam={publication.isTeam} logo={publication.preferences.logo} darkMode={publication.preferences.darkMode}/>) : null}
    </appContext_1.AppProvider>);
};
var getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, res, query, host, log, ssrCache, urqlClient, gqlVariables, publicationInfo, publication, isDarkTheme;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                req = ctx.req, res = ctx.res, query = ctx.query;
                host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
                log = next_axiom_1.log.with({ host: host });
                ssrCache = (0, client_1.createSSRExchange)();
                urqlClient = (0, next_urql_1.initUrqlClient)((0, client_1.getUrqlClientConfig)(ssrCache), false);
                gqlVariables = {
                    host: host,
                    slug: 'newsletter',
                };
                return [4 /*yield*/, urqlClient
                        .query(graphql_1.NewsletterDocument, gqlVariables, {
                        fetchOptions: {
                            headers: (0, client_1.createHeaders)(),
                        },
                        requestPolicy: 'network-only',
                    })
                        .toPromise()];
            case 1:
                publicationInfo = _d.sent();
                if (publicationInfo.error) {
                    log.error('Error while fetching publication info', {
                        variables: gqlVariables,
                        error: publicationInfo.error,
                    });
                    throw publicationInfo.error;
                }
                if (!((_a = publicationInfo.data) === null || _a === void 0 ? void 0 : _a.publication)) {
                    log.error('Publication not found fetching publication info; returning 404', {
                        variables: gqlVariables,
                    });
                    res.setHeader('cache-control', 's-maxage=3, stale-while-revalidate');
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                publication = publicationInfo.data.publication;
                if (!((_b = publication.preferences.enabledPages) === null || _b === void 0 ? void 0 : _b.newsletter)) {
                    return [2 /*return*/, {
                            notFound: true,
                        }];
                }
                if (process.env.PREVIEW_MODE) {
                    res.setHeader('cache-control', 'no-cache');
                }
                res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
                isDarkTheme = typeof query.isDarkTheme === 'undefined'
                    ? !!((_c = publication.preferences.darkMode) === null || _c === void 0 ? void 0 : _c.enabled)
                    : query.isDarkTheme === 'true';
                // @ts-ignore
                req.isDarkTheme = isDarkTheme;
                return [2 /*return*/, {
                        props: {
                            publication: publication,
                            recent3Posts: publication.recentPosts.edges.map(function (edge) { return edge.node; }),
                            currentMenuId: 'newsletter'
                        },
                    }];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
exports.default = Newsletter;
