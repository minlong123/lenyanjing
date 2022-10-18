<script>
export default {
	// globalData: {//使用全局储存信息
	// 	version: '',
	// 	versionCode: ''
	// },
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
	  
	//   plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
	// 	// appInfo为当前应用程序的所有信息
	// 	this.globalData.version = appInfo.version
	// 	this.globalData.versionCode = appInfo.versionCode
	// 	console.log(this.globalData);

	// });
	    
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
	
	
/*每个页面公共css */
@import "uview-ui/index.scss";
@import url("./static/fonts/iconfont.css");

body {
  font-family: PingFang SC, PingFang SC-Bold;
}

.lineTitle {
  background: #f5f5f9;
  padding: 10rpx 20rpx;
  font-size: 26rpx;
  color: #999;
}

::v-deep .u-form-item__body {
  padding: 0 10px;
}
::v-deep .u-form-item--left {
  color: #666;
}
::v-deep .u-form-item__message {
  padding-left: 20rpx !important;
}
::v-deep .u-navbar-content-title {
  .u-title {
    font-weight: 500 !important;
  }
}
.indent {
  text-indent: -16rpx;
  margin-left: 20rpx;
}


/* 授权获取个人信息，引导登录样式弹窗 */
.sign-modes{
  position:fixed;
  z-index:0;
  top:0;
  height:100%;
  width:100%;
  background:rgba(0,0,0,0.5);
  z-index:99999999999;
}
.activess{
  display:none;
}
.sechicun{
  position:relative;
  z-index:999999999999999999;
  width: 100%;
	height:100%;
  position:fixed;bottom:65rpx;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.conss{
  width: 600rpx;
	height: 570rpx;
	background-color: #ffffff;
  border-radius:22rpx;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  position: relative;
}
.conss>.perticn{
	font-size: 32rpx;
  padding-top:52rpx;
  color: #444444;
  font-weight:bold;
}
.conss .perticn1{
  margin-top:45rpx;
}
.conss .perticn1 image{
  width: 113rpx;
	height: 113rpx;
}
.conss .perticn2{
  width:500rpx;
  margin:0 auto;
	font-size: 26rpx;
	letter-spacing: 2px;
  color: #333333;
  margin-top:44rpx;

}
.conss .perticn3{
  width:500rpx;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-around;

}
.conss .perticn3 .circ{
  width: 7px;
  height: 7px;
  border-radius:50%;
  background-color:#999999;
  margin-top:20rpx;
}
.perticn4{
  margin-left:21rpx;
	font-size: 26rpx;
letter-spacing: 1px;
  color: #999999;
  margin-top:20rpx;
}
.btnss{
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  border-top:2rpx solid #ededed;
  position: absolute;
  bottom:0;
  height:100rpx;
}
.btnss>button{
  flex:1;
  background:#FFFFFF;
  width:45%!important;
	font-size: 28rpx;
	letter-spacing: 2px;
  color: #666666;
  font-weight:500;
}
.btnss>button:after{
	position:relative;
	display: none;
}
.btnss>button:first-child{
  border-right:1px solid #ededed;
}
.btnss>button:first-child+button{
  color: #0097d9;
}






</style>
