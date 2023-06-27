<template>
  新建申请
  <div class="container">
    <el-card>
      <el-form inline :model="leaveData" label-position="left" label-width="150px">
        <el-form-item label="开始以及结束时间">
          <el-date-picker
            v-model="leaveData.time"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </el-form-item>
        <br />
        <el-form-item label="请假事由">
          <el-input v-model="leaveData.reason" placeholder="请填写请假事由" />
        </el-form-item>
        <br />
        <el-form-item label="目的地">
          <el-cascader v-model="leaveData.destination" :options="address" :props="props" />
        </el-form-item>

        <el-form-item label="辅导员">
          <el-select v-model="leaveData.tid" placeholder="请选择辅导员">
            <template v-for="item in interf">
              <el-option :label="item.tname" :value="item.tid" />
            </template>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { GetInterfaceApi, LeavingSchoolApi } from '@/api/student/school'
import { ref } from 'vue'
import { address } from '@/assets/address.json'
import { dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 地址
const props = {
  value: 'name',
  label: 'name',
  children: 'children'
}
const leaveData = ref({
  time: '',
  starttime: '',
  endtime: '',
  reason: '',
  destination: '',
  tid: ''
})

// 获取辅导员id
const interf = ref()
const GetInterface = async () => {
  const { data: res } = await GetInterfaceApi()
  interf.value = [res.data]
}
GetInterface()

// 提交
const onSubmit = async () => {
  leaveData.value.starttime = dayjs(leaveData.value.starttime[0]).format('YYYY-MM-DD')
  leaveData.value.endtime = dayjs(leaveData.value.starttime[2]).format('YYYY-MM-DD')
  leaveData.value.destination = leaveData.value.destination.join('')
  const { data: res } = await LeavingSchoolApi(leaveData.value)
  if (res.code === 200) {
    ElMessage({
      showClose: true,
      message: '提交成功',
      type: 'success'
    })
    router.push({ path: '/student/school/applying' })
  } else {
    ElMessage({
      showClose: true,
      message: '提交失败',
      type: 'error'
    })
  }
}
</script>
<style lang="less">
.container {
  width: 800px;
  margin: 0 auto;
  .el-card {
    padding: 30px;
    .btn {
      display: flex !important;
      justify-content: center;
      .el-form-item__content {
        justify-content: center;
      }
    }
  }
}
</style>
