<template>
	<view class="cartList" :style="{ color: color }">
		<view v-if="cartGoodsList.length>0||loseCartGoodsList.length>0">
			<view class="cart_list_operation">
				<view class="cart_operation_left">
					<view class="cart_account_list">
						<view class="cart_account_item">
							购物车({{length}})
						</view>
					</view>
				</view>
				<view class="cart_operation_right" v-if="!isManage" @click="Manage">批量删除</view>
				<view class="cart_operation_right" v-if="isManage" @click="Manage">取消删除</view>
			</view>
			<view class="cart_list_content">
				<!-- 列表 -->
				<view v-for="(cartItem,cartIndex) in cartGoodsList" :key="cartIndex"
					style="margin-bottom:20upx;border-radius: 20px;">
					<view class="">
						<view class="cart_warehouse_area">
							<view class="warehouse-icon" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">

							</view>
							<view class="cart_warehouse_name">{{cartItem.warehouseName}}</view>
						</view>
						<view v-for="(goodsItem,goodsIndex) in cartItem.shoppingCartStockList" :key="goodsItem.id">
							<uni-swipe-action class="cart_pro_list" :disabled="true">
								<uni-swipe-action-item :right-options="options" @click="bindClick($event,goodsItem)"
									class="cart_list_item">
									<view class="cart_list_item_view">
										<view @click="chooseItem(goodsItem)" v-if="goodsItem.isCanBuy"
											:class="goodsItem.isChoice ? 'nice' : 'bad'" class="goodsChoose">
											<icon v-if="goodsItem.isChoice" type="success_no_circle" size="12"
												color="#333" />
										</view>
										<view v-else style="background-color:#d9d9d9" class="goodsChoose">
										</view>

										<view @click="goDetail(goodsItem.goodsId)" class="canbuyimage">
											<!-- <view class="canbuyimageTop" v-if="goodsItem.promotionStatus == 20">
												{{goodsItem.promotionLabel}}
											</view> -->
											<image v-if="goodsItem.imgUrl" class="product_img" :src="goodsItem.imgUrl"
												mode=""></image>
											<image v-else class="product_img"
												src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
												mode=""></image>
										</view>
										<view class="pro_item_msg">
											<h3 style="" @click="goDetail(goodsItem.goodsId)">{{goodsItem.goodsTitle}}
											</h3>
											<view class="packing_content">
												{{goodsItem.brandName}}
												{{goodsItem.specification?goodsItem.specification:''}}/{{goodsItem.saleUnitName}}
											</view>
											<view style="font-size: 24upx;color: #999;height:30upx">
											</view>
											<view class="pro_item_bottom">
												<view class="pro_bottom_price">
													￥<text v-if="goodsItem.promotionStatus == 20">{{goodsItem.promotionPrice}}</text>
													<text v-else>{{goodsItem.price}}</text>
												</view>
												<view class="pro_bottom_price1" v-if="goodsItem.promotionStatus == 20">
													￥<text>{{goodsItem.price}}</text>
												</view>
												
											</view>
											<view class="pro_bottom_operation" style="margin-left: 200upx;">
												<uni-number-box @change="changBuyNum($event,goodsItem)"
													:disabled="!goodsItem.isCanBuy" :value="goodsItem.num"
													:min="goodsItem.minOrderBuy" @blur="blur"
													:max='goodsItem.isReserve?goodsItem.maxOrderBuy:goodsItem.stock'>
												</uni-number-box>
											</view>
										</view>
									</view>
								</uni-swipe-action-item>
							</uni-swipe-action>
						</view>
						<!-- 结算按钮 -->
						<view class="cart_pay_area" v-if="!isManage">
							<view class="checkAll" @click="checkedAllItem(cartItem)">
								<view class="allGoodsChoose"
									:style="{'border-color':(cartItem.isChoiceAll ? '#333' : '#999999')}">
									<icon v-if="cartItem.isChoiceAll" type="success_no_circle" size="12" color="#333" />
								</view>
								<text>全选</text>
							</view>
							<view class="pay_area">
								<view class="pay_area_msg">
									<view class="pay_msg_one">
										<text class="total">合计:</text>
										<view class="total_price">￥<text >{{cartItem.totalPrice | addZero}}</text></view>
									</view>
									<view
										style="font-size: 24upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
										不含运费</view>
								</view>
								<view class="pay_btn" :style="{ background: background }"  @click="toConfirmOrder(cartItem)">结算 ({{cartItem.totalNum}})
								</view>
							</view>
						</view>

					</view>
				</view>

				<view v-if="loseCartGoodsList.length>0"
					style="width:680upx;margin:0 auto;line-height: 88upx; display:flex;justify-content: space-between;">
					<view style="font-size: 30upx;font-family: PingFang SC;font-weight: 500;color: #202021;">
						失效商品({{loseCartGoodsList.length}})</view>
					<view
						style="font-size: 28upx;font-family: PingFang SC;font-weight: 500;color: #929396;margin-right: 20upx;"
						@click="clearGoods">
						清除失效商品
						<image style="width: 32upx;height: 32upx;"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/del.png" mode=""></image>
					</view>
				</view>

				<!-- 失效商品列表 -->
				<view style="overflow: hidden;">
					<view v-for="(goodsItem,goodsIndex) in loseCartGoodsList" :key="goodsItem.goodsId">
						<uni-swipe-action class="cart_pro_list" :disabled="true">
							<uni-swipe-action-item :right-options="options" @click="bindClick($event,goodsItem)"
								class="cart_list_item">
								<view class="cart_list_item_view">
									<view @click="goDetail(goodsItem.goodsId)" class="canbuyimage">
										<image v-if="goodsItem.imgUrl" class="product_img" :src="goodsItem.imgUrl"
											mode=""></image>
										<image v-else class="product_img"
											src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
											mode=""></image>
									</view>
									<view class="pro_item_msg">
										<h3 @click="goDetail(goodsItem.goodsId)">{{goodsItem.goodsTitle}}</h3>
										<view class="packing_content">
											{{goodsItem.brandName}}
											{{goodsItem.specification}}/{{goodsItem.saleUnitName}}
										</view>
										<view class="pro_item_bottom">
											<view class="pro_bottom_price">
												￥<text>{{goodsItem.price}}</text>
											</view>
											<view class="pro_bottom_operation">
												<uni-number-box @change="changBuyNum($event,goodsItem)"
													:disabled="!goodsItem.isInvalid" :value="goodsItem.num"
													:max="goodsItem.maxOrderBuy" :min="goodsItem.minOrderBuy">
												</uni-number-box>
											</view>
										</view>
									</view>
								</view>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 120upx;"></view>
			<!-- 删除商品 -->
			<view class="cart_pay_area1"  v-if="isManage">
				<view class=""  >
					<view class="checkAll" @click="checkedAll()">
						<view class="allGoodsChoose" :style="{'border-color':(delchoiceAll ? '#333' : '#999999')}">
							<icon v-if="delchoiceAll" type="success_no_circle" size="25" color="#333" />
						</view>
						<text>全选</text>
					</view>
				</view>
				<view class="pay_area" >
					<view class="pay_btn2" :style="{ background: background }" @click="deleteProduct()">删除</view>
				</view>
			</view>
			<view style='width:100%;height:138upx'></view>
		</view>
		<view class="nothing" v-if="cartGoodsList.length<=0&&loseCartGoodsList.length<=0">
			<view class="image1"  :style="{backgroundImage: 'url(' + imageURL1 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
			<!-- 	<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/cart.png" mode="widthFix"></image> -->
			<text>您的购物车空空如也，去商店看看心仪的产品吧！</text>
			<navigator open-type="switchTab" hover-class="other-navigator-hover" :style="{ background: background }" @click="goCollection">去逛逛</navigator>
		</view>
		<tab-bar :selectedIndex="2" :index="2"> </tab-bar>
	</view>
