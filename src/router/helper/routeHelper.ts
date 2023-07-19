import type { RouteRecordRaw } from 'vue-router'

function routeExist(routes: string[], sysRoutes: string[]): boolean {
  let routeExist = false
  routeExist = routes.some((route) => {
    return (routeExist = sysRoutes.includes(route))
  })
  return routeExist
}

function anyChildrenVisible(children: RouteRecordRaw[] | undefined): any {
  return (
    children
    && children.length
    && children.some((element) => {
      return (
        (element.meta && !element.meta.hideMenu)
        || anyChildrenVisible(element.children)
      )
    })
  )
}

function getMenuVisible(route: RouteRecordRaw): boolean {
  return route.meta !== undefined && !route.meta.hideMenu
}

function getAllParentByName(name: string,
  routes: Readonly<RouteRecordRaw[]>): string[] {
  const parents: string[] = []
  const list: RouteRecordRaw[] = []
  treeToList(routes, list)
  list.forEach((element) => {
    const parent = getChildByName(name, element)
    if (parent)
      parents.push(element.path as string)
  })
  return parents
}

function treeToList(routes: Readonly<RouteRecordRaw[]>,
  list: RouteRecordRaw[]): RouteRecordRaw[] {
  routes.forEach((element) => {
    list.push(element)
    if (element.children)
      treeToList(element.children, list)
  })
  return list
}

function getChildByName(name: string,
  route: RouteRecordRaw): RouteRecordRaw | undefined {
  return route.children?.find((element) => {
    if (element.name === name)
      return true
    else
      return getChildByName(name, element)
  })
}

export { routeExist, anyChildrenVisible, getMenuVisible, getAllParentByName, treeToList }
