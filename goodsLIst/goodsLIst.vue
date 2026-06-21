<template>
	<view class='productList'>
		<view class="pro_select_content">
			<view class="uni-column ">
				<input class="goodsInput" type="text" confirm-type="search" bindconfirm="startSearch"
					:placeholder="categoryName"
					v-model="searchGoodsParamBo.searchKey"
					@blur="search">
				<view class="searchIcon" @click.stop="search"></view>
			</view>
			<view style="display: flex">
				<view :class="!item.isShow? 'select_item aa' :'select_item'" :style="[{background: !item.isShow ? background1 : ''},{color: !item.isShow ? color : ''}]" @click="selectType(item,index)"
					v-for="(item,index) in chooseClassList" :key='index'>
					<view v-if="item.isShow"  :class="!item.isShow?'showName aa':'showName'">{{item.name}}</view>
					<view v-if="!item.isShow" :class="!item.isShow?'showName act' : 'showName'">
						{{item.name}}
					</view>
					<view v-if="selectTitleItem == index"  class="image1"></view>
					<view v-else class="image2"></view>
				</view>
			</view>

		</view>
		<view class="pro_list">
			<view class="pro_list_item" v-for="(item,index) in goodsList" :key="index">
				<goods-msg :goods="item" :background="background" :color="color"></goods-msg>
			</view>
		</view>

		<uni-popup class="select_popup" ref="addCartPopup">
			<view class="selectPopup">
				<view class="select_popup_list">
					<view class="select_popup_item" v-for="(items,indexs) in chooseClassItemList.filterBos"
						:key="indexs">
						<text @click="typeClick(items)"  :style="{color: items.isChecked ? color : ''}" :class=" items.isChecked ?'act':''">{{items.name}}</text>
						<view class="isSelected" v-show="items.isChecked">

						</view>
					</view>
				</view>
				<view class="select_btn" :style="[{ background: background }]">
					<text class="reset_btn" :style="{ color: color }" @click="resetBtn">重置</text>
					<text class="submit_btn" @click="categorySearch">确定</text>
				</view>
			</view>
		</uni-popup>
		<search-nothing v-if="isShowNoTips && goodsList.length <= 0" />
	</view>
</template>

