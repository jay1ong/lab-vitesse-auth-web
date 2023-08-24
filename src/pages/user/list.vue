<script  setup lang="ts">
import type {
  DialogInstance,
  RowEventContext,
  SelectOptions,
  TableRowData,
} from 'tdesign-vue-next'
import {
  DialogPlugin,
  MessagePlugin,
} from 'tdesign-vue-next'
import { columns, formInitData } from './data'

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
    data: Recordable[]
    loading: boolean
    formType: string
    modalVisible: boolean
    formData: Recordable
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

async function handleRefresh() {
  fetchData()
  state.modalVisible = false
}

// const userForm = ref<any>(null)

function handleCreate() {
  state.formType = 'create'
  state.formData = formInitData
  state.modalVisible = true
}

function handleMultiDelete() {
  const confirmDia: DialogInstance = DialogPlugin.confirm({
    header: '确定删除数据?',
    body: '请确定是否删除当前数据，删除后无法找回。',
    onConfirm: async () => {
      await deleteUserApi(state.selectedRowKeys)
      MessagePlugin.success('删除成功')
      await handleRefresh()
      // 请求成功后，销毁弹框
      confirmDia.destroy!()
    },
  })
}

function handleDelete(id: string) {
  const confirmDia: DialogInstance = DialogPlugin.confirm({
    header: '确定删除数据?',
    body: '请确定是否删除当前数据，删除后无法找回。',
    onConfirm: async () => {
      await deleteUserApi([id])
      MessagePlugin.success('删除成功')
      await fetchData()
      // 请求成功后，销毁弹框
      confirmDia.destroy!()
    },
  })
}

function handleRowClick(e: RowEventContext<TableRowData>) {

}

function handleSelectChange(value: (string | number)[], { selectedRowData }: SelectOptions<TableRowData>) {
  state.selectedRowKeys = value as never
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
          @click.stop="
            () => {
              state.formType = 'edit';
              state.modalVisible = true;
              state.formData = row
            }
          "
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
