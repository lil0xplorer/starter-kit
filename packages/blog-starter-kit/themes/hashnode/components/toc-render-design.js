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
var react_1 = require("react");
var image_1 = require("next/legacy/image");
var router_1 = require("next/router");
var tailwind_merge_1 = require("tailwind-merge");
var svgs_1 = require("./icons/svgs");
var toc_sheet_1 = require("./toc-sheet");
function TocRow(props) {
    var children = props.children, node = props.node, modal = props.modal;
    var _a = (0, react_1.useState)(false), childrenVisibility = _a[0], setChildrenVisibility = _a[1];
    var hideTocModal = (0, toc_sheet_1.useTocModalStore)().hide;
    return (<li key={node.id} className="px-2 py-0.5 align-middle">
			<div className={(0, tailwind_merge_1.twJoin)('flex items-center gap-2 rounded-lg', modal ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : 'hover:underline')}>
				{node.hasChildren && (<button type="button" className="pl-2.5 text-slate-400" aria-label={childrenVisibility ? "Collapse ".concat(node.title) : "Expand ".concat(node.title)} aria-expanded={childrenVisibility} onClick={function () {
                setChildrenVisibility(function (prevVisibility) { return !prevVisibility; });
            }}>
						{childrenVisibility ? (<svgs_1.ChevronDownSVG_16x16 className="h-4 w-4 stroke-current"/>) : (<svgs_1.ChevronRightSVG_16x16 className="h-4 w-4 stroke-current"/>)}
					</button>)}
				<a id={node.id} className={(0, tailwind_merge_1.twJoin)('w-full py-2.5 pr-2.5 text-sm font-medium text-slate-800 dark:text-slate-100', !node.hasChildren && 'pl-3')} href={"#heading-".concat(node.slug)} onClick={function () {
            if (hideTocModal && modal) {
                // This rAF is required to prevent flickering of the navbar when the user clicks on a link in the TOC modal
                requestAnimationFrame(function () {
                    hideTocModal();
                });
            }
        }} 
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
            __html: node.title,
        }} aria-label={node.title}/>
			</div>
			{node.hasChildren ? (<> {childrenVisibility && <div className="pl-5">{children}</div>} </>) : (<>{children}</>)}
		</li>);
}
function TocTree(props) {
    var list = props.list, minHeaderLevel = props.minHeaderLevel, currentItem = props.currentItem, _a = props.numItemsCompleted, numItemsCompleted = _a === void 0 ? 0 : _a, modal = props.modal;
    if (!list || list.length === 0 || numItemsCompleted >= list.length) {
        return null;
    }
    var nodes = [];
    if (numItemsCompleted > 0) {
        nodes = list.filter(function (node) {
            if (node.parentId && node.level === 3 && node.id === currentItem.parentId) {
                // eslint-disable-next-line no-param-reassign
                node.hasChildren = true;
            }
            return node.parentId === currentItem.id;
        });
    }
    else {
        // Find the largest header size and each of those headers
        var minHeader_1 = minHeaderLevel ||
            list.reduce(function (prevNode, currNode) { return (prevNode.level < currNode.level ? prevNode : currNode); });
        nodes = list.filter(function (header) { return header.level === minHeader_1.level; });
        // When the first heading is not the largest, capture previous suitable headings for top level nodes
        if (!nodes[0].parentId) {
            var temp = [];
            var curLevel = 0;
            for (var i = 0; i < list.indexOf(nodes[0]); i++) {
                if (!list[i].previousLevel || list[i].level <= curLevel) {
                    // set a new initial level li
                    curLevel = list[i].level;
                    temp.push(list[i]);
                }
            }
            nodes = __spreadArray(__spreadArray([], temp, true), nodes, true);
        }
    }
    if (!nodes || !nodes.length) {
        return null;
    }
    return (<ul className="list-inside font-semibold dark:border-slate-800">
			{nodes.map(function (node) { return (<TocRow key={node.id} node={node} modal={modal}>
					<TocTree currentItem={node} list={list} numItemsCompleted={numItemsCompleted + nodes.length} minHeaderLevel={minHeaderLevel} modal={modal}/>
				</TocRow>); })}
		</ul>);
}
var TocRenderDesign = function (props) {
    var list = props.list, hideShowMoreOption = props.hideShowMoreOption, modal = props.modal;
    var _a = (0, react_1.useState)(false), tocFullVisibility = _a[0], setTocFullVisibility = _a[1];
    var _b = (0, react_1.useState)(false), isOverflowing = _b[0], setIsOverflowing = _b[1];
    var router = (0, router_1.useRouter)();
    var pathname = router.pathname;
    var isDraftPreview = pathname.indexOf('/preview') === 0;
    var tocContainerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var hasEnoughItems = list && list.length >= 12;
        var shouldShowMoreOption = hideShowMoreOption !== false && hasEnoughItems;
        setIsOverflowing(shouldShowMoreOption);
        setTocFullVisibility(!hasEnoughItems || hideShowMoreOption === true);
    }, []);
    return (<div className={(0, tailwind_merge_1.twJoin)('relative mb-10 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 pt-0 dark:border-slate-800 dark:bg-slate-900', modal && 'mb-0 rounded-none border-none px-0 py-4')} ref={tocContainerRef}>
			<div className={tocFullVisibility ? 'max-h-full' : 'max-h-[388px] overflow-hidden'}>
				{/* Header */}
				{modal || (<div className="pt-4">
						<h2 className="px-[18px] py-2 text-sm font-medium uppercase text-slate-500 dark:text-slate-400">
							<span>Table of contents</span>
						</h2>
					</div>)}
				{/* Body */}
				{(list === null || list === void 0 ? void 0 : list.length) === 0 ? (<div className="flex h-[388px] flex-col items-center justify-center gap-2">
						<div className="relative h-[110px] w-[110px]">
							<image_1.default src="https://cdn.hashnode.com/res/hashnode/image/upload/v1686858363512/7ad376cf-1646-4bd4-b74c-25cf8f47238b.png" alt="No heading" layout="fill"/>
						</div>
						<h3 className="text-center text-sm text-slate-700">
							No headings in the {isDraftPreview ? 'draft' : 'article'}.
						</h3>
					</div>) : (<>
						<TocTree list={list} modal={modal}/>
						{/* Overlay */}
						{!tocFullVisibility && isOverflowing && (<div className="absolute bottom-0 right-0 w-full">
								<div className="h-40 bg-gradient-to-t from-white to-transparent dark:from-slate-900"/>
							</div>)}
					</>)}
			</div>

			{/* Show more toggle option */}
			{isOverflowing && !hideShowMoreOption && (<div className="relative z-20 flex items-center justify-center">
					<button type="button" className="flex items-center justify-center gap-2" aria-expanded={tocFullVisibility} aria-label={tocFullVisibility ? 'Show less content' : 'Show more content'} onClick={function () {
                var _a;
                setTocFullVisibility(function (prevVisibility) { return !prevVisibility; });
                (_a = tocContainerRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
            }}>
						{tocFullVisibility ? (<>
								<span className="text-sm text-slate-600 dark:text-slate-300">Show less</span>
								<svgs_1.ChevronUpSVG_16x16 className="h-4 w-4 stroke-current text-slate-500"/>
							</>) : (<>
								<span className="text-sm text-slate-600 dark:text-slate-300">Show more</span>
								<svgs_1.ChevronDownSVG_16x16 className="h-4 w-4 stroke-current text-slate-500"/>
							</>)}
					</button>
				</div>)}
		</div>);
};
exports.default = TocRenderDesign;
