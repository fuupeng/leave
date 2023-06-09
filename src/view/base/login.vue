<template>
  <div id="login-box">
    <h1>Login</h1>
    <div class="input-box">
      <i class="iconfont">&#xe609;</i>

      <input type="text" placeholder="UserName" />
    </div>
    <div class="input-box">
      <i class="iconfont">&#xe605;</i>
      <input type="password" placeholder="UserPassword" />
    </div>
    <div class="input-box">
      <el-radio-group v-model="identity">
        <el-radio label="1" size="large">学生</el-radio>
        <el-radio label="2" size="large">辅导员</el-radio>
        <el-radio label="3" size="large">任课教师</el-radio>
      </el-radio-group>
    </div>
    <button>Sign in</button>
  </div>
</template>
<script lang="ts" setup>
const identity = ref("1");
</script>
<style scoped lang="less">
body {
  // background-image: url(../img/桥.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -50px;
}
#login-box {
  background-color: #00000068;
  border-radius: 13px;
  text-align: center;
  margin: 0px auto;
  margin-top: 80px;
  width: 350px;
  height: 400px;
  h1 {
    padding-top: 60px;
    color: #ffffff;
  }
  .input-box {
    margin-top: 30px;
  }

  .input-box input {
    border: none;
    background: none;
    border-bottom: #ffffff 2px solid;
    padding: 5px 10px;
    outline: none;
    color: #ffffff;
  }
  button {
    line-height: 30px;
    margin-top: 30px;
    width: 130px;
    height: 30px;
    border-radius: 13px;
    outline: none;
    border: none;
    background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
    color: #ffffff;
  }

  button:hover {
    background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  }
  .input-box i {
    color: #ffffff;
  }
}
</style>
