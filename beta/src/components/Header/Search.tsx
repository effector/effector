/** @jsxImportSource react */
import { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import * as docSearch from "@docsearch/react";
import "@docsearch/css";

import { ALGOLIA } from "../../consts";
import "./Search.css";

/** FIXME: This is still kinda nasty, but DocSearch is not ESM ready. */
const DocSearchModal = docSearch.DocSearchModal || (docSearch as any).default.DocSearchModal;
const useDocSearchKeyboardEvents =
  docSearch.useDocSearchKeyboardEvents || (docSearch as any).default.useDocSearchKeyboardEvents;

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [initialQuery, setInitialQuery] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <button type="button" ref={searchButtonRef} onClick={onOpen} className="search-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>

        <span className="search-text">Search</span>

        <span className="search-hint">
          <span className="sr-only">Press </span>

          <kbd>⌘</kbd>
          <kbd>K</kbd>

          <span className="sr-only"> to search</span>
        </span>
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName={ALGOLIA.indexName}
            appId={ALGOLIA.appId}
            apiKey={ALGOLIA.apiKey}
            transformItems={(items) =>
              items.map((item) => {
                // We transform the absolute URL into a relative URL to
                // work better on localhost, preview URLS.
                const a = document.createElement("a");
                a.href = item.url;
                const hash = a.hash === "#overview" ? "" : a.hash;
                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                };
              })
            }
          />,
          document.body,
        )}
    </>
  );
}
