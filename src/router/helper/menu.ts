interface MenuType {
  [key: string]: MenuValue
}

interface MenuValue {
  title: string
  icon: string
}

export const menu: MenuType = {
  '/one': { title: '一', icon: 'books' },
  'two': { title: '二', icon: 'calendar' },
  '/profile': { title: '配置', icon: 'app' },
  '/user': { title: '用户管理', icon: 'control-platform' },
}
