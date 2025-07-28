"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollArea = require("@radix-ui/react-scroll-area");
var scrollbarStyles = "\n.ScrollAreaRoot {\n width: 100%;\n --scrollbar-size: 2px;\n overflow: auto;\n }\n\n .ScrollAreaViewport {\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  }\n\n .ScrollAreaScrollbar {\n  display: flex;\n  /* ensures no selection */\n  user-select: none;\n  /* disable browser handling of all panning and zooming gestures on touch devices */\n  touch-action: none;\n  padding: 5px;\n  transition: background 160ms ease-out;\n  }\n .ScrollAreaScrollbar[data-orientation='vertical'] {\n  width: 5px;\n  }\n .ScrollAreaScrollbar[data-orientation='horizontal'] {\n  flex-direction: column;\n  height: 5px;\n  }\n\n .ScrollAreaThumb {\n  flex: 1;\n  border-radius: 20px;\n  position: relative;\n  }\n .ScrollAreaThumb::before {\n  background: #E2E8F0;\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  min-width: 9px;\n  min-height: 9px;\n  }\n .dark .ScrollAreaThumb::before {\n  background: #475569;\n  }\n";
var CustomScrollArea = function (_a) {
    var children = _a.children;
    return (<>
    <style 
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: scrollbarStyles }}/>
    <ScrollArea.Root type="scroll" className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
        <ScrollArea.Thumb className="ScrollAreaThumb"/>
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
        <ScrollArea.Thumb className="ScrollAreaThumb"/>
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner"/>
    </ScrollArea.Root>
  </>);
};
exports.default = CustomScrollArea;
