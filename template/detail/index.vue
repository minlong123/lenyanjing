<template>
	<view>
		
		<view class="contents" v-html="content">
			
		</view>
		
		<footerinfo></footerinfo>
		
	<u-back-top
	:scrollTop="scrollTop" 
	:mode="mode" 
	:iconStyle="iconStyle"
	:customStyle="iconbgstyle"
	></u-back-top>	
	</view>
	
  </template>
  
  <script>

import { allcontents } from "../../template/cates/data";
import footerinfo from "@/components/footerinfo.vue"

  export default {
	components: {footerinfo},
	data() {
	  return {
		loading:false,
		id:"",
		name:"",
		alldata:[],
		apiata:allcontents,
		content:"<div>加载中……</div>",
		scrollTop: 0,
		mode: 'circle',
		iconStyle: {
			fontSize: '32rpx',
			color:'#FFFFFF'
		},
		iconbgstyle:{
			backgroundColor: 'rgb(41, 121, 255)',
		}
	  }
	},
	computed: {
		
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	created() {
	},
	onShow() {
	},
	//分享功能
	onShareAppMessage: function (options) {
		let that = this;
		var shareBackUrl = 'template/detail/index?id='+this.id+"&title="+this.name
		return {
			title:that.name,
			path: shareBackUrl,
			success: function(res) {
				console.log(res, "转发成功")
			},
		}
	},
	onLoad(options){
		
	  if(options.id){
		  this.id=options.id;
		  this.name=options.title;
		  this.content=this.apiata[options.id];
			uni.setNavigationBarTitle({
				title: options.title,
			})
	  }

	},
	methods: {
  
	  getDatas(){
		
	  },
		
	  
	},
  }
  </script>
  
  
  
  <style lang="scss">
	
  page {
	background-color: #FFFFFF;
  }
	.contents{
		line-height: 2em;
		font-size: 18px;
		width:660rpx;
		margin:60rpx auto;
		
	}
  
  
  </style>
  