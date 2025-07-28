"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("next/legacy/image");
/**
 * Conditionally renders native img for gifs and next/image for other types
 * @param props
 * @returns <img /> or <Image/>
 */
function CustomImage(props) {
    var originalSrc = props.originalSrc, originalRestOfTheProps = __rest(props, ["originalSrc"]);
    var _a = originalRestOfTheProps.alt, alt = _a === void 0 ? '' : _a, loader = originalRestOfTheProps.loader, quality = originalRestOfTheProps.quality, priority = originalRestOfTheProps.priority, loading = originalRestOfTheProps.loading, unoptimized = originalRestOfTheProps.unoptimized, objectFit = originalRestOfTheProps.objectFit, objectPosition = originalRestOfTheProps.objectPosition, src = originalRestOfTheProps.src, width = originalRestOfTheProps.width, height = originalRestOfTheProps.height, layout = originalRestOfTheProps.layout, placeholder = originalRestOfTheProps.placeholder, blurDataURL = originalRestOfTheProps.blurDataURL, restOfTheProps = __rest(originalRestOfTheProps, ["alt", "loader", "quality", "priority", "loading", "unoptimized", "objectFit", "objectPosition", "src", "width", "height", "layout", "placeholder", "blurDataURL"]); // Destructured next/image props on purpose, so that unwanted props don't end up in <img />
    if (!originalSrc) {
        return null;
    }
    var isGif = originalSrc.substr(-4) === '.gif';
    var isHashnodeCDNImage = src.indexOf('cdn.hashnode.com') > -1;
    if (isGif || !isHashnodeCDNImage) {
        // restOfTheProps will contain all props excluding the next/image props
        return <img {...restOfTheProps} alt={alt} src={src || originalSrc}/>;
    }
    // Notes we are passing whole props object here
    return <image_1.default {...originalRestOfTheProps} src={src || originalSrc}/>;
}
exports.default = CustomImage;
