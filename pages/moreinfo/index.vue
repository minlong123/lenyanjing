<template>
  <view class="Seals">
	<web-view :src="url"></web-view>
  </view>
</template>

<script>
	
export default {
  data() {
    return {
      loading:false,
	    url:"",
      title:"",
    }
  },
  computed: {

  },
  created() {
  },
  onShow() {
	
  },
  onLoad(options){

    if(options.url){
      this.url=decodeURIComponent(options.url);
	    this.title=options.title;
      uni.setNavigationBarTitle({
        title: options.title
      })

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


</style>
