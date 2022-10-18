const compress = {
  //base64转码（压缩完成后的图片为base64编码，这个方法可以将base64编码转回file文件）
  dataURLtoFile: function(dataurl) {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], { type: mime });
  },
  //压缩图片
  compressImg: function(fileTo) {
    let file;
    var files;
    var fileSize;
    var read = null;
    // #ifdef H5
	file = compress.dataURLtoFile(fileTo);
	fileSize = parseFloat(parseInt(file['size'])/1024/1024).toFixed(2);
    read = new FileReader();
    read.readAsDataURL(file);
	return new Promise(function(resolve){
	  read.onload = function (e) {
	    var img = new Image();
	    img.src = e.target.result;
	    img.onload = function(){
	      //默认按比例压缩
	      var w = this.width;
	      var h = this.height;
	      //生成canvas
	      var canvas = document.createElement('canvas');
	      var ctx = canvas.getContext('2d');
	      var base64;
	      // 创建属性节点
	      canvas.setAttribute("width", w);
	      canvas.setAttribute("height", h);
	      ctx.drawImage(this, 0, 0, w, h);
	      if(fileSize<1){
	        //如果图片小于一兆 那么不执行压缩操作 压缩值对image/jpeg类型有效
	        base64 = canvas.toDataURL('image/jpeg', 1);
	      }else if(fileSize>1&&fileSize<2){
	        //如果图片大于1M并且小于2M 那么压缩0.5
	        base64 = canvas.toDataURL('image/jpeg', 0.5);
	      }else{
	        //如果图片超过2m 那么压缩0.2
	        base64 = canvas.toDataURL('image/jpeg', 0.2);
	      }
	      // 回调函数返回file的值（将base64编码转成file）
	      files = compress.dataURLtoFile(base64); //如果后台接收类型为base64的话这一步可以省略
		  resolve(files)
	    };
	  };
	})
    // #endif
	
    // #ifdef APP-PLUS
	// 获取文件实体
	return new Promise(function(resolve){
		plus.io.resolveLocalFileSystemURL( fileTo, function(entry) {
			// 可通过entry对象操作文件 
			entry.file( function(orginFile){
				fileSize = orginFile.size;
				  if(fileSize<1){
					//如果图片小于一兆 那么不执行压缩操作 压缩值对image/jpeg类型有效
					uni.compressImage({
					  src: fileTo,
					  quality: 100,
					  success: res => {
						plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
							entry.file( function(fileResult){
								resolve({"path": res.tempFilePath, "file": fileResult});
							})
						})
					  }
					})
				  }else if(fileSize>1&&fileSize<2){
					//如果图片大于1M并且小于2M 那么压缩0.5
					uni.compressImage({
					  src: fileTo,
					  quality: 50,
					  success: res => {
						plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
							entry.file( function(fileResult){
								resolve({"path": res.tempFilePath, "file": fileResult});
							})
						})
					  }
					})
				  } else {
					//如果图片超过2m 那么压缩0.2
					uni.compressImage({
					  src: fileTo,
					  quality: 20,
					  success: res => {
						plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
							entry.file( function(fileResult){
								resolve({"path": res.tempFilePath, "file": fileResult});
							})
						})
					  }
				    })
				  }
			})
		})
	})
    // #endif
	
  }
}
 
//结尾处将该方法暴露出来供外部调用
export default {    
 compressImg: compress.compressImg,
 dataURLtoFile: compress.dataURLtoFile
}