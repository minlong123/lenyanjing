<template>
	<view class="Seals">
  
	    <u-navbar
	      title-color="#333"
	      back-icon-color="#333"
	      :is-fixed="true"
	      :is-back="false"
	      title-size="32"
	      title="更多资料"
		    bgColor="#FFFFFF"
	      :placeholder="true"
	      leftIconColor="transparent"
	    >
	    </u-navbar>
	

		<view class="cate-sear">
			<u-search
			placeholder="请输入要找的资料关键词" 
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
					<u-cell :title="item.title" @click="visitcon(item.id,item.title,item.url,item.isread)">
					</u-cell>
				</u-list-item>
			</u-list>
			
		</view>

	  <u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>
  
	</view>
  </template>
  
  
  <script>
	  


  export default {
	data() {
	  return {
      loading:false,
      allcatedata:[{
        'id':1,
        'title':'宣化上人开示',
        'url':'http://www.drbachinese.org/online_reading_simplified/dharma_talks/volume1/bookcover.htm',
        'isread':true,
      },{
        'id':2,
        'title':'妙法莲华经(电脑打开链接)',
        'url':'https://www.hrfjw.com/fojing/miaofalianhuajing/',
        'isread':false,
      },{
        'id':3,
        'title':'瑜伽师地论原文',
        'url':'http://www.shixiu.net/dujing/fojing/zg-yj/4990.html',
        'isread':true,
      },{
        'id':4,
        'title':'南师讲《瑜伽师地论》',
        'url':'http://www.quanxue.cn/CT_FoJia/YuJiaSHiDIndex.html',
        'isread':true,
      },{
        'id':5,
        'title':'百业经白话文阅读',
        'url':'https://yd.qq.com/web/bookDetail/9fe329007183346d9fea0b3',
        'isread':false,
      },{
        'id':6,
        'title':'救拔焰口饿鬼陀罗尼经',
        'url':'https://www.bilibili.com/read/cv8904991',
        'isread':true,
      },{
        'id':7,
        'title':'如何施食',
        'url':'https://www.163.com/dy/article/EAHV6KJL0528FVEJ.html',
        'isread':true,
      },{
        'id':8,
        'title':'楞严经解读',
        'url':'http://www.skamrta.com/lengyanjing/645.html',
        'isread':true,
      }],
      keyword:"",
      resdatas:[{
        'id':1,
        'title':'宣化上人开示',
        'url':'http://www.drbachinese.org/online_reading_simplified/dharma_talks/volume1/bookcover.htm',
        'isread':true,
      },{
        'id':2,
        'title':'妙法莲华经(电脑打开链接)',
        'url':'https://www.hrfjw.com/fojing/miaofalianhuajing/',
        'isread':false,
      },{
        'id':3,
        'title':'瑜伽师地论原文',
        'url':'http://www.shixiu.net/dujing/fojing/zg-yj/4990.html',
        'isread':true,
      },{
        'id':4,
        'title':'南师讲《瑜伽师地论》',
        'url':'http://www.quanxue.cn/CT_FoJia/YuJiaSHiDIndex.html',
        'isread':true,
      },{
        'id':5,
        'title':'百业经白话文阅读',
        'url':'https://yd.qq.com/web/bookDetail/9fe329007183346d9fea0b3',
        'isread':false,
      },{
        'id':6,
        'title':'救拔焰口饿鬼陀罗尼经',
        'url':'https://www.bilibili.com/read/cv8904991',
        'isread':true,
      },{
        'id':7,
        'title':'如何施食',
        'url':'https://www.163.com/dy/article/EAHV6KJL0528FVEJ.html',
        'isread':true,
      },{
        'id':8,
        'title':'楞严经解读',
        'url':'http://www.skamrta.com/lengyanjing/645.html',
        'isread':true,
      }],
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
    visits(url){

        var that=this;
        uni.showModal({
          title: "复制链接",
          content:url,
          cancelText: "直接去浏览器打开", // 取消按钮的文字  
          confirmText: "确定", // 确认按钮文字  
          success: function (res) {
            if (res.confirm) {
        
              that.Cade_copy(url)
          
            }else{
              plus.runtime.openURL(url);
            }
          },
        });
      
    },
    Cade_copy(cid) {
      uni.setClipboardData({
        data:cid,
        success:res=> {

          uni.getClipboardData({
            success: res=> {

              uni.showToast({
                title: '已复制',
                icon:'none'
              });
            }
          });
        },
      });
    }, 
		visitcon(id,name,url,isread){

      if(isread){
				uni.navigateTo({
					url: '/pages/moreinfo/index?url='+encodeURIComponent(url)+"&title="+name
				});
				
      }else{
        
        // plus.runtime.openURL(url);//打开手机的浏览器访问链接
        // plus.runtime.openWeb(url);//app内置一个窗口访问。
        this.visits(url);
      }
      return;
      
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
  