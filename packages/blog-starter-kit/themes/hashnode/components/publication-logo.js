"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("next/link");
var tailwind_merge_1 = require("tailwind-merge");
var commonUtils_1 = require("../utils/commonUtils");
var image_1 = require("../utils/image");
var custom_image_1 = require("./custom-image");
var textStyles = {
    xs: 'text-base text-left',
    sm: 'text-lg md:text-xl text-left',
    lg: 'text-xl md:text-2xl text-left',
    xl: 'text-2xl text-center',
};
var logoSizes = {
    xs: 'w-44',
    sm: 'w-44',
    lg: 'w-64',
    xl: 'w-64',
};
var CustomLogo = function (_a) {
    var publication = _a.publication, logoSrc = _a.logoSrc, _b = _a.size, size = _b === void 0 ? 'lg' : _b, isPostPage = _a.isPostPage;
    var blogTitle = (0, commonUtils_1.generateBlogTitleWithoutDisplayTitle)(publication);
    return (<h1 className="blog-main-logo">
			<link_1.default className={(0, tailwind_merge_1.twJoin)('blog-logo focus-ring-base flex flex-row items-center', 'focus-ring-colors-base', logoSizes[size])} aria-label={"".concat(blogTitle, " home page")} href={"/".concat(isPostPage ? '?source=top_nav_blog_home' : '')}>
				<custom_image_1.default priority objectFit="contain" className="block w-full" src={(0, image_1.resizeImage)(logoSrc, { w: 1000, h: 250 })} originalSrc={logoSrc || ''} width={1000} height={250} alt={blogTitle}/>
			</link_1.default>
		</h1>);
};
var DefaultLogo = function (_a) {
    var publication = _a.publication, _b = _a.size, size = _b === void 0 ? 'lg' : _b, _c = _a.withProfileImage, withProfileImage = _c === void 0 ? false : _c, isPostPage = _a.isPostPage;
    var blogTitle = (0, commonUtils_1.generateBlogTitleWithoutDisplayTitle)(publication);
    return (<h1 className={(0, tailwind_merge_1.twJoin)('blog-title', textStyles[size], 'font-heading break-words font-semibold leading-snug md:font-bold', 'dark:text-white')}>
			<link_1.default href={"/".concat(isPostPage ? '?source=top_nav_blog_home' : '')} className={(0, tailwind_merge_1.twJoin)('focus-ring-base flex flex-row items-center', 'focus-ring-colors-base')} aria-label={"".concat(blogTitle, " home page")}>
				{!publication.isTeam && publication.author.profilePicture && withProfileImage && (<div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
						<custom_image_1.default priority src={(0, image_1.resizeImage)(publication.author.profilePicture, { w: 400, h: 400, c: 'face' })} originalSrc={publication.author.profilePicture} blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(publication.author.profilePicture, { w: 400, h: 400, c: 'face' }))} width={400} height={400} alt={publication.author.name}/>
					</div>)}
				{blogTitle}
			</link_1.default>
		</h1>);
};
function PublicationLogo(props) {
    var _a;
    var publication = props.publication, size = props.size, withProfileImage = props.withProfileImage, isPostPage = props.isPostPage;
    var preferences = publication.preferences;
    if (!publication) {
        return null;
    }
    var useLogo = false || preferences.logo;
    if (useLogo) {
        var logoSrc = false ? (_a = preferences.darkMode) === null || _a === void 0 ? void 0 : _a.logo : preferences.logo;
        return (<CustomLogo publication={publication} logoSrc={logoSrc} size={size} isPostPage={isPostPage}/>);
    }
    return (<DefaultLogo publication={publication} size={size} withProfileImage={withProfileImage} isPostPage={isPostPage}/>);
}
exports.default = PublicationLogo;
