<script lang="ts" setup>
import { useAuthStore } from '../stores/module/auth.module'

defineOptions({
  name: 'LayoutHeader',
})

const { user, logout } = useAuthStore()

const { push } = useRouter()
const currentUser = computed(() => {
  return user
})

function handleLogout() {
  logout()
  push('/')
}
</script>

<template>
  <div float-right flex items-center p-6 text-xl>
    <div mr-4 flex items-center>
      <UserCircleIcon iconify mr-2 text-xl />
      <span text-sm>{{ currentUser?.username }}</span>
    </div>
    <div flex items-center @click="handleLogout">
      <LogoutIcon iconify mr-2 />
      <span text-sm>注销</span>
    </div>
  </div>
</template>
