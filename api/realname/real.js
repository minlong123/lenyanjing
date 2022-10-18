import { request } from "@/util/request.js"


// 实名认证
export function getRealNameIn(data) {
  return request({
    url: "/api/v1/getRealNameIn",
    method: "post",
    params: data,
  })
}


// 发送验证码
export function sendVercode(data) {
  return request({
    url: "/api/v1/sendVercode",
    method: "get",
    params: data,
  })
}


// 获取实名的信息
export function getRealInfo(data) {
  return request({
    url: "/api/v1/getRealInfo",
    method: "post",
	params: data,
  })
}


export function getCompanySealUrl(data) {
  return request({
    url: "/api/v1/getCompanySealUrl",
    method: "post",
	params: data,
  })
}