import type { getLocalizedPanelSidebar } from "src/navigation";

export const getPrevNext = (
  sidebar: Awaited<ReturnType<typeof getLocalizedPanelSidebar>>,
  currentPath: string,
) => {
  const flatItems = sidebar.flatMap((group) => group.sidebarItems.flatMap((item) => item.items));
  const currentIndex = flatItems.findIndex((item) => item.link === currentPath);

  const prevPage = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextPage = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return { prevPage, nextPage };
};
