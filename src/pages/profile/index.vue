<script setup lang="ts">
import { useAuthStore } from '~/stores/module/auth.module'
import userService from '~/services/user.service'

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
    <t-card>
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          用户名
        </t-col>
        <t-col :span="9">
          {{ currentUser?.username }}
        </t-col>
      </t-row>
      <t-divider />
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          Token
        </t-col>
        <t-col :span="9" truncate>
          {{ currentUser?.accessToken }}
        </t-col>
      </t-row>
      <t-divider />
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          id
        </t-col>
        <t-col :span="9">
          {{ currentUser?.id }}
        </t-col>
      </t-row>
      <t-divider />
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          邮件
        </t-col>
        <t-col :span="9">
          {{ currentUser?.email }}
        </t-col>
      </t-row>
      <t-divider />
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          角色
        </t-col>
        <t-col :span="9">
          {{ currentUser?.roles }}
        </t-col>
      </t-row>
      <t-divider />
      <t-row>
        <t-col :span="2" text-left color-gray-400>
          用户信息
        </t-col>
        <t-col :span="9" truncate>
          {{ state.userInfo }}
        </t-col>
      </t-row>
      <t-divider />
    </t-card>
  </div>
</template>

<route lang="yaml">
meta:
  title: 用户信息
  icon: bulletpoint
</route>
