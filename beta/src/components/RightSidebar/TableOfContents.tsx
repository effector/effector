import type { MarkdownHeading } from "astro";
import type { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { unescape } from "html-escaper";
import clsx from "clsx";

import { getTextLocalized, translations } from "../../languages";
import styles from "./TableOfContents.module.css";

type ItemOffsets = {
  id: string;
  topOffset: number;
};

const TableOfContents: FunctionalComponent<{
  headings: MarkdownHeading[];
  collapsed?: boolean;
  lang: string;
}> = ({ headings = [], collapsed = false, lang }) => {
  const toc = useRef<HTMLUListElement>(null);
  const onThisPageID = "on-this-page-heading";
  const itemOffsets = useRef<ItemOffsets[]>([]);
  const [currentID, setCurrentID] = useState("overview");
  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY,
      }));
    };

    getItemOffsets();
    window.addEventListener("resize", getItemOffsets);

    return () => {
      window.removeEventListener("resize", getItemOffsets);
    };
  }, []);

  useEffect(() => {
    if (!toc.current) return;

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageID) continue;
          setCurrentID(entry.target.id);
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: "-100px 0% -66%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

    // Observe all the headings in the main page content.
    document.querySelectorAll("article :is(h1,h2,h3)").forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, [toc.current]);

  const onLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    setCurrentID(e.currentTarget.getAttribute("href")?.replace("#", "")!);
  };

  if (headings.length === 0) return null;

  const items = (
    <ul ref={toc} className={styles.contents}>
      {headings
        .filter(({ depth }) => depth > 0 && depth < 4)
        .map((heading) => {
          const linkClass = clsx(styles.link, styles[`level${heading.depth}`], {
            [styles.active]: currentID === heading.slug,
          });

          return (
            <li className={linkClass}>
              <a href={`#${heading.slug}`} id={`toc-${heading.slug}`} onClick={onLinkClick}>
                {unescape(heading.text)}
              </a>
            </li>
          );
        })}
    </ul>
  );

  // When component setup as collapsed by default
  if (collapsed) {
    return (
      <details className={styles.expandDetails}>
        <summary id={onThisPageID}>
          <span>{getTextLocalized(translations.OnThisPage, lang)}</span>
        </summary>
        <div className={styles.expandContent}>{items}</div>
      </details>
    );
  }

  return (
    <>
      <h2 id={onThisPageID} className={styles.title}>
        {getTextLocalized(translations.OnThisPage, lang)}
      </h2>
      {items}
    </>
  );
};

export default TableOfContents;
