<template>
	<view class="Seals">

		<u-navbar title-color="#333" back-icon-color="#333" :is-fixed="true" :is-back="false" title-size="32" title="首页"
			bgColor="#FFFFFF" :placeholder="true" leftIconColor="transparent">
		</u-navbar>

		<view class="banners" @click="visits()">
			楞严经
		</view>

		<view>
			<u-picker :show="show" :columns="columns" itemHeight="80" @confirm="confirmper" @close="closeper"
				@cancel="cancelper" keyName="title"></u-picker>

			<u-button @click="show = true">点我查看楞严经译文：{{ titles }}</u-button>

		</view>



		<view v-if="startweek" class="weekselectmodel">
			<view class="week-select-action">
				<view @click="cancelweek" style='left:10px;text-align:left'>取消</view>
				<view>选择年月周</view>
				<view @click="confirmweek" style='right:10px;text-align:right'>确定</view>
			</view>

			<picker-view indicator-style="height:50px;" class="setflost" :value="selectdayweek" @change="bindChange">
				<picker-view-column>
					<view class="pricker-items" v-for="(item, index) in years" :key="index">{{ item }}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="pricker-items" v-for="(item, index) in months" :key="index">{{ item }}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="pricker-items" v-for="(item, index) in weeks" :key="index">第{{ item }}周</view>
				</picker-view-column>
			</picker-view>
		</view>



		<view class="lenyanjin">
			<view class="len-title">
				<text class="len-title-one">{{ titles }}</text>
				<u-tag text="查看原文" @click="swittabs" plain size="mini" type="success">

				</u-tag>

			</view>
			<view class="contents" v-html="contents"></view>
		</view>


		<u-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle" :customStyle="iconbgstyle"></u-back-top>


		<u-loading-page loading-text="正在加载中..." :loading="loading"></u-loading-page>

	</view>
</template>


<script>


import { allcontents } from "../../basedata/data";
import { yiwendata } from "../../basedata/index";



