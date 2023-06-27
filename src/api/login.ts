import request from "@/utils/request";

export const LoginApi = (info: any) => {
  return request({
    url: `user/${info.identity === "student" ? "0" : "1"}`,
    method: "POST",
    data: {
      uid: info.username,
      pwd: info.password,
    },
  });
};
