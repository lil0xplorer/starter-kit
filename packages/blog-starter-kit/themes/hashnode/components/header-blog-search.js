"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var common_header_icon_btn_1 = require("./common-header-icon-btn");
var SearchSvg_1 = require("./icons/svgs/SearchSvg");
var PublicationSearch = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('./publication-search'); }); }, { ssr: false });
var HeaderBlogSearch = function (props) {
    var publication = props.publication;
    var _a = (0, react_1.useState)(false), isSearchUIVisible = _a[0], toggleSearchUIState = _a[1];
    var triggerRef = (0, react_1.useRef)(null);
    var toggleSearchUI = function () {
        toggleSearchUIState(!isSearchUIVisible);
    };
    return (<>
      {isSearchUIVisible ? (<PublicationSearch publication={publication} toggleSearchUI={toggleSearchUI} triggerRef={triggerRef}/>) : null}
      <common_header_icon_btn_1.default handleClick={toggleSearchUI} variant="search" btnRef={triggerRef}>
        <SearchSvg_1.default className="h-6 w-6 stroke-current"/>
      </common_header_icon_btn_1.default>
    </>);
};
exports.default = HeaderBlogSearch;
