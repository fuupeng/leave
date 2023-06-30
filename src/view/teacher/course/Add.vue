<template>
  <el-card>
    <div class="add">
      <el-form>
        <el-form-item label="课程名称" label-width="120px">
          <el-select v-model="formData.cuid">
            <template v-for="item in courses" :key="item.cuid">
              <el-option :label="item.cuname" :value="item.cuid" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="上课教室" label-width="120px">
          <el-select v-model="formData.roid" @change="getFreeTime">
            <template v-for="item in classrooms" :key="item">
              <el-option :label="item.location" :value="item.roid" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" label-width="120px">
          <el-select v-model="formData.week" @change="getFreeTime">
            <template v-for="item in weeks" :key="item"><el-option :label="item" :value="item" /></template>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.week && formData.roid" label="上课时间" label-width="120px">
          <el-checkbox-group v-model="formData.choice">
            <el-checkbox-button
              v-for="section in sections"
              :key="section.lesson"
              :label="section.lesson"
              :disabled="section.value === 1"
            >
              {{ section.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="120px">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { GetClassroomListApi } from '@/api/student/classroom'
import { CourseSubmitApi, GetCoursesAvailableApi, GetFreeTimeApi } from '@/api/teacher/course'

const weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const sections = reactive([
  {
    name: '第一节',
    lesson: 1,
    value: 0
  },
  {
    name: '第二节',
    lesson: 2,
    value: 0
  },
  {
    name: '第三节',
    lesson: 3,
    value: 0
  },
  {
    name: '第四节',
    lesson: 4,
    value: 0
  },
  {
    name: '第五节',
    lesson: 5,
    value: 0
  },
  {
    name: '第六节',
    lesson: 6,
    value: 0
  },
  {
    name: '第七节',
    lesson: 7,
    value: 0
  },
  {
    name: '第八节',
    lesson: 8,
    value: 0
  },
  {
    name: '第九节',
    lesson: 9,
    value: 0
  },
  {
    name: '第十节',
    lesson: 10,
    value: 0
  },
  {
    name: '第十一节',
    lesson: 11,
    value: 0
  },
  {
    name: '第十二节',
    lesson: 12,
    value: 0
  },
  {
    name: '第十三节',
    lesson: 13,
    value: 0
  }
])

// 获取教室
const classrooms = ref()
const getClassroom = async () => {
  const { data: res } = await GetClassroomListApi()
  classrooms.value = res.data
}
getClassroom()

const formData = reactive({
  roid: '',
  week: '',
  cuid: '',
  choice: []
})

// 获取空闲时间
const getFreeTime = async () => {
  if (formData.roid && formData.week) {
    sections.forEach((item: any) => {
      item.value = 0
    })
    const { data: res } = await GetFreeTimeApi({ roid: formData.roid, week: formData.week })
    res.data.forEach((item: any) => {
      for (let i = item.starttime; i <= item.endtime; i++) {
        sections[i - 1].value = 1
      }
    })
  }
}
// 获取可开课程
const courses = ref()
const getCoursesAvailable = async () => {
  const { data: res } = await GetCoursesAvailableApi()
  courses.value = res.data
}
getCoursesAvailable()
const onSubmit = async () => {
  formData.choice = formData.choice.sort((a, b) => a - b)
  const { data: res } = await CourseSubmitApi(formData)
  if (res.code === 200) {
    ElMessage.success('添加成功')
  }
}
</script>
<style scoped lang="less">
.add {
  width: 1200px;
}
</style>
