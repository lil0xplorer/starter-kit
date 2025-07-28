"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStickyNavElement = void 0;
var react_1 = require("react");
var debounce_1 = require("lodash/debounce");
var zustand_1 = require("zustand");
var canUpdateNavStyle = function () {
    var canUpdate = document.documentElement.clientWidth >= 768;
    return canUpdate;
};
exports.useStickyNavElement = (0, zustand_1.create)(function (set, get) { return ({
    element: null,
    setElement: function (el) {
        set({ element: el });
    },
    setPositioning: function (type) {
        var element = get().element;
        if (element && canUpdateNavStyle()) {
            requestAnimationFrame(function () {
                element.style.position = type;
            });
        }
    },
    translateElement: function (by) {
        var element = get().element;
        if (element && canUpdateNavStyle()) {
            requestAnimationFrame(function () {
                element.style.transform = "translateY(".concat(by === 'zero' ? '0' : '-100', "%)");
            });
        }
    },
}); });
var useStickyScroll = function (_a) {
    var elRef = _a.elRef;
    var _b = (0, react_1.useState)(false), shouldAddScroll = _b[0], setShouldAddScroll = _b[1];
    var setElement = (0, exports.useStickyNavElement)().setElement;
    var scrollRef = (0, react_1.useRef)({
        prevScrollTop: 0,
    });
    var getHeaderTopValue = function () {
        var _a;
        var headerPosition = (_a = elRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        return (headerPosition === null || headerPosition === void 0 ? void 0 : headerPosition.top) || 0;
    };
    var performTranslate = function (amount) {
        if (elRef.current) {
            elRef.current.style.transform = "translateY(".concat(amount, "px)");
        }
    };
    var getScrollDistance = function () {
        var prevScrollTop = scrollRef.current.prevScrollTop;
        var curScrollTop = window.scrollY;
        return curScrollTop - prevScrollTop;
    };
    var calculateTranslateValue = function (_a) {
        var _b;
        var headerTop = _a.headerTop, scrollDistance = _a.scrollDistance;
        // Add arbitrary small extra offset
        var navHeight = (((_b = elRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0) + 30;
        // Clamp value between nav height + small offset (hidden), and 0 (visible)
        return Math.max(Math.min(headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)) * 1, 0), -navHeight);
    };
    var handleTranslate = function () {
        var curScrollTop = window.scrollY;
        var headerTop = getHeaderTopValue();
        var scrollDistance = getScrollDistance();
        var translateAmount = calculateTranslateValue({ headerTop: headerTop, scrollDistance: scrollDistance });
        performTranslate(translateAmount);
        scrollRef.current.prevScrollTop = curScrollTop;
    };
    var handleNavScroll = function () {
        scrollRef.current.animation = requestAnimationFrame(handleTranslate);
    };
    (0, react_1.useEffect)(function () {
        if (!elRef.current)
            return;
        setElement(elRef.current);
    }, []);
    (0, react_1.useEffect)(function () {
        if (shouldAddScroll) {
            window.addEventListener('scroll', handleNavScroll, { passive: true });
        }
        else {
            window.removeEventListener('scroll', handleNavScroll);
            if (elRef.current)
                elRef.current.style.transform = 'translateY(0px)';
        }
        // eslint-disable-next-line consistent-return
        return function () {
            window.removeEventListener('scroll', handleNavScroll);
            if (scrollRef.current.animation)
                cancelAnimationFrame(scrollRef.current.animation);
        };
    }, [shouldAddScroll]);
    (0, react_1.useEffect)(function () {
        var handleResize = (0, debounce_1.default)(function () {
            setShouldAddScroll(window.innerWidth >= 768);
        }, 300);
        handleResize();
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line consistent-return
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
};
exports.default = useStickyScroll;
