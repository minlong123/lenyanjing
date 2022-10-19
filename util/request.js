//公共js,以及基本方法封装 nvue里使用
import { DEV_URL, UPLOAD_URL } from "../config/index";
import { getToken } from "@/api/login/login"

const fetch = {
  devUrl2: DEV_URL,
  devUrl3: UPLOAD_URL,
  toast: function (tips) {
    uni.showToast({
      title: tips || "出错啦~",
      icon: "none",
      duration: 2000,
    });
  },
  getTokens:function(){
	var that=this;
	uni.login({
		provider: 'weixin',
		success: res => {
			
			getToken({code:res.code}).then((result) => {
				
				if(result.code == 200){
					
					uni.setStorageSync("token",result.data.token)
					uni.setStorageSync("userinfo",JSON.stringify(result.data.data));

				}else{
					wx.showToast({
					  icon: 'none',
					  title: '连接失败',
					})
				}
			})
		}
	});  
  },
  request: function ({
    url,
    method = "GET",
    params = {},
    showLoading,
    type = "application/json;charset=utf-8",
  }) {
    //接口请求
    if (showLoading) {
      uni.showLoading({
        mask: true,
        title: "请稍候...",
      });
    }
    // let requestUrl = /*  fetch.devUrl2 + */ url;
	
	let requestUrl =   fetch.devUrl2 +  url;

    return new Promise((resolve, reject) => {
      // console.log(requestUrl);
      // console.log(params, "params");
      uni.request({
        url: requestUrl,
        data: params,
        method: method, //'GET','POST'
        header: {
          "Content-type": type,
           "ctoken": uni.getStorageSync("token") || "",
        },
        success: (res) => {
          showLoading && uni.hideLoading();
          resolve(res.data);
        },
        fail: (res) => {
          fetch.toast("网络错误，请稍后重试！");
          reject(res);
        },
        complete: (res) => {
          // console.log(res, "res");
          switch (res.data.code) {
            case 200:
              break;
            case 204:
              break;
            case 4000:
              fetch.toast("错误请求");
              break;
            case 401:
              uni.setStorageSync("token", "");
			  uni.removeStorageSync("userinfo");
			  fetch.getTokens();
              break;
            case 4003:
              fetch.toast("拒绝访问");
              break;
            case 4004:
              fetch.toast("请求错误,未找到该资源");
              break;
            case 4005:
              fetch.toast("请求方法未允许");
              break;
            case 4008:
              fetch.toast("请求超时");
              break;
             case 500:
              fetch.toast("服务器端出错");
              break;
            case 501:
              fetch.toast("网络未实现");
              break;
            case 502:
              fetch.toast("网络错误");
              break;
            case 503:
              fetch.toast("服务不可用");
              break;
            case 504:
              fetch.toast("网络超时");
              break;
            case 505:
              fetch.toast("http版本不支持该请求");
              break;
            default:
              fetch.toast(`${res.data.msg}`);
          }
          if (res.data.code === 4001) {
            uni.reLaunch({
              url: "/pages/index/index",
            });
          }
        },
      });
    });
  },
  upload: function ({ url, params = {}, files = [], showLoading }) {
    //接口请求
    if (showLoading) {
      uni.showLoading({
        mask: true,
        title: "请稍候...",
      });
    }
    let requestUrl = fetch.devUrl2 + url;

    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: requestUrl,
        files: files,
        formData: params,
        header: {
          tfToken: uni.getStorageSync("tfToken") || "",
        },
        success: (res) => {
          showLoading && uni.hideLoading();
          resolve(res.data);
        },
        fail: (res) => {
          fetch.toast("网络错误，请稍后重试！");
          reject(res);
        },
        complete: (res) => {
          switch (res.statusCode) {
            case 200:
              break;
            case 400:
              fetch.toast("错误请求");
              break;
            case 401:
			  uni.removeStorageSync('token');
			  uni.removeStorageSync('userinfo');
              fetch.toast("会话已过期，请重新登录");
              break;
            case 403:
              fetch.toast("拒绝访问");
              break;
            case 404:
              fetch.toast("请求错误,未找到该资源");
              break;
            case 405:
              fetch.toast("请求方法未允许");
              break;
            case 408:
              fetch.toast("请求超时");
              break;
            case 500:
              fetch.toast("服务器端出错");
              break;
            case 501:
              fetch.toast("网络未实现");
              break;
            case 502:
              fetch.toast("网络错误");
              break;
            case 503:
              fetch.toast("服务不可用");
              break;
            case 504:
              fetch.toast("网络超时");
              break;
            case 505:
              fetch.toast("http版本不支持该请求");
              break;
            default:
              fetch.toast(`连接错误${res.statusCode}`);
          }
          if (res.statusCode === 401) {
            uni.reLaunch({
              url: "/pages/index/index",
            });
          }
        },
      });
    });
  },
};

module.exports = {
  request: fetch.request,
  upload: fetch.upload,
  toast: fetch.toast,
};
