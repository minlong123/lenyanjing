import { request } from "@/util/request.js"



// 获取首页的数据
export function getBannerData() {
  return request({
    url: "/api/v1/getBannerData",
    method: "get"
  })
}

// 获取banner的详情数据
export function getBannerDetail(data) {
  return request({
    url: "/api/v1/getBannerDetails",
    method: "post",
    params: data,
  })
}



