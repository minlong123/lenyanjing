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
			actionText="" 
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
	onLoad(){
	  this.getDatas();
	},
	methods: {
		visitcon(id,name,statu){

			if(id > 20){
				uni.navigateTo({
					url: '/pages/detailtwo/index?id='+id+"&title="+name
				});
				return;
			}
			// 跳转页面
			if(statu){
				uni.navigateTo({
					url: '/pages/childrenlist/index?id='+id+"&title="+name
				});
			}else{
				uni.navigateTo({
					url: '/pages/detail/index?id='+id+"&title="+name
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
  