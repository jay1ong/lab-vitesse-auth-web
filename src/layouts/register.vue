<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import type { UserModel } from '~/services/model/userModel'
import { useAuthStore } from '~/stores/module/auth.module'

defineOptions({
  name: 'Register',
})

const user: UnwrapRef<UserModel> = reactive({
  username: '',
  password: '',
})

const rules: Recordable = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
}

const { register } = useAuthStore()

// 路由相关
const { push } = useRouter()

function handleFinish({ validateResult, firstError, e }: any) {
  e.preventDefault()
  if (validateResult === true) {
    // MessagePlugin.success('提交成功')
  }
  else {
    MessagePlugin.warning(firstError)
  }
}

function handleRegister() {
  register(user)
    .then(() => {
      MessagePlugin.success('注册成功')
      push('/profile')
    })
    .catch((error) => {
      MessagePlugin.error(`注册失败:${error.message}`)
    })
}

function handleLogin() {
  push('/')
}
</script>

<template>
  <div h-full w-full flex items-center justify-center bg-gray-100>
    <t-card w-100>
      <div w-full flex flex-col>
        <img max-h-20 max-w-20 self-center src="@/assets/logo.png">
        <span mt-2 text-center text-3xl>注册</span>
        <t-form
          mt-5
          :rules="rules"
          :data="user"
          :label-width="0"
          @submit="handleFinish"
        >
          <t-form-item>
            <t-input
              v-model:value="user.username"
              h-10
              placeholder="请输入用户名"
            >
              <template #prefix-icon>
                <UserIcon iconify text-xl />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-input
              v-model:value="user.password"
              type="password"
              h-10
              placeholder="请输入密码"
            >
              <template #prefix-icon>
                <LockOnIcon iconify text-xl />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button
              w-full
              theme="primary" type="submit" size="large"
              @click="handleRegister"
            >
              注册
            </t-button>
          </t-form-item>
        </t-form>
        <div mt-3 flex justify-end>
          <a @click="handleLogin">立即登录</a>
        </div>
      </div>
    </t-card>
  </div>
</template>
