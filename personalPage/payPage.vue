<template>
	<view class="orderDetail" style="padding-bottom: 100upx;padding-top: 40upx;">
		<view class="orderGoodsPrice" style="margin: 100upx auto;text-align: center;">
			<view style="color: red;font-size: 40upx;">
				￥{{paymentOrder.amountPayable}}
			</view>
			<view class="">
				待支付金额
			</view>

		</view>

		<view class="orderDto">
			<view class="" style="height: 40upx;">
			</view>
			<view class="orderDtoCode">
				<view class="">
					订单编号:
				</view>
				<view class="orderDtoCodeNumber">
					{{orderData.orderCode}}
				</view>
			</view>
			<view class="orderDtoCode">
				<view class="">
					支付方式:
				</view>
				<view class="">
					{{orderData.payStr}}
				</view>
			</view>
			<view class="orderDtoCode">
				<view class="">
					商品金额:
				</view>
				<view class="orderGoodsMoney">
					<span>￥</span>{{orderData.orderAmount ?orderData.orderAmount:0}}
				</view>
			</view>
			<view class="orderDtoCode">
				<view class="">
					运费:
				</view>
				<view class="orderGoodsMoney">
					<span>￥</span>{{orderData.freight ? orderData.freight:0}}
				</view>
			</view>
			<view class="orderGoodsPriceTitle">
				<view class="orderDtoCode">
					<view class="orderGoodsPriceTitle">
						订单金额
					</view>
					<view class="orderGoodsMoney">
						<span>￥</span>{{orderData.orderAmount ? orderData.orderAmount:0}}
					</view>
				</view>
				<view class="">
					<view class=""
						style="width:calc(100% - 60upx);background: #F8F8F8;border-radius: 10px;margin:40upx auto;height: 300upx;padding: 30upx 0; ">
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-left: 30upx;">
								实付金额：
							</view>
							<view class="" style="padding-right: 30upx;">
								+￥{{orderData.paidAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								实付退款金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								-￥{{orderData.actualRefundAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								待付金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								￥{{orderData.waitAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								待付退款金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								-￥{{orderData.waitRefundAmount}}
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>

		<view class="payPage">

			<view class="transContent">
				<view style="margin:20upx 30upx;">
					线下汇款账号
				</view>
				<view class="transferMassage" style="width:calc(100% - 60upx);background: #F8F8F8;border-radius: 10px;margin:40upx auto;">

					<view class="transferMassageOne">
						<view class="transferMassageTitle">开户银行 :</view>
						<view class="transferMassageName">{{bankMsg.dueBank}}</view>
					</view>
					<view class="transferMassageOne">
						<view class="transferMassageTitle">开户名称 :</view>
						<view class="transferMassageName">{{info.orderTransferInformation.openingBank}}</view>
					</view>
					<view class="transferMassageOne">
						<view class="transferMassageTitle">银行账号 :</view>
						<view class="transferMassageName">{{info.orderTransferInformation.shroffAccountNumber}}</view>
					</view>
					<view class="transferMassageOne">
						<view class="transferMassageTitle">公司名称 :</view>
						<view class="transferMassageName">{{info.orderTransferInformation.collectingCompany}}</view>
					</view>
					<view class="place_order_two_tips" style="margin: 40upx auto;">
						<view class="image"></view>
						<view class="place_order_two_top">
							<view>请按照此汇款信息转账，确保您的转账金额与
								订单金额一致，否则将会影响订单的进度。</view>

						</view>
					</view>
				</view>

			</view>


		</view>
		<!-- <view v-if="flag" class="payClickMassage" @click.stop="close">
			<view class="ClickMassageCenter" >
				<view class="CenterTop">
					线下转账信息
				</view>
				<view class="CenterContent">
					<view class="CenterContentOne">
						<view class="CenterContentTitle">用户名</view>
						<view class="CenterContentName">{{bankMsg.collectingCompany}}</view>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		orderDetail,
		orderPayment,
		getPaymentOrderDetail,
	} from '@/api/orderListApi.js'
	import {
		selectBankList
	} from '@/api/personal.js'
	export default {
		data() {
			return {
				orderParam: {
					orderCode: null,
					remark: ''
				},
				flag: false,
				orderCode: '',
				info: {},
				bankMsg: {},
				orderId: '',
				paymentOrder: {},
				orderData: {}
			}
		},
		onLoad(option) {
			this.orderParam.orderCode = option.orderCode
			this.orderCode = option.orderCode
			this.orderId = option.orderId
			this.getPayInfo()
			this.getBankData()
			this.getOrderDetail()
			this.getPaymentOrderDetail()
		},
		methods: {
			// payClick() {
			// 	this.flag = true
			// },
			// close() {
			// 	this.flag = false
			// },
			getPayInfo() {
				orderPayment(this.orderCode).then(res => {
					if (res.success) {
						this.info = res.data
					}
				})
			},
			getOrderDetail() {
				orderDetail(this.orderParam).then(res => {
					if (res.code == '0') {
						this.orderData = res.data
					}

				})

			},
			getPaymentOrderDetail() {
				getPaymentOrderDetail(this.orderId).then(res => {
					if (res.success) {
						this.paymentOrderList = res.data.paymentOrderList;
						this.paymentOrder = res.data;
						if (res.data.paymentOrderList) {
							res.data.paymentOrderList.forEach(item => {
								item.payDate = moment(item.payDate).format(
									'YYYY.MM.DD HH:mm:ss')
							})
						}
					}
				})
			},
			getBankData() {
				selectBankList().then(res => {
					this.bankMsg = res.data[0]
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url('@/static/LHT/placeOrder.css');

	.orderDetail {
		width: 100%;
		margin-bottom: 200upx !important;

		.orderAddressDto {
			width: calc(100% - 60upx);
			margin: 50upx auto 0;
			min-height: 154upx;
			background: #fff;
			border-radius: 15upx;
			padding-bottom: 30upx;

			.orderAddressFlex {
				display: flex;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 31upx;
			}

			.orderAddressDetail {
				width: 600upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 31upx;
				margin-top: 20upx;
			}

			.orderAddressNumber {
				margin-top: 41upx;
				margin-left: 22upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #929396;

			}
		}

		.orderGoodsDto {
			width: calc(100% - 60upx);
			// height: 714upx;
			background: #FFFFFF;
			border-radius: 20upx;
			margin: 20upx auto 0;

			.orderGoodsDtoImg {
				display: flex;
				margin-top: 20upx;
				margin: 20upx 0;
				position: relative;

				.sampleLogo {
					position: absolute;
					width: 172upx;
					height: 103upx;
					top: 44upx;
					right: 31upx;
				}

				image {
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
				}

				.goodsTitle {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
				}

				.goodsBrand {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
					padding-top: 15upx;
				}

				.return_Num {
					float: right;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
					// margin-top:10upx;
					margin-right: 10upx;
				}

				.goods_Price {
					margin-top: 30upx;
					display: flex;
					justify-content: space-between;

					view:first-child {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #F33C0A;
					}

					view:last-child {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
					}
				}

			}

			.orderGoodsPrice {
				width: calc(100% - 60upx);
				margin: 50upx auto 0;

				.orderGoodsPriceFlex {
					height: 100upx;
					line-height: 100upx;
					display: flex;
					justify-content: space-between;

					.orderGoodsPriceTitle {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
					}

					.orderGoodsMoney {
						font-size: 34upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;

						span {
							font-size: 24upx;

							font-family: PingFang;
							font-weight: bold;
						}
					}

					.orderGoodsMoneyRed {
						font-size: 34upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #F33C0A;

						span {
							font-size: 24upx;

							font-family: PingFang;
							font-weight: bold;
						}
					}
				}
			}
		}

		.orderDto {
			height: 100%;
			width: calc(100% - 60upx);
			background: #FFFFFF;
			border-radius: 20upx;
			margin: 20upx auto 0;
			padding-bottom: 40upx;

			.orderDtoCode {
				width: calc(100% - 60upx);
				display: flex;
				// height: 75upx;
				line-height: 75upx;
				justify-content: space-between;
				margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;


				.orderDtoCodeNumber {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}

				.orderDtoCodeText {
					margin-top: 10upx;
					width: 400upx;
					line-height: 50upx;
					white-space: normal;
					word-break: break-all;
					text-align: right;
				}
			}

			.orderDtoCodeList {
				width: calc(100% - 60upx) !important;
				margin: 20upx auto;
				line-height: 50upx;
				justify-content: space-between;
				// margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;

				.orderDtoCodeTextList {
					word-wrap: break-word
				}
			}
		}

		.payStatus {
			width: calc(100% - 60upx);
			margin: 20upx auto 0;
			border-radius: 20upx;
			background-color: #fff;

			.payStatusFlex {
				display: flex;
				justify-content: space-between;
			}
		}

		.payStatus1 {
			width: calc(100% - 60upx);
			margin: 0 auto;
			border-radius: 20upx;
			background-color: #fff;

			.payStatusFlex {
				display: flex;
				justify-content: space-between;

				.right {
					display: block;
					width: 26upx;
					height: 26upx;
					margin-top: 14upx;
				}

			}
		}

		.bottom {
			width: 100%;
			height: 98upx;
			background-color: #fff !important;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: flex-end;
			z-index: 999999;

			.bottomBtn {
				width: 600upx;
				display: flex;
				justify-content: flex-end;
				margin-right: 30upx;
			}

			.bottomBtn .view {
				margin-top: 19upx;
				margin-left: 20upx;
				width: 164upx;
				height: 60upx;
				border: 1upx solid #929396;
				border-radius: 30upx;
				text-align: center;
				line-height: 60upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}


		.mark {
			width: 750upx;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(0, 0, 0, .4);

			.small {
				width: 420upx;
				height: 200upx;
				background: #fff;
				border-radius: 10upx;

				.title {
					font-size: 32upx;
					color: #333;
					width: 100%;
					text-align: center;
					line-height: 120upx;
				}

				.sure {
					width: 240upx;
					height: 40upx;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;

					.yes {
						width: 105upx;
						height: 40upx;
						border: 1px solid #eee;
						border-radius: 10upx;
						text-align: center;
						line-height: 40upx;
					}

					.no {
						width: 105upx;
						height: 40upx;
						border: 1px solid #eee;
						border-radius: 10upx;
						text-align: center;
						line-height: 40upx;
					}
				}
			}
		}

	}

	.payPage {

		width: 100%;



		.transContent {

			width: calc(100% - 60upx);
			margin: 30upx auto;
			border-radius: 20upx;
			height: 100vh;
			padding: 20upx 0 0 0;
			background: #fff;

			.transferTitle {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
				margin-left: 30upx;
				margin-top: 40upx;
			}

			.transferMassage {
				width: calc(100%-60upx);
				// height: 500upx;
				background: #F8F8F8;
				border-radius: 20upx;
				margin:40upx auto;
	
			
				.transferMassageOne {
					display: flex;
					justify-content: space-between;
					// padding: 20upx 28upx 0 18upx;

					image {
						width: 30upx;
						height: 30upx;
						margin-left: 24upx;
					}

					.transferMassageTitle {
						width: 140upx;
						font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;
						// margin-left: 20upx;
						text-align: right;
						padding-top:40upx;
					}

					.transferMassageName {
						font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;
						margin-right: 20upx;
						text-align: right;
							padding-top:40upx;
					}
				}
			}
		}

		.payClickMassage {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .6);
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: 0;

			.ClickMassageCenter {
				width: 630upx;
				height: 582upx;
				background: #FFFFFF;
				border-radius: 20upx;
			}
		}

	}

	.orderDetail {
		width: 100%;
		margin-bottom: 200upx !important;

		.orderAddressDto {
			width: calc(100% - 60upx);
			margin: 50upx auto 0;
			min-height: 154upx;
			background: #fff;
			border-radius: 15upx;
			padding-bottom: 30upx;

			.orderAddressFlex {
				display: flex;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 31upx;
			}

			.orderAddressDetail {
				width: 600upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 31upx;
				margin-top: 20upx;
			}

			.orderAddressNumber {
				margin-top: 41upx;
				margin-left: 22upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #929396;

			}
		}

		.orderGoodsDto {
			width: calc(100% - 60upx);
			// height: 714upx;
			background: #FFFFFF;
			border-radius: 20upx;
			margin: 20upx auto 0;

			.orderGoodsDtoImg {
				display: flex;
				margin-top: 20upx;
				margin: 20upx 0;
				position: relative;

				.sampleLogo {
					position: absolute;
					width: 172upx;
					height: 103upx;
					top: 44upx;
					right: 31upx;
				}

				image {
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
				}

				.goodsTitle {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
				}

				.goodsBrand {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
					padding-top: 15upx;
				}

				.return_Num {
					float: right;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
					// margin-top:10upx;
					margin-right: 10upx;
				}

				.goods_Price {
					margin-top: 30upx;
					display: flex;
					justify-content: space-between;

					view:first-child {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #F33C0A;
					}

					view:last-child {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
					}
				}

			}

			.orderGoodsPrice {
				width: calc(100% - 60upx);
				margin: 50upx auto 0;

				.orderGoodsPriceFlex {
					height: 100upx;
					line-height: 100upx;
					display: flex;
					justify-content: space-between;

					.orderGoodsPriceTitle {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
					}

					.orderGoodsMoney {
						font-size: 34upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;

						span {
							font-size: 24upx;

							font-family: PingFang;
							font-weight: bold;
						}
					}

					.orderGoodsMoneyRed {
						font-size: 34upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #F33C0A;

						span {
							font-size: 24upx;

							font-family: PingFang;
							font-weight: bold;
						}
					}
				}
			}
		}

		.orderDto {
			height: 100%;
			width: calc(100% - 60upx);
			background: #FFFFFF;
			border-radius: 20upx;
			margin: 20upx auto 0;
			padding-bottom: 40upx;

			.orderDtoCode {
				width: calc(100% - 60upx);
				display: flex;
				// height: 75upx;
				line-height: 75upx;
				justify-content: space-between;
				margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;


				.orderDtoCodeNumber {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}

				.orderDtoCodeText {
					margin-top: 10upx;
					width: 400upx;
					line-height: 50upx;
					white-space: normal;
					word-break: break-all;
					text-align: right;
				}
			}

			.orderDtoCodeList {
				width: calc(100% - 60upx) !important;
				margin: 20upx auto;
				line-height: 50upx;
				justify-content: space-between;
				// margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;

				.orderDtoCodeTextList {
					word-wrap: break-word
				}
			}
		}
	}
</style>
