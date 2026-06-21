<template>
	<view>
		<view class="goods_msg_area" v-for="item in goods1" :key="item.giftId">
		
			<view class="pro_list_item_left" >
				<image v-if="item.imgUrl" :src="item.imgUrl" mode="" @click="goGoodsDetail(goods,goods.integralBaseId)">
				</image>
				<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg" mode=""
					@click="goGoodsDetail(goods,goods.integralBaseId)"></image>
			</view>
			<view class="pro_item_msg">
				<view class="goodsListTitle" @click="goGoodsDetail(goods,goods.integralBaseId)">
					{{item.goodsTitle}}
				</view>
				<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-if="item.customerGoodsGiftStatus == 1">
					有效期至:{{item.endDate}}
				</view>
				<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-else>
					领取时间:{{item.receiveTime }}
				</view>
				<view class="pro_item_bottom">
					<view class="priceContent" @click="goGoodsDetail(goods,goods.integralBaseId)">
				
						<view class="priceNumber2">
							<span>￥</span>
							<span>{{item.price | addZero}}</span>
						</view>
						
						<!-- <view class="priceNumber">
							<span>￥</span>
							{{goods.goodsPrice.price}}
						</view> -->
					</view>
					<!-- <view class="goShopping" v-if="goods.status==10&&!goods.isReserve&&goods.stock>0" @click="addCar1(goods)">去购买</view> -->
					<!-- <view class="goShopping" :style="{ background: background }" @click="addCar1(goods)">立即领取</view> -->
					<view class="nogoShopping" style="background: linear-gradient(90deg, #5A75FF 0%, #4C4DFF 100%)
	;" v-if="item.customerGoodsGiftStatus == 1" @click="goDetail(item.goodsId)">
						立即领取
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;text-align: center;font-size: 26upx;color: #999999;">
			--以下为已领取或已过期的赠品--
		</view>
		<view class="goods_msg_area" v-for="item in goods2" :key="item.giftId">
			
				<view class="pro_list_item_left" >
					<image v-if="item.imgUrl" :src="item.imgUrl" mode="" @click="goGoodsDetail(goods,goods.integralBaseId)">
					</image>
					<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg" mode=""
						@click="goGoodsDetail(goods,goods.integralBaseId)"></image>
				</view>
				<view class="pro_item_msg">
					<view class="goodsListTitle" @click="goGoodsDetail(goods,goods.integralBaseId)">
						{{item.goodsTitle}}
					</view>
					<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-if="item.customerGoodsGiftStatus == 1">
						有效期至:{{item.endDate}}
					</view>
					<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-else>
						领取时间:{{item.receiveTime }}
					</view>
					<view class="pro_item_bottom">
						<view class="priceContent" @click="goGoodsDetail(goods,goods.integralBaseId)">					
							<view class="priceNumber2">
								<span>￥</span>
								<span>{{item.price | addZero}}</span>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
	
</template>

