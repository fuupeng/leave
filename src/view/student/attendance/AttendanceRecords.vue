<template>
  申请中
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
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
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button :id="scope.row.cuid" link size="small" type="primary" @click="details(scope.row.cuid)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    详情-->
    <el-drawer v-model="drawer" title="出勤详情">
      <el-table :data="detailTableData" style="width: 100%">
        <el-table-column type="index" width="50" align="center" />
        <template v-for="(item, index) in detailTableTitle" :key="item.prop">
          <el-table-column
            v-if="item.label !== '是否出勤'"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            align="center"
          />
          <el-table-column
            v-if="item.label == '是否出勤'"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.attend === 1" effect="dark" type="success">出勤</el-tag>
              <el-tag v-else effect="dark" type="danger">未出勤</el-tag>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { GetAttendanceApi, GetAttenDetailsApi } from '@/api/student/leave'
import { TableTitle } from '@/interface/table'
import { accurateToSeconds } from '@/utils/day'
const loading = ref(false)
const tableTitle: TableTitle[] = [
  {
    label: '课程名称',
    prop: 'cuname'
  },
  {
    label: '出勤次数',
    prop: 'attendance'
  },
  {
    label: '缺勤次数',
    prop: 'absence'
  }
]
const tableData = ref()
const GetList = async () => {
  loading.value = true
  const { data: res } = await GetAttendanceApi()
  if (res.code === 200) {
    tableData.value = res.data
  }
  loading.value = false
}
GetList()

// 查看详情
const detailTableTitle: TableTitle[] = [
  {
    label: '时间',
    prop: 'time'
  },
  {
    label: '是否出勤',
    prop: 'attend'
  }
]
const detailTableData = ref()
const drawer = ref(false)
const details = async (uid: number) => {
  drawer.value = true
  const { data: res } = await GetAttenDetailsApi(uid)
  const data = accurateToSeconds(res.data, 'time')
  detailTableData.value = data
}
</script>
<style lang="less">
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