export default {
	data() {
		return {

			loading: false,
			Sealsdata: [],
			contents: allcontents[2],
			show: false,
			columns: [
				yiwendata
			],
			years: [],
			months: [],
			weeks: [],
			selectdayweek: [5, 0, 0],
			startweek: false,
			titles: "楞严经译文全集",
			titless: "楞严经译文白话文全集",
			scrollTop: 0,
			mode: 'circle',
			iconStyle: {
				fontSize: '32rpx',
				color: '#FFFFFF'
			},
			iconbgstyle: {
				backgroundColor: 'rgb(41, 121, 255)',
			},
			oldcontent: "",
			id: 11,
			type: 1,
			isread: true,
			numss: 0,
			dateweek:"",
		}
	},
	computed: {

	},
	created() {
		this.initweek();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;

		if (this.isread) {
			uni.setStorage({
				key: "readaddress" + String(this.id),
				data: e.scrollTop
			})
		} else {
			this.setReadAddress();
		}
	},
	onShow() {


	},
	onLoad() {
		this.isread = false;
		this.setReadAddress()
		//console.log(this.getCuurentweek());


	},
	methods: {
		getCuurentweek() {
			// 获取今天是这个月的哪一周
			const now = new Date();
			
			// let year=now.getFullYear();
			// let month=now.getMonth()+1;
			// let currdate=now.getDate();
			
			let year=2023;
			let month=7;
			let currdate=2;
			
			
			const firstDayOfMonth = new Date(year+"-"+month+"-1");
			let weeks=firstDayOfMonth.getDay();
			if(weeks == 0){
				weeks=7
			}
			//console.log("这天是周几"+weeks)
			let firstweekendday=1+(7-weeks);
			let secondweek = firstweekendday+7;
			if( month < 10){
				month = "0"+month;
			}
			let qiandata=year+"年"+month+"月 ";
			
			// 解决每月最后几天的判断问题,每年最后一个月的情况
			const endday = new Date(year+"-"+month+"-"+currdate);
			let endweeks=endday.getDay();
			if(endweeks == 0){
				endweeks=7
			}
			let endweekendday=1+(7-endweeks);
			let dddd=new Date(year,month,0).getDate()
			if(currdate+endweekendday > dddd){
				month=parseInt(month)+1;
				if(month > 12){
					month=1;
					year=year+1;
				}
				if(month < 10){
					month = "0"+month;
				}
				qiandata=year+"年"+month+"月 ";
				return qiandata+"第"+1+"周";
			}
			//console.log("当月有多少天"+dddd);
			// 解决每月最后几天的判断问题
			
			if(currdate <= firstweekendday){
				return qiandata+"第"+1+"周";
			}
			if(firstweekendday < currdate &&  currdate <= secondweek){
				return qiandata+"第"+2+"周";
			}
			if(secondweek < currdate &&  currdate <= secondweek+7){
				return qiandata+"第"+3+"周";
			}
			if(secondweek+7 < currdate &&  currdate <= secondweek+(7*2)){
				return qiandata+"第"+4+"周";
			}
			if(secondweek+(7*2) < currdate &&  currdate <= secondweek+(7*3)){
				return qiandata+"第"+5+"周";
			}
			if(secondweek+(7*3) < currdate &&  currdate <= secondweek+(7*4)){
				return qiandata+"第"+6+"周";
			}
		},
		initweek() {
			this.years=[];
			this.months=[];
			const date = new Date()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				this.years.push(i)
			}

			for (let i = 1; i <= 12; i++) {
				this.months.push(i)
			}

			for (let i = 1; i <= 5; i++) {
				this.weeks.push(i)
			}
		},
		cancelweek() {
			this.startweek = false;
		},
		confirmweek() {
			//console.log(this.selectdayweek);
			let selectyear = this.years[this.selectdayweek[0]]
			let selectmonth = this.months[this.selectdayweek[1]]
			if (selectmonth < 10) {
				selectmonth = "0" + selectmonth
			}
			let selectweek = this.weeks[this.selectdayweek[2]]
			//console.log(selectyear + "-" + selectmonth + " 第" + selectweek + "周")
		},
		openweek() {
			this.startweek = !this.startweek;
		},
		bindChange: function (e) {
			const val = e.detail.value
			this.selectdayweek = val;
			//console.log(val);
		},
		Cade_copy(cid) {
			uni.setClipboardData({
				data: cid,
				success: res => {
					//console.log(res);
					//console.log('复制成功');
					uni.getClipboardData({
						success: res => {
							//console.log(res)
							uni.showToast({
								title: '已复制到剪贴板',
								icon: 'none'
							});
						}
					});
				},
			});
		},
		visits() {
			this.numss++;
			if (this.numss > 5) {
				var that = this;
				uni.showModal({
					title: "是否复制标识",
					content: plus.push.getClientInfo().clientid,
					success: function (res) {
						if (res.confirm) {

							that.Cade_copy(plus.push.getClientInfo().clientid)

						}
					},
				});
			}
		},
		setReadAddress() {

			let that = this;
			that.isread = true;
			uni.getStorage({
				key: "readaddress" + String(that.id),
				success: function (res) {

					let readaddre = res.data;

					if (readaddre != null && readaddre != "" && readaddre != undefined && readaddre > 650) {

						uni.showModal({
							title: "提示",
							content: "是否回到上一次阅读的地方",
							success: function (res) {
								if (res.confirm) {

									uni.pageScrollTo({
										scrollTop: readaddre, //距离页面顶部的距离
										duration: 500

									});


								} else if (res.cancel) {



								}
							},
						});


					}

				}
			});



		},
		swittabs() {
			uni.navigateTo({
				url: '/pages/souceart/index?id=' + this.id + "&title=" + this.titless
			});
		},
		confirmper(e) {
			this.show = false;

			let selectinfo = this.columns[0][e.indexs[0]]
			this.titles = selectinfo.title;
			this.id = selectinfo.id;
			this.oldcontent = selectinfo.oldcontents;
			this.titless = selectinfo.titles;
			if (selectinfo.id == 11) {
				this.contents = allcontents[2];
			} else {
				this.contents = selectinfo.contents;
			}
			this.isread = false;
			this.setReadAddress();
		},

		closeper() {

			this.show = false;
		},
		cancelper() {

			this.show = false;
		},


	},
}
</script>



<style lang="scss">
page {
	background-color: #FFFFFF;
}

.banners {
	position: relative;
	padding: 50px;
	font-size: 80rpx;
	color: #fff;
	text-shadow: 0 1px 3px rgba(0, 0, 0, .4), 0 0 30px rgba(0, 0, 0, .075);
	background: #020031;
	background: -moz-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #020031), color-stop(100%, #6d3353));
	background: -webkit-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -o-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: -ms-linear-gradient(45deg, #020031 0%, #6d3353 100%);
	background: linear-gradient(45deg, #020031 0%, #6d3353 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#020031', endColorstr='#6d3353', GradientType=1);
	-webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
	-moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
	box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

}

.lenyanjin {
	width: 660rpx;
	margin: 60rpx auto;

	.len-title {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		font-weight: bold;
		margin: 40rpx 0;

		.len-title-one {
			margin-right: 15rpx;
		}
	}

	.contents {
		line-height: 2em;
		font-size: 18px;
		width: 100%;

	}
}

.setflost {
	width: 100%;
	height: 300px;
	background: #FFF;
	position: fixed;
	z-index: 9999999999;
	bottom: 0;

	.pricker-items {
		text-align: center;
	}
}

.weekselectmodel {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	left: 0px;
	top: 0px;
	z-index: 99
}

.week-select-action {
	width: 100%;
	background: white;
	height: 36px;
	bottom: 300px;
	position: fixed;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;
}
</style>
