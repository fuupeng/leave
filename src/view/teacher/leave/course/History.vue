<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <template v-for="(item, index) in tableTitle" :key="item.prop">
        <el-table-column v-if="item.label == '辅导员结果'" :label="item.label" :prop="item.prop" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.result_inst === '通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.result_inst === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.label == '任课教师结果'" :label="item.label" :prop="item.prop" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.result_tea === '通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.result_tea === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :prop="item.prop" align="center" />
      </template>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { GetCourseLeaveListApi } from '@/api/student/leave'
import { TableTitle } from '@/interface/table'
import { GetLeaveList, IsAgree } from '@/api/teacher/info'

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
    label: '学生姓名',
    prop: 'uname'
  },
  {
    label: '辅导员结果',
    prop: 'result_inst'
  },
  {
    label: '任课教师结果',
    prop: 'result_tea'
  }
]
const tableData = ref()
const GetList = async () => {
  const { data: res } = await GetLeaveList('通过')
  if (res.code === 200) {
    tableData.value = res.data
  }
}
GetList()

// 同意
const agree = async (rid: any) => {
  const { data: res } = await IsAgree(rid, '通过')
  if (res.code === 200) {
    await GetList()
    ElMessage({
      message: '更新成功',
      type: 'success'
    })
  }
}
const disagree = async (rid: any) => {
  const { data: res } = await IsAgree(rid, '不通过')
  if (res.code === 200) {
    await GetList()
    ElMessage({
      message: '更新成功',
      type: 'success'
    })
  }
}
</script>
<style lang="less">
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
