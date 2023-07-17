<script setup lang="ts">
import { useAuthStore } from '../../stores/module/auth.module'
import userService from '../../services/user.service'

defineOptions({
  name: 'Profile',
})
const { status, user } = useAuthStore()

const { push } = useRouter()

const currentUser = computed(() => {
  return user
})

const loggedIn = computed(() => {
  return status.loggedIn
})

const state = reactive({
  userInfo: {},
})

onMounted(() => {
  if (!unref(loggedIn)) {
    push('/')
  }
  else {
    const username = unref(currentUser)?.username
    if (username) {
      userService.getUserInfo(username).then((user) => {
        state.userInfo = user
      })
    }
  }
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>username:</strong>
        <strong>{{ currentUser?.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser?.accessToken?.substring(0, 20) }} ...
      {{ currentUser?.accessToken?.substr(currentUser?.accessToken.length - 20) }}
    </p>
    <p class="ml-5 truncate">
      <strong>Token(all):</strong>
      {{ currentUser?.accessToken }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser?.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser?.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser?.roles" :key="role">
        {{ role }}
      </li>
    </ul>
    <h1 class="text-2xl">
      用户信息
    </h1>
    <p>{{ state.userInfo }}</p>
  </div>
</template>

<route lang="yaml">
meta:
  title: 用户信息
  icon: add
</route>