</template>

<script>
	import "@/static/LHT/cart.css";
	import {
		getCartGoodsList,
		modifyCartGoods,
		removeGoods,
		settleCheck,
		choiceCartGoods,
		unChoiceCartGoods
	} from '@/api/cartApi.js'
	import {
		toast,
		getRouter,
		refresh
	} from '@/utils/utils.js'
	import tabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						width: '120upx',
						backgroundColor: '#F34129'
					}
				}],
				isManage: false,
				totalPrice: 0,
				choiceAll: false, //结算的全选
				delchoiceAll: false, //删除的全选
				cartGoodsList: [], //有效商品
				loseCartGoodsList: [], //失效商品
				chooseGoodsList: [], //选中的商品放入改列表中
				remove: {
					shoppingCartIds: []
				},
				flag: false,
				totalNum: 0,
				length: 0,
				listId: {
					shoppingCartIds: []
				},
				select: {
					shoppingCartIds: []
				},
				goodsIds: [],
				wareHouseId: [],
				DelisChoiceAll: false,
				delArr: [],
				background:'',
				imageURL:'',
				imageURL1:''
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.goodsListcolor
			this.background = this.style.cartbtn
			this.imageURL = this.style.cartwarehouse
			this.imageURL1 = this.style.cartnoGoods
			getRouter()
		},
		onShow() {
			this.delchoiceAll = false
			this.isManage = false
			this.nowCount = 0
			this.account = -1
			var token = uni.getStorageSync('token')
			if (token) {
				this.getCartListData()
				this.flag = true
			} else {
				this.flag = false
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			}
			uni.hideTabBar({
				animation: false
			})
			if (typeof this.getTabBar === 'function' &&
				this.getTabBar()) {
				this.getTabBar().setData({
					selectedIndex: 1
				})
			}

		},
		onPullDownRefresh() {
			this.getCartListData()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		filters: {
		    addZero:function(data){
		   if(!data){
			   return '';
		   }
		        return data.toFixed(2)
		    }
		},
		methods: {
			//分享个人
			onShareAppMessage() {
				return {
					title: '购物车',
					path: 'pages/cart/cart'
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '购物车',
					path: '/pages/cart/cart'
				}
			},
			blur(e) {
				if (e.detail.value == '') {
					this.cartGoodsList.forEach(item => {
						item.shoppingCartStockList.forEach(item1 => {
							e.detail.value = item1.minOrderBuy
						})
					})
				}
			},
			// 购物车数据
			getCartListData() {
				this.length = 0
				this.delArr = []
				getCartGoodsList().then(res => {
					this.cartGoodsList = res.data.shoppingCartWarehouseStockList //有效列表
					this.loseCartGoodsList = res.data.shoppingCartStockInvalidList //无效列表
					this.totalPrice = res.data.goodsSettleAmount
					this.cartGoodsList.forEach(item => {
						this.length += item.shoppingCartStockList.length
						item.price = 0
						item.promotionPrice = 0
						item.isChoiceAll = false
						item.totalNum = 0
						item.shoppingCartStockList.forEach(item1 => {
							this.delArr.push(item1)
							if (item1.isCanBuy) {
								if (item1.isChoice) {
									if(item1.promotionStatus == 20){
										item.promotionPrice += (item1.promotionPrice * 1000 * item1.num) / 1000
										item.totalPrice = item.promotionPrice + item.price
										item.totalNum++
									}else{
										item.price += (item1.price * 1000 * item1.num) / 1000
										item.totalPrice = item.promotionPrice + item.price
										item.totalNum++
									}
									
									
								}
							}
						})
						if (item.shoppingCartStockList.every(item => item.isChoice)) {
							item.isChoiceAll = true
						}
					})
					this.loseCartGoodsList.forEach(item => {
						item.isChoiceAll = false
						this.delArr.push(item)
					})
				})
			},
			// 购物车商品数量加减
			changBuyNum(e, item) {
				item.num = e;
				var data = {
					goodsId: item.goodsId,
					id: item.id,
					num: item.num
				}
				if (this.isManage) {} else {
					modifyCartGoods(data).then(res => {
						if (res.success) {
							this.totalPrice = 0;
							this.cartGoodsList.forEach(data => {
								if (data.isCanBuy) {
									if (data.isChoice) {
										this.totalPrice += data.num * data.price;
									}
								}
							})
							this.getCartListData()
						}
					})
				}

			},
			// 单选
			chooseItem(goodsItem) {
				if (this.isManage) {
					goodsItem.isChoice = !goodsItem.isChoice

					if (goodsItem.isChoice) {
						this.remove.shoppingCartIds.push(goodsItem.id)

					} else {
						this.remove.shoppingCartIds.forEach((item, index) => {
							if (item == goodsItem.id) {
								this.remove.shoppingCartIds.splice(index, 1)
							}
						})
					}
					if (this.delArr.every(item => item.isChoice)) {
						this.delchoiceAll = true
					} else {
						this.delchoiceAll = false
					}

				} else {
					goodsItem.isChoice = !goodsItem.isChoice
					var data = {
						shoppingCartIds: []
					}
					data.shoppingCartIds.push(goodsItem.id)

					if (goodsItem.isChoice) {
						// 勾选
						choiceCartGoods(data).then(res => {
							this.getCartListData()
						})
					} else {
						// 取消勾选
						unChoiceCartGoods(data).then(res => {
							this.getCartListData()
						})
					}
				}
			},

			// 全选
			checkedAllItem(cartItem) {
				var data = {
					shoppingCartIds: []
				}
				cartItem.shoppingCartStockList.forEach(item => {
					data.shoppingCartIds.push(item.id)
				})
				if (cartItem.isChoiceAll) {
					unChoiceCartGoods(data).then(res => {
						this.getCartListData()
					})
				} else {
					this.listId = data.shoppingCartIds
					choiceCartGoods(data).then(res => {
						this.getCartListData()
					})
				}
			},
			//删除
			removeCarGoods(remove) {
				removeGoods(remove).then(res => {
					if (res.success) {
						toast({
							title: '删除成功'
						})
						this.isManage = false
						this.delchoiceAll = false
						this.getCartListData()
					}
				})
			},

			// 滑动删除
			bindClick(e, item) {
				this.remove.shoppingCartIds = []
				this.remove.shoppingCartIds.push(item.id)
				this.removeCarGoods(this.remove)
			},

			// 删除的全选
			checkedAll() {
				this.delchoiceAll = !this.delchoiceAll;
				this.cartGoodsList.forEach(item => {
					item.shoppingCartStockList.forEach(item1 => {
						item1.isChoice = this.delchoiceAll
						this.remove.shoppingCartIds.push(item1.id)
					})
				})
				this.loseCartGoodsList.forEach(item => {
					this.remove.shoppingCartIds.push(item.id)
				})
				if (this.delchoiceAll) {

				} else {
					this.remove.shoppingCartIds = []
				}
			},
			// 批量删除
			deleteProduct() {
				let that = this

				if (this.remove.shoppingCartIds.length <= 0) {
					toast({
						title: '请勾选商品'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '是否确认删除',
						success: function(res) {
							if (res.confirm) {
								var newArr = new Set(that.remove.shoppingCartIds)
								newArr.forEach(item => {
									that.remove.shoppingCartIds.push(item)
								})
								removeGoods(that.remove).then(res => {
									if (res.success) {
										toast({
											title: '删除成功'
										})
										that.isManage = false
										that.delArr = []
										that.delchoiceAll = false
										that.remove.shoppingCartIds = []
										that.getCartListData()

									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
								// that.remove.shoppingCartIds=[]
							}
						}

					});

				}


			},
			// 清除失效商品
			clearGoods() {
				this.loseCartGoodsList.forEach(item => {
					if (item.isInvalid) {
						var del = {
							shoppingCartIds: []
						}
						del.shoppingCartIds.push(item.id)
						removeGoods(del).then(res => {
							if (res.success) {
								toast({
									title: '删除成功'
								})
								this.getCartListData()
							}
						})
					}
				})
			},

			// 结算
			toConfirmOrder(cartItem) {
				var goodsIds = []
				var wareHouseId = [cartItem.warehouseId]
				// wareHouseId = cartItem.warehouseId
				cartItem.shoppingCartStockList.forEach(item => {
					if (item.isChoice) {
						goodsIds.push(item.goodsId)
					}
				})

				if (goodsIds.length <= 0) {
					toast({
						title: '请勾选商品再结算'
					})
				} else {
					var data = {
						goodsIds: goodsIds,
						wareHouseIds: wareHouseId,
						orderType: 1,
						isUseCoupon:true
					}
					settleCheck(data).then(res => {
						if (res.success) {
							uni.removeStorageSync('Flage')
							uni.removeStorageSync('wxFlage')
							var oldCouponId=null
							if(res.data.useCouponList!=null&&res.data.useCouponList.length){
								oldCouponId = res.data.useCouponList[0].customerCouponId
							}
							uni.navigateTo({
								url: '/personalPage/orderPages/confirmOrder?goodsIds=' + JSON.stringify(goodsIds) +
									'&wareHouseIds=' + JSON.stringify(wareHouseId) + '&orderType=' + 1 +
									'&cartPage=true' + '&toOrderList=1'+'&oldCouponId=' +oldCouponId+'&checkCart=false'
							})
						} else {
							toast({
								title: res.msg
							})
						}
					})
				}

			},
			// '批量删除' 按钮
			Manage() {
				this.isManage = !this.isManage
				if (this.isManage) {
					this.cartGoodsList.forEach(item => {
						item.shoppingCartStockList.forEach(item1 => {
							item1.isChoice = false
						})
					})
				} else {
					this.delArr = []
					this.delchoiceAll = false
					this.remove.shoppingCartIds = []
					this.getCartListData()
				}
			},
			// 去详情
			goDetail(goodsId) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + goodsId
				})
			},
			// 去首页
			goCollection() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			DelcheckedAllItem() {
				this.DelisChoiceAll = !this.DelisChoiceAll
			}
		}
	}
