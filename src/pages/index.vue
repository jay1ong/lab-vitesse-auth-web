<script setup lang="ts">
import { useRouter } from 'vue-router'

import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next'
import type { UserModel } from '../services/model/userModel'
import { useAuthStore } from '../stores/module/auth.module'

defineOptions({
  name: 'Login',
})

const user: UserModel = reactive({
  username: '',
  password: '',
})

const rules: Recordable = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
}

const { status, login } = useAuthStore()

// 路由相关
const { push } = useRouter()

const loggedIn = computed(() => {
  return status.loggedIn
})

function handleFinish({ validateResult, firstError, e }: any) {
  e.preventDefault()
  if (validateResult === true) {
    // MessagePlugin.success('提交成功')
  }
  else {
    MessagePlugin.warning(firstError)
  }
}

function handleLogin() {
  login(user).then((user: UserModel) => {
    push('/profile')
    NotifyPlugin('success', {
      title: '登录成功',
      content: `欢迎回来：${user.username}`,
    })
  })
}

function handleRegister() {
  push('/sys/register')
}

onMounted(() => {
  if (unref(loggedIn))
    push('/profile')
})
</script>

<template>
  <div h-full w-full flex items-center justify-center bg-gray-100>
    <t-card w-100>
      <div w-full flex flex-col>
        <img max-h-20 max-w-20 self-center src="@/assets/logo.png">
        <span mt-2 text-center text-3xl>登录</span>
        <t-form mt-5 :rules="rules" :data="user" :label-width="0" @submit="handleFinish">
          <t-form-item>
            <t-input v-model:value="user.username" h-10 placeholder="请输入用户名" size="large">
              <template #prefix-icon>
                <UserIcon iconify text-xl />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-input v-model:value="user.password" h-10 placeholder="请输入密码" type="password" size="large">
              <template #prefix-icon>
                <LockOnIcon iconify text-xl />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit" size="large" block w-full @click="handleLogin">
              登录
            </t-button>
          </t-form-item>
        </t-form>
        <div mt-3 flex justify-between>
          <a>忘记密码?</a>
          <div flex>
            <p>还没有账号,</p>
            <a @click="handleRegister">立即注册</a>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<style scoped></style>