<script>
	import '@/static/LHT/goodsList.css'
	import goodsMsg from '@/components/goodsMsg.vue'
	import hederSearch from '@/components/hederSearch.vue'
	import searchNothing from '@/components/searchNothing.vue'
	import {
		getSearch
	} from "@/api/search.js"
	import {
		queryGoodsListByParam,
		getGoodsSearchFilter
	} from '@/api/goodsList.js'
	import {
		isLogin,
		getUrl,
		refresh,
		getRouter
	} from '@/utils/utils.js'

	export default {
		components: {
			goodsMsg,
			hederSearch,
			searchNothing
		},
		data() {
			return {
				defaultSrc: 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png',
				defaultSrcOn: 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/green.png',
				flag: false,
				key: '',
				chooseClassList: [], //品牌、分类、规格等分类集合
				chooseClassItemList: [], //分类的子集合
				categoryName: '',
				searchGoodsParamBo: {
					categoryId: null, //分类id
					searchKey: null,
					filterBrandIds: [], //品牌id
					filterCategoryNames: [], //分类名
					specificationNames: [], //规格id
					filterWareHouseIds: [], //仓库id
					provinceId: null,
					cityId: null,
					pageNum: 1,
					isInsertSearchRecord: null, //是否添加为搜索记录
					goodsType: null,
				},
				brandId: null,
				goodsList: [],
				goodId: '',
				btnName: [],
				nameIndex: 0,
				itemName: '',
				selectTitleItem: -1,
				showChooseList: [],
				isShowNoTips: '',
				total: 0,
				countdown: '',
				countdown1:'',
				day: '',
				time: '',
				minute: '',
				second: '',
				timer: null ,//重复执行,
				style:'',
				background: '',
				background1:'',
				color:'',
			}
		},
		onReachBottom() {
			if (this.total > this.goodsList.length) {
				this.searchGoodsParamBo.pageNum++
				this.getQueryGoodsList(true)
			}
		},
		onLoad(opt) {
			this.timer = setInterval(() => {
				this.showtime();
			}, 500);
			this.brandId = opt.brandId
			// this.brandId = JSON.parse(opt.brandId)
			if(opt.searchKey){
				this.searchGoodsParamBo.searchKey = opt.searchKey
			}
			if(opt.categoryId){
				this.searchGoodsParamBo.categoryId = opt.categoryId
			}
			if (opt.brandId) {
				this.searchGoodsParamBo.filterBrandIds.push(opt.brandId)
			}
			if (opt.name) {
				this.categoryName = opt.name
			} else if (opt.brandName) {
				this.categoryName = opt.brandName
			}
			var token = uni.getStorageSync('token')
			var userName = uni.getStorageSync('userName')
			if (token && userName) {
				this.searchGoodsParamBo.isInsertSearchRecord = true
			} else {
				this.searchGoodsParamBo.isInsertSearchRecord = false
			}
			if (opt.showChooseList) {
				this.showChooseList = JSON.parse(opt.showChooseList)
			}
			if (opt.chooseClassItemList) {
				this.chooseClassItemList = JSON.parse(opt.chooseClassItemList)
			}
			if (!opt.chooseClassList || opt.chooseClassList == '[]') {
				this.getData(1)
				this.getDataMsg(1)
			} else {
				if (this.showChooseList.length) {
					this.chooseClassList = JSON.parse(opt.chooseClassList)
					this.categorySearch()
				} else {
					this.getData(1)
					this.getDataMsg(1)
				}
			}
			getUrl()
		},
		onHide() {
			uni.setStorageSync('chooseList', '')
		},
		onShow() {
			uni.setStorageSync('isGoodList',true)
			this.style = uni.getStorageSync('style')
			this.color = this.style.goodsListcolor
			this.background = this.style.cartbtn
			this.background1 = this.style.goodsListaa
			// console.log(this.style,'styles')
			getRouter()
			var token = uni.getStorageSync('token')
			if (token) {
				this.flag = true
			} else {
				this.flag = false
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			showtime() {
				var nowtime = new Date();//获取当前时间
				this.goodsList.forEach((item)=>{
					if(item.goodsPrice.promotionStartTime !== null){
						item.goodsPrice.promotionStartTime = item.goodsPrice.promotionStartTime.replaceAll('-', '/')
					}
					if(item.goodsPrice.promotionEndTime !== null){
							item.goodsPrice.promotionEndTime = item.goodsPrice.promotionEndTime.replaceAll('-', '/')
					}
					// item.goodsPrice.promotionEndTime = item.goodsPrice.promotionEndTime.replaceAll('-', '/')
					// item.goodsPrice.promotionStartTime = item.goodsPrice.promotionStartTime.replaceAll('-', '/')
					if(item.goodsPrice.promotionStatus == 20){
						
						// this.endtime = new Date(item.goodsPrice.promotionEndTime)
						var lefttime = new Date(item.goodsPrice.promotionEndTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
							if(leftd  < 0){
								leftd = 0
							}else if(lefth <0){
								lefth =0
							}else if(leftm <0){
								leftm = 0
							}else if(lefts < 0){
								lefts = 0
							}
						if(lefth < 10){
							this.countdown = leftd + "天" + '0'+lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}else{
							this.countdown = leftd + "天" +lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}
							// console.log(this.countdown,'countdown')
							item.countdown = this.countdown
					}else if(item.goodsPrice.promotionStatus == 10){
						var lefttime = new Date(item.goodsPrice.promotionStartTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
							if(leftd  < 0){
								leftd = 0
							}else if(lefth <0){
								lefth =0
							}else if(leftm <0){
								leftm = 0
							}else if(lefts < 0){
								lefts = 0
							}
							if(lefth < 10){
								this.countdown1 = leftd + "天" + '0'+lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
							}else{
								this.countdown1 = leftd + "天" +lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
							}
							// console.log(this.countdown,'countdown')
							item.countdown1 = this.countdown1
					}
				
						// this.countdownList.push(this.countdown)
				})
			},
			getDataMsg(data) {
				this.getData(),
					this.getQueryGoodsList(),
					getRouter()
				if (data) {
					this.getGoodsSearch();
				}
			},
			getData(data) {
				this.searchGoodsParamBo.provinceId = '2'
				this.searchGoodsParamBo.cityId = '3212'
				this.getGoodsSearch();
				this.getQueryGoodsList(false)
			},
			search() {

				if (this.searchGoodsParamBo.searchKey.length) {
					this.searchGoodsParamBo.filterBrandIds = []
					this.searchGoodsParamBo.filterCategoryNames = []
					this.searchGoodsParamBo.filterWareHouseIds = []
					this.searchGoodsParamBo.specificationNames = []
					this.getData(1)
					this.resetBtn()
				} else {
					getSearch().then(res => {
						let n = res.data.length
						let random_number = Math.floor(Math.random() * Math.floor(n))
						this.searchGoodsParamBo.searchKey = res.data[random_number].word
						this.getData(1)
						this.resetBtn()
					})
				}
			},
			selectType(item, index) {
				this.$refs.addCartPopup.open('top')
				this.selectTitleItem = index
				this.chooseClassItemList = item
			},
			categorySearch() {
				var selectList = [];
				// console.log(this.chooseClassItemList, this.showChooseList)
				this.chooseClassItemList.filterBos.forEach(item => {
					if (item.isChecked) {
						selectList.push(item)
					}
				})
				var flag = false
				this.showChooseList.forEach((showItem) => {
					if (showItem.name == this.chooseClassItemList.name) {
						flag = true
						showItem.isShow = false
						showItem.filterBos = selectList
					}
				})
				if (!flag) {
					this.showChooseList.push({
						'name': this.chooseClassItemList.name,
						'isShow': true,
						'filterBos': selectList
					})
				}
				uni.setStorageSync('chooseList', this.showChooseList)
				this.searchGoodsParamBo.pageNum = 1
				this.pushDataToSearchParam()

				this.getData(1)
				this.$refs.addCartPopup.close()
				this.selectTitleItem = null
			},
			//重置
			resetBtn(items) {
				this.chooseClassItemList.filterBos.forEach((items) => {
					items.isChecked = false
				})
				this.showChooseList.forEach((selectItem) => {
					if (selectItem.name == this.chooseClassItemList.name) {
						selectItem.isShow = true
						selectItem.filterBos = []
					}
				})
				uni.setStorageSync('chooseList', this.showChooseList)

				this.$refs.addCartPopup.close()
				this.selectTitleItem = null

				this.searchGoodsParamBo.pageNum = 1

				this.pushDataToSearchParam()
				this.getData(1)
			},
			getQueryGoodsList(flag) {

				queryGoodsListByParam(this.searchGoodsParamBo).then(res => {
					this.total = res.data.total
					if (flag) {
						res.data.list.forEach(item => {
							item.goodsId = item.id
							this.goodsList.push(item)
						})
					} else {
						
						this.goodsList = res.data.list
					}

					this.$nextTick(function() {
						if (res.success && this.goodsList.length <= 0) {
							this.isShowNoTips = true
						}
					})
				})



			},
			getGoodsSearch() {
				getGoodsSearchFilter(this.searchGoodsParamBo).then(res => {
					var resData = res.data
					var chooseList = uni.getStorageSync('chooseList')
					if (chooseList != null && chooseList != undefined && chooseList.length > 0) {
						resData.forEach((selectItem) => {
							selectItem.isShow = true
							selectItem.showChooseList = []
							selectItem.filterBos.forEach((childrenItem) => {
								childrenItem.isChecked = false
								chooseList.forEach((showItem) => {
									if (showItem.name == selectItem.name) {
										if (showItem.filterBos.length > 0) {
											selectItem.showChooseList = showItem.filterBos
											showItem.filterBos.forEach((
												showChildrenItem) => {
												if (childrenItem.id ==
													showChildrenItem.id) {
													childrenItem.isChecked = true
													selectItem.isShow = false
												}
											})
										}
									}
								})
							})
						})
					} else {
						resData.forEach((selectItem) => {
							selectItem.isShow = true
							selectItem.filterBos.forEach((childrenItem) => {
								childrenItem.isChecked = false
							})
						})
					}

					this.chooseClassList = res.data
				})
			},
			typeClick(items) {
				items.isChecked = !items.isChecked
			},
			pushDataToSearchParam() {
				this.brandId = ''
				this.searchGoodsParamBo.filterBrandIds = []
				this.searchGoodsParamBo.filterCategoryNames = []
				this.searchGoodsParamBo.specificationNames = []
				this.searchGoodsParamBo.filterWareHouseIds = []
				this.chooseClassList.forEach((choosedItem, choosedIndex) => {
					if (choosedItem.name == '品牌') {
						choosedItem.filterBos.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.filterBrandIds.push(childrenItem.id)
							} else if (this.brandId) {
								this.searchGoodsParamBo.filterBrandIds.push(this.brandId)
							}
						})
					} else if (choosedItem.name == '分类') {
						choosedItem.filterBos.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.filterCategoryNames.push(childrenItem.id)
							}
						})
					} else if (choosedItem.name == '规格') {
						choosedItem.filterBos.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.specificationNames.push(childrenItem.id)
							}
						})
					} else if (choosedItem.name == '仓库') {
						choosedItem.filterBos.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.filterWareHouseIds.push(childrenItem.id)
							}
						})
					}
				})
			},
			//分享个人
			onShareAppMessage() {
				var categoryId = this.searchGoodsParamBo.categoryId
				var name = this.categoryName
				var searchKey = this.searchGoodsParamBo.searchKey
				var brandId = this.brandId
				// console.log(name, brandId, 'name===');
				if (searchKey) {
					return {
						title: '商品列表',
						path: '/goodsLIst/goodsLIst?searchKey=' + searchKey + '&chooseClassItemList=' + JSON.stringify(this
								.chooseClassItemList) + '&chooseClassList=' + JSON.stringify(this.chooseClassList) +
							'&showChooseList=' + JSON.stringify(this.showChooseList) + '&name=' + name
					}
				} else if (brandId) {
					// console.log(brandId,'pathbrandId......');
					return {
						title: '商品列表',
						path: '/goodsLIst/goodsLIst?brandId=' + brandId + '&chooseClassItemList=' + JSON.stringify(this
								.chooseClassItemList) + '&chooseClassList=' + JSON.stringify(this.chooseClassList) +
							'&showChooseList=' + JSON.stringify(this.showChooseList) + '&name=' + name
					}
				} else {
					return {
						title: '商品列表',
						path: '/goodsLIst/goodsLIst?categoryId=' + categoryId + '&chooseClassItemList=' + JSON.stringify(
								this
								.chooseClassItemList) + '&chooseClassList=' + JSON.stringify(this.chooseClassList) +
							'&showChooseList=' + JSON.stringify(this.showChooseList) + '&name=' + name
					}
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '商品列表',
					path: '/goodsLIst/goodsLIst?searchKey=' + searchKey + '&categoryId=' + categoryId + '&name' + name +
						'&chooseClassItemList=' + JSON.stringify(this
							.chooseClassItemList) + '&chooseClassList=' + JSON.stringify(this.chooseClassList) +
						'&showChooseList=' + JSON.stringify(this.showChooseList) + '&name=' + this.name
				}
			},
		},
	}
