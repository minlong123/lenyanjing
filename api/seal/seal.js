import { request } from "@/util/request.js"



// 获取印章数据
export function getSeals() {
  return request({
    url: "/api/v1/getSeals",
    method: "get"
  })
}


// 只获取一个数据
export function getSingleSeals() {
  return request({
    url: "/api/v1/getSingleSeals",
    method: "get"
  })
}

// 去授权
export function getCompanAuth(data) {
  return request({
    url: "/api/v1/getCompanAuth",
    method: "post",
	params: data,
  })
}


export function getMySigninfos() {
  return request({
    url: "/api/v1/getMySigninfos",
    method: "get"
  })
}