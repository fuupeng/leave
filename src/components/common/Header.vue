<template>
  <div class="header">
    <el-header>
      <div class="title">
        <span>智慧学干</span>
        <el-icon size="24px" @click="menuChange">
          <svg aria-hidden="true">
            <use :xlink:href="icon"></use>
          </svg>
        </el-icon>
      </div>
      <div class="menu">
        <el-menu mode="horizontal" router>
          <el-sub-menu index="1">
            <template #title>
              <el-avatar
                fit="cover"
                :src="headPicUrl"
                error="https://ts1.cn.mm.bing.net/th/id/R-C.c016e44e170798fe33e1ecb4391f99cc?rik=11mNnaVQe%2b6c8g&riu=http%3a%2f%2fpic.616pic.com%2fys_img%2f00%2f60%2f18%2fSrKJcQwvYd.jpg&ehk=2Vohy2ubAoqWjfx0uF5vREsyseJMSXvE6jJjv9NK%2bRw%3d&risl=&pid=ImgRaw&r=0"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              {{ name }}
            </template>
            <el-menu-item :index="'/' + identity + '/info'">个人信息</el-menu-item>
            <el-menu-item @click="clickCenter">修改头像</el-menu-item>
            <el-menu-item @click="logout" index="/login">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-header>
    <el-dialog v-model="centerDialogVisible" title="头像修改" width="30%" center>
      <div style="text-align: center">
        <el-upload
          ref="uploadRef"
          :action="picUrl"
          :show-file-list="false"
          :auto-upload="false"
          :limit="1"
          :on-change="handleFileChange"
          name="headPic"
          method="PUT"
          :headers="headers"
          :on-success="handleAvatarSuccess"
        >
          <img style="height: 50px; width: 50px" v-if="imageUrl" :src="imageUrl" class="avatar" />

          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="apply()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getToken, removeToken } from '@/utils/setToken'
import { GetHeadPicApi, GetInfoApi } from '@/api/student/info'
import { apis } from '@/utils/request'
import { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

let store = useStore()
let icon = ref()
icon.value = '#icon-fold'

// 头像地址
const headPicUrl = ref()
const menuChange = () => {
  store.commit('changeShrink')
  if (store.state.shrink) {
    icon.value = '#icon-unfold'
  } else {
    icon.value = '#icon-fold'
  }
}
const logout = () => {
  removeToken('token')
}

const name = ref()
const identity = localStorage.getItem('identity')
const baseUrl = process.env.NODE_ENV === 'production' ? apis.production : apis.development
let picUrl
const GetInfo = async () => {
  const identity = localStorage.getItem('identity')
  let url = ''
  if (identity === 'student') {
    url = '/stu'
    picUrl = baseUrl + '/stu/updateHeadPic'
  } else {
    url = '/tea/info'
    picUrl = baseUrl + '/tea/updateHeadPic'
  }
  console.log(url)
  let { data: res } = await GetInfoApi(url)
  localStorage.setItem('info', JSON.stringify(res.data))
  name.value = res.data.uname || res.data.tname
  const { data: res1 } = await GetHeadPicApi(res.data.headPic)
  headPicUrl.value = 'http://' + res1.data
}
GetInfo()

// 修改头像
const headers = {
  token: getToken('token')
}
const centerDialogVisible = ref(false)
const uploadRef = ref<UploadInstance>()
const clickCenter = () => {
  centerDialogVisible.value = true
}
const apply = () => {
  uploadRef.value!.submit()
}
const imageData = ref<string | null>(null) // 存储图片的Base64编码
const imageUrl = computed(() => {
  return imageData.value ? `data:image/jpeg;base64,${imageData.value}` : null
})
function handleFileChange(uploadFile: UploadFile) {
  if (uploadFile) {
    const raw: any = uploadFile.raw
    let blob = new Blob([raw], { type: 'audio/wav' })
    const reader = new FileReader()
    reader.onload = () => {
      imageData.value = (reader.result as string).split(',')[1] // 提取Base64编码的部分
    }
    reader.readAsDataURL(blob)
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  if (response.code === 200) {
    await GetInfo()
    ElMessage.success('更新成功')
    centerDialogVisible.value = false
  }
}
</script>
<style lang="less" scoped>
.header {
  .el-header {
    background: #fff;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;

    .title {
      width: 210px;
      font-size: 24px;
      display: flex;
      justify-content: space-between;

      .el-icon {
        display: flex;
        height: 60px;
      }

      .el-icon:hover {
        color: #03bf8a;
        cursor: pointer;
      }
    }

    .menu {
      width: 300px;
      .el-sub-menu__title {
        width: 300px;
        font-size: 30px;
      }
    }
  }
}
</style>
