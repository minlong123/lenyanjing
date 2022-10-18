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

import { allcontents } from "../../basedata/datatwo";
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
		content:"加载中……",
		scrollTop: 0,
		mode: 'circle',
		iconStyle: {
			fontSize: '32rpx',
			color:'#FFFFFF'
		},
		iconbgstyle:{
			backgroundColor: 'rgb(41, 121, 255)',
		},
		isread:true
	  }
	},
	computed: {
		
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
		let that=this;
		if(this.isread){

			uni.setStorage({
				key:"readdetailtwo"+String(that.id),
				data:e.scrollTop
			})
		}else{
			this.setReadAddress();
		}
		
	},
	created() {
	},
	onShow() {
	},
	onLoad(options){
	  this.id=options.id;
	  this.name=options.title;
	  this.content=this.apiata[options.id];
		uni.setNavigationBarTitle({
			title: options.title
		})
		this.isread=false;
		this.setReadAddress();
	},
	methods: {
	  setReadAddress(){
	  
		let that=this;
		that.isread=true;
		uni.getStorage({
			key:"readdetailtwo"+this.id,
			success:function(res){
				
				let readaddre=res.data;
				if(readaddre != null && readaddre != "" && readaddre != undefined && readaddre > 650){
	  
	  
					uni.showModal({
						title: "提示",
						content: "是否回到上一次阅读的地方",
						success: function (res) {
							if (res.confirm) {
	  
								uni.pageScrollTo({
									scrollTop:readaddre, //距离页面顶部的距离
									duration:500
	  
								});
					
	  
							} else if (res.cancel) {
								
				
								
							}
						},
					});
	  
	  
				}
	  
			}
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
	.contents{
		line-height: 2em;
		font-size: 18px;
		width:660rpx;
		margin:60rpx auto;
		
	}
  
  
  </style>
  