"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHost = getHost;
var urls_1 = require("./urls");
function getHost(_a) {
    var req = _a.req, query = _a.query;
    var host = (0, urls_1.getSingleQueryParam)(query, 'x-host') || req.headers.host;
    if (!host) {
        throw new Error('Could not determine host');
    }
    return host;
}
