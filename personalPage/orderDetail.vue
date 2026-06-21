<template>
	<view class="orderDetail" style="padding-bottom: 100upx;padding-top: 40upx;">
		<view>
			<view class="orderDetailStatus" v-if="orderStatus==5">
				<view class="orderImage" :style="{backgroundImage: 'url(' + imageURL3 + ')','background-repeat':'no-repeat',
			     backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单待支付
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==30">
				<view class="orderImage" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单已完成
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==0">
				<view class="orderImage2" :style="{backgroundImage: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单已取消
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==50">
				<view class="orderImage2" :style="{backgroundImage: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单已驳回
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==20&&orderData.orderType!=3">
				<view class="orderImage3" :style="{backgroundImage: 'url(' + imageURL3 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单进行中
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==20&&orderData.orderType==3">
				<view class="IntegralOrderImage" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views2" :style="{color:color}">
					兑换成功
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==10">
				<view class="orderImage3" :style="{backgroundImage: 'url(' + imageURL3 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单待审核
				</view>
			</view>
			<view class="orderDetailStatus" v-if="orderStatus==40">
				<view class="orderImage4" :style="{backgroundImage: 'url(' + imageURL4 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="views" :style="{color:color}">
					订单待确认
				</view>
				<view style="width:300upx;font-size:28upx;color:#333; margin-left:-20px;">
					你的订单需要确认
				</view>
			</view>
		</view>
		<view class="orderAddressDto">
			<view class="orderAddressFlex">
				<view class="" style="margin-top: 39upx;">
					{{orderAddressData.contact}}
				</view>
				<view class="orderAddressNumber">
					{{orderAddressData.mobile}}
				</view>
			</view>
			<view class="orderAddressDetail">
				{{orderAddressData.province}}{{orderAddressData.city}}{{orderAddressData.area}}{{orderAddressData.detailAddress}}
			</view>

		</view>
		<view class="orderGoodsDto">
			<view class="" style="height: 30upx;">

			</view>
			<view class="orderGoodsDtoImg" v-for="(item,index) in orderItemBasicsDto" :key="index">
				<!-- <view class="canbuyimageTop" v-if="item.promotionStatus == 20 || item.promotionStatus == 30">
					{{item.promotionLabel}}
				</view> -->
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
						<view v-if="orderData.orderType==3&&item.promotionPrice !== 0">
							{{item.promotionPrice}}积分
						</view>
						<view v-if="orderData.orderType!==3&&item.promotionPrice !== 0">
							￥{{item.promotionPrice}}
						</view>
						<view v-if="orderData.orderType!==3&&item.promotionPrice == 0">
							￥{{item.price}}
						</view>
						<view style="font-size: 26upx;color: #9FA0A5;text-decoration: line-through;margin-left: 20upx;"
							v-if="orderData.orderType!==3&&item.promotionPrice !== 0">
							￥{{item.price}}
						</view>
						<view style="font-size: 26upx;color: #9FA0A5;text-decoration: line-through;margin-left: 20upx;"
							v-if="orderData.orderType==3&&item.promotionPrice !== 0">
							{{item.price}}积分
						</view>
					</view>
					<view style="float: right;margin-top: -40upx;">
						*{{item.goodsNum}}
					</view>
					<view style="font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;display: flex;" v-if="item.returnoutNum !== 0 || item.returnNum !== 0">
						退款： <view>
							已发x{{item.returnoutNum}}
						</view>
						<view style="margin-left: 20upx;">
							未发x{{item.returnNum}}
						</view>
					</view>
				</view>
				<image v-if='orderData.orderType==2' class="sampleLogo"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleLogo.png"></image>
				<image v-if='orderData.orderType==4' class="sampleLogo"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E7%9F%A2%E9%87%8F%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%402x%20%287%29.png">
				</image>
			</view>
			<view class="orderGoodsPrice" style="margin-top: 100upx;">
				<view class="orderGoodsPriceFlex" v-if='orderData.orderType==3'>
					<view class="orderGoodsPriceTitle">
						商品总积分
					</view>
					<view class="orderGoodsMoney">
						{{orderData.orderAmount ?orderData.orderAmount:0}}<span>积分</span>
					</view>
				</view>

				<view class="orderGoodsPriceFlex" v-else>
					<view class="orderGoodsPriceTitle">
						商品总额
					</view>
					<view class="orderGoodsMoney">
						<span>￥</span>{{orderData.unCouponAmount ?orderData.unCouponAmount:0}}
					</view>
				</view>
				<view class="orderGoodsPriceFlex">
					<view class="orderGoodsPriceTitle">
						运费
					</view>
					<view class="orderGoodsMoney">
						<span>￥</span>{{orderData.freight ? orderData.freight:0}}
					</view>
				</view>
				<view class="orderGoodsPriceFlex">
					<view class="orderGoodsPriceTitle">
						优惠券
					</view>
					<view class="orderGoodsMoney" style="color: #EE281E;">
						-<span>￥</span>{{orderData.couponAmount ? orderData.couponAmount:0}}
					</view>
				</view>
				<view class="orderGoodsPriceTitle" v-if='orderData.orderType!=3'>
					<view class="orderGoodsPriceFlex">
						<view class="orderGoodsPriceTitle">
							订单金额
						</view>
						<view class="orderGoodsMoney">
							<span>￥</span>{{orderData.orderAmount ? orderData.orderAmount:0}}
						</view>
					</view>
					<view class="">
						<view class=""
							style="width:calc(100% - 60upx);background: #F8F8F8;border-radius: 10px;margin:40upx auto;height: 300upx; padding:20px 0">
							<view class=""
								style="width: 100%;display: flex;justify-content: space-between;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #67686B;">
								<view class="" style="padding-left: 30upx;">
									实付金额：
								</view>
								<view class="" style="padding-right: 30upx;" v-if="orderData.orderType == 4">
									+￥0
								</view>
								<view class="" style="padding-right: 30upx;" v-else>
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
								<view class="" style="padding-top:40upx;padding-right: 30upx;"
									v-if="orderData.orderType == 4">
									￥{{orderData.waitAmount}}
								</view>
								<view class="" style="padding-top:40upx;padding-right: 30upx;" v-else>
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
						<view style="width: 100%;height: 20upx;"> </view>
					</view>
				</view>
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
					下单时间:
				</view>
				<view class="">
					{{orderData.createTime}}
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
			<view class="orderDtoCodeList" v-if='orderData.orderType!=3'>
				<view class="">
					订单备注:
				</view>
				<view class="orderDtoCodeTextList">
					{{orderData.remark!=null&&orderData.remark!='null'?orderData.remark:''}}
				</view>
			</view>
			<view class="orderDtoCodeList"
				v-if="orderData.orderType!=3&&orderData.rejectRemark!=null&&orderData.rejectRemark!='null'">
				<view class="">
					审核备注:
				</view>
				<view class="orderDtoCodeTextList">
					{{orderData.rejectRemark!=null&&orderData.rejectRemark!='null'?orderData.rejectRemark:''}}
				</view>
			</view>
			<view class="orderDtoCodeList" v-if="orderData.orderType!=2&&orderData.orderType!=3">
				<view class="">
					确认备注:
				</view>
				<view v-if="orderStatus!=40" class="orderDtoCodeTextList">
					{{orderData.confirmRemark!=null&&orderData.confirmRemark!='null'?orderData.confirmRemark:''}}
				</view>
				<textarea class="orderDtoCodeTextList" v-model=" orderData.confirmRemark" v-if="orderStatus==40"
					maxlength="200" type="text" placeholder="请填写确认备注"></textarea>
			</view>
		</view>
		<view class="payStatus1"
			v-if="orderData.payStatus!=10&&orderData.payStatus!=0&&orderData.orderType!=2&&orderData.orderType!=4"
			style="margin-top: 20upx;">
			<view class="payStatusFlex">
				<view class=""
					style="width:calc(100% - 60upx);margin:0  auto ;display: flex;justify-content: space-between;padding-top: 29upx;">
					<view class="">
						支付详情
					</view>
					<view class="" @click="toPayDetail"
						style="display: flex;justify-content: space-between;line-height: 50upx; width: 160upx;height: 50upx;margin-right: 20upx; font-size: 28upx;font-family: PingFang SC;font-weight: 500;color: #999999;">
						{{orderData.payStatus==10?'未支付':orderData.payStatus==20?'部分支付':orderData.payStatus==30 ?'已支付':''}}
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
			</view>
			<view class="" style="height: 30upx;"> </view>
		</view>
		<view class="payStatus1" v-if="orderData.outStatus!=10&&orderData.outStatus!=0&&orderOperationData.length>0"
			style="margin-top: 20upx;">
			<view class="payStatusFlex">
				<view class=""
					style="width:calc(100% - 60upx);margin:0  auto ;display: flex;justify-content: space-between;padding-top: 29upx;">
					<view class="">
						发货详情
					</view>
					<view class="" @click="toDeliverDetail"
						style="display: flex;justify-content: space-between;line-height: 50upx; width: 160upx;height: 50upx;margin-right: 20upx;font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #999999;">
						{{orderData.outStatus==20?'部分发货':orderData.outStatus==30?'已发货':orderData.outStatus==40 ?'已完结':''}}
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
			</view>
			<view class="" style="height: 30upx;"> </view>
		</view>
		<view class="payStatus1" style="margin-top: 20upx;"
			v-if="orderData.invoiceStatus!=10&&orderData.invoiceStatus!=0">
			<view class="payStatusFlex">
				<view class=""
					style="width:calc(100% - 60upx);margin:0  auto ;display: flex;justify-content: space-between;padding-top: 29upx;">
					<view class="">
						发票详情
					</view>
					<view class="" v-if="orderData.invoiceStatus==10" @click="toInvoiceDetail"
						style="display: flex;justify-content: space-between; width: 160upx;height: 50upx;line-height: 50upx; font-size: 26upx;margin-right: 20upx;font-family: PingFang SC;font-weight: 500;color: #999999;">
						未开票
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
					<view class="" v-if="orderData.invoiceStatus==20" @click="toInvoiceDetail"
						style="display: flex;justify-content: space-between; width: 160upx;height: 50upx;line-height: 50upx; font-size: 26upx;margin-right: 20upx;font-family: PingFang SC;font-weight: 500;color: #999999;">
						部分开票
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
					<view class="" v-if="orderData.invoiceStatus==30" @click="toInvoiceDetail"
						style="display: flex;justify-content: space-between; width: 160upx;height: 50upx;line-height: 50upx; font-size: 26upx;margin-right: 20upx;font-family: PingFang SC;font-weight: 500;color: #999999;">
						已开票
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right" style="margin-top: 8upx;">
						</image>
					</view>
				</view>
			</view>
			<view class="" style="height: 30upx;"> </view>
		</view>

		<view class="bottom">
			<view class="bottomBtn" v-if="orderData.orderType!=3" style="display: flex;">
				<!-- orderStatus==20||orderStatus==30&&payStatus==20||payStatus==30&&outStatus==40&&invoiceStatus==10||invoiceStatus==20 -->
				<!-- <view class="view" @click="orderInvoice"
					v-if="(orderStatus==20||orderStatus==30)&&(outStatus==40||outStatus==40)&&(invoiceStatus==10||invoiceStatus==20)">
					申请开票
				</view> -->
				<view class="view" @click="backReturn"
					v-if="orderData.isSales&&(orderStatus==20||orderStatus==30)&&(payStatus !=10 || outStatus !=10)&&orderData.orderType !=4 && orderData.orderType !=2">
					申请售后
				</view>
				<view class="view" @click="orderSign()" v-if="orderData.evaluateStatus==false&&outStatus==30">
					<!-- 未评价 未签收 -->
					签收评价
				</view>
				<view class="view" @click="comment()" v-if="orderData.evaluateStatus==false&&outStatus==40">
					<!-- 未评价 已签收 -->
					评价
				</view>
				<view class="view" @click.stop="myComment()" v-if="orderData.evaluateStatus==true">
					<!-- 已签收、已评价 -->
					我的评价
				</view>
				<!-- 线下支付 -->
				<view class="pay" :style="[{color:color},{background:background}]" @click="orderPay"
					v-if="orderStatus==20&&payStatus!=30">
					立即支付
				</view>
				<!-- 微信支付 -->
				<view class="pay" :style="[{color:color},{background:background}]" @click="wxPay()"
					v-if="orderStatus==5&&orderData.payStr=='微信支付'&&payStatus!=30">
					立即支付
				</view>
				<view class="view" @click.stop="bankOrder(orderParam.orderCode,orderData.confirmRemark)"
					v-if="orderStatus==40">
					驳回订单
				</view>
				<view class="view" @click.stop="cancleBtn(orderParam.orderCode)"
					v-if="orderStatus==50||orderStatus==10||orderStatus==40||orderStatus==5">
					取消订单
				</view>
				<view class="view" @click.stop="Confirmed(orderParam.orderCode,orderData.confirmRemark)"
					v-if="orderStatus==40">
					确认订单
				</view>
			</view>
			<view class="bottomBtn" v-else style="display: flex;">
				<view class="view" @click="orderSign" v-if="outStatus==30">
					<!-- 立即签收 -->
					签收评价
				</view>
				<!-- outStatus==30 已发货 outStatus==40 已签收 -->
				<view class="view" v-if="outStatus==40">
					<!-- 已签收 -->
					评价
				</view>
			</view>
		</view>
		<!-- 确认签收弹窗 -->
		<view class="mark" v-if="flags">
			<view class="small">
				<view class="title">签收并评价</view>
				<view class="sure_text">确认进行商品签收操作吗？ 签收之后请对商品评价！</view>
				<view class="sure">
					<view class="no" @click.stop="no">取消</view>
					<view class="yes" @click.stop="sure">签收并评价</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		wxGetOpenId,
		wxJsPay
	} from '@/api/confirmOrder.js'
	import '@/static/LHT/orderDetail.css'
	import {
		orderDetail,
		signForOrder,
		orderPayment,
		getCheck,
		reject,
		cancelOrder,
		confirm,
	} from '@/api/orderListApi.js'
	import moment from 'moment';
	import {
		toast,
		refresh,
		getRouter,
		getUrl
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				timer:null,
				orderParam: {
					orderCode: null,
					remark: '',
					pageType: ''
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
				imageURL: '',
				imageURL2: '',
				imageURL3: '',
				imageURL4: '',
				color: '',
				background: '',
				orderType: null,
			}
		},
		onLoad(opt) {
			// console.log(opt, "----订单详情----")
			this.style = uni.getStorageSync('style')
			this.color = this.style.logincheckbox
			this.background = this.style.orderrgb
			this.background1 = this.style.cartbtn
			this.imageURL = this.style.finishorder
			this.imageURL2 = this.style.detailorder
			this.imageURL3 = this.style.runningorder
			this.imageURL4 = this.style.returnOrdertwo
			this.orderParam.orderCode = opt.orderCode
			this.orderType = opt.orderType
			this.orderParam.pageType = opt.pageType
			this.getOrderDetail()
			this.getIsCheck()
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
			toPayDetail() {
				uni.navigateTo({
					url: '/personalPage/payDetail?orderCode=' + this.orderParam.orderCode
				})
			},
			toDeliverDetail() {
				uni.navigateTo({
					url: '/personalPage/deliverDetail?orderCode=' + this.orderParam.orderCode
				})
			},
			toInvoiceDetail() {
				uni.navigateTo({
					url: '/personalPage/invoiceDetail?orderCode=' + this.orderParam.orderCode
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
				})
			},
			// 开票
			orderInvoice() {

			},
			backReturn() {
				if (!this.check) {
					toast({
						title: '订单申请售后中，不能再次申请售后'
					})
				} else {
					uni.redirectTo({
						url: '/personalPage/returnGoods?orderCode=' + this.orderParam.orderCode + '&pageType=2'
					})
				}
			},
			// 签收
			orderSign() {
				this.flags = true;
			},
			sure() {
				signForOrder(this.orderId).then(res => {
					if (res.success) {
						this.flags = false;
						this.getOrderDetail()
						uni.navigateTo({
							url:'/goodsDetail/rate?title=商品评价&orderCode='+this.orderParam.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
						})
					}
				})
			},
			no() {
				this.flags = false;
			},
			// 评价
			comment() {
				uni.navigateTo({
					url:'/goodsDetail/rate?title=商品评价&orderCode='+this.orderParam.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
				})
			},
			// 我的评价
			myComment(){
				uni.navigateTo({
					url:'/goodsDetail/rate?title=我的评价&orderCode='+this.orderParam.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
				})
			},
			// 支付
			orderPay() {
				uni.navigateTo({
					url: '/personalPage/payPage?orderId=' + this.orderId + '&orderCode=' + this.orderParam
						.orderCode
				})
			},
			// 微信支付
			wxPay() {
				if (this.timer == null) {
				   this.timer = setTimeout(() => {
				    // console.log('支付==================');
					this.pay()
				    clearTimeout(this.timer)
				    this.timer = null
				  }, 500);
				}
			},
			pay(){
				wx.login({
					success: (loginRes) => {
						wxGetOpenId(loginRes.code).then(res => {
							if (res.data) {
								var data = {
									openid: res.data,
									orderCode: this.orderParam.orderCode
								}
								wxJsPay(data).then(ress => {
									if (ress.data) {
										// var item = JSON.parse(ress.data); 
										var that = this
										wx.requestPayment({
											timeStamp: ress.data.timeStamp,
											nonceStr: ress.data.nonceStr,
											package: ress.data.package,
											signType: 'RSA',
											paySign: ress.data.paySign,
											success(ress) {
												console.log("------111")
												that.getOrderDetail()
											},
											fail(ress) {
												console.log("------222")
												// console.log(res2)
												that.getOrderDetail()
											},
											complete(ress) {
												console.log("------333")
												// console.log(res2)
												that.getOrderDetail()
											}
										})
									}
								})
							}
						})
					}
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
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
				width: 550upx;
				height: 380upx;
				background: #fff;
				border-radius: 20upx;

				.title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					width: 100%;
					text-align: center;
					line-height: 120upx;
				}
				.sure_text{
					width:336upx;
					margin: 20upx auto 0;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 38rpx;
					text-align: center;
				}

				.sure {
					width: 100%;
					height: 85upx;
					margin: 74upx auto 0;
					display: flex;
					justify-content: space-between;
					border-top: 1px solid #EEEEEE;

					.yes {
						width: 274upx;
						height: 85upx;
						border-radius: 10upx;
						text-align: center;
						line-height: 85upx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #5974FF;
					}

					.no {
						width: 274upx;
						height: 85upx;
						border-radius: 10upx;
						border-right: 1px solid #EEEEEE;
						text-align: center;
						line-height: 85upx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}
			}
		}

	}
</style>