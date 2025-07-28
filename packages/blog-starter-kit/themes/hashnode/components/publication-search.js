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
var react_1 = require("react");
var dayjs_1 = require("dayjs");
var DialogPrimitive = require("@radix-ui/react-dialog");
var tailwind_merge_1 = require("tailwind-merge");
var urql_1 = require("urql");
var react_waypoint_1 = require("react-waypoint");
var localizedFormat_1 = require("dayjs/plugin/localizedFormat");
var SearchSvg_1 = require("./icons/svgs/SearchSvg");
var RefreshSVG_1 = require("./icons/svgs/RefreshSVG");
var CloseSVG_1 = require("./icons/svgs/CloseSVG");
var custom_image_1 = require("./custom-image");
var graphql_1 = require("../generated/graphql");
var styles_1 = require("../utils/const/styles");
var image_1 = require("../utils/image");
var commonUtils_1 = require("../utils/commonUtils");
var images_1 = require("../utils/const/images");
var scroll_area_1 = require("./scroll-area");
dayjs_1.default.extend(localizedFormat_1.default);
var LoadingComponent = function () { return (<div className="border-b bg-white px-8 py-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700"/>
    <div className="mb-2 h-4 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-700"/>
    <div className="mb-2 h-4 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-700"/>
  </div>); };
