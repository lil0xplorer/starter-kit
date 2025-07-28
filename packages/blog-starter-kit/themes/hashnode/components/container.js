"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var Container = function (_a) {
    var children = _a.children, className = _a.className;
    return <div className={'container mx-auto ' + className}>{children}</div>;
};
exports.Container = Container;
