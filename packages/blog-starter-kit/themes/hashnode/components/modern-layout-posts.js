"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_waypoint_1 = require("react-waypoint");
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
var magazine_blog_post_preview_1 = require("./magazine-blog-post-preview");
var PublicationPosts = function (props) {
    var posts = props.posts, publication = props.publication, fetchMore = props.fetchMore, fetching = props.fetching, fetchedOnce = props.fetchedOnce;
    var edges = posts.edges, pageInfo = posts.pageInfo;
    var slicedPosts = edges.map(function (edge) { return edge.node; }).slice(3);
    return (<div className="blog-articles-area mx-auto mt-10 dark:border-slate-800">
      <div className="blog-articles-container container mx-auto grid grid-cols-1 gap-10 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:py-10 xl:px-10 2xl:px-24 2xl:py-5">
        {slicedPosts.map(function (post) { return (<magazine_blog_post_preview_1.default key={post.id} post={post} publication={publication}/>); })}
        {fetching && (<>
            <div className="col-span-1 animate-pulse">
              <div style={{ paddingTop: '52.5%' }} className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800"/>
            </div>
            <div className="col-span-1 animate-pulse">
              <div style={{ paddingTop: '52.5%' }} className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800"/>
            </div>
            <div className="col-span-1 animate-pulse">
              <div style={{ paddingTop: '52.5%' }} className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800"/>
              <div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800"/>
            </div>
          </>)}
        {pageInfo.hasNextPage && !fetchedOnce && !fetching ? (<div className="col-span-1 flex flex-row justify-center py-10 md:col-span-2 lg:col-span-3">
            <hn_button_1.default type="button" variant="transparent" className="w-full justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500" onClick={fetchMore}>
              <span>Load more</span>
              <svgs_1.ChevronDownSVG className="ml-3 h-5 w-5 fill-current"/>
            </hn_button_1.default>
          </div>) : null}
      </div>
      {fetchedOnce && pageInfo.hasNextPage ? <react_waypoint_1.Waypoint onEnter={fetchMore} topOffset="-20%"/> : null}
      {fetchedOnce && !pageInfo.hasNextPage ? (<div className="blog-posts-end-card mt-10 px-16 py-8 text-center font-heading font-bold text-slate-700 dark:text-slate-300">
          <p className="text-2xl">You&apos;ve reached the end! 👋</p>
        </div>) : null}
    </div>);
};
exports.default = PublicationPosts;
