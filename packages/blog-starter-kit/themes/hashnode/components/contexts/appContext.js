"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppContext = exports.AppProvider = void 0;
var react_1 = require("react");
var AppContext = (0, react_1.createContext)(null);
var AppProvider = function (_a) {
    var children = _a.children, publication = _a.publication, post = _a.post, page = _a.page, series = _a.series;
    return (<AppContext.Provider value={{
            publication: publication,
            post: post !== null && post !== void 0 ? post : null,
            page: page !== null && page !== void 0 ? page : null,
            series: series !== null && series !== void 0 ? series : null,
        }}>
			{children}
		</AppContext.Provider>);
};
exports.AppProvider = AppProvider;
var useAppContext = function () {
    var context = (0, react_1.useContext)(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a <AppProvider />');
    }
    return context;
};
exports.useAppContext = useAppContext;
