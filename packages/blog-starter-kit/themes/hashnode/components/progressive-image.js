"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ProgressiveImage = void 0;
var react_1 = require("react");
var image_1 = require("@starter-kit/utils/image");
var images_1 = require("../utils/const/images");
var tailwind_merge_1 = require("tailwind-merge");
/**
 * Progressive Image Component which loads low resolution version image before loading original
 * @param {string}    options.src         Image source
 * @param {string}    options.alt         Image alt text
 * @param {string}    options.className   Classname string
 * @param {...[type]} options.restOfProps Rest of the props passed to the child
 */
var ProgressiveImage = /** @class */ (function (_super) {
    __extends(ProgressiveImage, _super);
    function ProgressiveImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.image = null;
        // TODO: Improve type
        _this.replaceBadImage = function (e) {
            // eslint-disable-next-line react/destructuring-assignment
            if (_this.props.resize && _this.props.resize.c !== 'face') {
                return;
            }
            e.target.onerror = null;
            e.target.src = images_1.DEFAULT_AVATAR;
        };
        return _this;
    }
    ProgressiveImage.prototype.componentDidMount = function () {
        if (!window.lazySizes && this.image) {
            this.image.setAttribute('src', this.image.getAttribute('data-src') || '');
        }
    };
    ProgressiveImage.prototype.render = function () {
        var _this = this;
        var _a = this.props, src = _a.src, alt = _a.alt, className = _a.className, _b = _a.resize, resize = _b === void 0 ? {} : _b, restOfProps = __rest(_a, ["src", "alt", "className", "resize"]);
        if (!src || src.trim().length === 0)
            return null;
        var resizedImage = (0, image_1.resizeImage)(src, resize);
        return (<img data-sizes="auto" loading="lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
        // eslint-disable-next-line no-return-assign
        ref={function (c) { return (_this.image = c || null); }} data-src={resizedImage} width={resize.w} height={resize.h} onError={this.replaceBadImage} alt={alt} className={(0, tailwind_merge_1.twMerge)('lazyload block w-full', className)} {...restOfProps}/>);
    };
    return ProgressiveImage;
}(react_1.default.Component));
exports.ProgressiveImage = ProgressiveImage;
exports.default = ProgressiveImage;
