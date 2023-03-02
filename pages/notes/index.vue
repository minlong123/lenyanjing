<template>
  <view class="Notes">

    <view class="note-list" v-for="(item,index) in notedata" :key="index">
      
      <view @click="editcon(index)" v-text="item.con" style="white-space:pre-wrap;margin-top:60rpx;"></view>
      <view class="note-addtime">{{ item.times }}</view>
      <view class="note-copy" @click="copynote(index)">
        <u-icon name="share-fill" color="rgb(11, 7, 25)" size="50"></u-icon>
      </view>
      <view class="note-closes" @click="delnotes(index)">
        <u-icon name="close-circle-fill" color="rgb(255, 0, 0)" size="50"></u-icon>
      </view>

    </view>

    <u-popup :show="show" mode="bottom" 
    :closeOnClickOverlay=false 
    @close="close" 
    :safeAreaInsetTop=true
    @open="open" 
    :closeable=true>
          <view>
            <u--textarea :count=true maxlength="10000000000" v-model="value1" :showConfirmBar=true placeholder="请输入内容" height="500"></u--textarea>
          </view>
    </u-popup>


    <view class="addnotes" @click="addnotes">
      <u-icon name="plus-circle-fill" color="#000" size="80"></u-icon>
    </view>

    <view class="nomessage" v-if="!tag">

      <u-empty iconSize="120" text="暂无笔记" textSize="30" mode="news"></u-empty>

    </view>


  </view>
</template>

<script>
	
import { syncnotes } from "@/api/sync"

export default {
  data() {
    return {
      loading:false,
      title:"",
      show:false,
      value1:"",
      tag:true,
      notedata:[],
      edit:false,
      editindex:""
    }
  },
  computed: {

  },
  created() {

    this.getDatas();
    
  },
  onShow() {

    this.getDatas();
    
  },
  onLoad(){

    this.getDatas();

  },
  methods: {
    editcon(index){

      this.edit=true;
      this.editindex=index;
      this.show=true;
      this.value1=this.notedata[index].con;

    },
    copynote(index){

      uni.setClipboardData({
        data: this.notedata[index].con,
        success:res=> {

          uni.getClipboardData({
            success: res=> {

              uni.showToast({
                title: '该笔记复制成功',
                icon:'none'
              });
            }
          });
        },
      });
    

    },
    savedata(){

      if(this.notedata.length > 0){
        this.tag=true;
      }else{
        this.tag=false;
      }
      
      syncnotes({'cons':JSON.stringify(this.notedata),'id':plus.push.getClientInfo().clientid}).then((res) => {
        console.log(res);
        if(res.code == 1){
  
        }else{

        }
      }) 

    },
    delnotes(index){

      var that=this;
      uni.showModal({
        title: "提示",
        content: "是否真的删除该条笔记",
        success: function (res) {
          if (res.confirm) {
     

            that.notedata.splice(index,1);
            uni.setStorage({
              key:"nots",
              data:JSON.stringify(that.notedata)
            })
            that.savedata();


          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });









    },
    close(){
      
      this.show=false;
      // 如果是修改的话
      if(this.edit){

        if(this.value1 != "" && this.value1 != undefined && this.value1 != null){
          
          this.notedata[this.editindex].con=this.value1;

          uni.setStorage({
            key:"nots",
            data:JSON.stringify(this.notedata)
          })

          wx.showToast({
            icon: 'none',
            title:"笔记保存成功",
          })
          this.value1="";
          this.savedata();
        }
        this.edit=false;
        this.editindex="";
      
      }else{
     
        if(this.value1 != "" && this.value1 != undefined && this.value1 != null){

          let jsondata={'id':this.notedata.length+1,'times':this.getTimes(new Date().getTime()),'con':this.value1};
          this.notedata.unshift(jsondata);

          uni.setStorage({
            key:"nots",
            data:JSON.stringify(this.notedata)
          })

          wx.showToast({
            icon: 'none',
            title:"笔记保存成功",
          })
          this.value1="";
          this.savedata();


        }


      }

      


    },
    open(){
      this.show=true;
    },
    addnotes(){

      this.show=true;

    },
    getTimes(logtime){

      var tim=new Date(parseInt(logtime));
        var years=tim.getFullYear();
        var months=tim.getMonth()+1;
        if(months < 10){
          months = "0"+String(months)
        }
        var data=tim.getDate();
        if(data < 10){
          data = "0"+String(data)
        }
        var hours=tim.getHours();
        if(hours < 10){
          hours = "0"+String(hours)
        }
        var minutes=tim.getMinutes();
        if(minutes < 10){
          minutes = "0"+String(minutes)
        }
        var seconds=tim.getSeconds();
        if(seconds < 10){
          seconds = "0"+String(seconds)
        }
        return years+"-"+months+"-"+data+" "+hours+":"+minutes+":"+seconds;


    },
    getDatas(){

      let that=this;
      uni.getStorage({
        key:"nots",
        success:function(res){
          
          let readaddre=res.data;
          
          if(readaddre != null && readaddre != "" && readaddre != undefined){
      
            that.notedata=JSON.parse(readaddre)
            that.tag=true;
            if(that.notedata.length == 0){
              that.tag=false;
            }
           

          }else{
            that.notedata=[]
            that.tag=false;
          }
         
        }
      });





    },
  },
}
</script>



<style lang="scss">
page {
  background-color: #FFFFFF;
}
.Notes{
  margin-bottom:200rpx;
}
.addnotes{
  position:fixed;
  bottom:150rpx;
  right:60rpx;
}
.note-list{
  position:relative;
  padding:30rpx;
  border-bottom:2rpx solid #eee;
  margin-bottom:20rpx;
  font-size:34rpx;
  color:#000;
  .note-closes{
    position:absolute;
    right:15rpx;
    top:15rpx;
  }
  .note-copy{
    position:absolute;
    right:90rpx;
    top:15rpx;
  }

  .note-addtime{
    margin-top:20rpx;
    text-align:right;
    color:#d8d8d8;
    font-size:26rpx;
  }
}
.nomessage {
  margin-top: 300rpx;
}


</style>
