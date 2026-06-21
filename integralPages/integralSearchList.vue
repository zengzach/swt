<template>
	<view class='productList'>
		<view class="pro_select_content">
			<view class="uni-column ">
				<input class="goodsInput" type="text" :placeholder="categoryName" v-model="searchGoodsParamBo.searchKey"
					@blur="search">
				<view class="searchIcon" @click.stop="search"></view>
			</view>
			<view style="display: flex" v-if="goodsList.length>0">
				<view :class="item.isShow? 'aa' :'select_item'" @click="selectType(item,index)"
					v-for="(item,index) in categoryList" :key='index'>
					<!-- <view :class="!item.isShow?'showName aa':'showName'">{{item.name}}</view> -->
					<view :class="!item.isShow?'showName act' : 'showName'"> {{item.name}} </view>
					<view v-if="selectTitleItem == index" class="image1"></view>
					<view v-else class="image2"></view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="pro_list">
			<view class="pro_list_item" v-for="(item,index) in goodsList" :key="index">
				<view class="goods_msg_area">
					<view class="pro_list_item_left">
						<image v-if="item.pictureUrl" :src="item.pictureUrl" mode="" @click="goGoodsDetail(item)"> </image>
						<image v-else
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
							mode="" @click="goGoodsDetail(item)"></image>
					</view>
					<view class="pro_item_msg">
						<view class="goodsListTitle">
							{{item.goodsTitle}}
						</view>
						<view class="pro_item_bottom">
							<view class="priceContent">
								<view class="priceNumber">
									<span>积分</span>
									{{item.integralPrice}}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 选择分类弹窗 -->
		<uni-popup class="select_popup" ref="addCartPopup">
			<view class="selectPopup">
				<view class="select_popup_list">
					<view class="select_popup_item" v-for="(items,indexs) in categoryItemList.filterBos"
						:key="indexs">
						<text @click="typeClick(items)" :class="items.isChecked?'act':''">{{items.name}}</text>
						<view class="isSelected" v-show="items.isChecked"> </view>
					</view>
				</view>
				<view class="select_btn">
					<text class="reset_btn" @click="resetBtn">重置</text>
					<text class="submit_btn" @click="categorySearch">确定</text>
				</view>
			</view>
		</uni-popup>
		
		<search-nothing v-if="goodsList.length <= 0" />
	</view>
</template>

