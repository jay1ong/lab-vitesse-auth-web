<script lang="ts" setup>
import { useAuthStore } from '../stores/module/auth.module'
import HeaderVue from './Header.vue'

import MenuVue from './Menu.vue'

defineOptions({
  name: 'Layout',
})

const { status } = useAuthStore()

const { push } = useRouter()

const loggedIn = computed(() => {
  return status.loggedIn
})

const collapsedRef = ref(false)

function handleOnCollapsed(collapsed: boolean) {
  collapsedRef.value = collapsed
}

onMounted(() => {
  if (!unref(loggedIn))
    push('/')
})
</script>

<template>
  <t-layout h-full>
    <t-aside h-full :w="collapsedRef ? '64px' : ''">
      <div h-full flex flex-col>
        <div flex items-center justify-center bg-hex-262f3e p-1.5>
          <img max-h-12 max-w-12 src="@/assets/logo-blue(已去底).png" p-1>
          <span v-if="!collapsedRef" ml-1 text-xl text-white text-opacity-98>Lab</span>
        </div>
        <t-divider />
        <MenuVue h-full bg-hex-262f3e @onCollapsed="handleOnCollapsed" />
      </div>
    </t-aside>
    <t-layout>
      <t-header class="h-15 flex items-center justify-between bg-hex-262f3e">
        <t-divider h="2/5" layout="vertical" />
        <HeaderVue color-white />
      </t-header>
      <t-content mt-5>
        <RouterView>
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<style scoped>
.t-divider {
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  margin: 0;
}
</style>
