<template>
	<view>
		
		<view class="contents" v-html="content">
			
		</view>
		
		<view class="playlenyan" 
		v-if="isplaylenyan" 
		@click="playlenyan">
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
		isplaylenyan:false,
		apiata:allcontents,
		videoimg:require("../../static/icons/music.png"),
		lenyanmp3:require("../../basedata/lenyanzou.mp3"),
		lenmusic:null,
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
	onUnload(){
		if(this.lenmusic){
			this.lenmusic.pause();
			this.lenmusic=null;
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

		if(options.id == 21){
			this.isplaylenyan=true;
		}

	},
	methods: {
		playlenyan(){
			// 开始播放音频
			if(this.lenmusic != null){
				this.lenmusic.pause();
				this.lenmusic=null;
				return;
			}
			this.lenmusic = uni.createInnerAudioContext(); //创建播放器对象
			this.lenmusic.src =this.lenyanmp3;
			this.lenmusic.play(); //执行播放
			var that=this;
			this.lenmusic.onEnded(() => {
				//播放结束
				that.lenmusic = null;
			})
		},
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
	@keyframes btnRotate{
        from{transform: rotateZ(0);}
        to{transform: rotateZ(360deg);}
    }
    .isanimate{
	animation:btnRotate infinite linear 2s
  }
  .playlenyan{
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
  