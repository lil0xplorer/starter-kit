"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tailwind_merge_1 = require("tailwind-merge");
var custom_image_1 = require("./custom-image");
var image_1 = require("../utils/image");
function PostAuthorInfo(props) {
    var _a, _b, _c, _d, _e;
    var author = props.author;
    return (<div className="flex w-full flex-1 flex-col md:flex-row">
      <div className="mb-4 flex w-full flex-1 flex-row md:mb-0 ">
        <div className="mr-4 flex flex-row md:mb-0">
          <a href={"https://hashnode.com/@".concat(author.username)} className="block h-10 w-10 overflow-hidden rounded-full border dark:border-slate-800 md:h-14 md:w-14">
            <custom_image_1.default className="block" placeholder="blur" originalSrc={author.profilePicture} src={(0, image_1.resizeImage)(author.profilePicture, {
            w: 256,
            h: 256,
            c: 'thumb',
        })} blurDataURL={(0, image_1.getBlurHash)((0, image_1.resizeImage)(author.profilePicture, {
            w: 256,
            h: 256,
            c: 'thumb',
        }))} width={256} height={256} alt={author.name}/>
          </a>
        </div>
        <div className={(0, tailwind_merge_1.twJoin)('flex flex-1 flex-col justify-center md:justify-start', !((_a = author.bio) === null || _a === void 0 ? void 0 : _a.html) ? 'md:justify-center' : '')}>
          <div className="flex flex-row items-center md:mb-1">
            <h1 className="font-sans text-lg font-semibold text-slate-800 dark:text-slate-100">
              <a href={"https://hashnode.com/@".concat(author.username)}>{author.name}</a>
            </h1>
          </div>
          {((_b = author.bio) === null || _b === void 0 ? void 0 : _b.html) && (<div className="hidden pr-2 md:block">
              <div className="prose text-slate-600 dark:prose-dark dark:text-slate-300" dangerouslySetInnerHTML={{ __html: (_c = author.bio) === null || _c === void 0 ? void 0 : _c.html }}/>
            </div>)}
        </div>
      </div>
      {((_d = author.bio) === null || _d === void 0 ? void 0 : _d.html) && (<div className="mb-4 block md:hidden">
          <div className="prose text-slate-600 dark:prose-dark " dangerouslySetInnerHTML={{ __html: (_e = author.bio) === null || _e === void 0 ? void 0 : _e.html }}/>
        </div>)}
    </div>);
}
exports.default = PostAuthorInfo;
