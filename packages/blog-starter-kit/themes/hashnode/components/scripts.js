"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scripts = void 0;
var Scripts = function () {
    var googleAnalytics = "\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){window.dataLayer.push(arguments);}\n    gtag('js', new Date());";
    return (<>
			<script async src={"https://ping.hashnode.com/gtag/js?id=G-72XG3F8LNJ"}/>
			<script dangerouslySetInnerHTML={{ __html: googleAnalytics }}/>
		</>);
};
exports.Scripts = Scripts;
