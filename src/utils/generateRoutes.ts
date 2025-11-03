//use this function to generate routes from sidebar items into route.index.tsx

import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  /**
   * use flatMap for
   *2 level nested array to single level array
   * and map to transform the array
   * return array of objects with path and component
   * path is the url of the route
   * component is the component to be rendered
   *
   */
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
