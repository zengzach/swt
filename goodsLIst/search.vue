<template>
	<view>
		<!-- 正常品搜索 -->
		<view >
			<view class="inpHeader" style="background-color: #fff;">
				<view style="width: 100%;height: 20upx;">
				</view>
				<input :focus="firstFocus" class="input" style="z-index: 999;" type="text" 
					confirm-type="search" bindconfirm="startSearch" 
					v-model="value" 
					@blur="noSearch"
					@focus="searchSubmitList">
				<image style="z-index: 9999;" @click="searchSubmitValue"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png"></image>
				<swiper v-if="focus" class="place_swiper" autoplay interval=3000 circular vertical @click="swiper"
					@change="placeChange">
					<swiper-item v-for="item in KeyList" :key="item.id">
						<view class="">{{item.word}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="historySearch" v-if="HistorySearchList.length">
				<view class="">
					历史搜索
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
			<view class="keywordSearchTitle">
				推荐关键词
			</view>
			<view class="keywordSearch">
				<view class="" v-for="(item,index) in KeyWordList" :key="index" @click="goList(item)">
					{{item.word}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getCustomerHistorySearchRecord,
		emptyCustomerHistorySearchRecord,
		getSearchKeyWord,
		getSearch
	} from "@/api/search.js"
	import {
		toast,
		refresh,
		getRouter
	} from "@/utils/utils.js"
	export default {
		data() {
			return {
				focus: true, //是否聚焦
				currentSwip: '', //轮播文字当前显示，默认值为轮播数据第一条
				HistorySearchList: [],
				KeyWordList: [],
				emptyList: [],
				value: '',
				formPage: '',
				urls: '',
				searchGoodsParamBo: {
					categoryId: '', //分类id
					searchKey: '',
					filterBrandIds: [], //品牌id
					filterCategoryNames: [], //分类id
					specificationNames: [], //规格id
					filterWareHouseIds: [], //仓库id
					provinceId: null,
					cityId: null,
					pageNum: 1,
					isInsertSearchRecord: null, //是否添加为搜索记录
					goodsType: null,
				},
				KeyList: [],
				SwiperValue: '',
				firstFocus: false,
				token:'',
				integral:null
			}

		},
		onLoad(option) {
			if(option.integral){
				this.integral=true
			}else{
				this.integral=false
			}
			// this.getDataMsg()
			uni.removeStorageSync('chooseList')
		},
		onShow(option) {
			this.token = uni.getStorageSync('token')
			this.HistorySearch()
			this.SearchKeyWord()
			this.getsearch()
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
				this.getsearch();
				this.SearchKeyWord();
				getRouter();	
			},
			//历史搜索
			HistorySearch() {
				getCustomerHistorySearchRecord().then((res) => {
					this.HistorySearchList = res.data
				})
			},
			getsearch() {
				getSearch().then(res => {
					this.KeyList = res.data
					this.SwiperValue = res.data[0].word
				})
			},
			placeChange(event) {
				this.currentSwip = this.KeyList[event.detail.current].word
			},
			goList(item) {
				// 判断是不是商城链接
				var model = item.linkUrl.indexOf('model=1')
				// 截取正确的跳转路径
				var linkType = item.linkUrl.split('?')[0]
				var linkNum = item.linkUrl.split('?')[1]
				var weixinUrl = item.linkUrl.split('/')[0]+'//'+item.linkUrl.split('/')[2]
				if(weixinUrl=='https://mp.weixin.qq.com'){
					uni.navigateTo({
						url:'/goodsDetail/webView?url='+item.linkUrl
					})
				}else{
					// 商城链接
					if (item.linkUrl.indexOf('model=1') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
							}else if(item.linkUrl.indexOf('/goodsDetail/goodGift') != -1){
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							}
							 else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else if (item.linkUrl.indexOf('model=0') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
					
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
								}else if(item.linkUrl.indexOf('/goodsDetail/goodGift') != -1){
									uni.navigateTo({
										url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
									})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else {
						if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
							})
							}else if(item.linkUrl.indexOf('/goodsDetail/goodGift') != -1){
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
						} else {
							uni.navigateTo({
								url: item.linkUrl
							})
						}
					
					}
				}
				
			},
			goListSearch(item) {
				uni.navigateTo({
					url: '/goodsLIst/goodsLIst?searchKey=' + item
				})
			},
			swiper() {
				this.firstFocus = true
				this.focus = false
				this.SwiperValue=''
			},
			// 清除搜索
			empty() {
				emptyCustomerHistorySearchRecord().then(res => {
					if (res.code == "0") {
						this.HistorySearch()
					}
				})
			},
			emptyClick() {
				this.empty()
			},
			//搜素关键字
			SearchKeyWord() {
				getSearchKeyWord().then((res) => {
					if (res.code == "0") {
						this.KeyWordList = res.data
					}
				})
			},
			//聚焦
			searchSubmitList() {
				this.focus = false;
			},
			// 失焦
			noSearch() {
				this.firstFocus = false
				if (this.value.length >= 2) {
					if (this.formPage) {
						uni.navigateTo({
							url: '/goodsLIst/goodsLIst?searchKey=' + this.value
						})
					} else if (this.value) {
						uni.navigateTo({
							url: '/goodsLIst/goodsLIst?searchKey=' + this.value,
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
			searchSubmitValue(e) {
				//	初始化数据
				if (this.value.length) {
				
				} else {
					this.value = this.currentSwip
				}
				this.noSearch()
			},
			
			//分享个人
			onShareAppMessage() {
				return {
					title: '搜索列表',
					path: '/goodsLIst/search'  
				}	
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '搜索列表',
					path: '/goodsLIst/search' 
				}
			},
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
