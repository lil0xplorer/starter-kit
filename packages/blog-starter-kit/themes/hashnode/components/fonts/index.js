"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFontVariables = void 0;
var google_1 = require("next/font/google");
var inter = (0, google_1.Inter)({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});
var plusJakartaSans = (0, google_1.Plus_Jakarta_Sans)({
    subsets: ['latin'],
    variable: '--font-plus-jakarta-sans',
    display: 'swap',
});
var variableConstant = 'variable';
var fontInterVar = inter.variable.replace(variableConstant, 'Inter');
var fontPlusJakartaSansVar = plusJakartaSans.variable.replace(variableConstant, 'Plus_Jakarta_Sans');
var GlobalFontVariables = function () { return (<style jsx global>{"\n    html {\n      --font-inter: ".concat(fontInterVar, ";\n      --font-plus-jakarta-sans: ").concat(fontPlusJakartaSansVar, ";\n    }\n  ")}</style>); };
exports.GlobalFontVariables = GlobalFontVariables;
