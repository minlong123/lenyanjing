<template>
	<view class="childrendata">
  
		<view class="catelist">
			
			<u-list>
				<u-list-item v-for="(item,index) in resdatas" :key="item.id">
					<u-cell :title="item.title" @click="visitcon(item.id,item.title)">
					</u-cell>
				</u-list-item>
			</u-list>
			
		</view>

	  <u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>
  
	</view>
  </template>
  
  
  <script>
	  

  import { artlis } from "../../basedata/children";
  
  export default {
	data() {
	  return {
		loading:false,
		allcatedata:artlis,
		keyword:"",
		resdatas:"",
	  }
	},
	computed: {
  
	},
	created() {
	},
	onShow() {
	},
	//分享功能
	onShareAppMessage: function (options) {
		console.log(options);
		let that = this;
		var shareBackUrl = 'pages/childrenlist/index?id='+this.id+"&title="+this.name
		return {
			title:that.name,
			path: shareBackUrl,
			success: function(res) {
				console.log(res, "转发成功")
			},
		}
	},
	onLoad(options){
		
	  this.id=options.id;
	  this.name=options.title;
	  this.resdatas=this.allcatedata[options.id];
		uni.setNavigationBarTitle({
			title: options.title
		})
	  
	},
	methods: {
		visitcon(id,name){
			// 跳转页面
			uni.navigateTo({
				url: '/template/detail/index?id='+id+"&title="+name
			});
		},
		getDatas(){
  
		},

		
	  
	},
  }
  </script>
  
  
  <style lang="scss">

  page {
	background-color: #FFFFFF;
  }
  .childrendata{
	  .catelist{
	  	  width:700rpx;
	  	  margin:0 auto;
	  	  display:flex;
	  	  flex-direction:column;
	  	  align-items:flex-start;
		  margin-top:50rpx;
	  	  
	  }
	  .cate-sear{
	  	  width:700rpx;
	  	  margin:0 auto;
	  	  display:flex;
	  	  flex-direction:column;
	  	  
	  }
	  
  }

  
  
  </style>
  