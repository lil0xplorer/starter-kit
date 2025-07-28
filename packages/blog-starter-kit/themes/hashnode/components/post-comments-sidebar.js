"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comments_sheet_1 = require("./comments-sheet");
var response_list_1 = require("./response-list");
var PostCommentsSidebar = function (_a) {
    var hideSidebar = _a.hideSidebar, isPublicationPost = _a.isPublicationPost, selectedFilter = _a.selectedFilter, post = _a.post;
    return (<comments_sheet_1.default hideSheet={hideSidebar}>

    {!post.preferences.disableComments ? (<response_list_1.default isPublicationPost={isPublicationPost} currentFilter={selectedFilter}/>) : (<div className="flex h-full items-center justify-center text-base text-slate-500 dark:text-slate-400">
        <p className="mx-auto w-4/5 text-center">The comments have been disabled by the author for this article</p>
      </div>)}
  </comments_sheet_1.default>);
};
exports.default = PostCommentsSidebar;
