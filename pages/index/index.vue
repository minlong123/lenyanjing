<template>
  <view class="Seals">
	  
	    <u-navbar
	      title-color="#333"
	      back-icon-color="#333"
	      :is-fixed="true"
	      :is-back="false"
	      title-size="32"
	      title="首页"
		    bgColor="#FFFFFF"
	      :placeholder="true"
	      leftIconColor="transparent"
	    >
	    </u-navbar>
	
		<view class="banners">
			楞严经
		</view>

	<view>
		<u-picker 
		:show="show" 
		:columns="columns"
		itemHeight="80"
	  @confirm="confirmper"
	  @close="closeper"
	  @cancel="cancelper"
		keyName="title"
		></u-picker>
		
		<u-button @click="show = true">点我查看楞严经译文：{{titles}}</u-button>
		
		
		
	</view>

		<view class="lenyanjin">
			<view class="len-title">
			
			<text class="len-title-one">{{titles}}</text>
			
			<u-tag text="查看原文" @click="swittabs" plain size="mini" type="success">
				
			</u-tag>
			
			</view>
			<view class="contents" v-html="contents"></view>
		</view>
		
		
		<u-back-top 
		:scrollTop="scrollTop" 
		:mode="mode" 
		:iconStyle="iconStyle"
		:customStyle="iconbgstyle"
		></u-back-top>
		
	
	<u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>

  </view>
</template>


<script>
	

import { allcontents } from "../../basedata/indeddata";
import { yiwendata } from "../../basedata/index";


export default {
  data() {
    return {
      loading:false,
	  Sealsdata:[],
	  contents:allcontents[2],
	  show:false,
	  columns: [
		  yiwendata
	  ],
	  titles:"楞严经译文全集",
	  titless:"楞严经译文白话文全集",
		scrollTop: 0,
		mode: 'circle',
		iconStyle: {
			fontSize: '32rpx',
			color:'#FFFFFF'
		},
		iconbgstyle:{
			backgroundColor:'rgb(41, 121, 255)',
		},
		oldcontent:"",
		id:11,
		type:1,
    }
  },
  computed: {

  },
  created() {
  },
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
  onShow() {
	  
 
  },
	//分享功能
	onShareAppMessage: function (options) {

		let that = this;
		var shareBackUrl = 'pages/index/index';
		return {
			title:"楞严经修行",
			path: shareBackUrl,
			success: function(res) {
				console.log(res, "转发成功")
			},
		}
	},
  onLoad(){

  },
  methods: {
	swittabs(){
		uni.navigateTo({
			url: '/pages/souceart/index?id='+this.id+"&title="+this.titless
		});
	},
	confirmper(e) {
		this.show=false;

		let selectinfo=this.columns[0][e.indexs[0]]
		this.titles=selectinfo.title;
		this.id=selectinfo.id;
		this.oldcontent=selectinfo.oldcontents;
		this.titless=selectinfo.titles;
		if(selectinfo.id == 11){
			this.contents=allcontents[2];
		}else{
			this.contents=selectinfo.contents;
		}

	},
	
	closeper() {

		this.show=false;
	},
	cancelper() {

		this.show=false;
	},
	  
    
  },
}
</script>



<style lang="scss">
page {
  background-color: #FFFFFF;
}
.banners{
	position: relative;
	padding: 50px;
	font-size:80rpx;
	color: #fff;
	text-shadow: 0 1px 3px rgba(0,0,0,.4), 0 0 30px rgba(0,0,0,.075);
	background: #020031;
	background: -moz-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #020031), color-stop(100%, #6d3353));
	background: -webkit-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -o-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -ms-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: linear-gradient(45deg, #020031 0%, #6d3353 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#020031', endColorstr='#6d3353', GradientType=1 );
	-webkit-box-shadow: inset 0 3px 7px rgba(0,0,0,.2), inset 0 -3px 7px rgba(0,0,0,.2);
	-moz-box-shadow: inset 0 3px 7px rgba(0,0,0,.2), inset 0 -3px 7px rgba(0,0,0,.2);
	box-shadow: inset 0 3px 7px rgba(0,0,0,.2), inset 0 -3px 7px rgba(0,0,0,.2);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
}

.lenyanjin{
	width:660rpx;
	margin:60rpx auto;
	.len-title{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size:40rpx;
		font-weight:bold;
		margin:40rpx 0;
		.len-title-one{
			margin-right:15rpx;
		}
	}
	.contents{
		line-height: 2em;
		font-size: 18px;
		width:100%;
		
	}
}











</style>
