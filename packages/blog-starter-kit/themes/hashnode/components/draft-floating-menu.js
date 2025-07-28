"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tooltip = require("@radix-ui/react-tooltip");
var react_1 = require("react");
var toc_sheet_1 = require("./toc-sheet");
function DraftFloatingMenu(props) {
    var draft = props.draft, list = props.list;
    var handleFloatingBarDisplay = function () {
        var blogHeader = document.querySelector('.blog-header');
        var blogContent = document.querySelector('#post-content-parent');
        var floatingBar = document.querySelector('.post-floating-bar');
        if (!(floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.contains('freeze'))) {
            if (window.scrollY > blogHeader.clientHeight) {
                floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.add('active', 'animation');
            }
            else if (floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.contains('active')) {
                floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.remove('active');
            }
        }
        var currentViewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // Adding 40 as a buffer to adjust the trigger
        var isPostContentBottomInsideViewport = blogContent.getBoundingClientRect().bottom + 40 <= currentViewportHeight;
        // Adding 175 as a buffer to adjust the trigger
        var isPostContentBottomAlmostOut = window.scrollY - currentViewportHeight - 175 <= blogContent.clientHeight &&
            (floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.contains('freeze'));
        if (isPostContentBottomInsideViewport) {
            floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.remove('active');
            floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.add('freeze');
        }
        else if (isPostContentBottomAlmostOut) {
            floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.remove('freeze', 'animation');
            floatingBar === null || floatingBar === void 0 ? void 0 : floatingBar.classList.add('active');
        }
    };
    (0, react_1.useEffect)(function () {
        handleFloatingBarDisplay();
        window.addEventListener('scroll', handleFloatingBarDisplay);
        return function () {
            window.removeEventListener('scroll', handleFloatingBarDisplay);
        };
    }, []);
    return (<Tooltip.Provider delayDuration={200}>
      <style 
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
            __html: ".post-floating-bar {\n              bottom: -60px;\n            }\n            .post-floating-bar.animation {\n              -webkit-transition: .2s all;\n              -o-transition: .2s all;\n              transition: .2s all;\n              transition-timing-function: ease-in;\n            }\n            .post-floating-bar.active {\n              bottom: 40px\n            }\n            .post-floating-bar.freeze {\n              bottom: 0!important;\n              position: absolute!important;\n              transition: none!important;\n            }\n            .post-floating-bar.freeze > div {\n              box-shadow: none!important;\n            }\n            ",
        }}/>

      <div className="post-floating-bar fixed left-0 right-0 z-50 flex h-12 w-full flex-wrap justify-center 2xl:h-14">
        <div className="mx-auto flex h-12 max-w-[380px] flex-wrap items-center justify-around rounded-full border-1/2 border-slate-200 bg-white px-5 py-1 text-sm  text-slate-800 shadow-lg dark:border-slate-500 dark:bg-slate-700 dark:text-slate-50 2xl:h-14">
          {draft.features.tableOfContents.isEnabled && (<>
              <toc_sheet_1.default list={list}/>
            </>)}
        </div>
      </div>
    </Tooltip.Provider>);
}
exports.default = DraftFloatingMenu;
