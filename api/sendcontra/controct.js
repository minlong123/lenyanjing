import { request } from "@/util/request.js"


// 获取合同各个类型的数据
export function getContractNumList() {
  return request({
    url: "/api/v1/getContractNumList",
    method: "get"
  })
}

// 提交合同
export function getContractTitList(data) {
  return request({
    url: "/api/v1/getContractTitList",
    method: "get",
    params: data,
  })
}

// 获取合同详情
export function getContractDetails(data) {
  return request({
    url: "/api/v1/getContractDetails",
    method: "get",
    params: data,
  })
}


// 获取合同预览链接
export function getsignurls(data) {
  return request({
    url: "/api/v1/getsignurls",
    method: "get",
    params: data,
  })
}

// 获取签署的链接
export function getpersignlink(data) {
  return request({
    url: "/api/v1/getpersignlink",
    method: "get",
    params: data,
  })
}

// 获取合同下载链接
export function getdowContractUrl(data) {
  return request({
    url: "/api/v1/getdowContractUrl",
    method: "get",
    params: data,
  })
}

// 获取合同下载链接
export function cuisignr(data) {
  return request({
    url: "/api/v1/cuisignr",
    method: "get",
    params: data,
  })
}

// 撤销合同
export function delflowcon(data) {
  return request({
    url: "/api/v1/delflowcon",
    method: "get",
    params: data,
  })
}

// 审批合同
export function agrees(data) {
  return request({
    url: "/api/v1/agrees",
    method: "post",
    params: data,
  })
}

// 获取合同搜索的数据
export function getSearchContract() {
  return request({
    url: "/api/v1/getSearchContract",
    method: "get"
  })
}


// 获取首页的数据
export function getPendingContractList() {
  return request({
    url: "/api/v1/getPendContrLi",
    method: "get"
  })
}




// 保存搜索记录
export function saveSearchContract(data) {
  return request({
    url: "/api/v1/saveSearchContract",
    method: "post",
    params: data,
  })
}

// 获取分享的页面链接
export function getShareContractUrl(data) {
  return request({
    url: "/api/v1/getShareContractUrl",
    method: "post",
    params: data,
  })
}

// 催促审批
export function cuiappro(data) {
  return request({
    url: "/api/v1/cuiappros",
    method: "post",
    params: data,
  })
}

// 验证公司名和证件号是否准确
export function varCompanyCard(data) {
  return request({
    url: "/api/v1/varCompanyCard",
    method: "post",
    params: data,
  })
}

// 根据公司名获取统一社会信用代码
export function getNameCompanyCard(data) {
  return request({
    url: "/api/v1/getNameCompanyCard",
    method: "post",
    params: data,
  })
}

export function getAllAppNodess(data) {
  return request({
    url: "/api/v1/getAllAppNodes",
    method: "post",
    params: data,
  })
}
