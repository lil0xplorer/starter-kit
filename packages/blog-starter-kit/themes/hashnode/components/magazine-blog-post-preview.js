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
var link_1 = require("next/link");
var custom_image_1 = require("./custom-image");
var svgs_1 = require("./icons/svgs");
var commonUtils_1 = require("../utils/commonUtils");
var images_1 = require("../utils/const/images");
var image_1 = require("../utils/image");
var image_2 = require("../utils/image");
function BlogPostPreview(props) {
    var _this = this;
    var _a, _b, _c, _d;
    var post = props.post, publication = props.publication;
    var postURL = "/".concat(post.slug);
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
    return (<div className="blog-article-card col-span-1">
      <link_1.default href={postURL} onMouseOver={preload} onFocus={function () { return undefined; }} aria-label={"Cover photo of the article titled ".concat(post.title)} className="mb-4 block w-full overflow-hidden rounded-lg border bg-slate-100 hover:opacity-90 dark:border-slate-800 dark:bg-slate-800">
        <custom_image_1.default className="blog-article-card-cover block w-full" originalSrc={postCoverImageURL} src={(0, image_1.resizeImage)(postCoverImageURL, __assign({ w: 1600, h: 840 }, (!((_c = post.coverImage) === null || _c === void 0 ? void 0 : _c.isPortrait) ? { c: 'thumb' } : { fill: 'blur' })))} width={1600} height={840} placeholder="blur" blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(postCoverImageURL, __assign(__assign({}, images_1.blurImageDimensions), (!((_d = post.coverImage) === null || _d === void 0 ? void 0 : _d.isPortrait) ? { c: 'thumb' } : { fill: 'blur' }))))} layout="responsive" alt={post.title}/>
      </link_1.default>
      <h1 className="blog-article-card-title mx-4 mb-2 block break-words font-heading text-2xl font-extrabold leading-snug text-slate-900 hover:opacity-75 dark:text-slate-100">
        <link_1.default href={postURL} onMouseOver={preload} onFocus={function () { return undefined; }}>
          {post.title}
        </link_1.default>
      </h1>
      <div className="blog-article-card-author-strip mx-4 flex flex-row flex-wrap items-center">
        <div className="flex flex-col items-start leading-snug">
          <a className="block font-semibold text-slate-700 dark:text-slate-400" href={"https://hashnode.com/@".concat(post.author.username)} onMouseOver={preload} onFocus={function () { return undefined; }}>
            {post.author.name}
          </a>
          <div className="blog-article-card-article-meta flex flex-row text-sm">
            {publication.features.readTime.isEnabled && post.readTimeInMinutes ? (<>
                <p className="text-slate-500 dark:text-slate-400">
                  <link_1.default href={postURL} className="flex flex-row items-center" onMouseOver={preload} onFocus={function () { return undefined; }}>
                    <svgs_1.BookOpenSVG className="mr-2 h-4 w-4 fill-current"/>
                    <span>{post.readTimeInMinutes} min read</span>
                  </link_1.default>
                </p>
              </>) : null}
            {post.readTimeInMinutes && Number(post.views) > 0 && publication.features.viewCount.isEnabled ? (<p className="mx-2 font-bold text-slate-500 dark:text-slate-400">&middot;</p>) : null}
            {Number(post.views) > 0 && publication.features.viewCount.isEnabled ? (<p className="text-slate-500 dark:text-slate-400">
                <link_1.default href={postURL} className="flex flex-row items-center" onMouseOver={preload} onFocus={function () { return undefined; }}>
                  <svgs_1.ChartMixedSVG className="mr-2 h-4 w-4 fill-current"/>
                  <span>{(0, image_2.kFormatter)(post.views)} views</span>
                </link_1.default>
              </p>) : null}
          </div>
        </div>
      </div>
    </div>);
}
exports.default = BlogPostPreview;
