import { request } from "@/util/request.js"

// 获取所有合同发起需要的数据
export function getContralParam() {
  return request({
    url: "/api/v1/getContralParam",
    method: "get"
  })
}

// 授权方和公司及个人签署合同
export function sendContract(data) {
  return request({
    url: "/api/v1/sendContract",
    method: "post",
    params: data,
  })
}

// 个人和个人签署合同
export function sendPertoPer(data) {
  return request({
    url: "/api/v1/sendPertoPer",
    method: "post",
    params: data,
  })
}

// 获取文件页码
export function getSendFilespage(data) {
  return request({
    url: "/api/v1/getSendFilespage",
    method: "get",
    params: data,
  })
}


