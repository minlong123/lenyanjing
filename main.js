import App from "./App"

// #ifndef VUE3
import Vue from "vue"
import { verifyToken,getToken } from "@/api/login/login"

//引入vuex
import store from "./store"
//把vuex定义成全局组件
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = "app"

Vue.mixin({
  data() {
    return {}
  },
  onShow() {

	if (wx.canIUse('getUpdateManager')) {
		
		const updateManager = wx.getUpdateManager()

		updateManager.onCheckForUpdate(function(res) {
			if (res.hasUpdate) {
				console.log("新版本");
				updateManager.onUpdateReady(function() {
					
					wx.showModal({

						title: '更新提示',

						content: '新版本已经准备好，是否重启应用？',

						success: function(res) {

							if (res.confirm) {

							// console.log("更新了")

								updateManager.applyUpdate()

							}

						}

					})

				})

				updateManager.onUpdateFailed(function() {

					wx.showModal({

						title: '已经有新版本了哟~',

						content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'

					})

				})


			}

		})

	} else {

		wx.showModal({
		
			title: '提示',

			content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'

		})

	}
	  

	

	
	
  },
  methods: {
    navigateBack() {
      uni.navigateBack()
    },
    navigateTo(page) {
      uni.navigateTo(page)
    },
    switchTab(page) {
      uni.switchTab(page)
    },
    formatDate(date, Format) {
      return this.$u.timeFormat(new Date(date), Format)
    },
    // 金额格式
    number_format(number, decimals, dec_point, thousands_sep) {
      decimals = 2 //这里默认设置保留两位小数，也可以注释这句采用传入的参数
      /*
       * 参数说明：
       * number：要格式化的数字
       * decimals：保留几位小数
       * dec_point：小数点符号
       * thousands_sep：千分位符号
       * */
      number = (number + "").replace(/[^0-9+-Ee.]/g, "")
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point
      var s = n.toString().split(".")
      var re = /(-?\d+)(\d{3})/
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2")
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || ""
        s[1] += new Array(prec - s[1].length + 1).join("0")
      } else {
        s[1] = s[1].substring(0, prec) //小数点位数超出长度时截取前面的位数
      }
      return s.join(dec)
    },

    // 全局添加下拉选框的label和value
    formatSelectList(label, value, list) {
      var newList = []
      list.forEach((item) => {
        item.label = item[label]
        if (item[value]) {
          item.value = item[value]
        } else {
          item.value = item.project[value]
        }

        item.extra = item
        newList.push(item)
      })
      return newList
    },
    copy(text, msg = "复制成功") {
      uni
        .setClipboardData({
          data: text,
        })
        .then(([err, res]) => {
          if (!err) {
            uni.showToast({
              title: msg,
            })
          }
        })
    },
    /**
     * 根据日期字符串获取星期几
     * @param dateString 日期字符串（如：2020-05-02）
     * @returns {String}
     */
    getWeek(dateString) {
      var dateArray = dateString.split("-")
      const date = new Date(
        dateArray[0],
        parseInt(dateArray[1] - 1),
        dateArray[2]
      )
      return "周" + "日一二三四五六".charAt(date.getDay())
    },
    /**
     * 计算两个日期之间的天数
     * @param dateString1  开始日期 yyyy-MM-dd
     * @param dateString2  结束日期 yyyy-MM-dd
     * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
     */
    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1)
      var endDate = Date.parse(dateString2)
      if (startDate > endDate) {
        return 0
      }
      if (startDate == endDate) {
        return 1
      }
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
      return days
    },
    /**
     * 获取两个日期之间的所有日期
     * @param starDay  开始日期 yyyy-MM-dd
     * @param endDay  结束日期 yyyy-MM-dd
     * @returns {dates}
     */
    getDayAll(starDay, endDay) {
      var arr = []
      var dates = []
      // 设置两个日期UTC时间
      var db = new Date(starDay)
      var de = new Date(endDay)
      // 获取两个日期GTM时间
      var s = db.getTime() - 24 * 60 * 60 * 1000
      var d = de.getTime() - 24 * 60 * 60 * 1000
      // 获取到两个日期之间的每一天的毫秒数
      for (var i = s; i <= d; ) {
        i = i + 24 * 60 * 60 * 1000
        arr.push(parseInt(i))
      }
      // 获取每一天的时间  YY-MM-DD

      for (var j in arr) {
        var time = new Date(arr[j])
        var year = time.getFullYear(time)
        var mouth =
          time.getMonth() + 1 >= 10
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1)
        var day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()
        var YYMMDD = year + "-" + mouth + "-" + day
        dates.push(YYMMDD)
      }
      return dates
    },
    // 上传
    uploadAccessory(parentId) {
      /**
       * currentWebview: 当前webview
       * url：上传接口地址
       * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
       * header: 上传接口请求头
       */
      console.log("--------------------")
      this.$refs.lFile.upload({
        // #ifdef APP-PLUS
        //（app端必传）nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
        currentWebview: this.$mp.page.$getAppWebview(),
        // #endif
        //替换为你的上传接口地址
        method: "POST",
        url: "",
        // 服务端接收附件的key
        name: "accessoryfile",
        parentId: parentId,
        //根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
        header: {
          Authorization: "Bearer " + uni.getStorageSync("token"),
          // "Content-type": "application/x-www-form-urlencoded",
        },
      })
    },
  },
})

const app = new Vue({
  ...App,
  store,
})

app.$mount()
// #endif

import uView from "uview-ui"
Vue.use(uView)




// #ifdef VUE3
import { createSSRApp } from "vue"
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
