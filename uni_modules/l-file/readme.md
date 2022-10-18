# l-file

### 完整示例可导入示例项目运行
不要期待更新，我很懒~

希望能帮到你！

附件选择上传已单独发布插件，使上传按钮完全内嵌于页面，不再从底部单独二次弹框
[附件选择上传内嵌版地址](https://ext.dcloud.net.cn/plugin?id=5459)

本插件也可以继续使用，根据需求选择

---

## 使用说明
| 属性| 是否必填|  值类型| 返回值| 说明|
| --------- | -------- | -----: | --: | --: |
| @up-success|否 | CallBack|{name,data} | 上传成功回调|

## ref调用
|作用 | 方法| 传入参数类型|  说明|
|---- | --------- | -------- | --: |
|下载| download|<URL,type,fileName>| type='save'为保存到本地，默认为获取临时路径|
|预览| open|URL| 预览文件|
|上传| upload|Object| 上传文件,参数见下方函数说明|

### vue:
``` javascript
// 以下代码写于根目录下第一个view顶部或跟在自定义导航栏后面
<l-file 
	ref="lFile" 
	@up-success="upSuccess"
></l-file>
```

---
* 函数说明


``` javascript
/* 预览临时文件 */
this.$refs.lFile.download({url})
.then(path=>{
	this.$refs.lFile.open(path);
});

/**
* =======附件下载=======
* 
* type 非save为临时下载
* customName 仅type=save生效 附件自定义名称需带后缀，自定义目录需以/结尾
* DownloadOptions 仅type=save生效 可选参数(http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.DownloadOptions)
* 默认下载到_downloads/files/ 可通过DownloadOptions自定义
*/
this.$refs.lFile.download({
	url, //必填，附件网络地址
	type:'save', //选填，非save为临时下载
	customName:'自定义文件名需要带后缀.jpg',
	//...DownloadOptions直接写key:value 
	// 例如：
	method: 'GET'
})
.then(path=>{
	this.localPath = path;
});

/* 
=======选择文件+上传=======

currentWebview=当前窗口，仅app端需要传，且必传
url=上传服务器地址，必填
name=上传文件的key(选填，默认为file)
header=请求头(选填)
*/
this.$refs.lFile.upload({
	// #ifdef APP-PLUS
	//（app端必传）nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
	currentWebview: this.$mp.page.$getAppWebview(),
	// #endif
	//替换为你的上传接口地址
	url: 'http://hlapi.jwell56.com/dropbox/document/upload',
	// 服务端接收附件的key
	name: 'file',
	//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
	header: {
		'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyTmFtZSI6',
		'uid': '27682',
		'client': 'app',
		'accountid': 'DPOA9487'
	},
	
	// 限制选择附件的大小上限，默认10M
	// maxSize: 20,
	
	// 若需要在body单独添加附件名或附件大小如下方式传入组件：
	// addName: '后端要的附件名称字段key,此处请勿写name的同值如(file)，会覆盖name',
	// addSize: '后端要的附件大小字段key'
	
	// body参数直接写key,value,如：
	// date: '2020-1-1',
	// key2: 'value2',
});

```

## 温馨提示
	
* 文件上传
0. 如不清楚怎么调用可导入完整示例可查看使用方式	
1. APP端请优先联调Android,上传成功后再运行iOS端，如iOS返回status=0则需要后端开启允许跨域；
2. header的Content-Type类型需要与服务端要求一致，否则收不到附件（服务端若没有明文规定则可不写，使用默认匹配）
3. java不清楚怎么配置跨域可以找我；若是php，跨域需要注意不能配置为*星号，需为file单独设置跨域，具体百度~
4. 欢迎加入QQ讨论群：701468256
5. 欢迎加入QQ讨论群：701468256
6. 欢迎加入QQ讨论群：701468256