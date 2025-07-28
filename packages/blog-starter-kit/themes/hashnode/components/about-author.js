"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_author_info_1 = require("./post-author-info");
var appContext_1 = require("./contexts/appContext");
function AboutAuthor() {
    var _post = (0, appContext_1.useAppContext)().post;
    var post = _post;
    var publication = post.publication, author = post.author;
    var coAuthors = post.coAuthors || [];
    var allAuthors = (publication === null || publication === void 0 ? void 0 : publication.isTeam) ? __spreadArray([author], coAuthors, true) : [author];
    return (<div className="mb-5 mt-10 flex flex-col gap-16">
      <div className="flex-1 px-2">
        <div className="flex flex-col flex-wrap items-start md:flex-nowrap">
          <h3 className="mb-4 w-full border-b-1-1/2 pb-2 text-base font-medium tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-400 ">
            Written by
          </h3>
          <div className="flex w-full flex-col gap-12">
            {allAuthors.map(function (_author) {
            return (<post_author_info_1.default key={_author.id.toString()} author={_author}/>);
        })}
          </div>
        </div>
      </div>
    </div>);
}
exports.default = AboutAuthor;
