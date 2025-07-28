"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var svgs_1 = require("./icons/svgs");
var common_header_icon_btn_1 = require("./common-header-icon-btn");
var PublicationSidebar = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./publication-sidebar'); }); }, {
    ssr: false,
});
var LeftSidebarButton = function (props) {
    var publication = props.publication;
    var triggerRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(false), isSidebarVisible = _a[0], toggleSidebarVisibility = _a[1];
    var toggleSidebar = function () {
        toggleSidebarVisibility(!isSidebarVisible);
    };
    return (<>
      {isSidebarVisible ? (<PublicationSidebar publication={publication} toggleSidebar={toggleSidebar} triggerRef={triggerRef}/>) : null}
      <common_header_icon_btn_1.default handleClick={toggleSidebar} variant="leftSidebar" btnRef={triggerRef}>
        <svgs_1.BarsSVG className="h-6 w-6 stroke-current"/>
      </common_header_icon_btn_1.default>
    </>);
};
exports.default = LeftSidebarButton;
