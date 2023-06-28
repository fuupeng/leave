<template>
  <div class="container">
    <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
      <template v-for="(item, index) in tableTitle">
        <el-table-column :prop="item.prop" :label="item.label" align="center" />
      </template>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link size="small" type="success" @click="showDialog(scope.row)">申请免修</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="show" title="免听免修申请" width="30%" center>
      <el-form :model="exemptionForm as any" label-width="100px" label-position="left">
        <el-form-item label="课程名称">
          <el-input v-model="exemptionForm.cuname" disabled />
        </el-form-item>
        <el-form-item label="原因">
          <el-input v-model="exemptionForm.reason" type="textarea" />
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
        <el-form-item label="类型">
          <el-radio-group v-model="exemptionForm.distinct">
            <el-radio :label="0">免听</el-radio>
            <el-radio :label="1">免修</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="apply">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { DeselectionsApi, GetCourseListApi, SelectionApi, SelectionedListApi } from '@/api/student/course'
import { TableTitle } from '@/interface/table'
import { UploadFile, UploadFiles, UploadProps } from 'element-plus'
import request, { apis } from '@/utils/request'
import { getToken } from '@/utils/setToken'
import { ApplyApi, DeletePicApi } from '@/api/student/exemption'
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
  const { data: res } = await SelectionedListApi()
  tableData.value = res.data
  loading.value = false
}
GetCourseList()

// 申请免听免修的form
const exemptionForm = reactive({
  cuname: '',
  proof: [] as any,
  reason: '',
  ccuid: '',
  distinct: 0
})
const show = ref(false)
const showDialog = (row: any) => {
  exemptionForm.proof = []
  exemptionForm.distinct = 0
  exemptionForm.reason = ''
  show.value = true
  exemptionForm.ccuid = row.ccuid
  exemptionForm.cuname = row.cuname
  console.log(exemptionForm)
}

// 文件上传
const uploadUrl = apis.development + '/stu/free-proof'
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
      exemptionForm.proof = picUrl.join(' ')
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

// 申请
const apply = async () => {
  console.log(exemptionForm)
  const { data: res } = await ApplyApi(exemptionForm)
  if (res.code === 200) {
    ElMessage.success('提交成功')
  }
}
</script>

<style scoped lang="less"></style>
