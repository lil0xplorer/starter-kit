"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tailwind_merge_1 = require("tailwind-merge");
var link_1 = require("next/link");
var image_1 = require("../utils/image");
var profile_image_1 = require("./profile-image");
var custom_image_1 = require("./custom-image");
function OtherPostsOfAccount(props) {
    var morePosts = props.morePosts, post = props.post;
    if (!morePosts || morePosts.length === 0) {
        return <div />;
    }
    var morePostsRendered = morePosts.map(function (postNode) {
        var post = postNode.node;
        var postURL = "/".concat(post.slug);
        return (<div className={(0, tailwind_merge_1.twJoin)('mb-5 px-2 dark:border-slate-800 lg:mb-0', morePosts.length === 1
                ? 'col-span-full md:col-span-4 md:col-start-2 xl:col-span-3 xl:col-start-4'
                : 'col-span-full md:col-span-3 lg:col-span-2 xl:col-span-3')} key={post.id.toString()}>
        <div className="blog-similar-article-wrapper h-full rounded-lg border p-4 dark:border-slate-800">
          {post.author && (<div className="blog-similar-author-wrapper mb-3 flex flex-row items-center">
              <div className="flex flex-row items-center">
                <div className="mr-2 h-6 w-6 overflow-hidden rounded-full">
                  <profile_image_1.default user={post.author} className="blog-similar-author-photo author-photo" hoverDisabled={true}/>
                </div>
                <a href={"https://hashnode.com/@".concat(post.author.username)} className="blog-similar-author-name font-bold text-black dark:text-white">
                  {post.author.name}
                </a>
              </div>
            </div>)}
          {post.coverImage && (<link_1.default href={postURL} className="blog-similar-article-cover post-cover mb-3 block rounded border bg-cover bg-center dark:border-slate-800">
              <custom_image_1.default alt={post.title} layout="responsive" className="rounded" width={500} height={262} originalSrc={post.coverImage.url} src={(0, image_1.resizeImage)(post.coverImage.url, { w: 500, h: 262, c: 'thumb' })}/>
            </link_1.default>)}
          <div className="blog-post-details break-words">
            <h1 className="mb-2 font-heading text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              <link_1.default href={postURL}>
                {post.title.substring(0, 100)}
                {post.title.length > 100 ? '…' : ''}
              </link_1.default>
            </h1>
            {post.brief && (<p className={(0, tailwind_merge_1.twJoin)(post.coverImage ? 'text-base' : 'text-base md:text-lg', 'text-slate-700 dark:text-slate-400')}>
                <link_1.default href={postURL}>
                  {post.brief.substring(0, 100)}
                  {post.brief.length > 100 ? '…' : ''}
                </link_1.default>
              </p>)}
          </div>
        </div>
      </div>);
    });
    return (<div className="blog-more-articles mt-10 mb-20">
      <h3 className="blog-more-articles-title mb-5 text-center font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {true ? 'More articles' : "More Stories by ".concat(post.author.name)}
      </h3>
      <div className="blog-more-articles-wrapper container mx-auto grid grid-flow-row grid-cols-6 px-4 xl:grid-cols-9 xl:gap-6 2xl:px-0">
        {morePostsRendered}
      </div>
    </div>);
}
exports.default = OtherPostsOfAccount;
