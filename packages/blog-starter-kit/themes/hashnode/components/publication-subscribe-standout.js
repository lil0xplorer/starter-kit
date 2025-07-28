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
var isEmail_1 = require("validator/lib/isEmail");
var appContext_1 = require("./contexts/appContext");
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
var urql_1 = require("urql");
var graphql_1 = require("../generated/graphql");
function PublicationSubscribeStandOut() {
    var _this = this;
    var publication = (0, appContext_1.useAppContext)().publication;
    var _a = (0, urql_1.useMutation)(graphql_1.SubscribeToNewsletterDocument), subscribeToNewsletter = _a[1];
    var _b = (0, react_1.useState)({
        submitDisabled: false,
        err: '',
        subscribed: false,
    }), state = _b[0], setState = _b[1];
    var email = (0, react_1.useRef)(null);
    var subscribe = function () { return __awaiter(_this, void 0, void 0, function () {
        var emailVal, publicationId, _a, data, error, _state;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!publication || !email.current) {
                        return [2 /*return*/];
                    }
                    emailVal = email.current.value;
                    publicationId = (_b = publication.id) === null || _b === void 0 ? void 0 : _b.toString();
                    if (!emailVal.trim()) {
                        return [2 /*return*/];
                    }
                    if (!(0, isEmail_1.default)(emailVal)) {
                        setState(__assign(__assign({}, state), { err: 'Please enter a valid email' }));
                        return [2 /*return*/];
                    }
                    setState(__assign(__assign({}, state), { submitDisabled: true }));
                    return [4 /*yield*/, subscribeToNewsletter({
                            input: {
                                publicationId: publicationId,
                                email: emailVal,
                            },
                        })];
                case 1:
                    _a = _c.sent(), data = _a.data, error = _a.error;
                    _state = { submitDisabled: false, err: '', subscribed: false };
                    if (!(data === null || data === void 0 ? void 0 : data.subscribeToNewsletter.status) || error) {
                        _state.err = (error === null || error === void 0 ? void 0 : error.graphQLErrors[0].message) || 'Something went wrong. Please try again.';
                    }
                    else {
                        _state.subscribed = true;
                        _state.err = '';
                    }
                    setState(__assign(__assign({}, state), _state));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEmailChange = function (e) {
        if (state.err) {
            setState(__assign(__assign({}, state), { err: '' }));
        }
        if (e.keyCode === 13) {
            subscribe();
        }
    };
    return (<div className="my-10 mt-20 flex w-full flex-col items-center pb-10 md:px-5">
      <h3 className="mb-5 text-center font-heading text-2xl font-bold text-slate-900 dark:text-slate-50 md:text-3xl">
        Subscribe to {publication.isTeam ? 'our' : 'my'} newsletter
      </h3>
      <p className="mb-5 text-center text-lg text-slate-700 dark:text-slate-300 md:w-2/3 md:text-xl">
        Read articles from {<strong>{publication.title}</strong> || 'this blog'} directly inside your inbox. Subscribe
        to the newsletter, and don&apos;t miss out.
      </p>
      {!state.subscribed && (<div className="flex flex-row overflow-hidden rounded-lg border border-slate-800 dark:border-slate-200 md:w-2/3">
          <input type="email" ref={email} onKeyUp={handleEmailChange} placeholder="Enter your email address" className="w-full bg-transparent p-3 text-black outline-none dark:text-white md:p-5 md:text-lg"/>
          <hn_button_1.default type="button" onClick={subscribe} variant="transparent" disabled={state.submitDisabled} className="shrink-0 rounded-none bg-slate-800 px-3 font-bold uppercase tracking-wide text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-black dark:hover:bg-slate-300 md:px-5">
            Subscribe
          </hn_button_1.default>
        </div>)}
      {state.subscribed && (<div className="flex flex-col items-center overflow-hidden rounded-lg border border-green-600 bg-green-50 p-5 text-center text-slate-900 dark:border-green-400 dark:bg-green-900 dark:text-white md:w-2/3">
          <span className="text-green-600 dark:text-green-400">
            <svgs_1.PaperPlaneSVG className="[animation-iteration-count: 3] mb-5 h-10 w-10 animate-bounce fill-current"/>
          </span>
          <p className="font-semibold ">
            We&apos;ve sent a confirmation email;
            <br />
            click on the link to complete your subscription to this newsletter.
          </p>
        </div>)}
      {state.err && <div className="mt-2 text-red-600">{state.err}</div>}
    </div>);
}
exports.default = PublicationSubscribeStandOut;
