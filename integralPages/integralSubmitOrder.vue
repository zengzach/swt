<template>
	<view class="box">
		<view class="conversion">
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/order_success.png"
				mode=""></image>
			<view class="success">兑换成功</view>
			<view class="btn">
				<view class="btn_back" @click="backIndex">返回</view>
				<view class="btn_look" @click="lookOrder">查看订单</view>
			</view>
		</view>
		<view class="msg">
			<view class="order_detail_address">
				<view class="order_address_one">
					<view class="order_address_name">{{addressMsg.contact}}</view>
					<text class="order_address_phone">{{addressMsg.mobile}}</text>
				</view>
				<view class="order_address_two">
					{{addressMsg.province}} {{addressMsg.city}} {{addressMsg.area}} {{addressMsg.detailAddress}}
				</view>
			</view>
		</view>
		<view class="detail">
			<view class="detail_title">兑换详情</view>
			<view class="detail_cont">
				<view class="confirm_TitleContent">
					<image :src="orderMsg.imgUrl" mode=""></image>
					<view class="" style="margin-left: 19upx;width: 467upx; ">
						<view class="orderInfoText">
							{{orderMsg.goodsTitle}}
						</view>
						<view class="product_price" style="align-items: center;">
							<view class="" style="display: flex;">
								<view class="">
									积分：
								</view>
								<view class="price" style="color: #FB681A;font-size: 36upx;" v-if="orderMsg.promotionPrice == 0">
									{{orderMsg.price}}
								</view>
								<view class="price" style="color: #FB681A;font-size: 36upx;" v-else>
									{{orderMsg.promotionPrice}}
								</view>
							</view>
							<view class="product_num">*{{orderMsg.num}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="detail_conver">合计积分：{{orderdetail.orderAmount}}</view>
		</view>
		<view class="order_msg">
			<view class="order_title">订单信息</view>
			<view class="order_num">订单编号： <view>{{orderdetail.orderCode}}</view>
			</view>
			<view class="order_time">下单时间： <view>{{orderdetail.createTime}}</view>
			</view>
			<view class="order_time">支付时间： <view>{{orderdetail.createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {orderDetail} from '@/api/orderListApi.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				// orderInfo: {},
				integralGoodsId: null,
				integralNum:null,
				addressId: null,
				orderdetail:{},
				addressMsg:{},
				orderMsg:{},
				orderCode:''
			}
		},
		onLoad(opt) {
			this.integralGoodsId = opt.integralId
			this.integralNum = opt.integralNum
			this.addressId = opt.addressId
			this.orderCode = opt.orderCode
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				orderDetail({
					orderCode:this.orderCode
				}).then(res => {
					if (res.success) {
						if (res.data.createTime) {
							res.data.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
						}
						this.orderdetail = res.data
						this.addressMsg = res.data.orderAddressDto
						this.orderMsg = res.data.orderItemBasicsDto[0]
					}
				})
			},
			backIndex(){
				uni.switchTab({
					url: '/pages/integral/integral'
				})
			},
			lookOrder(){
				uni.redirectTo({
					url: '/personalPage/orderPage'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		.conversion {
			width: 750upx;
			height: 133upx;
			text-align: center;
			padding-bottom: 60upx;

			image {
				width: 56upx;
				height: 56upx;
				margin-top: 41upx;
				margin-bottom: 10upx;
			}

			.success {
				font-size: 32upx;
				color: #FB681A;
			}
			.btn{
				width: 350upx;
				height:60upx;
				margin: 20upx auto 20upx;
				font-size:26upx;
				display:flex;
				justify-content:space-between;
				.btn_back{
					width:160upx;
					height:47upx;
					border-radius: 35upx;
					background:#fff;
					color:#333;
					line-height:48upx;
					border:1px solid #333;
				}
				.btn_look{
					width:160upx;
					height:50upx;
					border-radius: 35upx;
					background:#FB681A;
					color:#fff;
					line-height:50upx;
				}
			}
		}

		.msg {
			width: 700upx;
			height: 173upx;
			border-radius: 15upx;
			background: #fff;
			margin: 70upx auto 0;
			.order_detail_address {
				width: calc(100% - 70upx);
				height: 74upx;
				padding: 26upx 0 40upx 22upx;
				background-color: #FFFFFF;
				border-radius: 15upx;
				margin: 22upx 24upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			
				.order_address_one {
					display: flex;
					align-items: center;
					margin-bottom: 10upx;
			
					.order_address_phone {
						color: #999999;
						margin: 0 16upx;
					}
			
					.order_address_type {
						width: 70upx;
						height: 30upx;
						background: linear-gradient(90deg, #FFEBEA, #FFD0CD);
						border-radius: 15upx 15upx 15upx 0px;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 30upx;
						text-align: center;
					}
				}
			
				.order_address_two {
					font-size: 28upx;
				}
			}
		}

		.detail {
			width: 700upx;
			height: 392upx;
			border-radius: 15upx;
			background: #fff;
			margin: 23upx auto 0;

			.detail_title {
				width: 642upx;
				line-height: 80upx;
				font-size: 28upx;
				font-weight: bold;
				border-bottom: 1px solid #eee;
				margin: 0 auto;
			}

			.confirm_TitleContent {
				display: flex;
				margin-top: 30upx;
				padding-bottom:20upx;
				width: 642upx;
				margin-left:24upx;
				border-bottom: 1px solid #eee;
			
				image {
					width: 150upx;
					height: 150upx;
				}
			
				.orderInfoText {
					width: 467upx;
					height: 68upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 34upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			
				.product_price {
					width: 467upx;
					margin-top: 38upx;
					display: flex;
					justify-content: space-between;
					align-items: baseline;
			
					.price {
						display: flex;
						align-items: baseline;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
			
						view {
							font-size: 30upx;
						}
					}
					.product_num{
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
			
					.original_price {
						font-size: 20upx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						text-decoration: line-through;
						color: #999999;
						margin-left: 10upx;
					}
				}
			}

			.detail_conver {
				width: 642upx;
				line-height: 50upx;
				margin-top: 20upx;
				text-align: right;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}

		.order_msg {
			width: 700upx;
			// height: 270upx;
			border-radius: 15upx;
			background: #fff;
			margin: 23upx auto 0;

			.order_title {
				width: 642upx;
				line-height: 80upx;
				font-size: 28upx;
				font-weight: bold;
				border-bottom: 1px solid #eee;
				margin: 0 auto;
			}

			.order_num {
				width: 642upx;
				line-height: 80upx;
				font-size: 28upx;
				margin: 0 auto;
				color: #666;
				position:relative;

				view {
					color: #000;
					position:absolute;
					left: 135upx;
					top:0;
				}
			}

			.order_time {
				width: 642upx;
				line-height: 80upx;
				font-size: 28upx;
				margin: 0 auto;
				color: #666;
				position:relative;

				view {
					color: #000;
					position:absolute;
					left:135upx;
					top:0upx;
				}
			}
		}
	}
</style>
