"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesPublicationHaveSocialLinks = exports.getDefaultPostCoverImageUrl = exports.getHashId = exports.returnFocusToElement = exports.blurActiveFocus = exports.lightOrDark = exports.generateBlogTitleWithoutDisplayTitle = exports.isBrowser = void 0;
var const_1 = require("./const");
exports.isBrowser = typeof window !== 'undefined';
var generateBlogTitleWithoutDisplayTitle = function (publication) { var _a; return "".concat(publication.title || "".concat((_a = publication.author) === null || _a === void 0 ? void 0 : _a.name, "'s Blog")); };
exports.generateBlogTitleWithoutDisplayTitle = generateBlogTitleWithoutDisplayTitle;
var lightOrDark = function (color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = (color >> 8) & 255;
        b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return 'light';
    }
    else {
        return 'dark';
    }
};
exports.lightOrDark = lightOrDark;
// export const getTotalReplyCountFromResponses = (responses: Response[]) => {
//   const totalReplyCount = responses.reduce((_totalReplyCount, response) => {
//     _totalReplyCount += response.replies?.length ?? 0;
//     return _totalReplyCount;
//   }, 0);
//   return totalReplyCount;
// };
/**
 * Solution for bug in some browsers (e.g. Safari) where user is scroll
 * jumped to bottom of page when closing radix modal with esc
 */
var blurActiveFocus = function () {
    if (document.activeElement && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
};
exports.blurActiveFocus = blurActiveFocus;
/**
 * Maintain focus position e.g. using a constant open radix dialog which won't automatically
 * restore correct focus position
 */
var returnFocusToElement = function (elRef) {
    if (elRef && elRef.current)
        elRef.current.focus();
};
exports.returnFocusToElement = returnFocusToElement;
var getHashId = function () {
    var _a;
    if (!exports.isBrowser)
        return null;
    var hashId = (_a = window.location.hash) === null || _a === void 0 ? void 0 : _a.substring(1);
    if (hashId.length > 0) {
        return hashId.split('?')[0];
    }
    return null;
};
exports.getHashId = getHashId;
var getDefaultPostCoverImageUrl = function () {
    return const_1.DEFAULT_LIGHT_POST_COVER;
};
exports.getDefaultPostCoverImageUrl = getDefaultPostCoverImageUrl;
var doesPublicationHaveSocialLinks = function (pubLinks) {
    return Object.entries(pubLinks || {})
        .filter(function (entry) { return entry[0] !== '__typename'; })
        .map(function (link) {
        var key = link[0];
        var value = link[1];
        return { key: key, value: value };
    })
        .some(function (entry) { return entry.value; });
};
exports.doesPublicationHaveSocialLinks = doesPublicationHaveSocialLinks;
