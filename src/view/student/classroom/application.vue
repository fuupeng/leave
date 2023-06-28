<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
      <template v-for="(item, index) in tableTitle">
        <el-table-column :prop="item.prop" :label="item.label" align="center" />
      </template>
      <el-table-column align="center" fixed="right" label="日期">
        <template #default="scope">
          <el-date-picker type="date" v-model="scope.row.date" placeholder="Pick a day" />
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link size="small" type="primary" @click="showDesc(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--教室详情-->
  <el-drawer v-model="drawer" title="教室详情" size="50%">
    <el-table
      :data="timeList"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" />
      <template v-for="(item, index) in timeTitle" :key="item.prop">
        <el-table-column align="center" :prop="item.prop" :label="item.label" />
      </template>
      <el-table-column align="center" fixed="right" label="状态">
        <template #default="scope">
          <el-tag type="danger" effect="dark" v-if="freeTime[scope.row.num - 1]">占用</el-tag>
          <el-tag type="success" effect="dark" v-else>空闲</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="application()">申请</el-button>
  </el-drawer>
</template>
<script setup lang="ts">
import { ApplicationApi, GetClassroomDescApi, GetClassroomListApi, GetTimeListApi } from '@/api/student/classroom'
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
    label: '教室描述',
    prop: 'description'
  }
]
// 渲染表格
const tableData: any = ref()
const GetClassroomList = async () => {
  loading.value = true
  const { data: res } = await GetClassroomListApi()
  tableData.value = res.data
  loading.value = false
}
GetClassroomList()

// 查看教室详情
const timeList = ref()
const drawer = ref(false)
const appData = reactive({} as any)
const showDesc = async (row: any) => {
  // 判断是否勾选日期
  if (!row.date)
    return ElMessage({
      message: '请先选择日期',
      type: 'warning'
    })
  loading.value = true
  for (let i = 0; i < freeTime.length; i++) {
    freeTime[i] = 0
  }

  appData.roid = row.roid
  appData.apply = row.date
  drawer.value = true
  const [{ data: desc }, { data: time }] = await Promise.all([GetClassroomDescApi(row), GetTimeListApi()])
  DayUtils.date = time.data
  DayUtils.accurateToCustom('starttime', 'HH:mm:ss').accurateToCustom('endtime', 'HH:mm:ss')
  timeList.value = DayUtils.date
  console.log(timeList.value)
  // 空闲时间
  desc.data.forEach((item: any) => {
    console.log(item.starttime)
    for (let i = item.starttime; i <= item.endtime; i++) {
      freeTime[i - 1] = 1
    }
  })
  loading.value = false
}
// 时间表
const timeTitle: TableTitle[] = [
  { prop: 'num', label: '节数' },
  { prop: 'starttime', label: '开始时间' },
  { prop: 'endtime', label: '结束时间' }
]
const freeTime = reactive([] as any)
for (let i = 0; i < 14; i++) {
  freeTime.push(0)
}

// 多选表格
const selection = reactive([] as any)
const handleSelectionChange = (val: any) => {
  selection.length = 0
  val.forEach((item: any) => {
    selection.push(item.num)
  })
  appData.choice = selection
}

// 申请
const application = async () => {
  const { data: res } = await ApplicationApi(appData)
  if (res.code === 200) {
    ElMessage({
      message: '申请成功',
      type: 'success'
    })
    drawer.value = false
  }
}
</script>
<style scoped lang="less"></style>
