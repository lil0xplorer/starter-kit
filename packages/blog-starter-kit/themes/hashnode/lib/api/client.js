"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSSRExchange = exports.getUrqlClientConfig = void 0;
exports.createHeaders = createHeaders;
var exchange_graphcache_1 = require("@urql/exchange-graphcache");
var extras_1 = require("@urql/exchange-graphcache/extras");
var urql_1 = require("urql");
var isServerSide = typeof window === 'undefined';
/**
 * getUrqlClientConfig is used along with `withUrqlClient` and `initUrqlClient` to create a new urql client instance
 * We need the ability to pass ssrExchanges created inside gSSP to
 * create a new client instance for each request to avoid leaking data between requests
 * @param ssrExchange
 * @returns new ClientConfig
 */
var getUrqlClientConfig = function (ssrExchange) { return ({
    url: process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
    exchanges: [
        (0, exchange_graphcache_1.cacheExchange)({
            // relayPagination() keeps previous results in the cache; ⚠️ this leads to unexpected results if used in API routes due to possible different execution environments
            resolvers: {
                Publication: {
                    posts: (0, extras_1.relayPagination)(),
                },
                Series: {
                    posts: (0, extras_1.relayPagination)(),
                },
                Query: {
                    searchPostsOfPublication: (0, extras_1.relayPagination)(),
                },
            },
            // NEEDED: https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#custom-keys-and-non-keyable-entities
            keys: {
                DarkModePreferences: function () { return null; },
                Preferences: function () { return null; },
                CustomCSSPreferences: function () { return null; },
                PostCoverImage: function () { return null; },
                DomainStatus: function () { return null; },
                PublicationNavbarItem: function () { return null; },
                PublicationIntegrations: function () { return null; },
                PublicationLinks: function () { return null; },
                DomainInfo: function () { return null; },
                PagesPreferences: function () { return null; },
                PublicationFeatures: function () { return null; },
                OpenGraphMetaData: function () { return null; },
                PresignedPost: function () { return null; },
                AboutPublication: function () { return null; },
                NewsletterFeature: function () { return null; },
                ViewCountFeature: function () { return null; },
                ReadTimeFeature: function () { return null; },
                Content: function () { return null; },
                AudioUrls: function () { return null; },
                AudioBlogFeature: function () { return null; },
                TextSelectionSharerFeature: function () { return null; },
                CustomCSSFeature: function () { return null; },
                CustomCSS: function () { return null; },
                StripeConfiguration: function () { return null; },
                RedirectionRule: function () { return null; },
            },
        }),
        ssrExchange,
        (0, urql_1.errorExchange)({
            onError: function (error) {
                console.error('GQL error occurred', { error: error });
            },
        }),
        urql_1.fetchExchange,
    ],
}); };
exports.getUrqlClientConfig = getUrqlClientConfig;
// createSSRExchange is used to create a new ssr exchange instance
// which is then passed `getUrqlClientConfig`
// it will discard initial state when invoked inside gSSP
var createSSRExchange = function () {
    return (0, urql_1.ssrExchange)({
        isClient: !isServerSide,
        initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
    });
};
exports.createSSRExchange = createSSRExchange;
function createHeaders(options) {
    var headers = {
        'hn-trace-app': 'blogs',
    };
    if (options === null || options === void 0 ? void 0 : options.byPassCache) {
        headers['hn-stellate-bypass-cache'] = '1';
    }
    if (isServerSide) {
        if (options === null || options === void 0 ? void 0 : options.cookies) {
            headers.cookie = options.cookies;
        }
    }
    return headers;
}
