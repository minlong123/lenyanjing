<template>
	<view>
		
		<view class="contents" v-html="content">
			
		</view>


		<view class="openpdfb" v-if="openpdf">
			<view>手机请先移步至应用市场下载 WPS APP ，才能打开成功</view>
			<br>
			<u-button type="primary" v-for="(item,index) in pdfdata" :key="item.id" @click="openpdfb(item.url)">{{item.title}}打开PDF阅读</u-button>
		
		</view>




		<view class="playaudio" 
		v-if="isplay" 
		@click="startplay" 
		:class="{'isanimate':music}">
			<u-image
			ref="uImage"
			:lazy-load="true"
			:src="videoimg"
			mode="aspectFill"
			height="166"
			width="164"
			shape="circle"
			>
			<u-loading-icon size="20" slot="loading"></u-loading-icon>
			</u-image>
		</view>

		<view class="playdabei" 
		v-if="isplaydabei" 
		@click="startplaydabei">
			<u-image
			ref="uImage"
			:lazy-load="true"
			:src="videoimg"
			mode="aspectFill"
			height="96"
			width="94"
			shape="circle"
			>
			<u-loading-icon size="20" slot="loading"></u-loading-icon>
			</u-image>
		</view>

		<view class="playshixiao" 
		v-if="isplayshixiao" 
		@click="startplayshixiao">
			<u-image
			ref="uImage"
			:lazy-load="true"
			:src="videoimg"
			mode="aspectFill"
			height="96"
			width="94"
			shape="circle"
			>
			<u-loading-icon size="20" slot="loading"></u-loading-icon>
			</u-image>
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
import footerinfo from "@/components/footerinfo.vue"

  export default {
	components: {footerinfo},
	data() {
	  return {
		loading:false,
		id:"",
		name:"",
		alldata:[],
		isplay:false,
		dabeimusic:null,
		isplaydabei:false,
		dabeimp3:require("../../basedata/dabeizou.mp3"),
		shixiaomusic:null,
		isplayshixiao:false,
		shixiaomp3:require("../../basedata/shixiaozou.mp3"),
		videoimg:require("../../static/icons/music.png"),
		audiomp3:require("../../basedata/audio.mp3"),
		pdfdata:[{
			'id':1,
			'title':"《坐禅之问答录》",
			'url':"https://zaiercommon.oss-cn-beijing.aliyuncs.com/123.pdf",
		
		},{
			'id':2,
			'title':"坐禅之问答录-正文",
			'url':"https://zaiercommon.oss-cn-beijing.aliyuncs.com/456.pdf",
		
		},{
			'id':3,
			'title':"坐禅-正文",
			'url':"https://zaiercommon.oss-cn-beijing.aliyuncs.com/789.pdf",
		
		}],
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
		},
		isread:true,
		music:null,
		openpdf:false,
		
	  }
	},
	computed: {
		
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
		let that=this;
		if(this.isread){

			uni.setStorage({
				key:"readdetail"+String(that.id),
				data:e.scrollTop
			})
		}else{
			this.setReadAddress();
		}
		
	},
	created() {
	},
	onUnload(){
		if(this.music){
			this.music.pause();
			this.music=null;
		}
		if(this.dabeimusic){
			this.dabeimusic.pause();
			this.dabeimusic=null;
		}
		if(this.shixiaomusic){
			this.shixiaomusic.pause();
			this.shixiaomusic=null;
		}
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

		// if(options.id == 4){
		// 	this.isplay=true;
		// }

		if(options.id == 7){
			this.openpdf=true;
		}
		if(options.id == 8){
			this.isplaydabei=true;
		}
		if(options.id == 9){
			this.isplayshixiao=true;
		}



	},
	methods: {
		openpdfb(url){

			var that=this;
			uni.downloadFile({
				url:url,
				success: (res) => {
					if (res.statusCode === 200) {
						uni.openDocument({
							filePath: res.tempFilePath, 
							// 如果文件名包含中文，建议使用escape(res.tempFilePath)转码，防止ios和安卓客户端导致的差异
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				}
			});

		},
		startplayshixiao(){
			// 开始播放音频
			if(this.shixiaomusic != null){
				this.shixiaomusic.pause();
				this.shixiaomusic=null;
				return;
			}
			this.shixiaomusic = uni.createInnerAudioContext(); //创建播放器对象
			this.shixiaomusic.src =this.shixiaomp3;
			this.shixiaomusic.play(); //执行播放
			var that=this;
			this.shixiaomusic.onEnded(() => {
				//播放结束
				that.shixiaomusic = null;
			})
		},
		startplaydabei(){
			// 开始播放音频
			if(this.dabeimusic != null){
				this.dabeimusic.pause();
				this.dabeimusic=null;
				return;
			}
			this.dabeimusic = uni.createInnerAudioContext(); //创建播放器对象
			this.dabeimusic.src =this.dabeimp3;
			this.dabeimusic.play(); //执行播放
			var that=this;
			this.dabeimusic.onEnded(() => {
				//播放结束
				that.dabeimusic = null;
			})
		},
		startplay(){
			// 开始播放音频
			if(this.music != null){
				this.music.pause();
				this.music=null;
				return;
			}
			this.music = uni.createInnerAudioContext(); //创建播放器对象
			this.music.src =this.audiomp3;
			this.music.play(); //执行播放
			var that=this;
			this.music.onEnded(() => {
				//播放结束
				that.music = null;
			})
		},
	  setReadAddress(){
	  
		let that=this;
		that.isread=true;
		uni.getStorage({
			key:"readdetail"+this.id,
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
		width:700rpx;
		margin:60rpx auto;	
	}
    @keyframes btnRotate{
        from{transform: rotateZ(0);}
        to{transform: rotateZ(360deg);}
    }

  .playaudio{
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items:center;
	margin-bottom:20rpx;
    transform-origin: center center;
  }

  .isanimate{
	animation:btnRotate infinite linear 2s
  }
.openpdfb{
	width:80%;
	margin:0 auto;
	margin-bottom:30rpx;
	button{
		margin-bottom:20rpx;
	}
}
.playdabei{
	position:fixed;
	top:180rpx;
	right:80rpx;
	z-index:999999999999;
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items:center;
	margin-bottom:20rpx;
    transform-origin: center center;
  }
  .playshixiao{
	position:fixed;
	top:180rpx;
	right:80rpx;
	z-index:999999999999;
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items:center;
	margin-bottom:20rpx;
    transform-origin: center center;
  }
  
  </style>
  