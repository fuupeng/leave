<template>
  新建申请
  <div class="container">
    <el-card>
      <el-form inline :model="leaveData" label-position="left" label-width="150px">
        <el-form-item label="请假周">
          <el-select v-model="leaveData.nweek" placeholder="Select">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="请假课程">
          <el-select v-model="leaveData.ccuid" placeholder="请选择课程">
            <template v-for="item in course">
              <el-option :label="item.cuname" :value="item.ccuid" />
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
import { ref } from 'vue'
import { dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import { CourseLeaveApi, GetCourseNameApi } from '@/api/student/leave'
const router = useRouter()

const leaveData = ref({
  ccuid: '',
  nweek: ''
})

// 获取辅导员课程
const course = ref([] as Array<{ cuname: string; ccuid: string }>)
const GetCourseName = async () => {
  const { data: res } = await GetCourseNameApi()
  course.value = res.data
}
GetCourseName()

const options = ref([] as any)
for (let i = 0; i < 17; i++) {
  options.value.push({ label: '第' + i + '周' })
}
// 提交
const onSubmit = async () => {
  console.log(leaveData.value)
  const { data: res } = await CourseLeaveApi(leaveData.value)
  if (res.code === 200) {
    ElMessage({
      showClose: true,
      message: '提交成功',
      type: 'success'
    })
    leaveData.value = {
      ccuid: '',
      nweek: ''
    }
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
