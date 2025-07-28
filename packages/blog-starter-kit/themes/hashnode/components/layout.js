"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var analytics_1 = require("./analytics");
var integrations_1 = require("./integrations");
var meta_1 = require("./meta");
var scripts_1 = require("./scripts");
var Layout = function (_a) {
    var children = _a.children;
    return (<>
			<meta_1.Meta />
			<scripts_1.Scripts />
			<div className="min-h-screen bg-white dark:bg-neutral-950">
				<main>{children}</main>
			</div>
			<analytics_1.Analytics />
			<integrations_1.Integrations />
		</>);
};
exports.Layout = Layout;
