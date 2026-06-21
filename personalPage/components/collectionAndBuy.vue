<template>
	<view class="cartList">
		<view class="cart_list_operation">
			<view class="myorder_list_title">

				<!-- <view class="view" v-for="(item,index) in screenLcist" :key="index"
					:style="[{color: !item.isShow? color : ''},{background: !item.isShow ? background1 : ''}]"
					@click="changeChooseItems(item)" :class="!item.isShow?'active':''">
					{{item.name}}
					<view v-if="!item.isShow" class="image"></view>
					<view v-else class="image2"></view>
				</view> -->
				<view style="display: flex">
					<view :class="!item.isShow? 'select_item aa' :'select_item'"
						:style="[{background: !item.isShow ? background1 : ''},{color: !item.isShow ? color : ''}]"
						@click="changeChooseItems(item,index)" v-for="(item,index) in chooseClassList" :key='index'>
						<view v-if="item.isShow" :class="!item.isShow?'showName aa':'showName'">{{item.name}}</view>
						<view v-if="!item.isShow" :class="!item.isShow?'showName act' : 'showName'">
							{{item.name}}
						</view>
						<view v-if="selectTitleItem == index" class="image"></view>
						<view v-else class="image2"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="cartGoodsList.length>0">
			<view class="cart_list_content">
				<uni-swipe-action class="cart_pro_list">
					<uni-swipe-action-item
						:right-options="type == 1 ? colOptions : item.isCollection ? purchasedOptions :  buyOptions"
						v-for="(item,index) in cartGoodsList" :key="index" @click="bindClick(item.id,$event)"
						class="cart_list_item">
						<view class="cart_list_item_view">
							<view class="goods_msg">
								<view class="pro_list_item_left" @click="toDetail(item.id)">
									<image v-if="item.goodsPictureUrl" :src="item.goodsPictureUrl" mode="widthFix">
									</image>
									<image v-else
										src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
										mode="widthFix"></image>
								</view>
								<view class="pro_item_msg">
									<h3 :style="{'color':( item.status == 1 ? '' :'#333333')}"
										@click="toDetail(item.id)">{{item.goodsTitle}}</h3>
									<view class="packing_content">
										<view class="" style="margin-right:40upx">{{item.brandName}}</view>
										<view class="">{{item.packDesc}}
										</view>
									</view>
									<view class="pro_item_bottom">
										<view class="goods_price">￥<text>{{item.goodsPrice.price}}</text></view>
										<view class="operation_area" :style="{ background: background }"
											@click="toDetail(item.id)">
											去购买
										</view>
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
					<view v-show="isLoadMore">
						<uni-load-more :status="loadStatus"></uni-load-more>
					</view>
				</uni-swipe-action>
			</view>
		</view>
		<!-- 没有商品 -->
		<view v-else class="nothing">
			<view class="noimage" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
			<text>您还没有{{ type == 2 ? '购买' : '收藏'}}商品，去看看心仪的产品吧</text>
			<view @click="toIndex">去首页查看？</view>
		</view>

		<uni-popup class="select_popup" ref="addCartPopup">
			<view class="selectPopup">
				<!-- 品牌 -->
				<view class="selectPopup">
					<view class="select_popup_list">
						<view class="select_popup_item" v-for="(items,indexs) in chooseClassItemList.collectionCounts"
							:key="indexs">
							<!-- :class=" items.isChecked ?'act':''" -->
							<text @click="typeClick(items)" 
								 :style="{color: items.isChecked ? color : ''}" >{{items.name}}</text>
								<!-- :style="{color: items.isChecked ? color : ''}" -->
							<view class="isSelected" v-show="items.isChecked">
							</view>
						</view>
					</view>
					<view class="select_btn" :style="[{ background: background }]">
						<text class="reset_btn" :style="{ color: color }" @click="resetBtn">重置</text>
						<text class="submit_btn" @click="categorySearch">确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import '@/static/LHT/collection.css'
	import {
		getCollectionGoodsPage,
		collectionGoods,
		delCollectionGoods,
		getCollectionSearchCount
	} from '@/api/collectionApi.js'
	import {
		toast,
		getRouter,
		refresh
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				selectName: '',
				colOptions: [{
					text: '删除',
					style: {
						width: '120upx',
						backgroundColor: '#FF653C',
					}
				}],
				purchasedOptions: [{
					text: '移除收藏',
					style: {
						width: '120upx',
						backgroundColor: '#FF6224',
					}
				}],
				buyOptions: [{
					text: '加入收藏夹',
					style: {
						width: '120upx',
						backgroundColor: '#FF8429'
					}
				}],
				searchGoodsParamBo: {},
				chooseClassItemList: [],
				cartGoodsList: [],
				chooseClassList: [],
				nowType: 1,
				list: [],
				selectFlag: false,
				screenList: [],
				brandListflag: true,
				brandList: [], //品牌
				categoryListflag: false,
				// categoryList:[],//分类
				SpecifyListflag: false,
				// SpecifyList:[],//规格
				showChooseList: [],
				pageNum: 1,
				pagesize: 20,
				totalNum: '',
				loadStatus: 'loading',
				isLoadMore: false,
				nowCatrgoryId: '',
				select: [],
				Arr: [],
				brandsId: [], //传品牌id
				categoryId: [], //分类id
				specify: [], //规格name,
				selectTitleItem: -1
			}
		},
		props: {
			type: null,
			background: '',
			color: '',
			background1: '',
			imageURL: ''
		},
		onLoad() {
			uni.setStorageSync('cllectionList', [])
			this.getDataMsg()
		},
		onReachBottom() {

		},
		onShow() {
		},
		mounted() {
			uni.setStorageSync('cllectionList', [])
			this.getCollectionGoodsList()
			this.getScreen([])
		},
		onHide() {


		},
		onUnload() {

			uni.setStorageSync('cllectionList', [])
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			//上拉加载更多、分页
			getReachBottom() {
				var that = this
				if (that.totalNum > that.pagesize) {
					if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
						this.isLoadMore = true
						that.pageNum++
						uni.showLoading({
							title: '加载中'
						})
						var data = {
							type: that.type,
						}
						getCollectionGoodsPage(that.pageNum, data).then(res => {
							uni.hideLoading()
							if (res.data.list.length) {
								that.cartGoodsList = that.cartGoodsList.concat(res.data.list);
								if (res.data.list.length < that.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
									that.isLoadMore = true
									that.loadStatus = 'nomore'
								} else {
									that.isLoadMore = false
								}
							} else {
								that.isLoadMore = true
								that.loadStatus = 'nomore'
							}
						}).catch(err => {
							// console.log(err);
						})
					}
				}
			},
			// 下拉刷新			
			getDataMsg() {
				this.pageNum = 1
				this.getCollectionGoodsList()
				this.getScreen([])
				getRouter();

			},
			resetBtn() {
				this.chooseClassItemList.collectionCounts.forEach((items) => {
					items.isChecked = false
				})
				this.showChooseList.forEach((selectItem) => {
					if (selectItem.name == this.chooseClassItemList.name) {
						selectItem.isShow = true
						selectItem.collectionCounts = []
					}
				})
				uni.setStorageSync('cllectionList', this.showChooseList)

				this.$refs.addCartPopup.close()
				this.selectTitleItem = null

				this.searchGoodsParamBo.pageNum = 1

				this.pushDataToSearchParam()
				this.getData(1)
			},

			// 列表
			getCollectionGoodsList() {

				this.searchGoodsParamBo.type = this.type,
					// this.searchGoodsParamBo.brandIds=this.brandsId
					// this.searchGoodsParamBo.categoryIds=this.categoryIds
					// this.searchGoodsParamBo.specifications=this.specify
					getCollectionGoodsPage(this.pageNum, this.searchGoodsParamBo).then(res => {
						this.cartGoodsList = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					})
			},
			pushDataToSearchParam() {
				this.brandId = ''
				this.searchGoodsParamBo.brandIds = []
				this.searchGoodsParamBo.categoryIds = []
				this.searchGoodsParamBo.specifications = []

				this.chooseClassList.forEach((choosedItem, choosedIndex) => {
					if (choosedItem.name == '品牌') {

						choosedItem.collectionCounts.forEach((childrenItem) => {

							if (childrenItem.isChecked) {

								this.searchGoodsParamBo.brandIds.push(childrenItem.id)
							} else if (this.brandId) {
								this.searchGoodsParamBo.brandIds.push(this.brandId)
							}
						})
					} else if (choosedItem.name == '分类') {
						choosedItem.collectionCounts.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.categoryIds.push(childrenItem.id)
							}
						})
					} else if (choosedItem.name == '规格') {
						choosedItem.collectionCounts.forEach((childrenItem) => {
							if (childrenItem.isChecked) {
								this.searchGoodsParamBo.specifications.push(childrenItem.name)
							}
						})
					}
				})
			},
			// 筛选 接口
			getScreen(arr) {
				this.searchGoodsParamBo.type = this.type,
					// this.searchGoodsParamBo.brandIds=this.brandsId
					// this.searchGoodsParamBo.categoryIds=this.categoryIds
					// this.searchGoodsParamBo.specifications=this.specify
					getCollectionSearchCount(this.searchGoodsParamBo).then(res => {
						var resData = res.data
						var chooseList = uni.getStorageSync('cllectionList')
						if (chooseList != null && chooseList != undefined && chooseList.length > 0) {
							resData.forEach((selectItem) => {
								selectItem.isShow = true
								selectItem.showChooseList = []
								// console.log(selectItem)
								selectItem.collectionCounts.forEach((childrenItem) => {
									childrenItem.isChecked = false
									chooseList.forEach(showItem => {
										if (showItem.name == selectItem.name) {
											if (showItem.collectionCounts.length > 0) {
												selectItem.showChooseList = showItem
													.collectionCounts
												showItem.collectionCounts.forEach((
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
								selectItem.collectionCounts.forEach((childrenItem) => {
									childrenItem.isChecked = false
								})
							})
						}
						this.select.forEach(item => {

							// if(item.pName=='品牌'){
							res.data.forEach(item1 => {
								if (item1.name == item.pName) {
									item1.collectionCounts.forEach(item2 => {
										item2.isSelect = item.isSelect
									})
								}
							})
							// }
						})
						this.chooseClassList = res.data
					})
			},
			// 点击分类，打开弹窗
			changeChooseItems(item, index) {
				this.$refs.addCartPopup.open('top')
				this.selectTitleItem = index
				this.chooseClassItemList = item
			},
			// 选择
			typeClick(items) {
				items.isChecked = !items.isChecked
			},
			//重置
			reset() {
				this.brandList.forEach(item => {
					item.isSelect = false

				})

				this.$refs.addCartPopup.close()
				this.getCollectionGoodsList()
				this.pushDataToSearchParam()
				this.getScreen([])
			},
			// 确定按钮
			categorySearch() {
				var selectList = [];
				this.chooseClassItemList.collectionCounts.forEach(item => {
					if (item.isChecked) {
						selectList.push(item)
					}
				})
				var flag = false
				this.showChooseList.forEach((showItem) => {
					if (showItem.name == this.chooseClassItemList.name) {
						flag = true
						showItem.isShow = false
						showItem.collectionCounts = selectList
					}
				})
				if (!flag) {
					this.showChooseList.push({
						'name': this.chooseClassItemList.name,
						'isShow': true,
						'collectionCounts': selectList
					})
				}
				uni.setStorageSync('cllectionList', this.showChooseList)
				this.pushDataToSearchParam()
				this.getData(1)
				this.$refs.addCartPopup.close()
				this.selectTitleItem = null
			},
			getData(data) {
				this.searchGoodsParamBo.provinceId = '2'
				this.searchGoodsParamBo.cityId = '3212'
				this.getScreen();
				this.getCollectionGoodsList(false)
			},


			// 滑块操作
			bindClick(id, e) {
				var that = this
				if (e.content.text == '加入收藏夹') {
					collectionGoods({
						goodsId: id
					}).then(res => {
						toast({
							title: '收藏' + res.msg
						})
						that.getCollectionGoodsList(this.nowCatrgoryId)
					})
				} else {
					delCollectionGoods({
						goodsId: id
					}).then(res => {
						toast({
							title: e.content.text + res.msg
						})
						that.getCollectionGoodsList(this.nowCatrgoryId)
					})
				}
			},

			toIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

			//跳转到详情页面
			toDetail(id) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + id
				})

			},
		}
	}
</script>

<style scoped lang="scss">
	.cartList {
		.cart_list_operation {
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: fixed;
			top: 0upx;
			z-index: 99;

			.myorder_list_title {
				width: 75%;
				background-color: #ffffff;
				display: flex;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 30upx;
				margin-bottom: 17upx;

				.view {
					margin-right: 20upx;
					width: 120upx;
					height: 50upx;
					background: #F6F6F6;
					border-radius: 25upx;
					text-align: center;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 50upx;

				}

				image {
					width: 20upx;
					height: 20upx;
					margin-left: 12upx;
				}
			}
		}

		.cart_list_content {
			margin-top: 80upx;
			margin-bottom: 170upx;
			padding: 24upx 0 0;
			background-color: #FFFFFF;
			border-radius: 30upx;

			.cart_pro_list {
				.cart_list_item {

					.cart_list_item_view {
						width: 100%;
						height: 244upx;
						padding: 10upx 24upx;
						display: flex;
						align-items: center;
						position: relative;

						.goods_msg {
							width: 100%;
							display: flex;
							align-items: center;
							position: relative;
							margin-bottom: 24upx;
							overflow: hidden;

							.pro_list_item_left {
								width: 245upx;
								height: 245upx;
								margin-right: 20upx;

								image {
									width: 245upx;
									height: 245upx;
									border-radius: 10upx;
								}

								image.noHave {
									width: 112upx;
									height: 112upx;
									padding: 66upx 66upx;
									background-color: rgba(0, 0, 0, .2);
									position: absolute;
									top: 0;
									left: 0;
									z-index: 9;
								}
							}

							.pro_item_msg {
								width: calc(100% - 264upx);

								h3 {
									width: calc(100% - 35upx);
									height: 80upx;
									font-size: 30upx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #202021;
									// line-height: 34upx;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
								}

								.packing_content {
									width: calc(100% - 35upx);
									display: flex;
									font-size: 26upx;
									font-family: Microsoft YaHei;
									font-weight: 400;
									line-height: 30upx;
									margin-top: 20upx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;

									view {
										text-align: center;
										font-size: 26upx;
										font-family: PingFang SC;
										font-weight: 500;
										color: #9FA0A5;
									}
								}

								.pro_item_bottom {
									width: calc(100% - 55upx);
									display: flex;
									justify-content: space-between;
									margin-top: 60upx;

									.goods_price {
										font-size: 28upx;
										font-family: PingFang-SC-Bold;
										font-weight: bold;
										color: #FF5000;

										text {
											font-size: 36upx;
										}
									}

								}
							}
						}
					}
				}
			}

		}

		.nothing {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 463upx;


			text {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #888888;
				margin-bottom: 39upx;
			}

			view {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #C7C7C7;
			}
		}

		.select_popup {
			.selectPopup {
				width: calc(100% - 64upx);
				// max-height: 382upx;
				padding: 29upx 32upx 39upx;
				background-color: #F4F4F4;
				border-radius: 5upx 5upx 15upx 20upx;

				.select_popup_list {
					width: 100%;
					overflow-y: auto;
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;

					.select_popup_item {
						width: 50%;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 56upx;
						}

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

	// .act{
	// 	color:#08AE63;
	// }
	.isSelected {
		width: 30upx;
		height: 30upx;
		background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/selectTree.png);
		background-size: 100% 100%;
	}

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

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 22upx;
		}
	}
</style>
