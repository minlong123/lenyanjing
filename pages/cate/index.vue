<template>
	<view class="Seals">
  
	    <u-navbar
	      title-color="#333"
	      back-icon-color="#333"
	      :is-fixed="true"
	      :is-back="false"
	      title-size="32"
	      title="分类"
		    bgColor="#FFFFFF"
	      :placeholder="true"
	      leftIconColor="transparent"
	    >
	    </u-navbar>
	

		<view class="cate-sear">
			<u-search
			placeholder="请输入要找的文章关键词" 
			searchIconSize="40"
			@change="keychange"
			height="70" 
			shape="round" 
			actionText="搜索" 
			v-model="keyword">
			</u-search>
		</view>
	
	
		<view class="catelist">
			
			<u-list>
				<u-list-item v-for="(item,index) in resdatas" :key="item.id">
					<u-cell :title="item.title" @click="visitcon(item.id,item.title,item.children)">
					</u-cell>
				</u-list-item>
			</u-list>
			
		</view>

	  <u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>
  
	</view>
  </template>
  
  
  <script>
	  

  import { artlis } from "../../basedata/index";
  
  export default {
	data() {
	  return {
		loading:false,
		allcatedata:artlis,
		keyword:"",
		resdatas:artlis,
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
		var shareBackUrl = 'pages/cate/index'
		return {
			title:"楞严经修行-文章分类",
			path: shareBackUrl,
			success: function(res) {
				console.log(res, "转发成功")
			},
		}
	},
	onLoad(){
	  this.getDatas();
	},
	methods: {
		visitcon(id,name,statu){
			// 跳转页面
			if(statu){
				uni.navigateTo({
					url: '/pages/childrenlist/index?id='+id+"&title="+name
				});
			}else{
				uni.navigateTo({
					url: '/template/detail/index?id='+id+"&title="+name
				});
			}

		},
		getDatas(){
  
		},
		keychange(){

			if(this.keyword != "" && this.keyword != null && this.keyword != undefined){
				
				let seardata=this.allcatedata;
				this.resdatas=[];
				for(let i=0;i<seardata.length;i++){
					if(seardata[i].title.indexOf(this.keyword) != -1){
						this.resdatas.push(seardata[i])
					}
				}
			}else{
				this.resdatas=this.allcatedata;
			}

		},
		
	  
	},
  }
  </script>
  
  
  
  <style lang="scss">

  page {
	background-color: #FFFFFF;
  }
  .catelist{
	  width:700rpx;
	  margin:0 auto;
	  display:flex;
	  flex-direction:column;
	  align-items:flex-start;
	  padding-top:20rpx;
	  
  }
  .cate-sear{
	  width:700rpx;
	  margin:0 auto;
	  display:flex;
	  flex-direction:column;
	  
  }

  
  
  </style>
  