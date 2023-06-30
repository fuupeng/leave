<template>
  <div class="info">
    <el-card>
      <el-form inline :model="info" label-position="left" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="info.uname" placeholder="请填写姓名" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="info.clname" placeholder="请填写班级" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="info.gender" placeholder="请填写性别" disabled />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="info.age" placeholder="请填写年龄" disabled />
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
import { GetInfoApi } from '@/api/student/info'
import { UpdateInfoApi } from '@/api/public/info'

const info = ref({
  uname: '',
  clname: '',
  gender: '',
  age: '',
  phone: '',
  email: '',
  address: ''
})
// 获取个人信息
const GetInfo = async () => {
  let { data: res } = await GetInfoApi('/stu')
  info.value = res.data
  localStorage.setItem('info', JSON.stringify(res.data))
}
GetInfo()
const onSubmit = async () => {
  const { data: res } = await UpdateInfoApi(info.value, 0)
  if (res.code === 200) {
    ElMessage.success('更新成功')
  }
}
</script>
<style lang="less">
.info {
  width: 1200px;
  margin: 0 auto;
  .el-card {
    padding: 30px;
    width: 1200px;
    margin: 0 auto;
    .el-form {
      width: 800px;
      margin: 0 auto;
    }
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
