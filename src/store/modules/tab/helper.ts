import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { Tab } from './typing'

function hasFullPath(
  route: RouteLocationNormalizedLoaded | RouteRecordNormalized
): route is RouteLocationNormalizedLoaded {
  return !!(route as RouteLocationNormalizedLoaded).fullPath
}

export function getTabByRoute(route: RouteLocationNormalizedLoaded | RouteRecordNormalized) {
  const { name, meta } = route
  return {
    key: name as string,
    routePath: hasFullPath(route) ? route.fullPath : route.path,
    title: meta.title,
    icon: meta.icon,
    scrollPosition: {
      left: 0,
      top: 0
    }
  } as Tab
}

export function hasTab(tabs: Tab[], activeTab: Tab) {
  return !!tabs.find((tab) => tab.key === activeTab.key)
}
