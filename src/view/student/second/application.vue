<template>
  <el-card class="container">
    <el-form :model="curriculumForm" label-width="100px" label-position="left" ref="ruleFormRef" :rules="rules as any">
      <el-form-item label="实践模块" prop="type">
        <el-select v-model="curriculumForm.type" placeholder="请选择实践模块">
          <template v-for="item in options" :key="item.label">
            <el-option :label="item.label" :value="item.label" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="curriculumForm.name" />
      </el-form-item>
      <el-form-item label="奖项名称" prop="reward">
        <el-input v-model="curriculumForm.reward" />
      </el-form-item>
      <el-form-item label="获奖实践" prop="time">
        <el-date-picker v-model="curriculumForm.time" type="date" placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="证明材料">
        <el-upload
          :headers="headers"
          :action="uploadUrl"
          name="proof"
          :multiple="true"
          :limit="5"
          :on-success="upload"
          :on-error="upload"
          :on-remove="remove"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary">点击上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">只能上传jpeg或者png，并且图片不能超过2M</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="分数" prop="grade">
        <el-input-number v-model="curriculumForm.grade" :precision="2" :step="0.1" :max="10" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
// 申请二课的form
import { FormInstance, FormRules, UploadFile, UploadFiles, UploadProps } from 'element-plus'
import { DeletePicApi } from '@/api/student/exemption'
import { getToken } from '@/utils/setToken'
import { apis } from '@/utils/request'
import { ApplyApi } from '@/api/student/second'

interface CurriculumForm {
  type: string
  name: string
  reward: string
  time: Date | null
  level: string
  proof: string[] | string
  grade: number
}
const curriculumForm: CurriculumForm = reactive({
  type: '',
  name: '',
  reward: '',
  time: null,
  level: '',
  proof: [],
  grade: 0
})
const options = [
  {
    label: '思想政治理论课程实践'
  },
  {
    label: '创新创业'
  },
  {
    label: '综合素质拓展'
  },
  {
    label: '体育锻炼'
  }
]

// 文件上传
const uploadUrl = apis.development + '/stu/secondScore-proof'
const headers = {
  token: getToken('token')
}
const picUrl: string[] = []
const upload = (response: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
  if (response.code === 200 && uploadFiles.length !== 0) {
    picUrl.length = 0
    uploadFiles.forEach((item: UploadFile) => {
      if (item.response?.hasOwnProperty('data')) {
        picUrl.push(item.response.data)
      }
      curriculumForm.proof = picUrl.join(' ')
    })
  }
}
// 删除图片
const remove = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const response: any = uploadFile.response
  if (response.hasOwnProperty('data')) {
    const { data: res } = await DeletePicApi(response.data)
    if (res.code === 200) {
      ElMessage.success('删除成功')
    }
  }
}
const rules = reactive<FormRules<CurriculumForm>>({
  name: [
    { required: true, message: '此为必填项', trigger: 'blur' }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  type: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  reward: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  time: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  level: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  grade: [
    { required: true, message: '此为必填项', trigger: 'blur' },
    { type: 'number', min: 0.1, message: '分值需要大于0.1', trigger: 'blur' }
  ]
})
// 判断图片大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('只能上传jpeg和png')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不能大于2M')
    return false
  }
  return true
}

// 清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const ruleFormRef = ref<FormInstance>()

// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data: res } = await ApplyApi(curriculumForm)
      if (res.code === 200) {
        ElMessage.success('提交成功！')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped lang="less"></style>