<script>
	import {
		ingergalCategoryTreeGoodsList
	} from '@/api/integral/integralClassifyListApi.js'
	import {integralSearchFilter} from '@/api/integral/integralSearch.js'
	import searchNothing from '@/components/searchNothing.vue'
	import {
		getUrl,
		refresh,
		getRouter
	} from '@/utils/utils.js'

	export default {
		components: {
			searchNothing
		},
		data() {
			return {
				flag: false,
				categoryList: [], //品牌、分类分类集合
				categoryItemList: [], //分类的子集合
				categoryName: '',
				searchGoodsParamBo: {
					searchKey: null,
					filterBrandIds: [], //品牌id
					categoryIdList: [], //分类id
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
				pageNum: 1,
				total: 0
			}
		},
		onReachBottom() {
			if (this.total > this.goodsList.length) {
				this.pageNum++
			}
		},
		onLoad(opt) {
			this.brandId = opt.brandId
			this.searchGoodsParamBo.searchKey = opt.searchKey
			if (opt.searchKey) {
				this.getData()
			}
			getUrl()
			this.getIntegralSearchFilter()
		},
		onShow() {
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
			getDataMsg(data) {
				this.getData(),
				getRouter()
			},
			// 商品列表
			getData() {
				console.log(this.searchGoodsParamBo,"--------------------")
				ingergalCategoryTreeGoodsList(this.pageNum, this.searchGoodsParamBo).then(res => {
					// console.log(res, "搜索结果")
					this.goodsList = res.data.list
				})

			},
			// 获取分类
			getIntegralSearchFilter(){
				integralSearchFilter(this.searchGoodsParamBo).then(res=>{
					if(res.success){
						res.data.forEach(item=>{
							item.isShow=false
							item.filterBos.forEach(items=>{
								items.isChecked=false
							})
						})
					}
					this.categoryList=res.data
					// console.log(res.data,"分类")
				})
			},
			// 搜索
			search() {
				this.getIntegralSearchFilter()
				this.getData()
			},
			// 去详情页
			goGoodsDetail(item){
				uni.navigateTo({
					url: '/integralPages/integralDetail?integralId='+item.integralBaseId
				})
			},
			// 打开分类
			selectType(item, index) {
				this.$refs.addCartPopup.open('top')
				this.categoryItemList = item
			},
			// 选择分类
			typeClick(items) {
				items.isChecked = !items.isChecked
			},
			//重置
			resetBtn(items) {
				this.categoryItemList.filterBos.forEach((items) => {
					items.isChecked = false
				})
				this.pageNum = 1
				this.pushDataToSearchParam()
				this.getData(1)
				this.$refs.addCartPopup.close()
				this.selectTitleItem = null
			},
			// 确定
			categorySearch() {
				var selectList = [];
				this.categoryItemList.filterBos.forEach(item => {
					if (item.isChecked) {
						selectList.push(item)
						// console.log(selectList,"选择了哪些")
					}
				})
				this.pageNum = 1
				this.pushDataToSearchParam()
				this.getData()
				this.$refs.addCartPopup.close()
			},
			
			pushDataToSearchParam() {
				this.brandId = ''
				this.searchGoodsParamBo.filterBrandIds = []
				this.searchGoodsParamBo.categoryIdList = []
				this.categoryList.forEach(item => {
					if (item.name == '品牌') {
						item.filterBos.forEach(childrenItem => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.filterBrandIds.push(childrenItem.id)
							} else if (this.brandId) {
								this.searchGoodsParamBo.filterBrandIds.push(this.brandId)
							}
						})
					} else if (item.name == '分类') {
						item.filterBos.forEach(childrenItem => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.categoryIdList.push(childrenItem.id)
							}
						})
					} 
				})
				// console.log(this.searchGoodsParamBo,"参数")
			}
			
			
		}
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
				.image1 {
					width: 20upx;
					height: 20upx;
					background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_top.png');
					background-size: 100% 100%;
					display: inline-block;
					margin-left: 20upx;
				}
				
				.image2 {
					width: 20upx;
					height: 20upx;
					background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png');
					background-size: 100% 100%;
					display: inline-block;
					margin-left: 20upx;
				}
			}
			.aa{
				width: 140upx;
				height: 50upx;
				white-space: nowrap;
				background: #FFEADE;
				border-radius: 25upx;
				margin: 20upx 20upx 20upx 20upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FE7E30;
				border:1px solid #FE7E30;
				display: flex;
				align-items: center;
				text-align:center;
				.image1 {
					width: 20upx;
					height: 20upx;
					background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_top.png');
					background-size: 100% 100%;
					display: inline-block;
					margin-left: 20upx;
				}
				
				.image2 {
					width: 20upx;
					height: 20upx;
					background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png');
					background-size: 100% 100%;
					display: inline-block;
					margin-left: 20upx;
				}
			}

			// .salesVolume {
			// 	width: 60upx;
			// 	height: 22upx;
			// 	font-size: 24upx;
			// 	font-family: PingFang SC;
			// 	font-weight: 500;
			// 	color: #333333;
			// 	line-height: 100upx;
			// 	margin-left: 80upx;
			// }

			// .changePrice {
			// 	// width: 70upx;
			// 	height: 23upx;
			// 	font-size: 24upx;
			// 	font-family: PingFang SC;
			// 	font-weight: 500;
			// 	color: #333333;
			// 	line-height: 99upx;
			// 	margin-left: 87upx;
			// }

			// .select_item .on {
			// 	border: 1upx solid #E1251B;
			// 	background-color: rgba(225, 37, 27, 0.2);
			// 	color: #E1251B;

			// 	.showName {
			// 		width: 70upx;
			// 		white-space: nowrop;
			// 		overflow: hidden;
			// 		text-overflow: ellipsis;
			// 		display: flex;
			// 		align-items: flex-start;
			// 		word-wrap: break-word;
			// 	}
			// }

			// .select_item.showSelect {
			// 	margin: 23upx 22upx 0 0;
			// 	border-radius: 25rpx 25rpx 0 0;
			// }

			// .select_item.chooseSelect {
			// 	margin: 23upx 22upx 0 0;
			// 	border-radius: 25rpx 25rpx 0 0;
			// 	color: #E1251B;
			// }
		}

		.pro_list {
			width: calc(100% - 48upx);
			background-color: #fff;
			padding: 24upx 24upx;
			position: relative;
			top: 220upx;

			.goods_msg_area {
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;
				margin-bottom: 24upx;
				overflow: hidden;

				.pro_list_item_left {
					width: 244upx;
					height: 244upx;
					margin-right: 20upx;

					image {
						width: 244upx;
						height: 244upx;
						border-radius: 10upx;
						background-color: #F8F8F8;
					}
				}

				.pro_item_msg {
					width: calc(100% - 64upx);

					.goodsListTitle {
						width: 423upx;
						// height: 68upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						// line-height: 33upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.pro_item_bottom {
						width: 433upx;
						display: flex;
						justify-content: space-between;
						margin-top: 40upx;

						.priceContent {
							margin-top: 20upx;

							.priceNumber {
								height: 26upx;
								font-size: 32upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #FF5000;
								margin-top: 10upx;

								span {
									font-size: 24upx;
								}
							}
						}
					}
				}
			}
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

						.act{
							color:#FF8D13;
						}
						
						.isSelected{
							width: 30upx;
							height: 30upx;
							background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/treeGreen.png);
							background-size: 100% 100%;
						}
					}
				}

				.select_btn {
					width: 100%;
					height: 70upx;
					background:linear-gradient(126deg, #FF8D13, #FE7E30);
					border: 1upx solid #FF8D13;
					border-radius: 35upx;
					margin: 40upx auto 0;
					display: flex;
					overflow: hidden;
					cursor: pointer;

					.reset_btn {
						cursor: pointer;
						display: inline-block;
						width: 343upx;
						height: 70upx;
						background: #F4F4F4;
						border: 1upx solid #FF8D13;
						border-radius: 35upx 0upx 35upx 35upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF8D13;
						line-height: 70upx;
						text-align: center;
					}

					.submit_btn {
						width: 351upx;
						cursor: pointer;
						display: inline-block;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 70upx;
						text-align: center;
					}
				}
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
