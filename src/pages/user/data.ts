import type { BaseTableCol } from 'tdesign-vue-next'

const columns: Array<BaseTableCol<any>> = [
  {
    width: 20,
    align: 'center',
    colKey: 'no',
    title: '序号',
    fixed: 'left',
  },
  {
    width: 100,
    align: 'center',
    ellipsis: true,
    colKey: 'wtly.mc',
    title: '问题来源',
    fixed: 'left',
  },
  {
    width: 130,
    align: 'center',
    ellipsis: true,
    colKey: 'xz',
    title: '性质',
    fixed: 'left',
  },
  {
    width: 50,
    ellipsis: true,
    align: 'center',
    colKey: 'createTime',
    title: '日期',
  },
  {
    width: 50,
    ellipsis: true,
    align: 'center',
    colKey: 'fzr.realName',
    title: '负责人',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'rwmb.mc',
    title: '模板',
  },
  {
    width: 130,
    ellipsis: true,
    align: 'center',
    colKey: 'ms',
    title: '描述',
  },
  {
    colKey: 'operation',
    title: '操作',
    width: 60,
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
