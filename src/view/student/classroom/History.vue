<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
      <template v-for="(item, index) in tableTitle">
        <el-table-column :prop="item.prop" :label="item.label" align="center" />
      </template>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import {
  ApplicationApi,
  GetApplyListApi,
  GetClassroomDescApi,
  GetClassroomListApi,
  GetTimeListApi
} from '@/api/student/classroom'
import { TableTitle } from '@/interface/table'
import { DayUtils } from '@/utils/DayUtils'
const loading = ref(false)
// 定义表格字段
const tableTitle: TableTitle[] = [
  {
    label: '教室id',
    prop: 'roid'
  },
  {
    label: '地点',
    prop: 'location'
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
    label: '申请时间',
    prop: 'date'
  },
  {
    label: '借用日期',
    prop: 'apply'
  }
]
// 渲染表格
const tableData: any = ref()
const GetClassroomList = async () => {
  loading.value = true
  const { data: res } = await GetApplyListApi()
  DayUtils.date = res.data
  DayUtils.accurateToSeconds('date').accurateToDay('apply')
  tableData.value = DayUtils.date
  loading.value = false
}
GetClassroomList()
</script>
<style scoped lang="less"></style>
