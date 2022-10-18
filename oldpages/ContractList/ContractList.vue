<template>
  <view class="safetys">
<!--    <u-navbar
      title-color="#333"
      back-icon-color="#333"
      :is-back="false"
      :is-fixed="true"
      :title="text"
      bgColor="transparent"
      :placeholder="true"
      leftIconColor="transparent"
    >
    </u-navbar> -->
	

    <view class="plecontra">
      <view class="plecontra-con">
        <u-search 
		placeholder="请输入合同名称" 
		searchIconSize="40" 
		@change="keychange"
		height="70" 
		shape="round" 
		actionText="" 
		v-model="keyword">
		</u-search>
    
      </view>

      <view class="nbspss"></view>
    </view>
	
	
	
    <view v-if="show" class="con_lt_lines" v-for="(item, index) in resdatas" :item="item" :key="index" @click='visitContraDetai(item.id)' >
      <view class="allcontra">
        <view class="contra-lt">

          <text>{{item.titles}}</text>
        </view>
        <view class="conrat-rt">
          <text>{{item.createtime}}</text>
          <u-icon name="arrow-right" color="#bdbdbd" size="28"></u-icon>
        </view>
      </view>
    </view>
	
	
	<view class="start-uimage-nonbsp" v-if="!show">
	  <u-image
		ref="uImage"
		:lazy-load="true"
		:src="nonbsps"
		mode="aspectFill"
		height="344"
		width="578"
		shape="square"
	  >
		<u-loading-icon size="20" slot="loading"></u-loading-icon>
	  </u-image>

	  <text>
		暂无此合同~
	  </text>
  
	</view>


	<u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>


  </view>
</template>


<style>

>>> .u-search__action{
  display:none;
}
>>> .u-search__action--active{
  display:none;
}


>>> .u-search{
  margin:0 auto!important;
  width:690rpx;
}
>>> .u-search__content{
    margin:0 auto!important;
  width:690rpx;
}
</style>

<script>
import { DEV_URL } from "../../config/index";
import { getContractTitList } from "@/api/sendcontra/controct"

export default {
  data() {
    return {
      loading: true,
      keyword:"",
      datas:[],
	  resdatas:[],
	  text:"所有合同",
	  type:11,
	  show:true,
	  nonbsps:DEV_URL+"/static/image/nocontra.png",
    }
  },
  computed: {

  },
  created() {
	  
  },
  onShow() {
  },
  onPullDownRefresh(){
	  this.getData(this.type);
  },
  methods: {
    
	  keychange(){
		  
		if(this.keyword != "" && this.keyword != null && this.keyword != undefined){
			
			let seardata=this.datas;
			let statu=false;
			this.resdatas=[];
			for(let i=0;i<seardata.length;i++){
				if(seardata[i].titles.indexOf(this.keyword) != -1){
					this.resdatas.push(seardata[i])
					statu=true;
				}
			}
			if(statu){
				this.show=true;
			}else{
				this.show=false;
			}
		}else{
			this.resdatas=this.datas;
			this.show=true;
		}
		
	  },
	  visitContraDetai(id){
		  
		// console.log(id);
		// 跳转页面
		uni.navigateTo({
			url: '../ContractDetail/ContractDetail?id='+id
		});
		
	  },
	  onLoad(options){
		// console.log(options);
		if(options.text){
			
			this.text=options.text
			this.type=options.type
			uni.setNavigationBarTitle({
				title: options.text,
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

		  
		}else{
			uni.setNavigationBarTitle({
				title: this.text,
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
		}
		this.getData(this.type);
		  
		  
	  },
	  getData(type){
		var that=this;
		  getContractTitList({type:type}).then((res) => {
			wx.stopPullDownRefresh()
			if(res.code == 200){
				
				that.datas=res.data;
				that.resdatas=res.data;
				that.loading=false;
			}else{
				that.show=false;
				that.loading=false;
			}
			
		  })  
	  },
    
  },
}
</script>



<style lang="scss">
page {
  background-color: #FFFFFF;
}

.start-uimage-nonbsp{
  display:table;
  margin:0 auto;
  text-align:center;
  font-size:28rpx;
  color:#666;
  margin-top:100rpx;
  text{
	  font-size:32rpx;
  }
}

.safetys {
  border:none;
  .plecontra{
    width:100%;
    margin:0 auto;
    background:#FFFFFF;
    padding-top:30rpx;
    margin:0 auto;
    .plecontra-con{
      width:690rpx;
      margin:0 auto;
    }
  }
  .nbspss{
    width:100%;
    height:40rpx;
    background:#FFF;
  }

  .con_lt_lines{
    width:100%;
    background:#FFF;
    .allcontra{
      width:690rpx;
      background:#FFFFFF;
      margin:0 auto;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      padding:30rpx 0;
      .conrat-rt{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          align-items:center;
        text{
          margin-right:20rpx;
          color:#989898;
          font-size:28rpx;

        }
      }
      .contra-lt{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          align-items:center;
		  width:295rpx;
      }
      text{
        color:#0e0e0e;
        font-weight:bold;
        font-size:30rpx;
        margin-left:18rpx;
      }



    }

  }




}
</style>
