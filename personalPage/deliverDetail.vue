<template>
	<view class="orderDetail" style="padding-bottom: 100upx;padding-top: 40upx;">
		<view class="orderGoodsPrice" style="margin: 100upx auto;text-align: center;">
			<view style="color: red;font-size: 40upx;">
				￥{{orderPayDetailList.waitSendAmount}}
			</view>
			<view class="">
				待发金额
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
						style="width:calc(100% - 60upx);background: #F8F8F8;border-radius: 10px;margin:40upx auto;padding:30upx 0;height: 300upx; ">
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-left: 30upx;">
								已发金额：
							</view>
							<view class="" style="padding-right: 30upx;">
								+￥{{orderPayDetailList.sendAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								已发退款金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								-￥{{orderPayDetailList.actualOutRefundAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								待发金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								￥{{orderPayDetailList.waitSendAmount}}
							</view>
						</view>
						<view class=""
							style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
							<view class="" style="padding-top:40upx;padding-left: 30upx;">
								待发退款金额：
							</view>
							<view class="" style="padding-top:40upx;padding-right: 30upx;">
								-￥{{orderPayDetailList.waitOutRefundAmount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="orderGoodsPriceTitle">
				<view class="orderDtoCode" style="margin:20upx 40upx;">
					<view class="orderGoodsPriceTitle">
						发货记录
					</view>
				</view>

			</view>
			<view class="orderDto" v-for="(item,index) in orderOutList" :key="index" style="margin-top: 20upx;">
				<view class="orderDtoCode">
					<view class="">
						发货单号:
					</view>
					<view class="">
						{{item.orderOutCode}}
					</view>
				</view>
				<view class="orderDtoCode">
					<view class="">
						发货时间:
					</view>
					<view class="">
						{{item.sendTime}}
					</view>
				</view>

				<view class="orderDtoCode">
					<view class="">
						发货金额:
					</view>
					<view class="">
						{{item.outAmount}}
					</view>
				</view>
				<view class="orderDtoCode">
					<view class="">
						物流公司:
					</view>
					<view class="">
						{{item.deliveryCompanyName}}
					</view>
				</view>
				<view class="orderDtoCode" @click="openDeliver(item)">
					<view class="">
						物流单号:
					</view>
					<view class="" style="width: 40%; overFlow:hidden;text-overflow:ellipsis;">
						{{item.deliveryNo}}
					</view>
					<view class="">
						查看物流 >
					</view>
					<!-- 	<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png" mode="">
					</image> -->
				</view>
				<view class="orderDtoCode">
					<view class="" style="font-weight: 600;">
						发货商品
					</view>
					<!-- 	<view class="">
						发货数量
					</view> -->
				</view>

				<view class="orderGoodsDtoImg" v-for="(item,index) in item.orderOutGoodNumDtos" :key="index">

					<image v-if="item.imgUrl" :src="item.imgUrl" style="margin: 0 0 0 30upx;" mode=""></image>
					<image v-else style="margin: 0 0 0 30upx;"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
						mode="widthFix"></image>
					<view class="" style="margin-left: 20upx;width: 411upx">
						<view class="goodsTitle"
							style="width: 411upx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{item.goodsTitle}}
						</view>
						<view class="goodsBrand">
							品牌：{{item.brandName}}&nbsp&nbsp&nbsp&nbsp规格：{{item.specification==null||item.specification==''?'暂无规格':item.specification}}
						</view>
						<view class="goods_Price">
							<view v-if="orderData.orderType==3&&item.outAmount !== 0">
								{{item.outAmount}}积分
							</view>
							<view v-if="orderData.orderType!==3&&item.outAmount !== 0">
								￥{{item.outAmount}}
							</view>
							<view
								v-if="orderData.orderType!==3&&item.outAmount == 0&&orderData.orderType != 4&&orderData.orderType != 2">
								￥{{item.price}}
							</view>
							<view v-if="orderData.orderType==2">
								￥0
							</view>
							<!-- <view
								style="font-size: 26upx;color: #9FA0A5;text-decoration: line-through;margin-left: 20upx;"
								v-if="orderData.orderType!==3&&item.outAmount !== 0">
								￥{{item.price}}
							</view>
							<view
								style="font-size: 26upx;color: #9FA0A5;text-decoration: line-through;margin-left: 20upx;"
								v-if="orderData.orderType==3&&item.outAmount !== 0">
								{{item.price}}积分
							</view> -->
						</view>
						<view style="float: right;margin-top: -40upx;">
							*{{item.applyNum}}
						</view>
						<!-- <view style="font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;display: flex;" v-if="item.returnoutNum !== 0 || item.returnNum !== 0">
							退款： <view>
								已发x{{item.returnoutNum}}
							</view>
							<view style="margin-left: 20upx;">
								未发x{{item.returnNum}}
							</view>
						</view> -->
					</view>
					<image v-if='orderData.orderType==2' class="sampleLogo"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleLogo.png"></image>
					<image v-if='orderData.orderType==4' class="sampleLogo"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E7%9F%A2%E9%87%8F%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%402x%20%287%29.png">
					</image>
				</view>
			</view>
			<!-- </view> -->
		</view>

		<!-- <view class="bottom">
			<view class="bottomBtn" style="display: flex;">
				<view class="pay" @click="orderPay" v-if="orderStatus==20&&payStatus!=30">
					立即支付
				</view>
			</view>
		</view> -->
		<view class="deliverStyle" v-if="deliverFlag">
			<view class="deliverContent">
				<view class="trackingNumber" v-if="deliverList.length">
					<text>{{deliverMsgList.deliveryStatusName}}</text>
					<text style="margin-left: 20upx;">{{deliverMsgList.number}}</text>
					<text @tap="copyClick">复制</text>
				</view>
				<view class="trackingNumber" v-else>
					<text>{{deliveryCompanyName}}</text>
					<text style="margin-left: 20upx;">{{deliveryNo}}</text>
					<text @tap="copyClickBtn">复制</text>
				</view>
				<view class="track">
					<view class="trackDeliver" v-if="deliverList.length">
						<uni-steps :options="stepsOptions" :active="0" direction="column" :activeColor="color1" />
					</view>
					<view class="empty-state" v-else>
						<view class="empty-icon">
							<uni-icons type="list" size="48" color="#ccc" />
						</view>
						<view class="empty-text">暂无物流信息</view>
					</view>
				</view>
			</view>
			<view class="closes">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/BA/indexCancleBtn.png"
					@click="closeBtn()"></image>
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
		getOrderOutList,
		getOrderPayDetail,
		getLogisticsTrajectory
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
				orderOutList: [],
				orderPayDetailList: [],
				deliverFlag: false,
				msg: '',
				logisticsCompanyCode: null,
				deliveryNo: "",
				deliveryNo1:'',
				deliverMsgList: [],
				deliverList: [],
				deliveryCompanyName: "",
				color1: '',
				outList: []
			}
		},
		computed: {
			stepsOptions() {
				return this.deliverList.map(item => ({
					title: item.time,
					desc: item.status
				}))
			}
		},
		onLoad(opt) {
			this.style = uni.getStorageSync('style')
			this.color1 = this.style.returntext
			this.orderParam.orderCode = opt.orderCode
			this.getOrderDetail()
			this.getIsCheck()
		},
		onShow() {
			// getUrl();
			getRouter();
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 物流轨迹
			getTrajectory() {
				getLogisticsTrajectory(this.logisticsCompanyCode, this.deliveryNo).then(res => {
					uni.showLoading({
						title: '加载中...'
					});
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
					if (res.success) {
						this.deliverMsgList = res.data
						this.deliverList = res.data.list
						if (this.deliverFlag == false) {
							this.deliverList = []
						}
					}
				})
			},
			copyClick() {
				uni.setClipboardData({
					data: this.deliverMsgList.number,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: "复制成功",
									icon: 'none',
								});
							},
						});
					},
				});
			},
			copyClickBtn() {
				uni.setClipboardData({
					data: this.deliveryNo,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: "复制成功",
									icon: 'none',
								});
							},
						});
					},
				});
			},
			closeBtn() {
				this.deliverFlag = false
				this.deliverList = []

			},
			openDeliver(item) {
				// console.log(item, 'item')
				this.logisticsCompanyCode = item.logisticsCompanyCode
				var deliveryNo = item.deliveryNo
				this.deliveryCompanyName = item.deliveryCompanyName
				let code = item.logisticsCompanyCode ? item.logisticsCompanyCode : '';
				if (code == 'SFEXPRESS' && item.mobile.length > 4) {
					this.deliveryNo = deliveryNo
					deliveryNo = deliveryNo + ':' + item.mobile.substr(-4);
				}
				getLogisticsTrajectory(this.logisticsCompanyCode, deliveryNo).then(res => {
					uni.showLoading({
						title: '加载中...'
					});
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
					if (res.success) {
						this.deliverMsgList = res.data
						this.deliverList = res.data.list
						if (this.deliverFlag == false) {
							this.deliverList = []
						}
					}
				})
				// this.getTrajectory(this.logisticsCompanyCode, deliveryNo)
				this.deliverFlag = true
			},
			// 下拉刷新
			getDataMsg() {
				this.getIsCheck();
				this.getOrderDetail();
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
					this.getOrderOutList()
					this.getOrderPayDetailList()
				})

			},
			// 开票
			orderInvoice() {

			},
			getOrderOutList() {
				getOrderOutList(this.orderId).then(res => {
					if (res.success) {
						this.orderOutList = res.data;
						res.data.forEach((item) => {
							this.outList.push(item.orderOutGoodNumDtos)
						})
					}

				})
			},
			getOrderPayDetailList() {
				getOrderPayDetail(this.orderId).then(res => {
					if (res.success) {
						this.orderPayDetailList = res.data.orderPriceDto;
						// console.log(this.orderPayDetailList, 'this.orderPayDetailList');
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
					url: '/personalPage/payPage?orderCode=' + this.orderParam.orderCode
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

				image {
					width: 30upx;
					height: 30upx;
					margin-top: 24upx;
				}
			}

			.orderGoodsDtoImg {
				display: flex;
				margin-top: 20upx;
				margin: 20upx 0;
				position: relative;

				.canbuyimageTop {
					width: 64upx;
					height: 20upx;
					position: absolute;
					left: 0;
					top: 2;
					margin-left: 30upx;
					background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
					border-radius: 10upx 0upx 10upx 0upx;
					font-size: 16upx;
					line-height: 20upx;
					padding: 5upx 5upx;
					text-align: center;
					color: #FFFFFF;
					font-weight: normal;
				}

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
					// width: 300upx;
					margin-top: 30upx;
					display: flex;
					// justify-content: space-between;

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


		.deliverStyle {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .4);
			// display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2023;

			.deliverContent {
				margin: 100upx auto;
				border-radius: 20upx;
				width: 580upx;
				height: 700upx;
				background-color: #FFFFFF;

				.trackingNumber {
					width: 90%;
					margin: 0 auto;
					padding-left: 30upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 34upx;
					padding-top: 49upx;
					border-bottom: 1upx solid #EAEAEA;
					padding-bottom: 26upx;

					text:nth-child(3) {
						margin-left: 14upx;
						width: 80upx;
						height: 34upx;
						background: #EAEAEA;
						border-radius: 17upx;
						display: inline-block;
						font-size: 23upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						text-align: center;

					}
				}

				.track {
					padding-left: 38upx;
					padding-top: 29upx;
					padding-bottom: 29upx;

					.trackDeliver {
						width: 500upx;
						max-height: 500upx;
						overflow: auto;
						overflow-x: hidden !important;
					}

					.empty-state {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 60upx 0;

						.empty-icon {
							margin-bottom: 20upx;
						}

						.empty-text {
							font-size: 28upx;
							color: #999;
						}
					}

				}

			}

			.closes {
				width: 15upx;
				height: 15upx;

				// background-color: ;
				image {
					width: 80upx;
					height: 80upx;
					// margin-top: 20upx;
					margin-left: 340upx;
					// margin:0 auto;
				}

			}
		}
	}
</style>