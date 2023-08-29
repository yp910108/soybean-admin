/**
 * 多页签 Tab 的路由
 */
export type MultiTab = {
  key: string
  title: string
  routePath: string
  icon?: Icon.IconName
  scrollPosition: {
    left: number
    top: number
  }
}