var SearchResultsLoader = function (_a) {
    var count = _a.count;
    return (<div className="animate-pulse">
    {Array(count)
            .fill(0)
            .map(function (_, i) { return (<LoadingComponent key={i}/>); })}
  </div>);
};
var PublicationSearch = function (props) {
    var timeoutHandler;
    var publication = props.publication, toggleSearchUI = props.toggleSearchUI, triggerRef = props.triggerRef;
    var _a = (0, react_1.useState)(false), searchActive = _a[0], setSearchActive = _a[1];
    var _b = (0, react_1.useState)(null), after = _b[0], setAfter = _b[1];
    var _c = (0, react_1.useState)(false), isMounted = _c[0], setIsMounted = _c[1];
    var _d = (0, react_1.useState)(''), searchKey = _d[0], setSearchKey = _d[1];
    var searchField = (0, react_1.useRef)(null);
    var _e = (0, urql_1.useQuery)({
        query: graphql_1.SearchPostsOfPublicationDocument,
        variables: {
            first: searchKey.length > 0 ? 10 : 0,
            after: after,
            filter: {
                publicationId: publication.id,
                query: searchKey,
            },
        },
        // don't fire query until user types atleast once
        pause: !searchActive,
    })[0], _publicationSearchResults = _e.data, fetching = _e.fetching, error = _e.error, operation = _e.operation;
    var searchPostsOfPublication = (_publicationSearchResults || {
        searchPostsOfPublication: {
            edges: [],
            pageInfo: {
                hasNextPage: false,
                endCursor: null,
            },
        },
    }).searchPostsOfPublication;
    var pageInfo = searchPostsOfPublication.pageInfo, edges = searchPostsOfPublication.edges;
    var publicationSearchResults = edges;
    var isInputEmpty = searchKey.length === 0;
    var isResultEmpty = !isInputEmpty && publicationSearchResults.length === 0;
    var isLoading = fetching && !isInputEmpty;
    var isLoadingMore = fetching && !isInputEmpty && !isResultEmpty;
    var isEndOfFeed = !isLoading && !isResultEmpty && !isInputEmpty && !pageInfo.hasNextPage;
    var shouldRenderResult = (operation === null || operation === void 0 ? void 0 : operation.variables.filter.query) === searchKey && !isInputEmpty;
    // eslint-disable-next-line no-console
    if (error)
        console.log(error);
    var handleSearch = function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, isEmpty;
        var _a;
        return __generator(this, function (_b) {
            if (!searchField || !searchField.current) {
                return [2 /*return*/];
            }
            value = searchField === null || searchField === void 0 ? void 0 : searchField.current.value;
            isEmpty = value.trim().length === 0;
            if (!isEmpty) {
                if (searchField && searchField.current) {
                    setSearchKey((_a = searchField.current) === null || _a === void 0 ? void 0 : _a.value);
                    setAfter(null);
                }
                if (!searchActive)
                    setSearchActive(true);
            }
            return [2 /*return*/];
        });
    }); };
    var onKeywordChange = function () {
        if (searchActive && searchField && searchField.current && searchField.current.value.trim().length === 0) {
            setSearchActive(false);
            setSearchKey('');
            setAfter(null);
            return;
        }
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(handleSearch, 300);
    };
    var resetResults = function () {
        setSearchActive(false);
        setAfter(null);
        setSearchKey('');
        if (searchField.current) {
            searchField.current.value = '';
        }
    };
    (0, react_1.useEffect)(function () {
        setIsMounted(true);
    }, []);
    var fetchMore = function () {
        var _a;
        setAfter(((_a = searchPostsOfPublication === null || searchPostsOfPublication === void 0 ? void 0 : searchPostsOfPublication.pageInfo) === null || _a === void 0 ? void 0 : _a.endCursor) || null);
    };
    return (<DialogPrimitive.Root open>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={(0, tailwind_merge_1.twJoin)('fixed inset-0 z-50 flex flex-row items-start justify-center bg-slate-900 opacity-0 transition-opacity duration-300 ease-out dark:bg-slate-600', isMounted && 'opacity-50')}/>
        <DialogPrimitive.Content onEscapeKeyDown={function () {
            (0, commonUtils_1.blurActiveFocus)();
            toggleSearchUI();
            (0, commonUtils_1.returnFocusToElement)(triggerRef);
        }} onCloseAutoFocus={function () { return (0, commonUtils_1.returnFocusToElement)(triggerRef); }} onPointerDownOutside={function () {
            (0, commonUtils_1.blurActiveFocus)();
            toggleSearchUI();
        }} className={(0, tailwind_merge_1.twJoin)('fixed left-0 right-0 top-0 z-50 mx-2 mt-32 flex max-w-[1200px] flex-col items-center overflow-hidden rounded-2xl border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900 md:mx-8 lg:mx-auto lg:w-3/4 xl:w-2/3', (isInputEmpty || isResultEmpty) && !isLoading ? 'md:max-h-50 max-h-40' : 'h-2/3')}>
          <div className="relative mb-2 w-full md:mb-4">
            <input ref={searchField} onChange={onKeywordChange} type="text" className={(0, tailwind_merge_1.twMerge)(styles_1.inputText, 'rounded-full px-6 py-3')} placeholder={fetching ? 'Searching...' : 'Start typing to search'}/>
            {fetching ? (<RefreshSVG_1.default className="absolute bottom-0 right-0 top-0 my-auto mr-16 h-5 w-5 animate-hn-spin fill-current text-slate-500 dark:text-slate-200"/>) : null}
            {searchActive ? (<button aria-label="Clear search results" type="button" className="absolute bottom-1/2 right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800" onClick={resetResults}>
                <CloseSVG_1.default className="h-5 w-5 fill-current text-slate-500 dark:text-slate-200"/>
              </button>) : null}
          </div>
          <div className="relative w-full">
            {isInputEmpty && (<div className="my-4 flex flex-row items-center justify-center text-slate-500 dark:text-slate-300">
                <SearchSvg_1.default className="mr-2.5 h-5 w-5 stroke-current"/>
                <DialogPrimitive.Title className="font-normal">Search articles from this blog</DialogPrimitive.Title>
              </div>)}
            {!isLoading && isResultEmpty ? (<div className="my-4 flex flex-row items-center justify-center text-slate-500 dark:text-slate-300">
                <SearchSvg_1.default className="mr-4 h-5 w-5 stroke-current"/>
                <p>No articles found</p>
              </div>) : null}
          </div>
          <scroll_area_1.default>
            <div className="mt-2 rounded-xl bg-white pb-10 dark:bg-slate-900 md:mt-5">
              {isLoading && isResultEmpty && <SearchResultsLoader count={4}/>}
              {shouldRenderResult &&
            publicationSearchResults.map(function (item, index) {
                var _a, _b;
                var post = item.node;
                var postURL = post.url;
                var pubOrigin = (_a = post.publication) === null || _a === void 0 ? void 0 : _a.url.replace('https://', '').replace('http://', '');
                return (<a tabIndex={0} data-testid="blog-search-result" href={postURL} key={post.id} className="block px-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:border-slate-800 dark:hover:bg-slate-800 dark:focus:bg-slate-800">
                      <div className={(0, tailwind_merge_1.twJoin)('flex flex-col items-start justify-between py-8 dark:border-slate-700 md:flex-row md:py-5', index !== publicationSearchResults.length - 1 ? 'border-b' : '')}>
                        <div className="md:mr-4">
                          <h1 className="mb-2 break-words text-2xl font-bold leading-snug tracking-tight text-slate-900 hn-break-words dark:text-slate-300">
                            {post.title}
                          </h1>
                          <div className="mb-4 flex flex-row flex-wrap items-center font-medium text-slate-500 dark:text-slate-400">
                            <p className="inline-block">{((_b = post === null || post === void 0 ? void 0 : post.author) === null || _b === void 0 ? void 0 : _b.name) || 'Anonymous'}</p>
                            <span className="mx-2 inline-block font-bold opacity-50">&middot;</span>
                            <p className="inline-block">{pubOrigin}</p>
                          </div>
                          <div className="mb-4 flex flex-row items-center text-slate-500 dark:text-slate-400">
                            <p className="inline-block">{(0, dayjs_1.default)(post.publishedAt).format('LL')}</p>
                            {post.reactionCount > 0 && (<>
                                <span className="mx-2 inline-block font-bold opacity-50">&middot;</span>
                                <p className="inline-block">
                                  {post.reactionCount} Reaction{post.reactionCount === 1 ? '' : 's'}
                                </p>
                              </>)}
                          </div>
                        </div>

                        <div className={(0, tailwind_merge_1.twJoin)('w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 md:w-64', post.coverImage && post.coverImage.url.includes('cdn.hashnode.com')
                        ? 'border dark:border-slate-800'
                        : '')}>
                          {post.coverImage && post.coverImage.url.includes('cdn.hashnode.com') ? (<custom_image_1.default originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage.url, { w: 1600, h: 840, c: 'thumb' })} width={800} height={420} layout="responsive" objectFit="contain" blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(post.coverImage.url, __assign(__assign({}, images_1.blurImageDimensions), { c: 'thumb' })))} alt={post.title}/>) : null}
                        </div>
                      </div>
                    </a>);
            })}
              {isLoadingMore && (<div className="mb-5 w-full text-2xl font-medium text-slate-500">
                  <SearchResultsLoader count={4}/>
                </div>)}
              {!fetching && !isResultEmpty && (pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.hasNextPage) && <react_waypoint_1.Waypoint onEnter={fetchMore} topOffset="-5%"/>}
              {isEndOfFeed && (<div className="self-center py-6 text-center font-heading font-semibold text-slate-700 dark:text-slate-300">
                  <p className="text-md">You&apos;ve reached the end! 👋</p>
                </div>)}
            </div>
          </scroll_area_1.default>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>);
};
exports.default = PublicationSearch;
