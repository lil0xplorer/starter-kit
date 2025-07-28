"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meta = void 0;
var html_react_parser_1 = require("html-react-parser");
var head_1 = require("next/head");
var appContext_1 = require("./contexts/appContext");
var Meta = function () {
    var publication = (0, appContext_1.useAppContext)().publication;
    var metaTags = publication.metaTags, favicon = publication.favicon;
    var defaultFavicons = (<>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
			<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000"/>
			<meta name="msapplication-TileColor" content="#000000"/>
			<meta name="theme-color" content="#000"/>
		</>);
    return (<head_1.default>
			{favicon ? <link rel="icon" type="image/png" href={favicon}/> : defaultFavicons}
			<meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
			<link rel="alternate" type="application/rss+xml" href="/feed.xml"/>
			{metaTags && (0, html_react_parser_1.default)(metaTags)}
		</head_1.default>);
};
exports.Meta = Meta;
