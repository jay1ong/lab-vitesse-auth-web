import type { PrimaryTableCol, TableRowData } from 'tdesign-vue-next'

const columns: Array<PrimaryTableCol <TableRowData>> = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    width: 50,
  },
  {
    width: 100,
    align: 'center',
    colKey: 'zoneId',
    title: '用户域',
    fixed: 'left',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'username',
    title: '登录账号',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'email.value',
    title: '邮箱',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'phoneNumber.value',
    title: '手机号码',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'address',
    title: '地址',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'accountNonExpired',
    title: '账户是否过期',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'accountNonLocked',
    title: '账户是否锁定',
    fixed: 'left',
  },
  {
    width: 100,
    ellipsis: true,
    align: 'center',
    colKey: 'credentialsNonExpired',
    title: '凭证是否过期',
  },
  {
    width: 100,
    ellipsis: true,
    align: 'center',
    colKey: 'enabled',
    title: '用户是否可用',
  },
  {
    width: 100,
    ellipsis: true,
    align: 'center',
    colKey: 'nickname',
    title: '昵称',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'source',
    title: '注册来源',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'status',
    title: '用户状态',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'registerInfo',
    title: '注册信息',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'lastLoginInfo',
    title: '最近登录信息',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'createAt',
    title: '创建时间',
    fixed: 'left',
  },
  {
    colKey: 'operation',
    title: '操作',
    width: 200,
    align: 'center',
    fixed: 'right',
    cell: 'operation',
  },
]

const rules = {
  xz: [{ required: true, message: '请输入性质', type: 'error' }],
  createTime: [{ required: true, message: '请选择日期', type: 'error' }],
  mbId: [{ required: true, message: '请选择模板', type: 'error' }],
  wtlyId: [{ required: true, message: '请选择问题来源', type: 'error' }],
}

const formInitData = {
  xz: '',
  // rq: moment.utc().format(),
  ms: '',
  type: '0',
  mbId: '',
  userId: '',
  rwmb: undefined,
  wtlyId: '',
  wtly: undefined,
}

export { columns, rules, formInitData }