</script>

<style scoped lang="less">
	.productList {
		background-color: #FFFFFF;

		.pro_select_content {
			width: calc(100% - 48upx);
			padding: 0upx 24upx 0;
			background-color: #FFFFFF;
			box-shadow: 0 10upx 10upx -10upx rgba(0, 0, 0, 0.1);
			overflow-x: auto;
			position: fixed;
			top: 0upx;
			left: 0;
			z-index: 999;

			.uni-column {
				width: 690upx;
				position: relative;
				margin: 0 auto;

				.goodsInput {
					width: 690upx;
					height: 60upx;
					border-radius: 30upx;
					border: 2upx solid #EEEEEE;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #777;
					margin: 20upx auto 20upx;
					padding: 0upx 0upx 0 55upx;
					box-sizing: border-box;
					background-color: #f4f4f4;
				}

			}

			.select_item {
				width: 140upx;
				height: 50upx;
				flex-shrink: 0;
				white-space: nowrap;
				background: #F4F4F4;
				border-radius: 25upx;
				margin: 20upx 20upx 20upx 16upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				align-items: center;

				.showName {
					font-size: 24upx;
					text-align: center;
					// background: #F6F6F6;
					white-space: nowrop;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 50upx;
					margin-left: 24upx;
				}

				image {
					width: 20upx;
					height: 20upx;
					margin-left: -28upx;
				}
			}

			.salesVolume {
				width: 60upx;
				height: 22upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 100upx;
				margin-left: 80upx;
			}

			.changePrice {
				// width: 70upx;
				height: 23upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 99upx;
				margin-left: 87upx;
			}

			.select_item .on {
				border: 1upx solid #E1251B;
				background-color: rgba(225, 37, 27, 0.2);
				color: #E1251B;

				.showName {
					width: 70upx;
					white-space: nowrop;
					overflow: hidden;
					text-overflow: ellipsis;
					display: flex;
					align-items: flex-start;
					word-wrap: break-word;
				}
			}

			.select_item.showSelect {
				margin: 23upx 22upx 0 0;
				border-radius: 25rpx 25rpx 0 0;
			}

			.select_item.chooseSelect {
				margin: 23upx 22upx 0 0;
				border-radius: 25rpx 25rpx 0 0;
				color: #E1251B;
			}
		}

		.pro_list {
			width: calc(100% - 48upx);
			background-color: #fff;
			padding: 24upx 24upx;
			position: relative;
			top: 220upx;
		}

		.select_popup {

			.selectPopup {
				width: calc(100% - 64upx);
				max-height: 382upx;
				margin-top: 180upx;
				padding: 29upx 32upx 39upx;
				background-color: #F4F4F4;
				border-radius: 5upx 5upx 15upx 20upx;

				.select_popup_list {
					width: 100%;
					height: 282upx;
					overflow-y: auto;
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;

					.select_popup_item {
						cursor: pointer;
						width: 50%;
						display: flex;
						align-items: center;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 56upx;
						}

						// .act{
						// 	color:#08AE63;
						// }
						// .isSelected{
						// 	width: 30upx;
						// 	height: 30upx;
						// 	background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/treeGreen.png);
						// 	background-size: 100% 100%;
						// }

						image {
							width: 30upx;
							height: 30upx;
							margin-left: 22upx;
						}
					}
				}

				// .select_btn {
				// 	width: 100%;
				// 	height: 70upx;
				// 	background: linear-gradient(-70deg, #0D986A, #08AE63);
				// 	border: 1upx solid #08AE63;
				// 	border-radius: 35upx;
				// 	margin: 40upx auto 0;
				// 	display: flex;
				// 	overflow: hidden;
				// 	cursor: pointer;

				// 	.reset_btn {
				// 		cursor: pointer;
				// 		display: inline-block;
				// 		width: 343upx;
				// 		height: 70upx;
				// 		background: #F4F4F4;
				// 		border: 1upx solid #08AE63;
				// 		border-radius: 35upx 0upx 35upx 35upx;
				// 		font-size: 28upx;
				// 		font-family: PingFang SC;
				// 		font-weight: 500;
				// 		color: #08AE63;
				// 		line-height: 70upx;
				// 		text-align: center;
				// 	}

				// 	.submit_btn {
				// 		width: 351upx;
				// 		cursor: pointer;
				// 		display: inline-block;
				// 		font-size: 28upx;
				// 		font-family: PingFang SC;
				// 		font-weight: 500;
				// 		color: #FFFFFF;
				// 		line-height: 70upx;
				// 		text-align: center;
				// 	}
				// }
			}
		}
	}
</style>
<style lang="scss">
	::v-deep .uni-numbox {
		height: 50upx !important;
		line-height: 50upx !important;
		width: 200upx !important;

		.uni-numbox__minus {
			width: 50upx !important;
			height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}

		.uni-numbox__value.data-v-dd94a2a8 {
			width: 100upx !important;
			height: 50upx !important;
			line-height: 50upx !important;
			font-size: 24upx !important;
			background-color: #f8f8f8 !important;
			border-style: none !important;
		}

		.uni-numbox__plus.data-v-dd94a2a8 {
			width: 50upx !important;
			height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}
	}
</style>
