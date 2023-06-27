<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <template v-for="(item, index) in tableTitle" :key="item.prop">
        <el-table-column v-if="item.label == '辅导员结果'" :label="item.label" :prop="item.prop" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.resultInst === '通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.resultInst === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.label == '任课教师结果'" :label="item.label" :prop="item.prop" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.resultTea === '通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.resultTea === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :prop="item.prop" align="center" />
      </template>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { GetCourseLeaveListApi } from '@/api/student/course'
import { TableTitle } from '@/interface/table'

const tableTitle: TableTitle[] = [
  {
    label: '申请时间',
    prop: 'date'
  },
  {
    label: '课程名称',
    prop: 'cuname'
  },
  {
    label: '辅导员结果',
    prop: 'resultInst'
  },
  {
    label: '任课教师结果',
    prop: 'resultTea'
  }
]
const tableData = ref()
const GetList = async () => {
  const { data: res } = await GetCourseLeaveListApi(0)
  if (res.code === 200) {
    tableData.value = res.data
  }
}
GetList()
</script>
<style lang="less">
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