</script>

<style scoped lang="scss">
	.cartList {
		background: #F6F6F6;
		margin-bottom: 40upx;

		.cart_list_operation {
			width: calc(100% - 34upx);
			padding: 0 17upx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			.cart_operation_left {
				width: calc(100% - 130upx);
				padding-right: 20upx;
				overflow: hidden;

				.cart_account_list {
					display: flex;
					align-items: center;
					overflow-x: auto;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #67686B;

					.cart_account_item {
						flex-shrink: 0;
						white-space: nowrap;
						padding: 28upx 0;
						margin-right: 70upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
					}
				}

				.cart_account_list::-webkit-scrollbar {
					width: 0px;
					height: 0px;
				}
			}

			.cart_operation_right {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #67686B;
			}
		}

		.cart_warehouse_area {
			width: calc(100% - 48upx);
			height: 84upx;
			padding: 0 24upx;
			border-bottom: 1upx solid #EEEEEE;
			display: flex;
			align-items: center;
			background-color: #ffffff;

			.cart_warehouse_name {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-left: 14upx;
			}
		}

		.cart_list_content {
			margin-top: 20upx;

			.cart_pro_list {
				.cart_list_item {
					.cart_list_item_view {
						width: calc(100% - 39upx);
						// height: 241upx;
						background-color: #FFFFFF;
						padding: 23upx 16upx 22upx 23upx;
						display: flex;
						align-items: flex-start;
						position: relative;

						.nice {
							background: #fff;
							border-color: yellow;
						}

						.bad {}

						.goodsChoose {
							border: 2upx solid #A6A6A6;
							width: 22upx;
							height: 22upx;
							border-radius: 32upx;
							margin-right: 14upx;
							padding: 6upx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.canbuyimage {
							width: 244upx;
							height: 244upx;
							background: linear-gradient(#ffffff, #f8f8f8);
							position: relative;
							margin-right: 10upx;
							border-radius: 10upx;

							.canbuyimageTop {
								width: 110upx;
								height: 20upx;
								position: absolute;
								left: 0;
								top: 0;
								background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
								border-radius: 10upx 0upx 10upx 0upx;
								font-size: 16upx;
								line-height: 20upx;
								padding: 5upx 5upx;
								text-align: center;
								color: #FFFFFF;
								font-weight: normal;
							}

							.product_img {
								width: 244upx;
								height: 244upx;
								border-radius: 10upx;
							}

							.no_product_tips {
								image {
									width: 122px;
									height: 122px;
									opacity: 0.8;
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
								}
							}

						}



						.canBuy {
							overflow: hidden;

							image {
								width: 244upx;
								height: 244upx;
							}
						}

						.nocanBuy {
							width: 244upx;
							height: 244upx;
							margin-right: 10upx;
							position: relative;
							background-color: rgba(0, 0, 0, .2);
							overflow: hidden;

							image {
								width: 122upx;
								height: 122upx;
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
							}
						}


						.special_activity_content {
							width: 178upx;
							overflow: hidden;
							position: absolute;
							top: 190upx;
							left: 75upx;

							.special_activity {
								width: 184upx;
								display: flex;
								align-items: flex-end;

								.special_activity_left {
									width: 77%;
									height: 54upx;
									background: linear-gradient(-56deg, #FF7959, #FF5C36);
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: flex-start;
									transform: skewX(-10deg);
									margin-left: -5upx;
									text-indent: 10upx;
									z-index: 9;
									font-size: 16upx;
									font-family: PingFang SC;
									color: #FFFFFF;

									.activity_left_title {
										display: block;
										font-weight: 400;
									}

									.activity_price {
										display: block;
										margin-top: -8upx;
										font-weight: 300;

										span {
											font-weight: bold;
											font-size: 24upx;
										}
									}
								}

								.special_activity_right {
									width: 100%;
									height: 54upx;
									transform: skewX(-10deg);

									.triangle {
										width: 29upx;
										height: 30upx;
										background: #DE391D;
										position: absolute;
										top: -8upx;
										left: -23upx;
										transform: skewX(32deg);
									}

									.activity_right_title {
										width: 100%;
										height: 35upx;
										background-color: #FF5F3A;
										font-size: 20upx;
										font-family: PingFang SC;
										font-weight: 500;
										color: #FFFFFF;
										line-height: 35upx;
										text-align: center;
										position: absolute;
										top: 23upx;
										left: -2upx;
									}
								}
							}
						}

						.activity_type {
							width: 95upx;
							height: 32upx;
							background: #3D8EFD;
							border-radius: 0upx 0upx 20upx 0upx;
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 32upx;
							text-align: center;
							position: absolute;
							top: 41upx;
							left: 76upx;
						}

						.pro_item_msg {
							width: calc(100% - 303upx);

							h3 {
								width: 390upx;
								height: 66upx;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
								font-size: 30upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #202021;
								margin-top: 8upx;
								line-height: 34upx;
							}

							.packing_content {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #9FA0A5;
								margin-top: 20upx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.pro_item_bottom {
								width: 433upx;
								display: flex;
								margin-top: 36upx;

								.pro_bottom_price {
									display: flex;
									align-items: baseline;
									font-size: 28upx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #FF5000;

									text {
										font-size: 36upx;
									}
								}

								.pro_bottom_price1 {
									display: flex;
									// align-items: baseline;
									margin-left: 1upx;
									margin-top: 6upx;
									font-size: 28upx;
									font-family: PingFang SC;
									font-weight: Medium;
									color: #9FA0A5;

									text {
										text-decoration: line-through;
										font-size: 30upx;
									}
								}
							}
						}
					}
				}
			}


		}

		// 结算
		.cart_pay_area {
			width: calc(100% - 51upx);
			height: 100upx;
			background-color: #FFFFFF;
			padding: 0 24upx 0 27upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.checkAll {
				display: flex;
				align-items: center;
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.allGoodsChoose {
					width: 22upx;
					height: 22upx;
					border-radius: 32upx;
					border: 2upx solid #999999;
					margin-right: 16upx;
					padding: 6upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				text {
					font-size: 24upx;
				}
			}

			.pay_area {
				display: flex;
				align-items: center;

				.pay_area_msg {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.pay_msg_one {
						display: flex;
						align-items: center;

						.count_num {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-right: 10upx;
						}

						.total {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 10upx;
						}

						.total_price {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FF5000;

							text {
								font-family: PingFang SC;
								font-weight: bold;
								font-size: 36upx;
							}
						}
					}

					.pay_msg_one2 {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;

						image {
							width: 32upx;
							height: 32upx;
						}
					}

					.pay_msg_two {
						display: flex;
						align-items: center;

						.discount_num {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;


							text {
								font-size: 24upx;
								color: #FA2D1AFF;
							}
						}

						.discount_detail {
							display: block;
							width: 100upx;
							height: 30upx;
							background-color: #F2F3F4;
							border-radius: 10upx;
							font-size: 18upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 30upx;
							text-align: center;
							margin-left: 19upx;
						}
					}
				}
			}
		}

// 删除
		.cart_pay_area1 {
			width: calc(100% - 51upx);
			height: 100upx;
			background-color: #FFFFFF;
			padding: 0 24upx 0 27upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position:fixed;
			bottom:0;
			margin-bottom:115upx;
			z-index:999;

			.checkAll {
				display: flex;
				align-items: center;
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.allGoodsChoose {
					width: 22upx;
					height: 22upx;
					border-radius: 32upx;
					border: 2upx solid #999999;
					margin-right: 16upx;
					padding: 6upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				text {
					font-size: 24upx;
				}
			}

			.pay_area {
				display: flex;
				align-items: center;

				.pay_area_msg {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.pay_msg_one {
						display: flex;
						align-items: center;

						.count_num {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-right: 10upx;
						}

						.total {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 10upx;
						}

						.total_price {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FF5000;

							text {
								font-family: PingFang SC;
								font-weight: bold;
								font-size: 36upx;
							}
						}
					}

					.pay_msg_one2 {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;

						image {
							width: 32upx;
							height: 32upx;
						}
					}

					.pay_msg_two {
						display: flex;
						align-items: center;

						.discount_num {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;


							text {
								font-size: 24upx;
								color: #FA2D1AFF;
							}
						}

						.discount_detail {
							display: block;
							width: 100upx;
							height: 30upx;
							background-color: #F2F3F4;
							border-radius: 10upx;
							font-size: 18upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 30upx;
							text-align: center;
							margin-left: 19upx;
						}
					}
				}
			}
		}

		// 删除按钮
		.cart_bottom_pay {
			width: calc(100% - 51upx);
			height: 98upx;
			background-color: #FFFFFF;
			box-shadow: 0px 1upx 0px 0px #EEEEEE;
			padding: 0 24upx 0 27upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			z-index: 999;

			.checkAll {
				display: flex;
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.allGoodsChoose {
					width: 22upx;
					height: 22upx;
					border-radius: 32upx;
					border: 2upx solid #999999;
					margin-right: 16upx;
					padding: 6upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.operation_btn {
				display: flex;
				align-items: center;

				.operation_btn_one {
					width: 140upx;
					height: 44upx;
					background: #FFFFFF;
					border: 1px solid #C7C7C7;
					border-radius: 22upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 44upx;
					text-align: center;
					margin-right: 40upx;
				}

				.operation_btn_two {
					width: 96upx;
					height: 44upx;
					background: #FFFFFF;
					border: 1upx solid #e1251b;
					border-radius: 22upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #e1251b;
					line-height: 44upx;
					text-align: center;
				}
			}
		}




		.nothing {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 262upx;

			text {
				width: 426upx;
				height: 69upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #67686B;
				line-height: 42upx;
				text-align: center;
			}

		}

		.discount_popup {
			.discountPopup {
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 15upx 15upx 0 0;
				padding-bottom: 170upx;
				position: relative;

				.discountTitle {
					width: 100%;
					padding: 39upx 0;
					text-align: center;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;

					image {
						width: 30upx;
						height: 30upx;
						position: absolute;
						top: 40upx;
						right: 21upx;
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
