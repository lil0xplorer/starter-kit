"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integrations = Integrations;
var react_1 = require("react");
var appContext_1 = require("./contexts/appContext");
function Integrations() {
    var _a;
    var publication = (0, appContext_1.useAppContext)().publication;
    var _b = (_a = publication.integrations) !== null && _a !== void 0 ? _a : {}, gaTrackingID = _b.gaTrackingID, fbPixelID = _b.fbPixelID, hotjarSiteID = _b.hotjarSiteID, matomoURL = _b.matomoURL, matomoSiteID = _b.matomoSiteID, fathomSiteID = _b.fathomSiteID, fathomCustomDomain = _b.fathomCustomDomain, fathomCustomDomainEnabled = _b.fathomCustomDomainEnabled, plausibleAnalyticsEnabled = _b.plausibleAnalyticsEnabled, gTagManagerID = _b.gTagManagerID, koalaPublicKey = _b.koalaPublicKey, msClarityID = _b.msClarityID;
    var domainURL = new URL(publication.url).hostname;
    var fbPixel = "\n    !function(f,b,e,v,n,t,s)\n    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n    n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n    n.queue=[];t=b.createElement(e);t.async=!0;t.defer=!0;\n    t.src=v;s=b.getElementsByTagName(e)[0];\n    s.parentNode.insertBefore(t,s)}(window,document,'script',\n    'https://connect.facebook.net/en_US/fbevents.js');\n    ";
    if (fbPixelID) {
        fbPixel += "fbq('init', '".concat(encodeURI(fbPixelID), "');");
    }
    var hotjarForUsers = hotjarSiteID &&
        "\n      (function(h,o,t,j,a,r){\n          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n          h._hjSettings={hjid:".concat(encodeURI(hotjarSiteID), ",hjsv:6};\n          a=o.getElementsByTagName('head')[0];\n          r=o.createElement('script');r.async=1;r.defer=1;\n          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n          a.appendChild(r);\n      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');\n  ");
    var matomoAnalytics = "\n      var _paq = window._paq = window._paq || [];\n      _paq.push(['trackPageView']);\n      _paq.push(['enableLinkTracking']);\n      (function() {\n        var u=\"https://".concat(encodeURI(matomoURL || ''), "/\";\n        _paq.push(['setTrackerUrl', u+'matomo.php']);\n        _paq.push(['setSiteId', '").concat(encodeURI(matomoSiteID || ''), "']);\n        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];\n        g.type='text/javascript'; g.async=true; g.defer=true; g.src='//cdn.matomo.cloud/").concat(encodeURI(matomoURL || ''), "/matomo.js'; s.parentNode.insertBefore(g,s);\n      })();\n  ");
    var googleTagManager = "\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n\t\tnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n\t\tj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n\t\t'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n\t\t})(window,document,'script','dataLayer', '".concat(gTagManagerID, "');");
    var koalaForUsers = koalaPublicKey &&
        "!function(t){if(window.ko)return;window.ko=[],\n    [\"identify\",\"track\",\"removeListeners\",\"on\",\"off\",\"qualify\",\"ready\"]\n    .forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});\n    var n=document.createElement(\"script\");\n    n.async=!0,n.setAttribute(\"src\",\"https://cdn.getkoala.com/v1/".concat(encodeURI(koalaPublicKey), "/sdk.js\"),\n    (document.body || document.head).appendChild(n)}();");
    var msClarityForUsers = msClarityID &&
        "(function(c,l,a,r,i,t,y){\n        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n        t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;\n        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n    })(window, document, \"clarity\", \"script\", '".concat(msClarityID, "');");
    (0, react_1.useEffect)(function () {
        // @ts-ignore
        window.gtag('config', gaTrackingID, {
            transport_url: 'https://ping.hashnode.com',
            first_party_collection: true,
        });
    }, []);
    return (<>
			{fbPixelID ? (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: fbPixel }}></script>) : null}
			{fathomSiteID && (<script src={fathomCustomDomainEnabled
                ? "https://".concat(fathomCustomDomain, "/script.js")
                : 'https://cdn.usefathom.com/script.js'} 
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        spa="auto" 
        // eslint-disable-next-line react/no-unknown-property
        site={fathomSiteID} defer></script>)}
			{hotjarSiteID && hotjarForUsers && (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: hotjarForUsers }}></script>)}
			{matomoURL && (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: matomoAnalytics }}></script>)}
			{gTagManagerID && (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: googleTagManager }}></script>)}
			{koalaForUsers && (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: koalaForUsers }}></script>)}
			{msClarityForUsers && (<script type="text/javascript" dangerouslySetInnerHTML={{ __html: msClarityForUsers }}></script>)}
			{plausibleAnalyticsEnabled && (<script async defer data-domain={domainURL} src="https://plausible.io/js/plausible.js"></script>)}
		</>);
}
