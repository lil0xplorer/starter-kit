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
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var commonUtils_1 = require("../utils/commonUtils");
var appContext_1 = require("./contexts/appContext");
var custom_button_1 = require("./custom-button");
var icons_1 = require("./icons");
var svgs_1 = require("./icons/svgs");
var PostComments = (0, dynamic_1.default)(function () {
    return Promise.resolve().then(function () { return require('../components/post-comments'); }).then(function (mod) { return mod.PostComments; });
});
function ResponseList(props) {
    var _this = this;
    var currentFilter = props.currentFilter;
    var _post = (0, appContext_1.useAppContext)().post;
    var post = _post;
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), initialResponsesLoaded = _b[0], setInitialResponsesLoaded = _b[1];
    var hashId = (0, commonUtils_1.getHashId)();
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                if (post.responseCount === 0) {
                    return [2 /*return*/];
                }
                setLoading(true);
                setLoading(false);
                if (!initialResponsesLoaded) {
                    setInitialResponsesLoaded(true);
                }
                // Scroll to responseId after the responses load
                if (!hashId) {
                    return [2 /*return*/];
                }
                el = document.getElementById(hashId);
                if (!el) {
                    return [2 /*return*/];
                }
                el.scrollIntoView();
                return [2 /*return*/];
            });
        }); })();
    }, [currentFilter]);
    if (post.responseCount === 0) {
        var discussionUrl = "https://hashnode.com/discussions/post/".concat(post.id);
        return (<div className="flex h-3/5 flex-col items-center justify-center text-sm text-slate-500 dark:text-slate-400">
				<custom_button_1.Button as="a" href={discussionUrl} target="_blank" rel="noopener noreferrer" icon={<icons_1.HashnodeSVG className="h-5 w-5 stroke-current"/>} label="Add a comment" secondaryIcon={<icons_1.ExternalArrowSVG className="h-4 w-4 stroke-current"/>}/>
				<svgs_1.NoCommentsLightSVG className="h-40 w-40"/>
				<p>No comments yet</p>
			</div>);
    }
    return (<div className="mx-2 pb-10 lg:mx-0" id="comments-list">
			<PostComments />
			{isLoading &&
            __spreadArray([], Array(3).keys(), true).map(function (val) { return (<div key={"comments-list-loader-".concat(val)} className="border-b-1/2 animate-pulse dark:border-slate-700">
						<div className="px-4 py-5">
							<div className="mb-6 flex flex-row items-center bg-white dark:border-slate-800 dark:bg-slate-900">
								<div className="mr-4 h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"/>
								<div className="flex flex-col gap-2">
									<div className="h-3 w-56 rounded bg-slate-200 dark:bg-slate-700"/>
									<div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700"/>
								</div>
							</div>
							<div>
								<div className="mb-2 h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-700"/>
								<div className="mb-2 h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-700"/>
								<div className="mb-2 h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-700"/>
							</div>
						</div>
					</div>); })}
		</div>);
}
exports.default = ResponseList;
