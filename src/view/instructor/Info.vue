<template>
  <div class="info">
    <el-card>
      <el-form inline :model="info" label-position="left" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="info.tname" placeholder="请填写姓名" disabled />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="info.title" placeholder="请填写职称" disabled />
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="info.level" placeholder="请填写职称" disabled />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="info.college" placeholder="请填写学院" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="info.gender" placeholder="请填写性别" disabled />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="info.age" placeholder="请填写年龄" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="info.phone" placeholder="请填写电话号码" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="info.email" placeholder="请填写邮箱" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="info.address" placeholder="请填写地址" />
        </el-form-item>
        <br />
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { GetInfoApi, UpdateApi } from '@/api/teacher/info'
import { UpdateInfoApi } from '@/api/public/info'

const info = ref({
  tname: '',
  title: '',
  college: '',
  gender: '',
  age: '',
  level: '',
  phone: '',
  email: '',
  address: ''
})
// 获取个人信息
const GetInfo = async () => {
  let { data: res } = await GetInfoApi()
  info.value = res.data
  localStorage.setItem('info', JSON.stringify(res.data))
}
GetInfo()
const onSubmit = async () => {
  info.value.uname = info.value.tname
  const { data: res } = await UpdateInfoApi(info.value, 1)
  if (res.code === 200) {
    ElMessage.success('更新成功！')
  }
}
</script>
<style lang="less">
.info {
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
