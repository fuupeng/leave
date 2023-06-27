<template>
  申请中
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <template v-for="(item, index) in tableTitle" :key="item.prop">
        <el-table-column
          v-if="item.label !== '状态'"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
        />
        <el-table-column
          v-if="item.label == '状态'"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.result === '通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.result === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else="scope.row.result === '审核中'" effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { TableTitle } from '@/interface/table'
import { GetSchoolLeave, his, update } from '@/api/instructor/school'

const tableTitle: TableTitle[] = [
  {
    label: '申请时间',
    prop: 'date'
  },
  {
    label: '开始时间',
    prop: 'starttime'
  },
  {
    label: '结束时间',
    prop: 'date'
  },
  {
    label: '原因',
    prop: 'reason'
  },

  {
    label: '学生姓名',
    prop: 'uname'
  },
  {
    label: '手机号码',
    prop: 'phone'
  },
  { label: '地址', prop: 'address' },
  {
    label: '状态',
    prop: 'result'
  }
]
const tableData = ref()
const GetList = async () => {
  const { data: res } = await his()
  if (res.code === 200) {
    tableData.value = res.data
  }
}
GetList()

const agree = async (lid: any) => {
  const { data: res } = await update(lid, '通过')
  if ((res.code = 200)) {
    await GetList()
  }
}
const disagree = async (lid: any) => {
  const { data: res } = await update(lid, '未通过')
  if ((res.code = 200)) {
    await GetList()
  }
}
</script>
<style lang="less">
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
