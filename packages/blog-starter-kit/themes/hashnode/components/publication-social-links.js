"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var svgs_1 = require("./icons/svgs");
var publication_social_link_item_1 = require("./publication-social-link-item");
var tailwind_merge_1 = require("tailwind-merge");
function PublicationSocialLinks(props) {
    var links = props.links, isSidebar = props.isSidebar;
    var linkSVGMap = {
        twitter: {
            icon: <svgs_1.TwitterXSVG className="h-5 w-5 stroke-current"/>,
            labelText: 'Find me on Twitter, external website, opens in new tab',
        },
        instagram: {
            icon: <svgs_1.InstagramSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Find me on Instagram, external website, opens in new tab',
        },
        github: {
            icon: <svgs_1.GithubSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Find me on Github, opens in new tab',
        },
        youtube: {
            icon: <svgs_1.YoutubeSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Subscribe to my channel on YouTube, external website, opens in new tab',
        },
        hashnode: {
            icon: <svgs_1.HashnodeLogoIconV2 className="h-5 w-5 fill-current"/>,
            labelText: 'Find me on Hashnode, external website, opens in new tab',
        },
        website: {
            icon: <svgs_1.EarthSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Check out my website, external website, opens in new tab',
        },
        linkedin: {
            icon: <svgs_1.LinkedinSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Find me on LinkedIn, external website, opens in new tab',
        },
        mastodon: {
            icon: <svgs_1.MastodonSVG className="h-5 w-5 fill-current"/>,
            labelText: 'Find me on Mastodon, external website, opens in new tab',
        },
    };
    return (<>
      {links &&
            (links.twitter ||
                links.mastodon ||
                links.instagram ||
                links.github ||
                links.website ||
                links.hashnode ||
                links.youtube ||
                links.linkedin) ? (<div className={(0, tailwind_merge_1.twJoin)('blog-social-media-section', 'flex flex-row flex-wrap gap-y-2', !isSidebar
                ? 'justify-center gap-x-1.5 text-slate-700 dark:text-slate-300'
                : 'gap-x-6 gap-y-4 text-slate-600 dark:text-slate-200')}>
          {Object.entries(links)
                .filter(function (entry) { return entry[0] !== '__typename'; })
                .map(function (link) {
                var key = link[0];
                var value = link[1];
                if (!value)
                    return null;
                return (<publication_social_link_item_1.default key={key} href={value} labelText={linkSVGMap[key].labelText} isSidebar={!!isSidebar}>
                  {linkSVGMap[key].icon}
                </publication_social_link_item_1.default>);
            })}
          <publication_social_link_item_1.default key="rss" href="rss.xml" labelText="Open blog XML Feed, opens in new tab" isSidebar={!!isSidebar}>
            <svgs_1.RssSVG className="h-5 w-5 fill-current"/>
          </publication_social_link_item_1.default>
        </div>) : null}
    </>);
}
exports.default = PublicationSocialLinks;
