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
exports.config = void 0;
exports.default = handler;
var image_1 = require("@starter-kit/utils/image");
var og_1 = require("@vercel/og");
var const_1 = require("../../../utils/const");
exports.config = {
    runtime: 'edge',
};
var fontRegular = fetch(new URL('../../../assets/PlusJakartaSans-Regular.ttf', import.meta.url)).then(function (res) { return res.arrayBuffer(); });
var fontMedium = fetch(new URL('../../../assets/PlusJakartaSans-Medium.ttf', import.meta.url)).then(function (res) { return res.arrayBuffer(); });
var fontSemiBold = fetch(new URL('../../../assets/PlusJakartaSans-SemiBold.ttf', import.meta.url)).then(function (res) { return res.arrayBuffer(); });
var fontBold = fetch(new URL('../../../assets/PlusJakartaSans-Bold.ttf', import.meta.url)).then(function (res) { return res.arrayBuffer(); });
var fontExtraBold = fetch(new URL('../../../assets/PlusJakartaSans-ExtraBold.ttf', import.meta.url)).then(function (res) { return res.arrayBuffer(); });
var kFormatter = function (num) {
    return num > 999 ? "".concat((num / 1000).toFixed(1), "K") : num;
};
function handler(req) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, fontDataRegular, fontDataMedium, fontDataSemiBold, fontDataBold, fontDataExtraBold, searchParams, ogData, encodedTitle, userPhoto, logo, isTeam, domain, encodedMeta, followers, articles, favicon, title, meta, bannerBackground, photo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([fontRegular, fontMedium, fontSemiBold, fontBold, fontExtraBold])];
                case 1:
                    _a = _b.sent(), fontDataRegular = _a[0], fontDataMedium = _a[1], fontDataSemiBold = _a[2], fontDataBold = _a[3], fontDataExtraBold = _a[4];
                    searchParams = new URL(req.url).searchParams;
                    ogData = JSON.parse(atob(searchParams.get('og')));
                    encodedTitle = ogData.title, userPhoto = ogData.photo, logo = ogData.logo, isTeam = ogData.isTeam, domain = ogData.domain, encodedMeta = ogData.meta, followers = ogData.followers, articles = ogData.articles, favicon = ogData.favicon;
                    title = decodeURIComponent(encodedTitle);
                    if (encodedMeta) {
                        meta = decodeURIComponent(encodedMeta);
                    }
                    bannerBackground = '#f1f5f9';
                    photo = userPhoto || const_1.DEFAULT_AVATAR;
                    return [2 /*return*/, new og_1.ImageResponse((<div style={{
                                fontFamily: '"Plus Jakarta Sans"',
                            }} tw={"relative flex h-full w-full p-8 bg-white"}>
				{/* PERSONAL BLOG The following parent div is for personal blogs */}
				{/* if the site is set to open in dark mode by default, change text-black to text-white and bg-white to bg-black */}
				{!isTeam && (<div tw={"flex w-full flex-col items-center justify-center text-black h-full p-10 bg-[".concat(bannerBackground, "] relative rounded-xl")}>
						<div tw="absolute -top-px -left-px -right-px -bottom-px rounded-xl border-2 border-black/5"/>
						<div tw="mx-auto flex flex-row items-center" style={{ width: '90%' }}>
							<div tw="mr-20 flex h-56 w-56 overflow-hidden rounded-full">
								<img tw="w-full" alt="name" src={(0, image_1.resizeImage)(photo, { w: 400, h: 400, c: 'face' })}/>
							</div>
							<div tw="flex flex-1 flex-col items-start">
								{/* Either show the Site title below or Site logo depending on whether a blog has a logo or not */}

								{/* Site title */}
								{!logo && title && <p tw="m-0 text-5xl font-bold">{title}</p>}

								{/* Site Logo - load dark logo only if the site is set to open in dark mode */}
								{logo ? (<img tw="block w-3/4" alt="name" src={(0, image_1.resizeImage)(logo, { w: 1000, h: 250, c: 'thumb' })}/>) : null}

								{/* Show domain name */}
								<p tw="m-0 my-5 text-2xl font-semibold opacity-75">{domain}</p>

								{/* If blog's about me is not available hide this p tag */}
								{meta && (<p tw="m-0 mb-5 flex flex-row flex-wrap text-ellipsis break-words text-2xl opacity-75">
										{meta}
									</p>)}
								<div tw="flex flex-row items-center text-2xl opacity-75">
									{/* If no of followers is zero hide this p tag */}
									{followers > 0 && (<p tw="m-0 mr-5 flex flex-row items-center">
											<strong tw="mr-2">{kFormatter(followers)}</strong>
											<span>follower{followers === 1 ? '' : 's'}</span>
										</p>)}
									{/* If no of articles are zero, hide this p tag */}
									{articles > 0 && (<p tw="m-0 mr-5 flex flex-row items-center">
											<strong tw="mr-2">{kFormatter(articles)}</strong>
											<span>article{articles === 1 ? '' : 's'}</span>
										</p>)}
								</div>
							</div>
						</div>
					</div>)}

				{/* TEAM BLOG The following parent div is for team blogs */}
				{/* if the site is set to open in dark mode by default, change text-black to text-white and bg-white to bg-black */}
				{isTeam && (<div tw={"flex w-full flex-col items-center justify-center text-black h-full p-10 bg-[".concat(bannerBackground, "] relative rounded-xl")}>
						<div tw="absolute -top-px -left-px -right-px -bottom-px rounded-xl border-2 border-black/5"/>
						<div tw="mx-auto flex flex-row items-center" style={{ width: '80%' }}>
							{/* Show the following if the team doesn't have a logo and has a thumbnail/favicon */}
							{!logo && favicon && (<div tw="mr-20 flex h-56 w-56 overflow-hidden rounded-full">
									<img tw="w-full" alt="name" src={"".concat(favicon, "?w=400&h=400&fit=crop&crop=faces&auto=compress")}/>
								</div>)}
							<div tw="flex flex-1 flex-col items-start">
								{/* Either show the Site title below or Site logo depending on whether a blog has a logo or not */}

								{/* Site title */}
								{!logo && title && <p tw="m-0 text-5xl font-bold">{title}</p>}

								{/* Site Logo */}
								{logo ? <img tw="mb-10 block w-1/2" alt="name" src={logo}/> : null}

								{/* Show domain name */}
								<p tw="m-0 my-5 text-2xl font-semibold opacity-75">{domain}</p>

								{/* If blog's about me is not available hide this p tag */}
								{meta && (<p tw="m-0 mb-5 flex flex-row flex-wrap text-ellipsis break-words text-2xl opacity-75">
										{meta}
									</p>)}
								<div tw="flex flex-row items-center text-2xl opacity-75">
									{/* If no of followers is zero hide this p tag */}
									{followers > 0 && (<p tw="m-0 mr-5 flex flex-row items-center">
											<strong tw="mr-2">{kFormatter(followers)}</strong>
											<span>follower{followers === 1 ? '' : 's'}</span>
										</p>)}
									{/* If no of articles are zero, hide this p tag */}
									{articles > 0 && (<p tw="m-0 mr-5 flex flex-row items-center">
											<strong tw="mr-2">{kFormatter(articles)}</strong>
											<span>article{articles === 1 ? '' : 's'}</span>
										</p>)}
								</div>
							</div>
						</div>
					</div>)}
			</div>), {
                            width: 1200,
                            height: 630,
                            fonts: [
                                {
                                    name: 'Typewriter',
                                    data: fontDataRegular,
                                    style: 'normal',
                                    weight: 400,
                                },
                                {
                                    name: 'Typewriter',
                                    data: fontDataMedium,
                                    style: 'normal',
                                    weight: 500,
                                },
                                {
                                    name: 'Typewriter',
                                    data: fontDataSemiBold,
                                    style: 'normal',
                                    weight: 600,
                                },
                                {
                                    name: 'Typewriter',
                                    data: fontDataBold,
                                    style: 'normal',
                                    weight: 700,
                                },
                                {
                                    name: 'Typewriter',
                                    data: fontDataExtraBold,
                                    style: 'normal',
                                    weight: 800,
                                },
                            ],
                        })];
            }
        });
    });
}