<script>
	import '@/static/LHT/goodsMsg.css'
	import {
		AddCartGoods
	} from '@/api/cartApi.js'
	import {
		getCustmoerGoodsGift
	} from '@/api/personalApi.js'
	import {
		queryGoodsListByParam,
		getGoodsSearchFilter
	} from '@/api/goodsList.js'
	import {
		settleBuyNow
	} from '@/api/goodsDetailApi.js'
	import moment from 'moment';
	import {
		toast,
		getRouter,
	} from '@/utils/utils.js'
	export default {
		name: "goodsMsg",
		data() {
			return {
				addCartMsg: {},
				flage: false,	
				goods:[],
				goods1:[],
				goods2:[]
			};
		},
		onLoad() {
			getRouter();
			this.getGiftListData()
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
			blur(e) {
				// console.log(e,'eeee');
				if (e.detail.value == "") {
					e.detail.value = this.addCartMsg.minOrderBuy
				}
			},
			goDetail(goodsId) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + goodsId+'&goodsType='+20
				})
			},
			// 获取未领取赠品列表
			getGiftListData() {
				getCustmoerGoodsGift().then(res => {
					res.data.forEach(item => {
						item.receiveTime = moment(item.receiveTime).format('YYYY.MM.DD HH:mm:ss')
						if(item.customerGoodsGiftStatus == 1){
							this.goods1.push(item)
						}else{
							this.goods2.push(item)
						}
					})
					this.goods = res.data
				})
			},
			//跳转到详情页面
			goGoodsDetail(id,bool) {
				console.log(id,'id')
				if(!id.goodsId){
					id.goodsId = id.id
				}
				if(bool){
					uni.navigateTo({
						url: '/integralPages/integralDetail?integralId=' + id.integralBaseId
					})
				}else{
					uni.navigateTo({
						url: '/goodsDetail/goodsDetail?goodsId=' + id.goodsId
					})
				}
				
			},
			addGoodsToCart() {
				var token = uni.getStorageSync("token")
				var userName = uni.getStorageSync("userName")
				if (token && userName) {
					this.flage = true
				} else {
					this.flage = false
				}
				if (this.flage) {
					var options = {
						goodsId: this.addCartMsg.id ?this.addCartMsg.id: this.addCartMsg.goodsId,
						// goodsId: this.addCartMsg.id,
						num: this.addCartMsg.buyNum,
					}
					AddCartGoods(options).then(res => {
						if (res.success) {
							this.closeCartPopup()
							toast({
								title: '加入购物车' + res.msg
							})
						}
					})
				}
			},
			closeCartPopupBtn() {
				var token = uni.getStorageSync("token")
				var userName = uni.getStorageSync("userName")
				if (token && userName) {
					this.flage = true
				} else {
					this.flage = false
				}
				if (this.flage) {
					var params = {
						goodsId: this.addCartMsg.id ?this.addCartMsg.id: this.addCartMsg.goodsId,
						num: this.addCartMsg.buyNum,
					}
					var price = this.addCartMsg.price
					settleBuyNow(params).then(res => {
						if (res.success) {
							// console.log(res.data, 'res===');
							uni.navigateTo({
								url: '/pages/cart/confirmOrder?goodsId=' + params.goodsId +
									'&num=' + params.num + '&price=' + JSON.stringify(price) +
									'&wareHouseIds=' + this.addCartMsg.warehouseId + "&goodsList=1"
							})
						}
					})
				}
			},
			addCar1(goods) {
				var token = uni.getStorageSync('token')
				if (token) {
					this.addCartMsg = goods
					// console.log(this.addCartMsg,'this.addCartMsg')
					this.addCartMsg.buyNum = this.addCartMsg.minOrderBuy
					this.$refs.addCartPopup.open('bottom')
				} else {
					uni.showModal({
						title: '提示',
						content: '未登录不能去购买，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					})
				}
			},
			closeCartPopup() {
				this.$refs.addCartPopup.close()
			},
			getData() {
				this.$emit("getData");
			},
			getPic(goods) {
				return 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_popup {
		.addCartPopup {
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 15upx 15upx 0 0;
			padding-bottom: 44upx;
			position: relative;

			.addCartTitle {
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

			.addCartMsg {
				width: calc(100% - 48upx);
				padding: 0 24upx;

				.productMsg {
					width: 100%;
					display: flex;

					image {
						width: 150upx;
						height: 150upx;
						border-radius: 5upx;
						margin-right: 22upx;
					}

					.productMsgRight {
						width: calc(100% - 172upx);
						height: 150upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.productMsgTitle {
							width: 100%;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 32upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				}

				.productBasicMsg {
					width: 100%;
					height: 118upx;
					background: #F8F8F8;
					border-radius: 10upx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-top: 26upx;

					view {
						text-align: center;
					}

					.basicValue {
						width: 100upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 36upx;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:1; 
					}

					.basicTitle {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						line-height: 34upx;
						
					}
				}

				.productSellMsg {
					width: 100%;
					padding: 27upx 0 19upx;
					margin: 31upx 0 30upx;
					border: 1upx solid #EEEEEE;
					border-right: 0upx;
					border-left: 0upx;

					view {
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 48upx;
					}
				}

				.addCartNum {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;

					.addCartMsgItemLable {
						margin-top: 6upx;
					}

					.pro_bottom_addNum {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 46upx;
						text-align: center;
					}
				}

				.tips {
					width: 100%;
					margin-top: 20upx;
					border-top: 1px solid #EEEEEE;
					;

					.stock_tips {
						min-width: 390upx;
						max-width: 467upx;
						height: 40upx;
						margin-left: 29upx;
						margin-top: 30upx;
						background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
						background-size: cover;
						text-indent: 55upx;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 40upx;
					}
				}


				.deliveryPrompt {
					width: 100%;
					height: 50upx;
					background: linear-gradient(to right, #FFCDCA, #FFFFFF);
					border-radius: 25upx;
					margin-top: 9upx;
					display: flex;
					align-items: center;

					.deliveryPromptTips {
						width: 60upx;
						height: 48upx;
						background: #FDF3F2;
						border: 1upx solid #FFCDCA;
						border-radius: 25upx 0upx 25upx 25upx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 34upx;
							height: 34upx;
						}
					}

					view {
						text-indent: 23upx;
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #08AE63;
					}
				}
			}


		}
	}



	.goods_msg_area {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 24upx;
		overflow: hidden;
		padding: 20upx;

		.pro_list_item_left {
			width: 244upx;
			height: 244upx;
			margin-right: 20upx;

			.canbuyimageTop {
				width: 120upx;
				height: 20upx;
				position: absolute;
				left: 0;
				top: 5;
				background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
				border-radius: 12upx 0upx 12upx 0upx;
				font-size: 20upx;
				line-height: 20upx;
				padding: 10upx 10upx;
				color: #FFFFFF;
				font-weight: normal;
			}

			.canbuyimageBottom {
				width: 228.5upx;
				height: 40upx;
				position: absolute;
				left: 0;
				bottom: 0;
				background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
				border-radius: 0upx 0upx 10upx 10upx;
				font-size: 20upx;
				line-height: 40upx;
				padding: 0upx 8upx;
				color: #FFFFFF;
				font-weight: normal;
			}


			image {
				width: 244upx;
				height: 244upx;
				border-radius: 12upx;
				background-color: #F8F8F8;
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

			.packing_content {
				width: 370upx;
				height: 25upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9FA0A5;
				line-height: 25upx;
				margin: 15upx 0 10upx;
				white-space: nowrap;

				view {
					width: 140upx;
					text-align: center;
				}
			}

			.activity_content {
				display: flex;
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;

				.activity_one {
					display: block;
					height: 32upx;
					padding: 0 10upx;
					background: #FFFFFF;
					// border: 1upx solid $uni-prolist-color-special;
					border-radius: 5upx;
					// color:$uni-prolist-color-special ;
					line-height: 32upx;
					text-align: center;
					margin-right: 20upx;
				}
			}

			.integralUnit {
				width: 90upx;
				font-size: 18upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF6D15;
				line-height: 30upx;
				border: 1px solid #FF6D15;
				border-radius: 8upx;
				padding: 0 5upx;
				margin-top: 40upx;
			}

			.pro_item_bottom {
				width: 433upx;
				display: flex;
				justify-content: space-between;

				.priceContent {
					margin-top: 10upx;

					.priceTime {
						width: 110upx;
						height: 30upx;
						font-size: 18upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF6D15;
						line-height: 30upx;
						border: 2upx solid #FF6D15;
						text-align: center;
					}

					.priceNumber1 {
						width: 500upx;
						height: 26upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF5000;
						margin-top: 10upx;

						span {
							font-size: 24upx;
						}
						
					}
					.priceNumber2 {
						width: 77upx;
						height: 26upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF5000;
						margin-top: 10upx;
					
						span {
							font-size: 24upx;
						}
						
					}
				}

				// .goShopping {
				// 	width: 128upx;
				// 	margin-top: 20upx;
				// 	height: 50upx;
				// 	background: linear-gradient(-70deg, #0D986A, #08AE63);
				// 	border-radius: 25upx;
				// 	font-size: 24upx;
				// 	font-family: PingFang SC;
				// 	font-weight: 500;
				// 	color: #FFFFFF;
				// 	line-height: 50upx;
				// 	margin-left: 165upx;
				// }
			}
		}
	}
</style>
