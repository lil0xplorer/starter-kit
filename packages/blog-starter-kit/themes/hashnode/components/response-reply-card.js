"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
var localizedFormat_1 = require("dayjs/plugin/localizedFormat");
var autolinker_1 = require("../utils/autolinker");
var profile_image_1 = require("./profile-image");
var utils_1 = require("../utils");
var tailwind_merge_1 = require("tailwind-merge");
var appContext_1 = require("./contexts/appContext");
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.extend(localizedFormat_1.default);
function ResponseReplyCard(props) {
    var isPublicationPost = props.isPublicationPost, response = props.response, reply = props.reply, draftId = props.draftId;
    var post = (0, appContext_1.useAppContext)().post;
    var isArticleAuthor = reply.author.id.toString() === (post === null || post === void 0 ? void 0 : post.author.id.toString());
    var loadUserProfile = function (e) {
        e.preventDefault();
        // Router.push('/@' + reply.author.username);
    };
    var noop = function (e) {
        e.preventDefault();
    };
    var replyContent = autolinker_1.default.link(reply.content.html, {
        twitter: true,
        truncate: 45,
        css: 'autolinkedURL',
        replaceFn: function (_autolinker, match) {
            switch (match.getType()) {
                case 'twitter':
                    // eslint-disable-next-line no-case-declarations
                    var username = match.getTwitterHandle();
                    return "<a href=\"https://hashnode.com/@".concat(username, "\" class=\"user-mention\" target=\"_blank\" rel=\"noopener\">@").concat(username, "</a>");
                default:
                    return null;
                // case 'url':
                //     var tag = autolinker.getTagBuilder().build(match);
                //     tag.setAttr('rel', 'nofollow');
                //     tag.addClass('external-link');
                //     tag.setAttr('href', 'https://hashnode.com/util/redirect?url=' + match.getUrl());
                //     return tag;
                //     break;
            }
        },
    });
    var formattedDate = (0, utils_1.formatDate)(reply.dateAdded);
    return (<div className="w-full">
      {true ? (<div className="flex flex-row rounded-lg dark:border-slate-800" id={"".concat(reply.stamp)}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between text-slate-900 dark:text-slate-300">
                <div className="flex min-w-0 items-center">
                  <div className="h-8 w-8 shrink-0 rounded-full">
                    <profile_image_1.default width="160" height="160" user={reply.author} className="prof-pic" hoverDisabled={isPublicationPost}/>
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="mr-2 flex items-center truncate">
                      <a className="truncate" href={reply.author && !reply.author.isDeactivated
                ? "".concat(isPublicationPost ? 'https://hashnode.com' : '', "/@").concat(reply.author.username)
                : '#'} onClick={
            // eslint-disable-next-line no-nested-ternary
            reply.author && !reply.author.isDeactivated
                ? isPublicationPost
                    ? undefined
                    : loadUserProfile
                : noop}>
                        <span title={reply.author.name} className={(0, tailwind_merge_1.twJoin)('truncate text-sm font-semibold text-slate-800 dark:text-slate-100 mr-2')}>
                          {reply.author.name}
                        </span>
                      </a>

                      {isArticleAuthor && (<span className="block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium leading-normal text-green-700 dark:bg-green-800 dark:text-green-50">
                          Author
                        </span>)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {/* <a
              href={`#${reply.stamp}`}
              title={moment(reply.dateAdded).format('MMM D, YYYY HH:mm')}
              className="date-time"
              aria-label="Reply added at"
            >
              {formattedDate}
            </a> */}
                      <span title={(0, dayjs_1.default)(response.dateAdded).format('MMM D, YYYY HH:mm')} aria-label="Response added at">
                        {formattedDate}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="prose mt-3 mb-4 break-words leading-snug text-slate-800 dark:text-slate-100 dark:prose-dark" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: replyContent }}/>
          </div>
        </div>) : !draftId ? (null) : (null)}
    </div>);
}
exports.default = ResponseReplyCard;
