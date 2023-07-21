<!-- <script lang="ts" setup>
import type {
  DialogInstance,

  RowEventContext,
} from 'tdesign-vue-next'
import {
  DialogPlugin,
  MessagePlugin,
} from 'tdesign-vue-next'
import { columns, formInitData } from './data'
import type { UserModel } from '~/composables/userModel'

defineOptions({
  name: 'UserList',
})

const { name } = useRoute()
const { push } = useRouter()

const state = reactive({
  title: '用户列表',
  type: '0',
  titleIcon: 'bulletpoint',
  data: [],
  loading: false,
  formType: 'show',
  modalVisible: false,
  formData: formInitData,
})

const selectedRowKeysRef = ref([])

async function fetchData() {
  state.loading = true
  state.data = await listApi(state.user.id, state.type).finally(
    () => (state.loading = false),
  )
}

fetchData()

async function handleRefresh() {
  fetchData()
  state.modalVisible = false
}

const rwForm = ref<any>(null)

function handleCreate() {
  state.formType = 'create'
  state.formData = formInitData
  state.modalVisible = true
}

function handleDelete(id: string) {
  const confirmDia: DialogInstance = DialogPlugin.confirm({
    header: '确定删除数据?',
    body: '请确定是否删除当前数据，删除后无法找回。',
    onConfirm: async () => {
    //   await removeApi(id)
      MessagePlugin.success('删除成功')
      await fetchData()
      // 请求成功后，销毁弹框
      confirmDia.destroy!()
    },
  })
}

function handleRowClick(e: RowEventContext<UserModel>) {

}
</script>

<template>
  <div>
    <PageHeader :title="state.title" />
    <t-button v-if="state.fzr" class="mt-5 flex" @click="handleCreate">
      新增
    </t-button>
    <t-card class="mt-5 rounded">
      <t-table
        :data="state.data"
        :columns="columns"
        row-key="id"
        :selected-row-keys="selectedRowKeysRef"
        :loading="state.loading"
        max-height="650px"
        :fixed-rows="[0, 0]"
        size="small"
        @row-click="handleRowClick"
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
    </t-card>
  </div>
</template>

  <!-- <style lang="scss" scoped>
  :deep(table thead tr th) {
    color: black;
    background-color: white !important;
    font-weight: bold;
  }
  .t-divider {
    border-top: 1px solid #e2e8f0;
    margin: 0;
  }
  // :deep(.t-table__content::-webkit-scrollbar) {
  //   display: none;
  // }
  </style> --> -->
