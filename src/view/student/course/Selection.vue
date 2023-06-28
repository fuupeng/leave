<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
      <template v-for="(item, index) in tableTitle">
        <el-table-column :prop="item.prop" :label="item.label" align="center" />
      </template>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-popconfirm
            @confirm="courseSelection(scope.row.ccuid)"
            width="220"
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="确定选择此课吗"
          >
            <template #reference>
              <el-button link size="small" type="primary">点击选课</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { GetCourseListApi, SelectionApi } from '@/api/student/course'
import { TableTitle } from '@/interface/table'
const loading = ref(false)
// 表头
const tableTitle: TableTitle[] = [
  {
    label: '课程id',
    prop: 'ccuid'
  },
  {
    label: '课程名称',
    prop: 'cuname'
  },
  {
    label: '时间',
    prop: 'week'
  },
  {
    label: '开始节数',
    prop: 'starttime'
  },
  {
    label: '结束节数',
    prop: 'endtime'
  },
  {
    label: '地点',
    prop: 'location'
  },
  {
    label: '课程描述',
    prop: 'description'
  }
]
// 数据源
const tableData = ref()
const GetCourseList = async () => {
  loading.value = true
  const { data: res } = await GetCourseListApi()
  tableData.value = res.data
  loading.value = false
}
GetCourseList()

//  选择课程的函数
const courseSelection = async (ccuid: any) => {
  console.log(ccuid)
  const { data: res } = await SelectionApi(ccuid)
  if (res.code === 200) {
    ElMessage.success('选课成功！')
    await GetCourseList()
  }
}
</script>

<style scoped lang="less"></style>
