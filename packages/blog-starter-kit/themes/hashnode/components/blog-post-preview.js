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
var dayjs_1 = require("dayjs");
var image_1 = require("next/legacy/image");
var link_1 = require("next/link");
var localizedFormat_1 = require("dayjs/plugin/localizedFormat");
var tailwind_merge_1 = require("tailwind-merge");
var svgs_1 = require("./icons/svgs");
var image_2 = require("../utils/image");
var image_3 = require("../utils/image");
var custom_image_1 = require("./custom-image");
var images_1 = require("../utils/const/images");
var commonUtils_1 = require("../utils/commonUtils");
dayjs_1.default.extend(localizedFormat_1.default);
function BlogPostPreview(props) {
    var _this = this;
    var _a, _b, _c, _d;
    var post = props.post, publication = props.publication, pinnedPostId = props.pinnedPostId;
    var postURL = "/".concat(post.slug);
    var layout = publication.preferences.layout, features = publication.features;
    var postCoverImageURL = (_b = (_a = post.coverImage) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : (0, commonUtils_1.getDefaultPostCoverImageUrl)();
    var preload = function () { return __awaiter(_this, void 0, void 0, function () {
        var nextData, buildId;
        return __generator(this, function (_a) {
            nextData = document.getElementById('__NEXT_DATA__');
            if (nextData) {
                buildId = JSON.parse(nextData.innerHTML).buildId;
                if (buildId) {
                    fetch("/_next/data/".concat(buildId, "/").concat(post.slug, ".json?slug=").concat(post.slug));
                }
            }
            return [2 /*return*/];
        });
    }); };
    var postBrief = post.subtitle || '';
    if (postBrief.length < 151 && post.brief) {
        postBrief = "".concat(postBrief).concat(postBrief ? ' · ' : '').concat(post.brief.substring(0, 151 - postBrief.length));
        if (postBrief.length >= 151) {
            var indexLastSpace = postBrief.lastIndexOf(' ');
            postBrief = "".concat(indexLastSpace === -1 ? postBrief : postBrief.substring(0, indexLastSpace), "...");
        }
    }
    return (<div className={(0, tailwind_merge_1.twJoin)('blog-post-card mb-16', layout === 'grid' ? 'px-4 lg:w-1/2 lg:px-8' : 'px-4 lg:px-16')} key={post.id}>
      {layout !== 'grid' && post.id === pinnedPostId && (<div className="blog-article-card-label mb-1 flex flex-row items-center break-words font-heading font-medium leading-snug text-blue-600 dark:text-blue-500">
          <span>Pinned</span>
          <svgs_1.PinSVG className="ml-1 h-6 w-6 stroke-current"/>
        </div>)}
      <section className={(0, tailwind_merge_1.twJoin)('blog-post-card-wrapper flex flex-wrap items-start', layout === 'grid' ? 'flex-col-reverse' : 'flex-row')}>
        <div className={layout === 'grid' ? 'w-full' : 'lg:w-3/5'}>
          <h1 className="blog-post-card-title mb-3 break-words font-heading text-2xl font-bold leading-tight text-slate-900 dark:text-white lg:text-3xl">
            <link_1.default href={postURL} aria-label={post.title} onMouseOver={preload} onFocus={function () { return undefined; }}>
              {post.title}
            </link_1.default>
          </h1>
          <div className={(0, tailwind_merge_1.twJoin)('blog-post-card-meta mb-3 flex flex-row flex-wrap items-center font-heading text-sm font-medium text-slate-500 dark:text-slate-400', publication.isTeam && 'mt-4')}>
            {publication.isTeam && (<div className="mb-4 flex w-full flex-row items-center">
                <a href={"https://hashnode.com/@".concat(post.author.username)} className="blog-post-card-author-pic mr-2 block h-8 w-8 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <image_1.default alt={post.author.name} className="block w-full" width={72} height={72} src={(0, image_2.resizeImage)(post.author.profilePicture || images_1.DEFAULT_AVATAR, { w: 72, h: 72, c: 'face' })}/>
                </a>
                <a href={"https://hashnode.com/@".concat(post.author.username)} className="blog-post-card-author-name text-lg font-medium text-slate-800 dark:text-slate-200">
                  {post.author.name}
                </a>
              </div>)}
            {layout === 'grid' && post.id === pinnedPostId && (<div className="blog-article-card-label mr-2 flex flex-row items-center break-words font-medium leading-snug text-blue-600 dark:text-blue-500">
                <span>Pinned</span>
                <svgs_1.PinSVG className="ml-1 h-6 w-6 stroke-current"/>
              </div>)}
            <link_1.default href={postURL} aria-label={post.title} className="blog-post-card-time mr-4">
              {(0, dayjs_1.default)(post.publishedAt).format('ll')}
            </link_1.default>
            {features.readTime.isEnabled && post.readTimeInMinutes ? (<link_1.default href={postURL} aria-label={"".concat(post.title, " min read")} className="mr-4 flex flex-row items-center">
                <svgs_1.BookOpenSVG className="mr-1 h-4 w-4 fill-current"/>
                <span>{post.readTimeInMinutes} min read </span>
              </link_1.default>) : null}
            {post.views && features.viewCount.isEnabled ? (<link_1.default href={postURL} aria-label={"".concat(post.views, " views")} className="mr-2 flex flex-row items-center">
                <svgs_1.FileLineChartSVG className="mr-1 h-4 w-4 fill-current"/>
                <span>{(0, image_3.kFormatter)(post.views)} views</span>
              </link_1.default>) : null}
          </div>
          <p className="blog-post-card-brief block w-full break-words text-lg leading-snug text-slate-700 hn-break-words dark:text-slate-400">
            <link_1.default href={postURL} aria-label={post.title} onMouseOver={preload} onFocus={function () { return undefined; }}>
              {postBrief}
            </link_1.default>
          </p>
        </div>
        <div className={(0, tailwind_merge_1.twJoin)('blog-post-card-cover', layout === 'grid' ? 'mb-6 w-full' : 'mt-6 w-full lg:mt-0 lg:w-2/5 lg:pl-8')}>
          <link_1.default href={postURL} className="block overflow-hidden rounded-lg border dark:border-slate-800" aria-label={post.title} onMouseOver={preload} onFocus={function () { return undefined; }}>
            <custom_image_1.default originalSrc={postCoverImageURL} src={(0, image_2.resizeImage)(postCoverImageURL, __assign({ w: 1600, h: 840 }, (!((_c = post.coverImage) === null || _c === void 0 ? void 0 : _c.isPortrait) ? { c: 'thumb' } : { fill: 'blur' })))} width={1600} height={840} placeholder="blur" blurDataURL={(0, image_2.getBlurHash)((0, image_2.resizeImage)(postCoverImageURL, __assign(__assign({}, images_1.blurImageDimensions), (!((_d = post.coverImage) === null || _d === void 0 ? void 0 : _d.isPortrait) ? { c: 'thumb' } : { fill: 'blur' }))))} alt={post.title} layout="responsive" className="post-cover"/>
          </link_1.default>
        </div>
      </section>
    </div>);
}
exports.default = BlogPostPreview;
