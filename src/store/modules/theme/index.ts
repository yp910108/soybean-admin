import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { getNaiveThemeOverrides, initThemeSettings } from './helper'
import { sessionStg } from '@/utils'

export const useThemeStore = defineStore('theme-store', () => {
  const theme = ref<Theme.Setting>(initThemeSettings())

  const naiveTheme = computed(() => {
    return theme.value.darkMode ? darkTheme : undefined
  })

  const naiveThemeOverrides = computed(() => {
    const { themeColor, otherColor } = theme.value
    return getNaiveThemeOverrides({ primary: themeColor, ...otherColor })
  })

  const setDarkMode = (darkMode: boolean) => {
    theme.value.darkMode = darkMode
  }

  const setFollowSystemTheme = (visible: boolean) => {
    theme.value.followSystemTheme = visible
  }

  const setIsCustomizeDarkModeTransition = (isCustomize: boolean) => {
    theme.value.isCustomizeDarkModeTransition = isCustomize
  }

  const setSiderInverted = (isInverted: boolean) => {
    theme.value.sider.inverted = isInverted
  }

  const setHeaderInverted = (isInverted: boolean) => {
    theme.value.header.inverted = isInverted
  }

  const setFooterInverted = (inverted: boolean) => {
    theme.value.footer.inverted = inverted
  }

  const setLayoutMode = (mode: UnionKey.ThemeLayoutMode) => {
    theme.value.layout.mode = mode
  }

  const setThemeColor = (themeColor: string) => {
    theme.value.themeColor = themeColor
  }

  const pageAnimateMode = computed(() => {
    const { page } = theme.value
    return page.animate ? page.animateMode : undefined
  })

  const reset = () => {
    sessionStg.remove('themeSettings')
    theme.value = initThemeSettings()
  }

  const setScrollMode = (mode: UnionKey.ThemeScrollMode) => {
    theme.value.scrollMode = mode
  }

  const setIsFixedHeaderAndTab = (isFixed: boolean) => {
    theme.value.fixedHeaderAndTab = isFixed
  }

  const setHorizontalMenuPosition = (position: UnionKey.ThemeHorizontalMenuPosition) => {
    theme.value.menu.horizontalPosition = position
  }

  const setHeaderHeight = (height: number | null) => {
    if (height) {
      theme.value.header.height = height
    }
  }

  const setTabHeight = (height: number | null) => {
    if (height) {
      theme.value.tab.height = height
    }
  }

  const setTabIsCache = (isCache: boolean) => {
    theme.value.tab.isCache = isCache
  }

  const setSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.width = width
    }
  }

  const setMixSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.mixWidth = width
    }
  }

  const setFooterVisible = (isVisible: boolean) => {
    theme.value.footer.visible = isVisible
  }

  const setFooterIsFixed = (isFixed: boolean) => {
    theme.value.footer.fixed = isFixed
  }

  const setFooterIsRight = (right: boolean) => {
    theme.value.footer.right = right
  }

  const setHeaderCrumbVisible = (visible: boolean) => {
    theme.value.header.crumb.visible = visible
  }

  const setHeaderCrumbIconVisible = (visible: boolean) => {
    theme.value.header.crumb.showIcon = visible
  }

  const setTabVisible = (visible: boolean) => {
    theme.value.tab.visible = visible
  }

  const setTabMode = (mode: UnionKey.ThemeTabMode) => {
    theme.value.tab.mode = mode
  }

  const setPageIsAnimate = (animate: boolean) => {
    theme.value.page.animate = animate
  }

  const setPageAnimateMode = (mode: UnionKey.ThemeAnimateMode) => {
    theme.value.page.animateMode = mode
  }

  const setAutoFollowSystemMode = (darkMode: boolean) => {
    if (theme.value.followSystemTheme) {
      theme.value.darkMode = darkMode
    }
  }

  return {
    theme,
    naiveTheme,
    naiveThemeOverrides,
    setDarkMode,
    setFollowSystemTheme,
    setIsCustomizeDarkModeTransition,
    setSiderInverted,
    setHeaderInverted,
    setFooterInverted,
    setLayoutMode,
    setThemeColor,

    pageAnimateMode,
    reset,
    setScrollMode,
    setIsFixedHeaderAndTab,
    setHorizontalMenuPosition,
    setHeaderHeight,
    setTabHeight,
    setTabIsCache,
    setSiderWidth,
    setMixSiderWidth,
    setFooterVisible,
    setFooterIsFixed,
    setFooterIsRight,
    setHeaderCrumbVisible,
    setHeaderCrumbIconVisible,
    setTabVisible,
    setTabMode,
    setPageIsAnimate,
    setPageAnimateMode,
    setAutoFollowSystemMode
  }
})
