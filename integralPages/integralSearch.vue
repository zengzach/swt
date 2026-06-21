<template>
	<view>
		<view class="inpHeader" style="background-color: #fff;">
			<view style="width: 100%;height: 20upx;">
			</view>
			<!--  :focus="firstFocus" -->
			<input class="input" style="z-index: 999;" type="text" v-model="value" @blur="noSearch"
				@focus="searchSubmitList">
			<image style="z-index: 9999;" @click="searchSubmitValue"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png"></image>
		</view>
		<view class="historySearch">
			<view class="">
				积分历史搜索
			</view>
			<image v-if="token" @click="emptyClick" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/empty.png" mode="">
			</image>
			<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/empty.png" mode="">
			</image>
		</view>
		<view class="historySearchKey" v-if="HistorySearchList.length">
			<view class="" v-for="(item,index) in HistorySearchList" :key="index" @click="goListSearch(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		toast,
		refresh,
		getRouter
	} from "@/utils/utils.js"
	import {integralSearchList,integralEmptySearchList} from '@/api/integral/integralSearch.js'
	export default {
		data() {
			return {
				focus: true, //是否聚焦
				HistorySearchList: [],
				value: '',
				// firstFocus: false,
				token:'',
				integral:null
			}
		},
		onLoad(option) { },
		onShow(option) {
			this.token = uni.getStorageSync('token')
			this.HistorySearch()
			this.focus = true;
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.HistorySearch();
				getRouter();
			},
			//历史搜索
			HistorySearch() {
				integralSearchList().then((res) => {
					this.HistorySearchList = res.data
				})
			},
			// 点击历史搜索 跳转页面
			goListSearch(item) {
				uni.navigateTo({
					url: '/integralPages/integralSearchList?searchKey=' + item
				})
			},
			// 清除搜索
			emptyClick() {
				integralEmptySearchList().then(res => {
					if (res.success) {
						this.HistorySearch()
					}
				})
			},
			// 搜索按钮 点击
			searchSubmitValue(){
				uni.navigateTo({
					url: '/integralPages/integralSearchList?searchKey=' + this.value
				})
			},
			//聚焦
			searchSubmitList() {
				this.focus = false;
			},
			// 失焦
			noSearch() {
				if (this.value.length >= 2) {
					if (this.value) {
						uni.navigateTo({
							url: '/integralPages/integralSearchList?searchKey='+this.value,
							success: (res) => { //接口调用成功的回调函数
								// 通过eventChannel向被打开页面传送数据
								this.value = ''
							}
						})
					} else {
						this.focus = false;
					}
				} else if (this.value.length > 0) {
					this.focus = false;
					toast({
						title: '请至少输入两个搜索字符'
					})
				} else {
					this.focus = true;
				}
			},
			// //分享个人
			// onShareAppMessage() {
			// 	return {
			// 		title: '搜索列表',
			// 		path: '/integralPages/integralSearch'  
			// 	}	
			// },
			// //分享朋友圈
			// onShareTimeline() {
			// 	return {
			// 		title: '搜索列表',
			// 		path: '/integralPages/integralSearch' 
			// 	}
			// },
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}
</style>
<style scoped lang="less">
	.inpHeader {
		width: 100%;
		background-color: #FFF;
		position: relative;
		height: 95upx;

		.input {
			width: 690upx;
			height: 60upx;
			background: #F6F6F6;
			border: 1upx solid #EEEEEE;
			border-radius: 30upx;
			margin: 0 auto;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #777;
			box-sizing: border-box;
			padding: 0upx 60upx 0 32upx;
		}

		image {
			width: 35upx;
			height: 35upx;
			// background:#797cbf;
			position: absolute;
			top: 34upx;
			right: 60upx;
		}

		.place_swiper {
			width: 250upx;
			height: 60upx;
			// background:#bfbfbf;
			position: absolute;
			top: 20upx;
			left: 65upx;
			color: #777;
			line-height: 60upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			z-index: 99;
		}
	}

	.historySearch {
		width: 691upx;
		margin: 50upx auto 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #202021;
		}

		image {
			width: 30upx;
			height: 30upx;
		}
	}

	.keywordSearchTitle {
		width: 691upx;
		margin: 50upx auto 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #202021;
	}

	.historySearchKey,
	.keywordSearch {
		width: 691upx;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		margin: 0 auto;

		view {
			height: 50upx;
			padding: 16upx 32upx;
			background: #FFFFFF;
			border-radius: 30upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			text-align: center;
			line-height: 50upx;
			margin-right: 20upx;
			margin-top: 38upx;
		}
	}
</style>

