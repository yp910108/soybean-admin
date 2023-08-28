import { ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { defineStore, storeToRefs } from 'pinia'
import { localStg } from '@/utils'
import { useRouteStore } from '../route'
import { useThemeStore } from '../theme'
import { getTabByRoute, hasTab } from './helper'
import type { Tab } from './typing'

export const useTabStore = defineStore('tab-store', () => {
  const route = useRoute()
  const router = useRouter()
  const routeStore = useRouteStore()
  const { theme } = storeToRefs(useThemeStore())

  const tabs = ref<Tab[]>([])
  const pushLastTab = () => {
    const lastTab = tabs.value[tabs.value.length - 1]
    router.push(lastTab.routePath)
  }
  const addTab = (route: RouteLocationNormalizedLoaded) => {
    const tab = getTabByRoute(route)
    if (!hasTab(tabs.value, tab)) {
      tabs.value.push(tab)
    }
    return tab
  }
  const removeTab = (tab: Tab) => {
    const index = tabs.value.findIndex(({ key }) => key === tab.key)
    tabs.value.splice(index, 1)
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }
  const clearLeftTabs = (currentTab: Tab) => {
    const currentIndex = tabs.value.findIndex(({ key }) => key === currentTab.key)
    const rootTab = getTabByRoute(routeStore.rootRoute)
    const _tabs = tabs.value.slice(currentIndex)
    _tabs.unshift(rootTab)
    tabs.value = _tabs
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }
  const clearRightTabs = (currentTab: Tab) => {
    const currentIndex = tabs.value.findIndex(({ key }) => key === currentTab.key)
    tabs.value = tabs.value.slice(0, currentIndex + 1)
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }
  const clearOtherTabs = (currentTab: Tab) => {
    const rootTab = getTabByRoute(routeStore.rootRoute)
    const restTabs = tabs.value.filter(({ key }) => currentTab.key === key)
    restTabs.unshift(rootTab)
    tabs.value = restTabs
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }
  const clearAllTabs = () => {
    const rootTab = getTabByRoute(routeStore.rootRoute)
    tabs.value = [rootTab]
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }

  const activeTab = ref<Tab>()
  const setActiveTab = (tab: Tab) => {
    activeTab.value = tab
  }

  const setScrollPosition = (tab: Tab, scrollPosition: Tab['scrollPosition']) => {
    tab.scrollPosition = scrollPosition
  }

  const initTabStore = () => {
    const rootTab = getTabByRoute(routeStore.rootRoute)
    const currentTab = getTabByRoute(route)
    if (theme.value.tab.isCache) {
      const _tabs = localStg.get('tabs') ?? []
      if (!hasTab(_tabs, rootTab)) {
        _tabs.push(rootTab)
      }
      if (!hasTab(_tabs, currentTab)) {
        _tabs.push(currentTab)
      }
      setActiveTab(currentTab)
      tabs.value = _tabs
    } else {
      const _tabs = [rootTab]
      if (currentTab.key !== rootTab.key) {
        _tabs.push(currentTab)
        setActiveTab(currentTab)
      } else {
        setActiveTab(rootTab)
      }
      tabs.value = _tabs
    }
  }

  const reset = () => {
    tabs.value = []
    activeTab.value = undefined
    localStg.set('tabs', undefined)
  }

  return {
    tabs,
    addTab,
    removeTab,
    clearLeftTabs,
    clearRightTabs,
    clearOtherTabs,
    clearAllTabs,

    activeTab,
    setActiveTab,

    setScrollPosition,

    initTabStore,

    reset
  }
})
