<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
      <el-table-column type="index" width="55" align="center" />
      <template v-for="(item, index) in tableTitle">
        <el-table-column v-if="item.label == '状态'" :label="item.label" :prop="item.prop" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.result === '已通过'" effect="dark" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.result === '未通过'" effect="dark" type="danger">未通过</el-tag>
            <el-tag v-else effect="dark" type="warning">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.label" align="center" />
      </template>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button @click="showProof(scope.row.proof)" link size="small" type="success">查看证明材料</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template #default="scope">
          <el-popconfirm title="确认同意吗？" @confirm="agree(scope.row.mid, '已通过')">
            <template #reference>
              <el-button link size="small" type="primary">同意</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确认拒绝吗？" @confirm="agree(scope.row.mid, '未通过')">
            <template #reference>
              <el-button link size="small" type="danger">拒绝</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogTableVisible" title="证明材料">
      <template v-for="item in pic" :key="item">
        <el-image style="width: 200px; height: 200px" :src="item" fit="cover" :preview-src-list="pic" />
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { TableTitle } from '@/interface/table'
import { ApplyingApi } from '@/api/student/exemption'
import { ExemptionAuditingAPi, GetExemptionListApi } from '@/api/instructor/exemption'
const dialogTableVisible = ref(false)
const loading = ref(false)
// 表头
const tableTitle: TableTitle[] = [
  {
    label: '学生姓名',
    prop: 'uname'
  },
  {
    label: '课程名称',
    prop: 'cuname'
  },
  {
    label: '原因',
    prop: 'reason'
  },
  {
    label: '状态',
    prop: 'result'
  }
]
// 数据源
const tableData = ref()
const Applying = async () => {
  loading.value = true
  const { data: res } = await GetExemptionListApi()
  tableData.value = res.data
  loading.value = false
}
Applying()

// 查看证明材料
const pic = ref([] as any)
const showProof = async (proof: any) => {
  if (proof.length) {
    pic.value = proof.split(' ')
    pic.value = pic.value.map((item: any) => {
      return 'http://' + item
    })
    dialogTableVisible.value = true
    console.log(pic)
  } else {
    ElMessage.info('无证明材料')
  }
}

//操作
const agree = async (mid: any, result: string) => {
  const { data: res } = await ExemptionAuditingAPi({ mid, result })
  if (res.code === 200) {
    await Applying()
    ElMessage.success('操作成功')
  }
}
</script>

<style scoped lang="less"></style>
