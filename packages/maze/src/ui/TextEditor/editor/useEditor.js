import React, { useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Range } from "slate";
import { withReact } from "slate-react";
import { withLinks } from "./plugins/link";
import { withImages } from "./plugins/images";
import { withVideo } from "./plugins/videos";
import { withEmbeds } from "./plugins/embed";
import { DefaultElement, LeafElement } from "./elements";
import { withHistory } from "slate-history";

export function useEditor() {
  const editorRef = useRef();
  const editor = useMemo(() => {
    editorRef.current = withHistory(
      withImages(withVideo(withEmbeds(withLinks(withReact(createEditor())))))
    );
    return editorRef.current;
  }, []);

  const [toolbarAnchor, setToolbarAnchor] = useState(null);

  const handleSelection = (ev) => {
    ev.preventDefault();
    // filter out outside selection
    if (!editor.selection || Range.isCollapsed(editor.selection)) {
      setToolbarAnchor(null);
      return;
    }

    // editor.selection is not updated/synced yet, use native selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setToolbarAnchor(null);
      return;
    }

    const DOMRange = selection.getRangeAt(0);
    const DOMRect = DOMRange.getBoundingClientRect();

    // "debounce"
    setTimeout(() => {
      setToolbarAnchor({
        clientWidth: DOMRect.width,
        clientHeight: DOMRect.height,
        getBoundingClientRect: () => DOMRect,
      });
    }, 100);
  };

  const RenderElements = useCallback(
    (props) => <DefaultElement {...props} />,
    []
  );

  const LeafElements = useCallback((props) => <LeafElement {...props} />, []);

  return {
    editor,
    RenderElements,
    LeafElements,
    handleSelection,
    toolbarAnchor,
    setToolbarAnchor,
  };
}
