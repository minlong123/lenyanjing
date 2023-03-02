import { request } from "@/util/request.js"



export function syncnotes(data) {
  return request({
    url: "/api/index/syncnotes",
    method: "post",
    params: data,
  })
}
