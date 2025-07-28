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
exports.default = CoAuthorsModal;
var hn_button_1 = require("./hn-button");
var svgs_1 = require("./icons/svgs");
var DialogPrimitive = require("@radix-ui/react-dialog");
var scroll_area_1 = require("./scroll-area");
var images_1 = require("../utils/const/images");
var resizable_image_1 = require("./resizable-image");
var appContext_1 = require("./contexts/appContext");
var AuthorCard = function (_a) {
    var author = _a.author;
    return (<div className="flex flex-row items-center justify-between" key={author.id.toString()}>
      <div className="flex w-full flex-wrap items-center justify-between overflow-hidden px-0 py-2.5">
        <div className="flex flex-wrap items-center overflow-hidden">
          <a href={"https://hashnode.com/@".concat(author.username)} title={author.name} className="mr-2 w-8">
            <resizable_image_1.ResizableImage src={author.profilePicture || images_1.DEFAULT_AVATAR} resize={{ w: 200, h: 200, c: 'face' }} className="mr-3 h-8 w-8 rounded-full"/>
          </a>
          <div className="flex flex-row items-center text-clip">
            <a href={"https://hashnode.com/@".concat(author.username)} title={author.name} className="truncate font-sans text-sm font-medium text-slate-700 dark:text-slate-200">
              {author.name}
            </a>
          </div>
        </div>
      </div>
    </div>);
};
function CoAuthorsModal(_a) {
    var closeModal = _a.closeModal;
    var post = (0, appContext_1.useAppContext)().post;
    var authors = __spreadArray([post === null || post === void 0 ? void 0 : post.author], ((post === null || post === void 0 ? void 0 : post.coAuthors) || []), true);
    return (<DialogPrimitive.Root open>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay onClick={closeModal} className="fixed inset-0 z-50 bg-slate-900 opacity-50 transition-opacity duration-300 ease-out dark:bg-slate-600"/>
        <DialogPrimitive.Content onEscapeKeyDown={closeModal} className="fixed bottom-0 left-0 right-0 z-50 flex w-full max-w-[1200px] flex-col items-center overflow-hidden rounded-b-none rounded-t-lg border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 md:bottom-50 md:left-50 md:w-96 md:-translate-x-1/2 md:translate-y-1/2 md:rounded-xl lg:w-108 xl:w-116">
          <DialogPrimitive.DialogTitle className="w-full px-6 py-4 text-lg font-semibold">
            Authors in this article
          </DialogPrimitive.DialogTitle>
          <DialogPrimitive.Close className="absolute right-2 top-4 text-slate-900 dark:text-slate-50" asChild>
            <hn_button_1.default className="p-1 focus:outline-none focus-visible:ring focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800" onClick={closeModal} aria-label="Close sign in modal" variant="transparent">
              <svgs_1.CloseSVG className="h-5 w-5 fill-current"/>
            </hn_button_1.default>
          </DialogPrimitive.Close>
          <scroll_area_1.default>
            <div className="px-6 pb-8">
              {authors.map(function (author) {
            if (!author) {
                return null;
            }
            return <AuthorCard author={author} key={author.id.toString()}/>;
        })}
            </div>
          </scroll_area_1.default>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>);
}
