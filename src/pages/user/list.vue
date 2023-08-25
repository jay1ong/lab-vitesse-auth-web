<script  setup lang="ts">
import type {
  Data,
  DialogInstance,
  RowEventContext,
  SelectOptions,
  SubmitContext,
  TableRowData,
} from 'tdesign-vue-next'
import {
  DialogPlugin,
  MessagePlugin,
} from 'tdesign-vue-next'
import { columns, formInitData, rules } from './data'
import type { UserModel } from '~/composables/userModel'

defineOptions({
  name: 'UserList',
})

// const { name } = useRoute()
// const { push } = useRouter()

const state = reactive<
  {
    title: string
    type: string
    titleIcon: string
    data: Data[]
    loading: boolean
    formType: string
    modalVisible: boolean
    formData: Data
    selectedRowKeys: string[]
  }
>({
  title: '用户列表',
  type: '0',
  titleIcon: 'bulletpoint',
  data: [],
  loading: false,
  formType: 'show',
  modalVisible: false,
  formData: formInitData,
  selectedRowKeys: [],
})

async function fetchData() {
  state.loading = true
  state.data = await listUserApi().finally(
    () => (state.loading = false),
  )
}

fetchData()

async function refresh() {
  fetchData()
  state.modalVisible = false
}

// const userForm = ref<any>(null)

function handleCreate() {
  state.formType = 'create'
  state.formData = formInitData
  state.modalVisible = true
}

function removeUser(ids: string[]) {
  const confirmDia: DialogInstance = DialogPlugin.confirm({
    header: '确定删除数据?',
    body: '请确定是否删除当前数据，删除后无法找回。',
    onConfirm: async () => {
      await removeUserApi(ids)
      MessagePlugin.success('删除成功')
      await refresh()
      // 请求成功后，销毁弹框
      confirmDia.destroy!()
    },
  })
}

function handleMultiDelete() {
  removeUser(state.selectedRowKeys)
}

function handleDelete(id: string) {
  removeUser([id])
}

function handleRowClick(e: RowEventContext<TableRowData>) {

}

function handleSelectChange(value: (string | number)[], { selectedRowData }: SelectOptions<TableRowData>) {
  state.selectedRowKeys = value as never
}

function onReset() {
  state.formData = formInitData
  MessagePlugin.success('重置成功')
}

async function onSubmit({ validateResult, firstError }: SubmitContext<Data>) {
  if (validateResult === true) {
    if (state.formType === 'create') {
      await addUserApi(state.formData as UserModel)
      await refresh()
    }
    else if (state.formType === 'edit') {
      await changeUserApi(state.formData as UserModel)
      await refresh()
    }
    MessagePlugin.success('保存成功')
  }
  else {
    MessagePlugin.warning(firstError as string)
  }
}

function handleEdit(row: TableRowData) {
  state.formType = 'edit'
  state.formData = {
    id: row.id,
    username: row.username,
    password: '',
    email: row.email,
    phoneNumber: row.phoneNumber,
    nickname: row.nickname,
  }
  state.modalVisible = true
}
</script>

<template>
  <div>
    <t-space flex>
      <t-button class="mt-5 flex" @click="handleCreate">
        新增
      </t-button>
      <t-button class="mt-5 flex" theme="danger" @click="handleMultiDelete">
        删除
      </t-button>
    </t-space>

    <t-table
      class="mt-5 p-2"
      :data="state.data"
      :columns="columns"
      row-key="id"
      :loading="state.loading"
      max-height="650px"
      :fixed-rows="[0, 0]"
      :resizable="true"
      :selected-row-keys="state.selectedRowKeys"
      @row-click="handleRowClick"
      @select-change="handleSelectChange"
    >
      <template #operation="{ row }">
        <t-button
          variant="text"
          theme="primary"
          @click.stop="handleEdit(row)"
        >
          编辑
        </t-button>
        <t-divider layout="vertical" />
        <t-button
          variant="text"
          theme="danger"
          @click.stop="handleDelete(row.id)"
        >
          删除
        </t-button>
      </template>
    </t-table>

    <t-dialog
      :visible="state.modalVisible" :cancel-btn="null" :confirm-btn="null"
      :on-esc-keydown="() => { state.modalVisible = false }" :on-overlay-click="() => { state.modalVisible = false }"
      @close-btn-click="state.modalVisible = false"
    >
      <t-form :rules="rules" :data="state.formData" :colon="true" @reset="onReset" @submit="onSubmit">
        <t-form-item label="用户名" name="username" initial-data="">
          <t-input v-model="state.formData.username" placeholder="请输入用户名" />
        </t-form-item>
        <t-form-item label="密码" name="password" initial-data="">
          <t-input v-model="state.formData.password" placeholder="请输入密码" />
        </t-form-item>
        <t-form-item label="邮箱" name="email.value" initial-data="">
          <t-input v-model="state.formData.email.value" placeholder="请输入邮箱" />
        </t-form-item>
        <t-form-item label="手机号" name="phoneNumber.value" initial-data="">
          <t-input v-model="state.formData.phoneNumber.value" placeholder="请输入手机号" />
        </t-form-item>
        <t-form-item label="昵称" name="nickname" initial-data="">
          <t-input v-model="state.formData.nickname" placeholder="请输入昵称" />
        </t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">
            提交
          </t-button>
          <t-button theme="default" variant="base" type="reset">
            重置
          </t-button>
        </t-space>
      </t-form>
    </t-dialog>
  </div>
</template>

<route lang="yaml">
meta:
  title: 用户列表
  icon: file-paste
  </route>

  <style  scoped>
  :deep(table thead tr th) {
    color: black;
    background-color: white !important;
    font-weight: bold;
  }
  .t-divider {
    border-top: 1px solid #e2e8f0;
    margin: 0;
  }
  </style>
