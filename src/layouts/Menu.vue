<script setup lang="ts">
import type { MenuValue } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import {
  anyChildrenVisible,
  getAllParentByName,
  routeExist,
} from '~/router/helper/routeHelper'

defineOptions(
  {
    name: 'LayoutMenu',
  },
)

const emit = defineEmits(['onCollapsed'])

const routes: string[] = []

const { name } = useRoute()

const { replace } = useRouter()
const route = useRouter()

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
  if (routeExist([item as string], routes))
    replace({ name: item as string })
  else
    MessagePlugin.error('路由表不存在该路由')
}

onMounted(() => {
  const routes = getAllParentByName(selectedKey as string, route.options.routes)
  routes.forEach((element: string) => {
    state.openKeys.push(element)
  })
})
</script>

<template>
  <t-menu :default-value="state.selectedKey" :default-expanded="state.openKeys" :collapsed="state.collapsed" theme="dark" @change="handleMenuChange">
    <template #operations>
      <t-icon size="large" class="t-menu__operations-icon" name="view-list" @click="handleChangeCollapsed" />
    </template>
    <template v-for="item in route.options.routes" :key="item.name">
      <t-submenu v-if="item.children && anyChildrenVisible(item.children)" :value="item.path" :title="item.meta?.title">
        <template #icon>
          <t-icon :name="item.meta?.icon" />
        </template>
        <template v-for="child in item.children" :key="child.name">
          <t-submenu v-if="child.children && anyChildrenVisible(child.children)" :value="child.path" :title="child.meta?.title">
            <template #icon>
              <t-icon :name="child.meta?.icon" />
            </template>
            <template v-for="c in child.children" :key="c.name">
              <t-menu-item v-if="c.meta?.title && c.meta?.icon" :value="c.path">
                <template #icon>
                  <t-icon :name="c.meta?.icon" />
                </template>
                <span>{{ c.name }}</span>
              </t-menu-item>
            </template>
          </t-submenu>
          <t-menu-item v-if="!child.children && child.meta?.title && child.meta?.icon" :value="child.path">
            <template #icon>
              <t-icon :name="child.meta?.icon" />
            </template>
            <span>{{ child.meta.title }}</span>
          </t-menu-item>
        </template>
      </t-submenu>
      <t-menu-item v-if="!item.children && item.meta?.title && item.meta?.icon" :value="item.path">
        <template #icon>
          <t-icon :name="item.meta?.icon" />
        </template>
        <span>{{ item.name }}</span>
      </t-menu-item>
    </template>
  </t-menu>
</template>
