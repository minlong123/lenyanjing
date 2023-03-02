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
      },{
        'id':9,
        'title':'宣化上人所有开示',
        'url':'http://www.drbachinese.org/online_reading_simplified/index.htm',
        'isread':true,
      },{
        'id':10,
        'title':'无量寿经白话文',
        'url':'https://www.maigoo.com/goomai/215921.html',
        'isread':true,
      },{
        'id':11,
        'title':'三十七佛子行',
        'url':'https://www.taodocs.com/p-11311106.html',
        'isread':true,
      },{
        'id':12,
        'title':'入菩萨行论译本',
        'url':'http://www.zmxh.com/bbs/viewthread.php?tid=6756',
        'isread':true,
      },{
        'id':13,
        'title':'元音老人资料',
        'url':'http://fo163.com/category.aspx?NodeID=38',
        'isread':true,
      },{
        'id':14,
        'title':'广论',
        'url':'http://read.goodweb.net.cn/news/news_view.asp?newsid=18223',
        'isread':true,
      },{
        'id':15,
        'title':'普贤菩萨行愿品',
        'url':'https://www.xifangju.com/article-1540-1.html?ivk_sa=1024320u',
        'isread':true,
      },{
        'id':16,
        'title':'大念处经',
        'url':'https://mp.weixin.qq.com/s?__biz=MzA4MDIxNjkwOQ==&mid=2649713219&idx=1&sn=0b916f4eacfa1c45aba2aa02f01a4d81&chksm=87bc5c61b0cbd577e8e278c9d5d4b645cca851ce3777201f7c4289bcf97ae84be470cb865de8&scene=27',
        'isread':false,
      },{
        'id':17,
        'title':'年龙上师非常重要的一个开示',
        'url':'https://www.docin.com/p-603420216.html',
        'isread':true,
      },{
        'id':18,
        'title':'元音老人讲中阴闻教得度',
        'url':'https://www.docin.com/p-2583363142.html',
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
  