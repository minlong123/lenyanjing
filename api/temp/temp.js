import { request } from "@/util/request.js"


// 获取模板的数据
export function getTeamp() {
  return request({
    url: "/api/v1/getTeamp",
    method: "get"
  })
}


// 获取模板的内容
export function getTTeampcon(data) {
  return request({
    url: "/api/v1/getTTeampcon",
    method: "get",
    params: data,
  })
}

// 获取模板表单项
export function getContralTemapi(data) {
  return request({
    url: "/api/v1/getContralTemapi",
    method: "get",
    params: data,
  })
}



// 获取填写变量后的文件
export function setTeamdata(data) {
  return request({
    url: "/api/v1/setTeamdata",
    method: "post",
    params: data,
  })
}