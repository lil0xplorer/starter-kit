"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("../utils/image");
var tailwind_merge_1 = require("tailwind-merge");
// TODO: this component name is confusing.
var PublicationMeta = function (props) {
    var isTeam = props.isTeam, aboutHTML = props.aboutHTML, author = props.author;
    var authorImageURL = (0, image_1.resizeImage)(author.profilePicture || 'https://cdn.hashnode.com/res/hashnode/image/upload/v1659089761812/fsOct5gl6.png', { w: 400, h: 400, c: 'face' });
    return (<div className="blog-author-card mx-auto px-2 py-8 md:px-8 md:py-10">
      <div className="flex flex-col flex-wrap items-center">
        <div className="flex w-full flex-col items-center">
          {aboutHTML ? (<div className={(0, tailwind_merge_1.twJoin)('prose text-center dark:prose-dark', isTeam ? 'max-w-full lg:prose-xl' : '')} 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: aboutHTML }}/>) : null}
        </div>
      </div>
    </div>);
};
exports.default = PublicationMeta;
