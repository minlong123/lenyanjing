# lsj-upload

### 插件地址：https://ext.dcloud.net.cn/plugin?id=5459

### 不清楚使用方式可导入示例项目运行完整示例

希望能帮到你！

使用插件有任何问题欢迎加入QQ讨论群：701468256

若能帮到你还请点亮5颗小星星以作鼓励哈~
---

## 使用说明
| 属性		| 是否必填	|  值类型	| 默认值	| 说明			|
| --------- | -------- 	| -----: 	| --: 	| :------------:|
| width		|	否 		| String	|100%	| 容器宽度		|
| height	|	否 		| String	|80rpx	| 容器高度		|
| size		|	否 		| Number	|10		| 附件大小上限(M)|
| top,left,right,bottom		|	否 		| [Number,String]	|0		| 设置控件绝对位置，仅App端position=absolute时有效，其他端若需要绝对定位可自行在外层设置css position样式|
| value		|	否 		| Number	|0		| 上传进度，通过v-model双向绑定|
| childId	|	否 		| String	|lsjUpload| 控件的id(仅APP有效，尽量每个控件命名一个唯一Id)|
| position	|	否 		| String	|static	| 控件的排版位置(仅APP有效，static=控件随页面滚动;absolute=控件在页面中绝对定位，不随窗口内容滚动;nvue仅支持absolute)|
| @input	|	否 		| Function	|value	| 上传进度改变时回调|
| @callback	|	是 		| Function	|Object	| 上传成功时回调	|

## ref调用
|作用 | 方法| 传入参数类型|  说明|
|---- | --------- | -------- | :--: |
|创建文件管理器| create|Object| 初始化上传文件需要的必备参数,参数见下方函数说明|
|关闭文件管理器| close|-		| APP端手动关闭webview层，用于切换tab视图,可见示例项目|

## 注意 
### 组件调用create时会获取当前组件所渲染的位置和大小来创建file控件点击层，所以如果页面为动态内容时，请在数据返回且页面dom渲染完毕后再调用create(); !!!

### vue:
``` javascript
<lsj-upload 
ref="lsjUpload"
width="100px"
height="80rpx"
childId="upload"
:size="10"
v-model="percent"
@input="onInput"
@callback="onCallback">
	<view class="btn" style="height: 80rpx;">选择附件上传</view>
</lsj-upload>
```

---
* 函数说明


``` javascript
/*  */
export default {
	data() {
		return {
			tabIndex: 0,
			percent: ''
		}
	},
	onReady() {
		// 初始化参数并创建上传DOM
		this.onCreate();
	},
	methods: {
		// app端切换tab示例
		onTab(tabIndex) {
			this.tabIndex = tabIndex;
			
			if (tabIndex == 0 ) {
				// 因为创建webview时需要获取按钮位置，所以需要nextTick后再重新调用create
				this.$nextTick(()=>{
					this.onCreate();
				})
			}
			else {
				this.$refs.lsjUpload.close();
			}
			
		},
		onCreate() {
			// 初始化参数并创建上传DOM
			this.$refs.lsjUpload.create({
				// #ifdef APP-PLUS
				cuWebview: this.$mp.page.$getAppWebview(), // app必传
				// #endif
				url: 'https://www.example.com/upload', //替换为你的接口地址
				name: 'file', // 附件key
				debug: true,
				//根据你接口需求自定义请求头
				header: {
					'Authorization': 'token'
				},
				//根据你接口需求自定义body参数
				formData: {
					'orderId': 1000
				}
			});
		},
		onInput(e) {
			console.log('上传进度',e);
		},
		onCallback(e) {
			console.log('上传结果',e);
		}
	}
}

```

## 温馨提示
	
* 文件上传
0. 如说明表达还不够清楚，怎么调用可导入完整示例项目运行体验和查看	
1. APP端请优先联调Android,上传成功后再运行iOS端，如iOS返回status=0则需要后端开启允许跨域；
2. header的Content-Type类型需要与服务端要求一致，否则收不到附件（服务端若没有明文规定则可不写，使用默认匹配）
3. 服务端不清楚怎么配置跨域可加群咨询，具体百度~
4. 欢迎加入QQ讨论群：701468256
5. 欢迎加入QQ讨论群：701468256
6. 欢迎加入QQ讨论群：701468256
7. 若能帮到你还请点亮5颗小星星以作鼓励哈~
8. 若能帮到你还请点亮5颗小星星以作鼓励哈~
9. 若能帮到你还请点亮5颗小星星以作鼓励哈~