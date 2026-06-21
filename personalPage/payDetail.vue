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
						style="width:calc(100% - 60upx);background: #F8F8F8;border-radius: 10px;margin:40upx auto;height: 300upx;padding: 20upx 0; ">
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
		<view >
			<view class="orderGoodsPriceTitle">
				<view class="orderDtoCode" style="margin:20upx 40upx;">
					<view class="orderGoodsPriceTitle" >
						支付记录
					</view>
				</view>

			</view>
			<view class="orderDto" v-for="(item,index) in paymentOrderList" :key="index" style="margin-top: 20upx;">
				<view class="orderDtoCode">
					<view class="">
						支付时间:
					</view>
					<view class="">
						{{item.payDate}}
					</view>
				</view>

				<view class="orderDtoCode">
					<view class="">
						付款方式:
					</view>
					<view class="">
						 <template v-for="item1 in payTypeEnumsList">
							<span :key="item1.code"
								v-if="item1.code === item.payTypeDictCode">{{item1.description}}</span>
						</template>
			
					</view>
				</view>
				<view class="orderDtoCode">
					<view class="">
						付款人:
					</view>
					<view class="">
						{{item.payer}}
					</view>
				</view>
				<view class="orderDtoCode">
					<view class="">
						付款金额:
					</view>
					<view class="">
						{{item.payAmount}}
					</view>
				</view>
				<view class="orderDtoCode">
					<view class="">
						交易流水号:
					</view>
					<view class="">
						{{item.voucherNum}}
					</view>
				</view>
			</view>
			<!-- </view> -->
		</view>
		<view class="bottom">
			<view class="bottomBtn" style="display: flex;">
				<view class="pay" @click="orderPay" v-if="orderStatus==20&&payStatus!=30">
					立即支付
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import '@/static/LHT/orderDetail.css'
	import {
		orderDetail,
		signForOrder,
		orderPayment,
		getCheck,
		reject,
		cancelOrder,
		confirm,
		getPaymentOrderDetail,
		getPayTypeList
	} from '@/api/orderListApi.js'
	import moment from 'moment';
	import {
		toast,
		refresh,
		getRouter,
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				orderParam: {
					orderCode: null,
					remark: ''
				},
				check: true,
				orderAddressData: {},
				orderItemBasicsDto: [],
				orderData: {},
				payStatusData: {},
				orderOperationData: {},
				orderCode: null,
				orderStatus: '', //订单状态
				payStatus: '', //支付状态
				outStatus: '', //发货状态
				invoiceStatus: '', //开票状态
				flags: false,
				orderId: '',
				refundCode: true,
				paymentOrderList: [],
				paymentOrder:{},
				payTypeEnumsList:[]
			}
		},
		onLoad(opt) {
			this.orderParam.orderCode = opt.orderCode
			this.getOrderDetail()
			this.getIsCheck()
			this.getPayTypeEnums()
		},
		onShow() {
			getUrl();
			getRouter();
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.getIsCheck();
				this.getOrderDetail();
			},
			getPayTypeEnums() {
				getPayTypeList().then(res => {
					if (res.code == '0') {
						this.payTypeEnumsList = res.data
					}
				})
			},
			getIsCheck() {
				getCheck(this.orderParam).then(res => {
					if (res.code == '0') {
						this.check = res.data
					}
				})
			},

			Confirmed(orderCodes, remark) {
				var data = {
					orderCode: orderCodes,
					confirmRemark: remark
				}
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定确认订单',
					success: function(res) {
						if (res.confirm) {
							confirm(data).then(res => {
								that.getOrderDetail()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//取消订单 
			cancleBtn(orderCode) {
				var orderCode = orderCode;
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定取消订单',
					success: function(res) {
						if (res.confirm) {
							cancelOrder(orderCode).then((res) => {
								if (res.success) {
									that.getOrderDetail()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getOrderDetail() {
				orderDetail(this.orderParam).then(res => {
					if (res.code == '0') {
						this.orderId = res.data.id
						this.orderStatus = res.data.orderStatus, //订单状态
							this.payStatus = res.data.payStatus, //支付状态
							this.outStatus = res.data.outStatus, //发货状态
							this.invoiceStatus = res.data.invoiceStatus, //开票状态
							res.data.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
						this.orderData = res.data
						this.orderAddressData = res.data.orderAddressDto
						this.orderItemBasicsDto = res.data.orderItemBasicsDto
						if (res.data.refundCode) {
							this.refundCode = false
						}

						if (res.data.payOperations) {
							res.data.payOperations.forEach(item => {
								item.operationTime = moment(item.operationTime).format(
									'YYYY.MM.DD HH:mm:ss')
							})
						}
						if (res.data.orderOperations) {
							res.data.orderOperations.forEach(ite => {
								ite.operationTime = moment(ite.operationTime).format(
									'YYYY.MM.DD HH:mm:ss')
							})
						}
						if (res.data.invoiceOperations) {
							res.data.invoiceOperations.forEach(items => {
								items.operationTime = moment(items.operationTime).format(
									'YYYY.MM.DD HH:mm:ss')
							})
						}
						this.payStatusData = res.data.payOperations
						this.orderOperationData = res.data.orderOperations
					}
					this.getPaymentOrderDetail()
				})

			},
			// 开票
			orderInvoice() {

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
			// 签收
			orderSign() {
				this.flags = true;
			},
			backReturn() {
				if (!this.check) {
					toast({
						title: '订单申请售后中，不能再次申请售后'
					})
				} else {
					uni.navigateTo({
						url: '/personalPage/returnGoods?orderCode=' + this.orderParam.orderCode
					})
				}
			},
			sure() {
				signForOrder(this.orderId).then(res => {
					if (res.success) {
						this.flags = false;
						this.getOrderDetail()
					}
				})
			},
			no() {
				this.flags = false;
			},
			// 支付
			orderPay() {
				uni.navigateTo({
					url: '/personalPage/payPage?orderCode=' + this.orderParam.orderCode+'&orderId='+this.orderId
				})
			},
			//驳回订单
			bankOrder(orderCode, remark) {
				if (remark) {
					var that = this
					var data = {
						orderCode: orderCode,
						confirmRemark: remark
					}
					uni.showModal({
						title: '提示',
						content: '是否确认驳回订单',
						success: function(res) {
							if (res.confirm) {
								reject(data).then(res => {

									if (res.code == '0') {
										that.getOrderDetail()
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					toast({
						title: '请填写驳回原因'
					})
				}
			},
		}
	}
</script>

<style scoped lang="less">
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
</style>
