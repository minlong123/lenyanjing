import { request } from "@/util/request.js"


// 获取唯一标识
export function getToken(data) {
  return request({
    url: "/api/v1/getToken",
    method: "post",
    params: data,
  })
}

// 保存信息
export function saveUserInfo(data) {
  return request({
    url: "/api/v1/user/setUserInfo",
    method: "post",
    params: data,
  })
}

// 手机确认身份
export function savePhone(data) {
  return request({
    url: "/api/v1/user/setPhone",
    method: "post",
    params: data,
  })
}

// 检查token是否过期
export function verifyToken() {
  return request({
    url: "/api/v1/verifyToken",
    method: "post",
  })
}