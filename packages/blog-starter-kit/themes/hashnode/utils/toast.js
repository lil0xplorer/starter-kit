"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = void 0;
var client_1 = require("react-dom/client");
var toast_1 = require("../components/toast");
var TOAST_ELEMENT_ID = 'hn-toast';
var root = null;
var timeout = null;
var _closeToast = function () {
    root === null || root === void 0 ? void 0 : root.unmount();
    root = null;
};
// this should be a hook
// TODO: The toast doens't close when Radix modal is used since Radix adds pointer-events: none to the body.
var showToast = function (type, title, message) {
    timeout && clearTimeout(timeout);
    root || (root = (0, client_1.createRoot)(document.getElementById(TOAST_ELEMENT_ID)));
    root.render(<toast_1.Toast type={type} title={title} message={message} closeToast={_closeToast}/>);
    timeout = setTimeout(_closeToast, 5000);
};
exports.showToast = showToast;
exports.default = showToast;
