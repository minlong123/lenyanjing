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

import { allcontents } from "../../basedata/data";
import { yiwendata } from "../../basedata/index";
import footerinfo from "@/components/footerinfo.vue"

  export default {
	components: {footerinfo},
	data() {
	  return {
		loading:false,
		id:"",
		name:"",
		alldata:yiwendata,
		oldcontents:allcontents[1],
		apiata:allcontents,
		content:"",
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
	onLoad(options){
	  this.id=options.id;
	  this.name=options.title;
	  uni.setNavigationBarTitle({
	  	title: options.title,
	  	success: () => {
	  		console.log('修改标题成功')
	  	},
	  	fail: () => {
	  		console.log('修改标题失败')
	  	},
	  	complete: () => {
	  		console.log('修改标题结束')
	  	},
	  })
	  
	  if(this.id == 11){
		  this.content=this.oldcontents;
	  }else{
		  for(let i =0;i<this.alldata.length;i++){
			  if(this.alldata[i].id == this.id){
				  this.content=this.alldata[i].oldcontents;
			  }
		  }

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
  