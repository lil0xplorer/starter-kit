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
var cuid_1 = require("cuid");
var image_1 = require("next/legacy/image");
var link_1 = require("next/link");
var tailwind_merge_1 = require("tailwind-merge");
var custom_image_1 = require("./custom-image");
var svgs_1 = require("./icons/svgs");
var commonUtils_1 = require("../utils/commonUtils");
var images_1 = require("../utils/const/images");
var image_2 = require("../utils/image");
var FeaturedPosts = function (props) {
    var publication = props.publication, posts = props.posts;
    var limit = 3;
    var padding = limit - posts.length;
    var preload = function (slug) { return function () { return __awaiter(void 0, void 0, void 0, function () {
        var nextData, buildId;
        return __generator(this, function (_a) {
            nextData = document.getElementById('__NEXT_DATA__');
            if (nextData) {
                buildId = JSON.parse(nextData.innerHTML).buildId;
                if (buildId) {
                    fetch("/_next/data/".concat(buildId, "/").concat(slug, ".json?slug=").concat(slug));
                }
            }
            return [2 /*return*/];
        });
    }); }; };
    return (<div className="blog-featured-area mx-auto border-b bg-slate-50 dark:border-slate-800 dark:bg-black">
      <div className="blog-featured-container container mx-auto grid grid-cols-1 gap-8 px-4 py-4 md:grid-flow-col md:grid-cols-2 md:grid-rows-2 xl:grid-cols-3 xl:py-10 xl:px-10 2xl:px-24 2xl:py-10">
        {posts.map(function (post, index) {
            var _a, _b, _c, _d, _e;
            var postURL = "/".concat(post.slug);
            var isFirstPost = index === 0;
            var isPinnedToBlog = ((_a = publication.pinnedPost) === null || _a === void 0 ? void 0 : _a.id) === post.id;
            if (!postURL)
                return null;
            var postCoverImageURL = (_c = (_b = post.coverImage) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : (0, commonUtils_1.getDefaultPostCoverImageUrl)();
            return (<div key={post.id} className={(0, tailwind_merge_1.twJoin)('blog-article-card col-span-1', isFirstPost ? 'md:row-span-2 xl:col-span-2' : '')}>
              <link_1.default href={postURL} onMouseOver={preload(post.slug)} onFocus={function () { return undefined; }} aria-label={"Cover photo of the article titled ".concat(post.title)} className="blog-article-card-cover mb-4 block w-full overflow-hidden rounded-lg border bg-slate-100 hover:opacity-90 dark:border-slate-800 dark:bg-slate-800">
                <custom_image_1.default className="block w-full" originalSrc={postCoverImageURL} src={(0, image_2.resizeImage)(postCoverImageURL, __assign({ w: 1600, h: 840 }, (!((_d = post.coverImage) === null || _d === void 0 ? void 0 : _d.isPortrait) ? { c: 'thumb' } : { fill: 'blur' })))} width={1600} height={840} placeholder="blur" blurDataURL={(0, image_2.getBlurHash)((0, image_2.resizeImage)(postCoverImageURL, __assign(__assign({}, images_1.blurImageDimensions), (!((_e = post.coverImage) === null || _e === void 0 ? void 0 : _e.isPortrait) ? { c: 'thumb' } : { fill: 'blur' }))))} layout="responsive" alt={post.title} priority={isFirstPost}/>
              </link_1.default>
              <h1 className={(0, tailwind_merge_1.twJoin)('blog-article-card-title mx-4 mb-3 block font-heading font-extrabold text-slate-900 hover:opacity-75 dark:text-slate-100', isFirstPost ? 'text-xl md:text-3xl lg:text-4xl' : 'text-xl')}>
                <link_1.default href={postURL} onMouseOver={preload(post.slug)} onFocus={function () { return undefined; }}>
                  {post.title}
                </link_1.default>
              </h1>
              {isPinnedToBlog && (<div className="blog-article-card-label mx-4 mb-1 flex flex-row items-center break-words font-heading font-medium leading-snug text-blue-600 dark:text-blue-500">
                  <span>Pinned</span>
                  <svgs_1.PinSVG className="ml-1 h-6 w-6 stroke-current"/>
                </div>)}
              {/* This p tag is added to the featured card only */}
              {isFirstPost && (<p className="blog-article-card-brief mx-4 mb-3 break-words text-lg leading-snug text-slate-500 hover:opacity-75 dark:text-slate-400">
                  <link_1.default href={postURL} onMouseOver={preload(post.slug)} onFocus={function () { return undefined; }}>
                    {post.subtitle || post.brief}
                  </link_1.default>
                </p>)}
              <div className="blog-article-card-author-strip mx-4 flex flex-row flex-wrap items-center">
                <a href={"https://hashnode.com/@".concat(post.author.username)} className="blog-article-card-author-photo mr-2 block h-8 w-8 overflow-hidden rounded-full bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                  <image_1.default alt={post.author.name || 'Author'} className="block" width={72} height={72} src={(0, image_2.resizeImage)(post.author.profilePicture || images_1.DEFAULT_AVATAR, { w: 72, h: 72, c: 'face' })}/>
                </a>
                <div className="flex flex-col items-start leading-snug">
                  <a className="blog-article-card-author-name block font-semibold text-slate-700 dark:text-slate-400" href={"https://hashnode.com/@".concat(post.author.username)}>
                    {post.author.name}
                  </a>
                  <div className="blog-article-card-article-meta flex flex-row text-sm">
                    {publication.features.readTime.isEnabled && post.readTimeInMinutes ? (<p className="text-slate-500 dark:text-slate-400">
                        <link_1.default href={postURL} className="flex flex-row items-center" onMouseOver={preload(post.slug)} onFocus={function () { return undefined; }}>
                          <svgs_1.BookOpenSVG className="mr-2 h-4 w-4 fill-current"/>
                          <span>{post.readTimeInMinutes} min read</span>
                        </link_1.default>
                      </p>) : null}
                    {post.readTimeInMinutes && Number(post.views) > 0 && publication.features.viewCount.isEnabled && (<p className="mx-2 font-bold text-slate-500 dark:text-slate-400">&middot;</p>)}
                    {Number(post.views) > 0 && publication.features.viewCount.isEnabled && (<>
                        <p className="text-slate-500 dark:text-slate-400">
                          <link_1.default href={postURL} className="flex flex-row items-center" onMouseOver={preload(post.slug)} onFocus={function () { return undefined; }}>
                            <svgs_1.ChartMixedSVG className="mr-2 h-4 w-4 fill-current"/>
                            <span>{(0, image_2.kFormatter)(post.views)} views</span>
                          </link_1.default>
                        </p>
                      </>)}
                  </div>
                </div>
              </div>
            </div>);
        })}
        {__spreadArray([], new Array(padding), true).map(function () { return (<div key={"padding-".concat((0, cuid_1.default)())} className="col-span-1 row-span-1 rounded-lg bg-slate-200 dark:bg-slate-800"/>); })}
      </div>
    </div>);
};
exports.default = FeaturedPosts;
