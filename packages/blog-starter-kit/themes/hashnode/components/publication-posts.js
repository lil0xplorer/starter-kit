"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_waypoint_1 = require("react-waypoint");
var tailwind_merge_1 = require("tailwind-merge");
var svgs_1 = require("./icons/svgs");
var hn_button_1 = require("./hn-button");
var pub_loader_component_1 = require("./pub-loader-component");
var blog_post_preview_1 = require("./blog-post-preview");
var PublicationPosts = function (props) {
    var posts = props.posts, publication = props.publication, pinnedPostId = props.pinnedPostId, fetchMore = props.fetchMore, fetching = props.fetching, fetchedOnce = props.fetchedOnce;
    var edges = posts.edges, pageInfo = posts.pageInfo;
    var layout = publication.preferences.layout;
    return (<>
      <div className={(0, tailwind_merge_1.twJoin)('blog-posts-wrapper mt-10', layout === 'grid' ? 'flex flex-row flex-wrap items-start' : '')}>
        {edges.map(function (_a) {
            var node = _a.node;
            return (<blog_post_preview_1.default key={node.id} post={node} publication={publication} pinnedPostId={pinnedPostId}/>);
        })}
        {pageInfo.hasNextPage && !fetchedOnce && !fetching ? (<div className="mb-16 flex w-full flex-row items-center justify-center">
            <hn_button_1.default type="button" variant="transparent" className="w-full justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500" onClick={fetchMore}>
              <span>Load more</span>
              <svgs_1.ChevronDownSVG className="ml-3 h-5 w-5 fill-current"/>
            </hn_button_1.default>
          </div>) : null}
        {fetching ? <pub_loader_component_1.default layout={publication.preferences.layout}/> : null}
      </div>
      {fetchedOnce && pageInfo.hasNextPage ? <react_waypoint_1.Waypoint onEnter={fetchMore} topOffset="-20%"/> : null}
      {fetchedOnce && !pageInfo.hasNextPage ? (<div className="blog-posts-end-card my-10 px-16 py-8 text-center font-heading font-bold text-slate-700 dark:text-slate-300">
          <p className="text-2xl">You&apos;ve reached the end! 👋</p>
        </div>) : null}
    </>);
};
exports.default = PublicationPosts;
