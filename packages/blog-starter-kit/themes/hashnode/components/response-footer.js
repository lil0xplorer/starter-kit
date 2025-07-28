"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var tailwind_merge_1 = require("tailwind-merge");
var response_reply_card_1 = require("./response-reply-card");
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
function ResponseFooter(props) {
    var isPublicationPost = props.isPublicationPost, response = props.response, draftId = props.draftId, _a = props.isValidating, isValidating = _a === void 0 ? false : _a;
    var _b = (0, react_1.useState)(1), repliesToShow = _b[0], setRepliesToShow = _b[1];
    var _c = (0, react_1.useState)(false), hideShowAllBox = _c[0], toggleShowAllBox = _c[1];
    var showAllReplies = function (e) {
        e.preventDefault();
        setRepliesToShow(response.replies.edges.length);
        toggleShowAllBox(true);
    };
    var hideAllReplies = function (e) {
        e.preventDefault();
        setRepliesToShow(1);
        toggleShowAllBox(false);
    };
    var toggleAllReplies = function (e) {
        if (response.replies.edges.length > 1) {
            if (!hideShowAllBox) {
                showAllReplies(e);
            }
            else
                hideAllReplies(e);
        }
    };
    var replies = response.replies.edges.slice(-1 * repliesToShow).map(function (reply) { return (<div key={reply.node.id.toString()}>
      <div className="my-1.5 ml-3.5 h-6 w-px border dark:border-slate-600"/>
      <response_reply_card_1.default draftId={draftId} isPublicationPost={isPublicationPost} key={reply.node.id.toString()} response={response} reply={reply.node} isValidating={isValidating}/>
    </div>); });
    return (<div className="w-full">
      <div className="flex flex-row flex-nowrap items-center gap-4">
        {response.replies.edges.length > 0 && (<div className="flex items-center">
            <hn_button_1.default variant="transparent" onClick={toggleAllReplies} className="flex flex-row items-center rounded-full p-1 text-sm font-medium text-slate-600 hover:bg-slate-100 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800" aria-label="Reply to comment">
              <svgs_1.CommentSVGV2 className="h-5 w-5 stroke-current"/>
            </hn_button_1.default>
            <button type="button" onClick={toggleAllReplies} className={(0, tailwind_merge_1.twJoin)('p-0 text-sm text-slate-500 focus:outline-none dark:text-slate-300', hideShowAllBox && 'hover:underline')}>
              <span>{!hideShowAllBox ? response.replies.edges.length : 'Hide replies'}</span>
            </button>
          </div>)}
      </div>
      {response.replies.edges.length > 0 && (<div className="ml-3 min-w-0">
          {replies}
          {response.replies.edges.length > 1 && !hideShowAllBox && (<a href="#" onClick={showAllReplies} className="flex py-2 text-sm text-blue-500 hover:underline">
              <span className="font-medium">Show more replies</span>
            </a>)}
        </div>)}
    </div>);
}
exports.default = ResponseFooter;
