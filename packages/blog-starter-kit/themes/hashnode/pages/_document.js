"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;
var document_1 = require("next/document");
function Document() {
    return (<document_1.Html lang="en">
			<document_1.Head>
				{/* Optional: Google Site Verification Meta Tag (replace with your actual code if needed) */}
				<meta name="google-adsense-account" content="ca-pub-8155500837029256"/>

				{/* Google AdSense Script */}
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155500837029256" crossOrigin="anonymous"/>
			</document_1.Head>
			<body>
				<document_1.Main />
				<document_1.NextScript />
				<div id="hn-toast"/>
			</body>
		</document_1.Html>);
}
