<script setup lang="ts">
import type { MenuValue } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { routes } from 'vue-router/auto/routes'
import type { RouteRecordRaw } from 'vue-router'

import {
  anyChildrenVisible,
  getAllParentByName,
  routeExist,
  treeToList,
} from '~/router/helper/routeHelper'

import { menu } from '~/router/helper/menu'

defineOptions(
  {
    name: 'LayoutMenu',
  },
)

const emit = defineEmits(['onCollapsed'])

let route: string[] = []

const { name } = useRoute()

const { replace } = useRouter()

const unrefName = unref(name) as string
const selectedKey = unrefName

const state = reactive({
  selectedKey,
  openKeys: [''],
  collapsed: false,
})

function handleChangeCollapsed() {
  state.collapsed = !state.collapsed
  emit('onCollapsed', state.collapsed)
}

function handleMenuChange(item: MenuValue) {
  if (routeExist([item as string], route))
    replace(item as string)
  else
    MessagePlugin.error('路由表不存在该路由')
}

onMounted(() => {
  const list: RouteRecordRaw[] = []
  route = treeToList(routes, list).map(element => element.name as string)
  const rs = getAllParentByName(selectedKey as string, routes)
  rs.forEach((element: string) => {
    state.openKeys.push(element)
  })
})
</script>

<template>
  <t-menu :default-value="state.selectedKey" :default-expanded="state.openKeys" :collapsed="state.collapsed" theme="dark" @change="handleMenuChange">
    <template #operations>
      <t-icon size="large" class="t-menu__operations-icon" name="view-list" @click="handleChangeCollapsed" />
    </template>
    <template v-for="item in routes" :key="item.name">
      <t-submenu v-if="item.children && anyChildrenVisible(item.children)" :value="item.path" :title="menu[item.path].title">
        <template #icon>
          <t-icon :name="menu[item.path].icon" />
        </template>
        <template v-for="c1 in item.children" :key="c1.name">
          <t-submenu v-if="c1.children && anyChildrenVisible(c1.children)" :value="c1.path" :title="menu[c1.path].title">
            <template #icon>
              <t-icon :name="menu[c1.path].icon" />
            </template>
            <template v-for="c2 in c1.children" :key="c2.name">
              <t-menu-item v-if=" c2.meta?.title && c2.meta?.icon" :value="(c2.name) as string">
                <template #icon>
                  <t-icon :name="c2.meta?.icon" />
                </template>
                <span>{{ c2.meta?.title }}</span>
              </t-menu-item>
            </template>
          </t-submenu>
          <t-menu-item v-if="!c1.children && c1.meta?.title && c1.meta?.icon" :value="(c1.name) as string">
            <template #icon>
              <t-icon :name="c1.meta?.icon" />
            </template>
            <span>{{ c1.meta.title }}</span>
          </t-menu-item>
        </template>
      </t-submenu>
      <t-menu-item v-if="!item.children && item.meta?.title && item.meta?.icon" :value="(item.name) as string">
        <template #icon>
          <t-icon :name="item.meta?.icon" />
        </template>
        <span>{{ item.name }}</span>
      </t-menu-item>
    </template>
  </t-menu>
</template>
