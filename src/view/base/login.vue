<template>
  <div class="login">
    <div class="main">
      <div class="tower"></div>
      <div class="content">
        <h1>欢迎登录</h1>
        <el-form ref="form1" :model="form" label-width="80px" class="form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="身 份" prop="identity">
            <el-radio-group v-model="form.identity">
              <el-radio-button label="student">学生</el-radio-button>
              <el-radio-button label="teacher">任课教师</el-radio-button>
              <el-radio-button label="instructor">辅导员</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="btns">
          <el-button type="primary" @click="handleSubmit">登录</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoginApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const form = ref({
  username: '',
  password: '',
  identity: 'student'
})

const handleSubmit = async () => {
  const { data: res } = await LoginApi(form.value)
  if (res.code === 200) {
    localStorage.setItem('identity', form.value.identity)
    await router.push({ path: `/${form.value.identity}` })
  }
}

function handleReset(): void {
  form.value = { username: '', password: '', identity: 'student' }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('@/assets/login.jpg') no-repeat center center;
  h1 {
    margin-bottom: 40px;
    font-size: 28px;
    font-weight: 600;
  }
  .main {
    width: 720px;
    height: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 0px 30px 5px rgb(160, 160, 160);
    .tower {
      width: 360px;
      height: 340px;
      background: url('@/assets/tower.png') no-repeat center center;
      background-size: auto 100%;
      opacity: 0.6;
    }
    .content {
      text-align: center;
    }
  }
}

.form {
  width: 330px;
  margin-right: 30px;
  font-weight: 600;
}

.btns {
  margin-top: 24px;

  button {
    margin-right: 12px;
  }
}
</style>
