import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import type {
  Settings,
  ThemeAnimateMode,
  ThemeHorizontalMenuPosition,
  ThemeLayoutMode,
  ThemeScrollMode,
  ThemeTabMode
} from './typing'
import { getThemeColors, initSettings } from './helper'

export const useThemeStore = defineStore('theme-store', () => {
  const theme = ref<Settings>(initSettings())

  const naiveTheme = computed(() => {
    return theme.value.darkMode ? darkTheme : undefined
  })

  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => {
    const { primaryColor, otherColor } = theme.value
    const themeColors = getThemeColors({ primary: primaryColor, ...otherColor })
    return {
      common: {
        fontWeightStrong: '600',
        ...themeColors
      }
    }
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

  const setLayoutMode = (mode: ThemeLayoutMode) => {
    theme.value.layout.mode = mode
  }

  const setPrimaryColor = (primaryColor: string) => {
    theme.value.primaryColor = primaryColor
    if (!theme.value.isCustomizeInfoColor) {
      theme.value.otherColor.info = primaryColor
    }
  }

  const setScrollMode = (mode: ThemeScrollMode) => {
    theme.value.scrollMode = mode
  }

  const setIsFixedHeaderAndTab = (isFixed: boolean) => {
    theme.value.fixedHeaderAndTab = isFixed
  }

  const setHorizontalMenuPosition = (position: ThemeHorizontalMenuPosition) => {
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

  const setTabMode = (mode: ThemeTabMode) => {
    theme.value.tab.mode = mode
  }

  const setPageIsAnimate = (animate: boolean) => {
    theme.value.page.animate = animate
  }

  const pageAnimateMode = computed(() => {
    const { page } = theme.value
    return page.animate ? page.animateMode : undefined
  })
  const setPageAnimateMode = (mode: ThemeAnimateMode) => {
    theme.value.page.animateMode = mode
  }

  const reset = () => {
    theme.value = initSettings()
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
    setPrimaryColor,
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

    pageAnimateMode,
    setPageAnimateMode,

    reset
  }
})