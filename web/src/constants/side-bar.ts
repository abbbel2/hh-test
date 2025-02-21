import { SidebarItem } from "@/types-def";

export const sidebarTypes = {
  SYSTEMS: "systems",
  SYSTEM_CODE: "system-code",
  PROPERTIES: "properties",
  MENUS: "menus",
  API_LIST: "api-list",
  USER_GROUP: "users-group",
  COMPETITION: "competition",
} as const;

export const routeMenuMap: Record<
  (typeof sidebarTypes)[keyof typeof sidebarTypes],
  string
> = {
  [sidebarTypes.SYSTEMS]: "/",
  [sidebarTypes.SYSTEM_CODE]: "/systems/system-code",
  [sidebarTypes.PROPERTIES]: "/systems/properties",
  [sidebarTypes.MENUS]: "/systems/menus",
  [sidebarTypes.API_LIST]: "/systems/api-list",
  [sidebarTypes.USER_GROUP]: "/users-group",
  [sidebarTypes.COMPETITION]: "/competition",
};

export const routeBreadcrumbMap = {
  [routeMenuMap[sidebarTypes.SYSTEMS]]: 'Menu',
  [routeMenuMap[sidebarTypes.USER_GROUP]]: 'Users and group',
  [routeMenuMap[sidebarTypes.COMPETITION]]: 'Competition',
  [routeMenuMap[sidebarTypes.SYSTEM_CODE]]: 'System code',
  [routeMenuMap[sidebarTypes.PROPERTIES]]: 'Properties',
  [routeMenuMap[sidebarTypes.MENUS]]: 'Menu',
  [routeMenuMap[sidebarTypes.API_LIST]]: 'API List',
}

export const sidebarItems: SidebarItem[] = [
  {
    name: "Systems",
    type: sidebarTypes.SYSTEMS,
    url: routeMenuMap[sidebarTypes.SYSTEMS],
    children: [
      {
        name: "System Code",
        type: sidebarTypes.SYSTEM_CODE,
        url: routeMenuMap[sidebarTypes.SYSTEM_CODE],
      },
      {
        name: "Properties",
        type: sidebarTypes.PROPERTIES,
        url: routeMenuMap[sidebarTypes.PROPERTIES],
      },
      {
        name: "Menus",
        type: sidebarTypes.MENUS,
        url: routeMenuMap[sidebarTypes.MENUS],
      },
      {
        name: "API List",
        type: sidebarTypes.API_LIST,
        url: routeMenuMap[sidebarTypes.API_LIST],
      },
    ],
  },
  {
    name: "Users & Groups",
    type: sidebarTypes.USER_GROUP,
    url: routeMenuMap[sidebarTypes.USER_GROUP],
    children: [],
  },
  {
    name: "Competition",
    type: sidebarTypes.COMPETITION,
    url: routeMenuMap[sidebarTypes.COMPETITION],
    children: [],
  },
];
