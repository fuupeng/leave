import axios from "axios";
import { getToken, setToken } from "@/utils/setToken.js";
import { ElMessage } from "element-plus";
import router from "@/router";

const apis = {
  production: "http://121.41.51.145:8077/apis", // 线上 (生成环境)
  development: "http://localhost:8089/api", // 本地 (开发环境)
  accessHomeData: "http://www.xmyxapp.com", // 其他api
};

const request = axios.create({
  // baseURL: 'http://121.41.51.145:8077/apis',
  baseURL:
    process.env.NODE_ENV === "production" ? apis.production : apis.development,
  timeout: 6000,
});
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求之前做些什么(获取并设置token)
    config.headers["token"] = getToken("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    let { code, msg, data } = response.data;
    if (code !== 200 && code !== undefined) {
      ElMessage({ message: msg || "error", type: "warning" });
    }
    if (data && data.token) {
      setToken("token", data.token.token);
    }
    if (response.data === "请填写token") {
      console.log(router);
      router.push({ path: "/login" }).then(() => {
        ElMessage({ message: "请重新登录", type: "warning" });
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
