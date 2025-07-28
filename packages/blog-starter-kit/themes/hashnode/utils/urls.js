"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDraftPreviewUrl = exports.createPostUrl = exports.createPublicationOrigin = exports.getAppUrl = exports.publicationDomainNames = exports.protocol = void 0;
exports.getSingleQueryParam = getSingleQueryParam;
/**
 * Gets the first query param value from a query object by its key.
 */
var hashnodeEnv = process.env.NEXT_PUBLIC_HASHNODE_ENV;
var isDevEnv = hashnodeEnv === 'development';
var isStagingEnv = hashnodeEnv === 'staging' || hashnodeEnv === 'test';
exports.protocol = isDevEnv ? 'http://' : 'https://';
var isValidPublicationDomainNamesKey = function (key) {
    return key in exports.publicationDomainNames;
};
exports.publicationDomainNames = {
    development: 'app.localhost',
    staging: 'hashnode.net',
    test: 'hashnode.net',
    production: 'hashnode.dev',
};
function getSingleQueryParam(query, key) {
    var value = query[key];
    return Array.isArray(value) ? value[0] : value;
}
var getAppUrl = function () {
    var url;
    switch (hashnodeEnv) {
        case 'development':
            url = 'http://localhost:8080';
            break;
        case 'test':
        case 'staging':
            url = 'https://hashnode.xyz';
            break;
        case 'production':
        default:
            url = 'https://hashnode.com';
            break;
    }
    return url;
};
exports.getAppUrl = getAppUrl;
/**
* Creates the origin address for a publication.
*
* @example
* createPublicationHostName({ username: 'myusername' })
* // returns 'https://myusername.hashnode.dev'
*/
var createPublicationOrigin = function (publication) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var domain = (_b = (_a = publication.domainInfo.domain) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : '';
    var username = (_c = publication.domainInfo.hashnodeSubdomain) !== null && _c !== void 0 ? _c : '';
    var domainStatus = {
        ready: (_e = (_d = publication.domainInfo.domain) === null || _d === void 0 ? void 0 : _d.ready) !== null && _e !== void 0 ? _e : undefined,
        certIssued: (_h = (_g = (_f = publication.domainInfo) === null || _f === void 0 ? void 0 : _f.domain) === null || _g === void 0 ? void 0 : _g.ready) !== null && _h !== void 0 ? _h : undefined,
    };
    if (!publication || (!domain && !username)) {
        // using the hashnode domain as a fallback in order to prevent errors
        return (0, exports.getAppUrl)();
    }
    var hasReadyDomain = !!domain && !!(domainStatus === null || domainStatus === void 0 ? void 0 : domainStatus.ready);
    // always use prod as default to make sure prod works
    var subDomain = hasReadyDomain ? '' : "".concat(username, ".");
    if (isDevEnv || isStagingEnv) {
        subDomain = "".concat(username, ".");
    }
    var domainName = hasReadyDomain ? domain : exports.publicationDomainNames.production;
    if ((isDevEnv || isStagingEnv) && isValidPublicationDomainNamesKey(hashnodeEnv)) {
        domainName = exports.publicationDomainNames[hashnodeEnv];
    }
    return "".concat(exports.protocol).concat(subDomain).concat(domainName);
};
exports.createPublicationOrigin = createPublicationOrigin;
var createPostUrl = function (_a, // TODO: legacyPublication type needs to be fixed
publication) {
    var slug = _a.slug, cuid = _a.cuid, partOfPublication = _a.partOfPublication;
    // for legacy purposes as it is not possible to create a post without a publication since 2022-08
    if (!partOfPublication || !publication) {
        // we always use absolute URLs since we are on users' domains
        return "".concat((0, exports.getAppUrl)(), "/post/").concat(slug, "-").concat(cuid);
    }
    var origin = (0, exports.createPublicationOrigin)(publication);
    var isSimpleUrl = publication.urlPattern === 'SIMPLE';
    var pathname = isSimpleUrl ? "/".concat(slug) : "/".concat(slug, "-").concat(cuid);
    return "".concat(origin).concat(pathname);
};
exports.createPostUrl = createPostUrl;
var createDraftPreviewUrl = function (id) { return "".concat((0, exports.getAppUrl)(), "/preview/").concat(id); };
exports.createDraftPreviewUrl = createDraftPreviewUrl;
