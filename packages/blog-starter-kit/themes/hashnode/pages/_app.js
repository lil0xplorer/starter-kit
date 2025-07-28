"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var next_urql_1 = require("next-urql");
var react_1 = require("react");
require("tailwindcss/tailwind.css");
var fonts_1 = require("../components/fonts");
var client_1 = require("../lib/api/client");
require("../styles/index.css");
var react_2 = require("react");
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    (0, react_1.useEffect)(function () {
        window.adjustIframeSize = function (id, newHeight) {
            var i = document.getElementById(id);
            if (!i)
                return;
            i.style.height = "".concat(parseInt(newHeight), "px");
        };
        // ✅ Force dark mode by default
        document.documentElement.classList.add('dark');
    }, []);
    return (<react_2.Fragment>
			<fonts_1.GlobalFontVariables />
			<Component {...pageProps}/>
		</react_2.Fragment>);
}
// `withUrqlClient` HOC provides the `urqlClient` prop and takes care of restoring cache from urqlState
// this will provide ssr cache to the provider and enable to use `useQuery` hook on the client side
exports.default = (0, next_urql_1.withUrqlClient)(client_1.getUrqlClientConfig, { neverSuspend: true })(MyApp);
