<template>
	<view class="goods_msg_area">

		<view class="pro_list_item_left">
			<image v-if="goods.goodsPictureUrl" :src="goods.goodsPictureUrl" mode="" @click="goGoodsDetail(goods,goods.integralBaseId)">
			</image>
			<image v-else-if="goods.pictureUrl" :src="goods.pictureUrl" mode="" @click="goGoodsDetail(goods,goods.integralBaseId)">
			</image>
			<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg" mode=""
				@click="goGoodsDetail(goods,goods.integralBaseId)"></image>
				
			<view class="canbuyimageBottom" v-if="goods.goodsPrice.promotionStatus == 20">
				距结束
				{{goods.countdown}}
			</view>
			<view class="canbuyimageBottom" v-if="goods.goodsPrice.promotionStatus == 10">
				距开始
				{{goods.countdown1}}
			</view>
		</view>
		<view class="pro_item_msg">
			<view class="goodsListTitle" @click="goGoodsDetail(goods,goods.integralBaseId)">
				{{goods.goodsTitle}}
			</view>
			<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-if="goods.integralBaseId">
				<view class="units">品牌：{{goods.brandName}}</view>
				<view class="units">货号：{{goods.artNo}}</view>
			</view>
			<view class="packing_content" @click="goGoodsDetail(goods,goods.integralBaseId)" v-else>
				<view class="units">品牌：{{goods.brandName}}</view>
				<view class="units">货号：{{goods.artNo}}</view>
				<view class="units">规格：{{goods.packDesc?goods.packDesc:'暂无规格'}}</view>
				<view class="units" v-if="!goods.isReserve">库存：{{goods.stock}}{{goods.saleUnitName}}</view>
				<view class="units" v-if="goods.stock<=0&&goods.isReserve">库存：可预订</view>
			</view>
			<view class="packing_content" v-if="goods.goodsPrice.promotionStatus == 20||goods.goodsPrice.promotionStatus == 10" @click="goGoodsDetail(goods,goods.integralBaseId)">
				已抢：<span style='color: #FF9553;' v-if="goods.integralBaseId">{{goods.buyNum }} </span>
				<span style='color: #FF9553;' v-else>{{goods.goodsPrice.promotionBuyNum }} </span>件
			</view>
			<view class="integralUnit" v-if="!goods.integralBaseId&&goods.isBonusIntegral&&goods.goodsPrice.price">
				积
			</view>
			<view class="integralUnit2" v-if="goods.isUseCoupon&&goods.goodsPrice.price">
				券
			</view>
			<view class="pro_item_bottom">
				<view class="priceContent" @click="goGoodsDetail(goods,goods.integralBaseId)">
					<view class="priceNumber1" v-if="goods.integralBaseId&&(goods.goodsPrice.promotionStatus == 20||goods.goodsPrice.promotionStatus == 10)" >
						<span>积分:{{goods.goodsPrice.promotionPrice | addZero}}</span>
						<span class="priceNumber1_span">{{goods.integralPrice | addZero}}</span>
					</view>
					<view class="priceNumber2" v-else>
						<span v-if="goods.goodsPrice.promotionStatus == 20||goods.goodsPrice.promotionStatus == 10">
							￥{{goods.goodsPrice.promotionPrice | addZero}}
						</span>
						<span v-else>
							<span v-if="goods.goodsPrice.price">￥{{goods.goodsPrice.price | addZero }}</span>
						</span> 
						<!-- 划线价 -->
						<span class="priceNumber2_span" 
							v-if="goods.goodsPrice.promotionStatus == 20||goods.goodsPrice.promotionStatus == 10">
							￥{{goods.goodsPrice.marketPrice | addZero}}
						</span>
					</view>
				</view>
				<view class="goShopping" v-if="goods.isCanBuy&&goods.goodsPrice.price" :style="{ background: background }" @click="addCar1(goods)">去购买</view>
				<view class="goShopping" v-if="goods.goodsPrice.price==0" :style="{ background: background }" @click="toInquiry(goods)">去询价</view>
				<view class="nogoShopping"  v-if="!goods.isCanBuy&&goods.goodsPrice.price"> 去购买 </view>
			</view>
		</view>
		<uni-popup class="add_popup" ref="addCartPopup" :mask-click="false">
			<view class="addCartPopup">
				<view class="addCartTitle">
					<view>加入购物车</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="closeCartPopup"></image>
				</view>
				<view class="addCartMsg">
					<view class="productMsg">
						<image v-if="addCartMsg.goodsPictureUrl" :src="addCartMsg.goodsPictureUrl" mode="widthFix">
						</image>
						<image v-else
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
							mode="widthFix"></image>
						<view class="productMsgRight">
							<view class="productMsgTitle">{{addCartMsg.goodsTitle}}</view>
							<view class="productMsgPrice"> 
								<span>￥</span>
								<span v-if="addCartMsg.goodsPrice.promotionStatus == 20">{{addCartMsg.goodsPrice.promotionPrice}}</span>
								<span v-else>{{addCartMsg.goodsPrice.price}}</span>
							</view>
						</view>
					</view>
					<view class="productBasicMsg">
						<view>
							<view class="basicValue">{{addCartMsg.artNo}}</view>
							<view class="basicTitle">货号</view>
						</view>
						<view>
							<view class="basicValue">{{addCartMsg.brandName}}</view>
							<view class="basicTitle">品牌</view>
						</view>
						<view>
							<view class="basicValue">
								{{addCartMsg.specification==''||addCartMsg.specification==null?'暂无产品规格':addCartMsg.specification}}
							</view>
							<view class="basicTitle">规格</view>
						</view>
					</view>
					<view class="productSellMsg">
						<view>
							<view>产品单位：</view>
							<view>{{addCartMsg.goodsUnit}}</view>
						</view>
						<view>
							<view>仓  库：</view>
							<view>{{addCartMsg.warehouseName}}</view>
						</view>
						<view>
							<view>包装规格：</view>
							<view>{{addCartMsg.packDesc}}</view>
						</view>
					</view>
					<view class="addCartNum">
						<view class="addCartMsgItemLable">数量</view>
						<view class="pro_bottom_addNum">
							<uni-number-box v-model="addCartMsg.buyNum" :min="addCartMsg.minOrderBuy"
								:max="addCartMsg.isReserve?addCartMsg.maxOrderBuy:addCartMsg.stock"
								@blur="blur($event)">
							</uni-number-box>
						</view>
					</view>
					<view class="tips">
						<view class="stock_tips" v-if="addCartMsg.isReserve">库存不足时可预订，预计15天交货</view>
					</view>
					<view class="deliveryPrompt"
						v-if="addCartMsg.goodsStock.isReserve && addCartMsg.goodsStock.orderAvailableStock <= 0 && addCartMsg.isCanBuy">
						<view class="deliveryPromptTips">
							<image
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/delivery_prompt.png"
								mode="widthFix"></image>
						</view>
						<view>库存不足时可预订，预计15天交货</view>
					</view>
				</view>
				<view :style="{ background: background }" :class="addCartMsg.status == 10 ?  addCartMsg.isCanBuy ? 'addCartBtn' :  'noAddCart' : ''">
					<text :style="{ color: color }" :class="addCartMsg.status == 10 ?  addCartMsg.isCanBuy ? 'cancel' :  'cancel1' : ''"
						@click="addGoodsToCart">加入购物车</text>
					<text :class="addCartMsg.status == 10 ?  addCartMsg.isCanBuy ? 'on' :  'on1' : ''"
						@click="closeCartPopupBtn">
						立即购买
					</text>
				</view>
				<!-- background: #CFD0D2; -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import '@/static/LHT/goodsMsg.css'
	// import addCart from './addCart/addCart.vue'
	import {
		AddCartGoods
	} from '@/api/cartApi.js'
	import {
		settleBuyNow
	} from '@/api/goodsDetailApi.js'
	import {
		toast,
		getRouter,
	} from '@/utils/utils.js'
	export default {
		name: "goodsMsg",
		// components: {
		// 	addCart
		// },
		props: {
			goods: {},
			formPage: null,
			flag: null,
			fromPage: null,
				background:'',
				color:''
		},
		data() {
			return {
				addCartMsg: {},
				flage: false,	
			};
		},
		onLoad() {
			getRouter();
		},
		filters: {
		    addZero:function(data){
				if(!data&&data!=0){
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
			//跳转到详情页面
			goGoodsDetail(id,bool) {
				// console.log(id,'id')
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
						isUseCoupon:true
					}
					var price = this.addCartMsg.price
					settleBuyNow(params).then(res => {
						if (res.success) {
							uni.removeStorageSync('Flage')
							uni.removeStorageSync('wxFlage')
							var oldCouponId=null
							if(res.data.useCouponList!=null&&res.data.useCouponList.length){
								oldCouponId = res.data.useCouponList[0].customerCouponId
							}
							uni.navigateTo({
								url: '/personalPage/orderPages/confirmOrder?goodsId=' + params.goodsId +
									'&num=' + params.num + '&price=' + JSON.stringify(price) +
									'&wareHouseIds=' + this.addCartMsg.warehouseId + "&goodsList=1"
									+'&oldCouponId=' + oldCouponId+'&checkCart=true'
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
			// 询价
			toInquiry(item){
				// console.log(item,"---------------")
				var token = uni.getStorageSync('token')
				if(token){
					uni.navigateTo({
						url:"/goodsDetail/inquiryPage/inquiry?goodsId="+item.goodsPrice.goodsId
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '未登录不能进行询价，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
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
						.productMsgPrice{
							
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
		justify-content: space-between;
		margin-bottom: 24upx;
		overflow: hidden;

		.pro_list_item_left {
			width: 244upx;
			height: 244upx;
			margin-right: 20upx;
			position: relative;
			
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
				margin-bottom: 15upx;
			}

			.packing_content {
				width: 390upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9FA0A5;
				white-space: nowrap;

				.units{
					width: 100%;
					line-height: 40upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
					border-radius: 5upx;
					line-height: 32upx;
					text-align: center;
					margin-right: 20upx;
				}
			}

			.integralUnit {
				width:38upx;
				height: 38upx;
				background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/integralLogo.png');
				background-size:100% 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 38rpx;
				text-align: center;
				margin-top: 30upx;
				margin-right: 10upx;
				display:inline-block;
			}
			.integralUnit2 {
				width:38upx;
				height: 38upx;
				background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/couponLogo.png');
				background-size:100% 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 38rpx;
				text-align: center;
				margin-top: 30upx;
				display:inline-block;
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
						.priceNumber1_span{
							text-decoration: line-through;
							font-size: 24upx;
							color: #9FA0A5;
							font-weight: normal;
							margin-left: 20upx;
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
						.priceNumber2_span{
							text-decoration: line-through;
							font-size: 24upx;
							color: #9FA0A5;
							font-weight: normal;
							margin-left: 20upx;
						}
					}
				}
				
			}
		}
	}
</style>
