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
exports.Analytics = void 0;
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var uuid_1 = require("uuid");
var appContext_1 = require("./contexts/appContext");
var GA_TRACKING_ID = 'G-72XG3F8LNJ'; // This is Hashnode's GA tracking ID
var isProd = process.env.NEXT_PUBLIC_MODE === 'production';
var BASE_PATH = process.env.NEXT_PUBLIC_BASE_URL || '';
var Analytics = function () {
    var _a = (0, appContext_1.useAppContext)(), publication = _a.publication, post = _a.post, series = _a.series, page = _a.page;
    var _sendPageViewsToHashnodeGoogleAnalytics = function () {
        // @ts-ignore
        window.gtag('config', GA_TRACKING_ID, {
            transport_url: 'https://ping.hashnode.com',
            first_party_collection: true,
        });
    };
    var _sendViewsToHashnodeInternalAnalytics = function () { return __awaiter(void 0, void 0, void 0, function () {
        var event, deviceId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event = {
                        event_type: 'pageview',
                        time: new Date().getTime(),
                        event_properties: {
                            hostname: window.location.hostname,
                            url: window.location.pathname,
                            eventType: 'pageview',
                            publicationId: publication.id,
                            dateAdded: new Date().getTime(),
                            referrer: window.document.referrer,
                        },
                    };
                    deviceId = js_cookie_1.default.get('__amplitudeDeviceID');
                    if (!deviceId) {
                        deviceId = (0, uuid_1.v4)();
                        js_cookie_1.default.set('__amplitudeDeviceID', deviceId, {
                            expires: 365 * 2,
                        }); // expire after two years
                    }
                    event['device_id'] = deviceId;
                    return [4 /*yield*/, fetch("".concat(BASE_PATH, "/ping/data-event"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ events: [event] }),
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    function _sendViewsToAdvancedAnalyticsDashboard() {
        var _a;
        var publicationId = publication.id;
        var postId = post && post.id;
        var seriesId = (series === null || series === void 0 ? void 0 : series.id) || ((_a = post === null || post === void 0 ? void 0 : post.series) === null || _a === void 0 ? void 0 : _a.id);
        var staticPageId = page && page.id;
        var data = {
            publicationId: publicationId,
            postId: postId,
            seriesId: seriesId,
            staticPageId: staticPageId,
        };
        if (!publicationId) {
            console.warn('Publication ID is missing; could not send analytics.');
            return;
        }
        var isBrowser = typeof window !== 'undefined';
        if (!isBrowser) {
            return;
        }
        var isLocalhost = window.location.hostname === 'localhost';
        if (isLocalhost) {
            console.warn('Analytics API call is skipped because you are running on localhost; data:', data);
            return;
        }
        var event = {
            // timestamp will be added in API
            payload: {
                publicationId: publicationId,
                postId: postId || null,
                seriesId: seriesId || null,
                pageId: staticPageId || null,
                url: window.location.href,
                referrer: document.referrer || null,
                language: navigator.language || null,
                screen: "".concat(window.screen.width, "x").concat(window.screen.height),
            },
            type: 'pageview',
        };
        var blob = new Blob([
            JSON.stringify({
                events: [event],
            }),
        ], {
            type: 'application/json; charset=UTF-8',
        });
        var hasSentBeacon = false;
        try {
            if (navigator.sendBeacon) {
                hasSentBeacon = navigator.sendBeacon("".concat(BASE_PATH, "/api/analytics"), blob);
            }
        }
        catch (error) {
            // do nothing; in case there is an error we fall back to fetch
        }
        if (!hasSentBeacon) {
            fetch("".concat(BASE_PATH, "/api/analytics"), {
                method: 'POST',
                body: blob,
                credentials: 'omit',
                keepalive: true,
            });
        }
    }
    (0, react_1.useEffect)(function () {
        if (!isProd)
            return;
        _sendPageViewsToHashnodeGoogleAnalytics();
        _sendViewsToHashnodeInternalAnalytics();
        _sendViewsToAdvancedAnalyticsDashboard();
    }, []);
    return null;
};
exports.Analytics = Analytics;
