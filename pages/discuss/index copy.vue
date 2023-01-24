<template>
  <view class="Seals">
	<web-view :src="src"></web-view>
  </view>
</template>


<script>
	


export default {
  data() {
    return {
      loading:false,
	  src:"https://support.qq.com/product/436459"
    }
  },
  computed: {

  },
  created() {
  },
  onShow() {
	
  },
  onLoad(){
  },
  onPullDownRefresh(){
	this.src="https://support.qq.com/product/436459";
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


</style>
