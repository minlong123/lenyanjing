import { request } from "@/util/request.js"



// 获取协议
export function getAgements() {
  return request({
    url: "/api/v1/getAgements",
    method: "get",
  })
}


