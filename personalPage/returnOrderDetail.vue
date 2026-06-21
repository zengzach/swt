<template>
	<view class="returnOrderPage">
		<!-- <view class="header_text"
			:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
			<view style="margin-left:20upx;">
				
				<uni-icons type="back" size="20" color="#67696d" @click="back" />
			</view>
			<view class="title">
				售后详情
			</view>
		</view> -->
		<view class="returnOrderStauts">
			<view class="returnOrderCotent" v-if="refundData.status==20">
				<view class="returnOrderCotentImg">
					<view class="image_one" :style="{background: 'url(' + imageURL1 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					您已申请{{refundData.refundType==10?'仅退款':refundData.refundType==20?'退货退款':''}}待商家处理
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==30">
				<view class="returnOrderCotentImg">
					<view class="image_two" :style="{background: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家同意退款申请
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==40">
				<view class="returnOrderCotentImg">
					<view class="image_three" :style="{background: 'url(' + imageURL3 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家不同意退款申请
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==100">
				<view class="returnOrderCotentImg">
					<view class="image_four" :style="{background: 'url(' + imageURL4 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					已撤销申请，售后关闭
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==50">
				<view class="returnOrderCotentImg">
					<view class="image_two" :style="{background: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家同意退货退款
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==60">
				<view class="returnOrderCotentImg">
					<view class="image_six" :style="{background: 'url(' + imageURL6 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					已发货，待商家处理
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==70">
				<view class="returnOrderCotentImg">
					<view class="image_two" :style="{background: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家收货并退款
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==80">
				<view class="returnOrderCotentImg">
					<view class="image_three" :style="{background: 'url(' + imageURL3 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家不同意退货退款
				</view>
			</view>
			<view class="returnOrderCotent" v-if="refundData.status==90">
				<view class="returnOrderCotentImg">
					<view class="image_two" :style="{background: 'url(' + imageURL2 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				</view>
				<view class="returnOrderCotentText">
					商家不同意退货退款申请
				</view>
			</view>
		</view>
		<view class="returnGoodReason" v-if="refundData.status==40||refundData.status==80||refundData.status==90">
			<view class="returnOrderText">
				拒绝原因
			</view>
			<view class="returnOrderContent">
				{{refundData.orderRefundOperationDtos[0].remark?refundData.orderRefundOperationDtos[0].remark:''}}
			</view>
		</view>
		<view class="returnGoodReason" :style="{'margin-top':refundData.status==80?'10px':''} "
			v-if="refundData.status==50||refundData.status==80">
			<view @click="copyBtn" class="returnOrderText"
				style="display: flex;justify-content: space-between;align-items: center;">
				<view class="">
					退货地址
				</view>
				<view class="" style="display: flex;align-items: center;">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/copy.png" mode=""></image>
					<view style='line-height: -10upx;font-size: 20upx;
font-family: PingFang SC;
font-weight: 500;
color: #67686B;'>复制</view>
				</view>
			</view>
			<view class="returnGoodDetail">
				{{refundData.contact}}<span style='font-size: 26upx;
font-family: PingFang SC;
font-weight: 500;
color: #929396;margin-left: 22upx;'> {{refundData.mobile}}</span>
			</view>
			<view class="returnGoodDetail" style="margin-top: 19upx;">
				{{refundData.countryName}}{{refundData.cityName}}{{refundData.areaName}}{{refundData.detailAddress}}
			</view>

		</view>


		<view class="deliverGoods" v-if="refundData.status==60">
			<view class="returnOrderText">
				退货物流
			</view>
			<view class="returnOrderContent">
				<view class="" style="display:flex">
					<view class="deliveryCompanyName">
						物流公司：
					</view>
					<view class="deliveryNo">
						{{refundData.deliveryCompanyName}}
					</view>
				</view>
				<view class="" style="display:flex;margin-top: 30upx;" @click="openDeliver(refundData)">
					<view class="deliveryCompanyName">
						物流单号：
					</view>
					<view class="deliveryNo" style="width:65%">
						{{refundData.deliveryNo}} 
					</view>
							<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="returnOrder" style="margin-top:20upx;height: 400upx;"
			v-if="refundData.status==70||refundData.status==30">
			<view class="returnOrderText">
				退款明细
			</view>
			<view style="width: 630upx;margin:30upx 0;height: 125upx;">
				<!-- <image style="width: 29upx;height: 29upx"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/orderimg.png" mode=""></image> -->
				<view class="" style="margin-left:24upx;">
					<view class="place_order_two_tips" :style="{background:background}" style="margin: 0 auto;">
						<view class="image" :style="{background: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
						<view class="place_order_two_top">
							<view :style="{color:color}">实付金额为该订单实际已经支付的金额，待付金额为该订单未支付的金额</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="margin-top: 20px;">
				<view class=""
					style="width: 630upx;display: flex;justify-content: space-between;align-items: center;margin: 20upx auto 0;">
					<view class="" style="font-size: 30upx;
font-family: PingFang SC;
font-weight: 500;
color: #333333;">
						实付金额退款
					</view>
					<view class="" style="font-size: 24upx;
font-family: PingFang SC;
font-weight: 500;
color: #FF5000;">
						<span style="font-size:30upx;">￥</span> {{refundData.orderRefundAmountDto.paidRefundAmount}}
					</view>
				</view>
				<view class=""
					style="width: 630upx;display: flex;justify-content: space-between;align-items: center;margin: 20upx auto 0">
					<view class="" style="font-size: 30upx;
font-family: PingFang SC;
font-weight: 500;
color: #333333;">
						待付金额退款
					</view>
					<view class="" style="font-size: 24upx;
font-family: PingFang SC;
font-weight: 500;
color: #FF5000;">
						<span
							style="font-size:30upx;">￥</span>{{refundData.orderRefundAmountDto.unPaidRefundAmount?refundData.orderRefundAmountDto.unPaidRefundAmount:0}}
					</view>
				</view>
			</view>
		</view>

		<view class="returnOrder" style="margin-top:40upx">
			<view class="returnOrderText">
				售后记录
			</view>
			<view class="">
				<view class="returnOrderTime" v-for="(item,index) in refundData.orderRefundOperationDtos" :key="index">
					<view class="returnOrderImg" v-if="index==0">
						<view class="returnOrderImgRe" :style="{background:background1}"></view>
						<view class="returnOrderImgAb" :style="{background:background1}"></view>
					</view>
					<view class="returnOrderImgText" :style="{color:color1}" v-if="index==0">
						<view class="">
							{{item.refundExplain=='退货退款'?'您已申请退货退款待商家处理':item.refundExplain=='同意退货退款'?'商家同意退货退款'
							:item.refundExplain=='买家已退货'?'已填写物流单号':item.refundExplain=='买家申请仅退款'?'您已申请仅退款待商家处理'
							:item.refundExplain=='拒绝退款'?'商家不同意退款申请':item.refundExplain=='买家撤销退款，售后单关闭'?'您已撤销申请售后单关闭':
							item.refundExplain=='修改退货地址'?'商家修改退货地址':item.refundExplain=='拒绝退货退款'?'商家不同意退货退款申请':
							item.refundExplain=='买家已退货'?	'已填写物流单号':item.refundExplain=='买家修改退货物流'?'修改物流单号':
							item.refundExplain=='拒绝收货'?'商家不同意退款申请':item.refundExplain
							}}
						</view>
						<view class="returnOrderImgTime" :style="{color:color1}">
							{{item.createTime}}
						</view>
					</view>
					<view class="returnOrderGer" v-if="index!=0">
						<view class="returnOrderImgRe"></view>
						<view class="returnOrderImgAb"></view>
					</view>
					<view class="returnOrderImgText1" v-if="index!=0">
						<view class="">
							{{item.refundExplain=='退货退款'?'您已申请退货退款待商家处理':item.refundExplain=='同意退货退款'?'商家同意退货退款'
							:item.refundExplain=='买家已退货'?'已填写物流单号':item.refundExplain=='买家申请仅退款'?'您已申请仅退款待商家处理'
							:item.refundExplain=='拒绝退款'?'商家不同意退款申请':item.refundExplain=='买家撤销退款，售后单关闭'?'您已撤销申请售后单关闭':
							item.refundExplain=='修改退货地址'?'商家修改退货地址':item.refundExplain=='拒绝退货退款'?'商家不同意退货退款申请':
							item.refundExplain=='买家已退货'?	'已填写物流单号':item.refundExplain=='买家修改退货物流'?'修改物流单号':
							item.refundExplain=='拒绝收货'?'商家不同意退款申请':item.refundExplain
							}}
						</view>
						<view class="returnOrderImgTime1">
							{{item.createTime}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="returnGoodDto">
			<view class="returnGoodDtoLv">
				售后商品
			</view>
			<view class="returnGood">
				<view class="returnGoodDtos" v-for="item in refundData.orderRefundItemDto" :key="item.orderItemDto.goodsId">
					<image :src="item.orderItemDto.imgUrl" mode=""></image>
					<view class="returnGoodDtoTitle">
						<view class="returnGoodDtoText">
							{{item.orderItemDto.goodsTitle}}
						</view>
						<view class="returnGoodDtoBrand">
							品牌：{{item.orderItemDto.brandName}}
							规格：{{item.orderItemDto.specification?item.orderItemDto.specification:'暂无规格'}}
						</view>

						<view class="returnGoodDtoPrice">
							<view class="returnGoodDtoPriceFlex">
								<view style="width: 160upx;">￥{{item.orderItemDto.discountPrice}}</view>
								<view class="returnGoodDtoPriceNum">
									已发x{{item.refundOutNum}}
								</view>
								<view class="returnGoodDtoPriceNum">
									未发x{{item.refundNum}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="returnGoodDtoRecord">
			<view class="returnGoodDtoLv">
				售后信息
			</view>
			<view class="returnGoodDtoDetail">
				<view class="returnGoodDtoFlex">
					<view class="">
						售后类型:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.refundType==10?'仅退款':refundData.refundType==20?'退货退款':''}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						退款原因:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.refundReason}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						退款数量:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.refundAllNum}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						退款金额:
					</view><strong></strong>
					<view class="returnGoodDtoReason">
						{{refundData.refundAmount}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						退款备注:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.remark}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						订单编号:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.orderCode}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						售后单号:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.refundCode}}
					</view>
				</view>
				<view class="returnGoodDtoFlex">
					<view class="">
						申请时间:
					</view>
					<view class="returnGoodDtoReason">
						{{refundData.createTime}}
					</view>
				</view>
			</view>
		</view>

		<view class="returnGoodDtoBottom">
			<view class="returnGoodDtoBottomFlex">
				<view class="">
				</view>
				<view class="" style="display:flex">
					<view v-if="refundData.status==70||refundData.status==30||refundData.status==100">
					</view>
					<view v-else class="returnGoodDtoBottomBtn" @click="goRevoke(refundData.refundCode)">
						撤销申请
					</view>
					<view v-if='refundData.status==50' class="returnGoodDtoBottomClick"
						:style="{background:background1}" style="margin-left: 50upx;" @click="goReturn">
						填写物流单号
					</view>
					<view v-if='refundData.status==60||refundData.status==80' class="returnGoodDtoBottomClick"
						:style="{background:background1}" style="margin-left: 50upx;" @click="goReturn">
						修改物流单号
					</view>
					<view v-if='refundData.status==40||refundData.status==90' class="returnGoodDtoBottomClick"
						:style="{background:background1}" style="margin-left: 50upx;" @click="ChangeReturn">
						修改申请
					</view>
				</view>
			</view>

		</view>
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
	import '@/static/LHT/returnOrderDetail.css'

	import {
		getOrderRefundDetail,
		getOrderRefundStatusEnum,
		revoke,
		getLogisticsTrajectory
	} from '@/api/orderListApi.js'
	import {
		getUrl,
		getRouter,
		refresh
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				refundData: {},
				refundId: '',
				style: {},
				color: '',
				color1: '',
				background: '',
				background1: '',
				imageURL: '',
				imageURL1: '',
				imageURL2: '',
				imageURL3: '',
				imageURL4: '',
				imageURL6: '',
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				deliverFlag: false,
				msg: '',
				deliveryNo: "",
				deliverMsgList: [],
				deliverList: [],
				logisticsCompanyCode: '',
				deliveryCompanyName: '',
				orderType:null,
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
			this.color = this.style.logincheckbox
			this.color1 = this.style.returntext
			this.background = this.style.placeOrderrgb
			this.background1 = this.style.returntext
			this.imageURL = this.style.placeOrdericon
			this.imageURL1 = this.style.returnOrderone
			this.imageURL2 = this.style.returnOrdertwo
			this.imageURL3 = this.style.returnOrderthree
			this.imageURL4 = this.style.returnOrderfour
			this.imageURL6 = this.style.returnOrdersix
			this.refundId = opt.refundId		
			this.orderType = opt.orderType
			this.deliveryCompanyName = opt.deliveryCompanyName
			if(this.logisticsCompanyCode){
				this.logisticsCompanyCode=item.logisticsCompanyCode
			}
			this.getOrderRefund(opt.refundId)
			this.getHeight()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 复制物流单号
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
			},
			openDeliver(item) {
				this.deliverFlag = true
				this.logisticsCompanyCode = item.logisticsCompanyCode
				this.deliveryNo = item.deliveryNo
				this.deliveryCompanyName=item.deliveryCompanyName
				this.getTrajectory(this.logisticsCompanyCode, this.deliveryNo)
			},
			// 物流轨迹
			getTrajectory(logisticsCompanyCode,deliveryNo) {
				getLogisticsTrajectory(logisticsCompanyCode, deliveryNo).then(res => {
					uni.showLoading({
						title: '加载中...'
					});
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
					if (res.success) {
						this.deliverMsgList = res.data
						this.deliverList = res.data.list
					}
				})
			},
			// 返回
			back() {
				uni.redirectTo({
					url: '/personalPage/orderPage'
				})
			},
			// 获取头部相关信息
			getHeight() {
				//  获取状态栏信息
				let stateHeight = 0; //  接收状态栏高度
				const navHeight = wx.getMenuButtonBoundingClientRect().height; //  获取胶囊高度
				let top = 0;
				wx.getSystemInfo({
					success(res) {
						stateHeight = res.statusBarHeight;
					},
				});
				top = wx.getMenuButtonBoundingClientRect().top - stateHeight; //  获取top值
				this.menuButtonInfo = navHeight
				this.statusBarHeight = stateHeight + top
			},
			// 下拉刷新
			getDataMsg() {
				this.getOrderRefund(this.refundId);
				this.getRefundReason();
				getRouter();
			},
			getOrderRefund(orderRefundId) {
				var data = {
					orderRefundId: orderRefundId
				}
				getOrderRefundDetail(data).then(res => {
					this.refundData = res.data
					if(!this.logisticsCompanyCode){
						this.logisticsCompanyCode=res.data.logisticsCompanyCode
					}
			
				})
			},
			ChangeReturn() {
				uni.navigateTo({
					url: '/personalPage/returnType?type=' + this.refundData.refundType + '&refundCode=' + this
						.refundData.refundCode + '&orderCode=' + this.refundData.orderCode + '&orderRefundId=' +
						this.refundId
				})
			},
			getRefundReason() {
				getOrderRefundStatusEnum().then(res => {
					// console.log(res)
				})
			},
			copyBtn() {
				let text = '' + this.refundData.accountName + this.refundData.mobile + this.refundData.countryName + this
					.refundData.cityName + this.refundData.areaName + this.refundData.detailAddress
				uni.setClipboardData({
					data: text,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					}
				});
			},
			goReturn() {
				if (this.refundData.status == 50) {
					
					uni.navigateTo({
						url: '/personalPage/logistics?orderRefundId='+ this.refundId + '&deliveryCompanyName=' +
							this.refundData.deliveryCompanyName + '&deliveryNo=' + this.refundData.deliveryNo +
							'&logisticsCompanyCode=' + this.logisticsCompanyCode
					})
				}
				if (this.refundData.status == 60 || this.refundData.status == 80) {

					uni.navigateTo({
						url: '/personalPage/logistics?orderRefundId=' + this.refundId + '&deliveryCompanyName=' +
							this.refundData.deliveryCompanyName + '&deliveryNo=' + this.refundData.deliveryNo +
							'&logisticsCompanyCode=' + this.logisticsCompanyCode
					})
				}
			},
			goRevoke(refundCode) {
				let data = {
					refundCode: refundCode
				}
				let that = this
				uni.showModal({
					title: '提示',
					content: '您是否确认撤销申请',
					success: function(res) {
						if (res.confirm) {
							revoke(data).then(res => {
								if (res.code == '0') {
									that.getOrderRefund(that.refundId)

								}
							})
						}
					}
				});

			}
		}
	}
</script>

<style scoped lang="less">
	@import url('@/static/LHT/placeOrder.css');

	.returnOrderPage {
		padding-bottom: 50upx;

		.header_text {
			position: fixed;
			z-index: 999;
			width: 100%;
			display: flex;
			background-color: #FFFFFF;

			.title {
				width: 100%;
				margin-left: 275upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				// font-weight: bold;
				color: #212121;
			}
		}

		.returnOrderStauts {
			width: calc(100% - 200upx);
			margin: 41upx auto 0;
			text-align: center;

			.returnOrderCotentImg {
				width: 56upx;
				margin: 0 auto;

				image {
					width: 56upx;
					height: 56upx;
				}
			}

		}

		.deliverGoods {
			width: calc(100% - 60upx);
			margin: 50upx auto 0;
			background-color: #FFFFFF;
			height: 248upx;
			border-radius: 15upx;

			.returnOrderText {
				width: calc(100% - 60upx);
				margin: 0 auto;

				padding-top: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 34upx;

			}

			.returnOrderContent {
				width: calc(100% - 60upx);
				margin: 30upx auto 0;

				.deliveryCompanyName {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #67686B;
				}

				.deliveryNo {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}

				image {
					width: 30upx;
					height: 30upx;
					margin-top: 8upx;
					padding-right: 10upx;

				}
			}

		}

		.returnGoodReason {
			width: calc(100% - 60upx);
			margin: 50upx auto 0;
			background-color: #FFFFFF;
			padding-bottom: 40upx;

			.returnOrderText {
				width: calc(100% - 60upx);
				margin: 0 auto;
				padding-top: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 34upx;

				image {
					width: 24upx;
					height: 24upx;
					margin-left: 7upx;
				}

				span {
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #67686B;
				}

			}

			.returnGoodDetail {
				width: calc(100% - 60upx);
				margin: 32upx auto 0;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.returnOrderContent {
				width: calc(100% - 60upx);
				margin: 30upx auto 0;
				min-height: 130upx;
				background: #F8F8F8;
				border-radius: 10upx;
				// margin-top: 30upx;
				box-sizing: border-box;
				padding: 20upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #67686B;
			}
		}

		.returnOrder {
			width: calc(100% - 60upx);
			// height: 206upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin: 50upx auto 0;
			padding-bottom: 20upx;

			.returnOrderText {
				width: calc(100% - 60upx);
				margin: 0 auto;
				padding-top: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 34upx;
			}

			.returnOrderTime {
				display: flex;
				align-items: center;
				width: calc(100% - 60upx);
				margin: 35upx auto 0;

				.returnOrderImgText1 {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #929396;
					line-height: 34upx;
					margin-left: 24upx;
					margin-top: 0upx;
				}

				.returnOrderImgTime1 {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #929396;
				}


				.returnOrderGer {
					width: 26upx;
					height: 26upx;
					border-radius: 50%;
					position: relative;
					margin-top: -30upx;

					.returnOrderImgRe {
						width: 26upx;
						height: 26upx;

						background: #929396;
						opacity: 0.12;
						border-radius: 50%;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					.returnOrderImgAb {
						position: absolute;
						width: 14upx;
						height: 14upx;
						background: #929396;
						border-radius: 50%;
						opacity: 1 !important;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.returnOrderImg {
					width: 26upx;
					height: 26upx;
					border-radius: 50%;
					position: relative;
					margin-top: -30upx;
				}
			}
		}

		.returnGoodDto {
			width: calc(100% - 60upx);
			margin: 15upx auto 20upx;
			background: #FFFFFF;
			border-radius: 15px;

			.returnGoodDtoLv {
				width: calc(100% - 60upx);
				margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				padding-top: 40upx;
			}

			.returnGood {
				width: calc(100% - 60upx);
				margin: 30upx auto 0;

				.returnGoodDtos {
					padding-bottom: 20upx;
					width: 100%;
					display: flex;

					image {
						width: 180upx;
						height: 180upx;
						border-radius: 10upx;
						overflow: hidden;
					}

					.returnGoodDtoTitle {
						width: 411upx;
						margin-left: 19upx;

						.returnGoodDtoText {
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							overflow: hidden;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #202021;
							margin-top: 11upx;
						}

						.returnGoodDtoBrand {
							margin-top: 20upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.sale {
							text-align: right;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							margin-top: 10upx;
						}

						.returnGoodDtoPrice {
							width: 100%;
							margin-top: 25upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							display: flex;

							.returnGoodDtoPriceFlex {
								width: 100%;
								display: flex;
								justify-content: space-between;
								color: #F33C0A;

								.returnGoodDtoPriceNum {
									font-size: 28upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #9FA0A5;
								}
							}
						}
					}
				}
			}


		}

		.returnGoodDtoRecord {
			width: calc(100% - 60upx);
			margin: 0 auto 116upx;
			// height: 100upx;
			padding-bottom: 20upx;
			background-color: #FFFFFF;
			border-radius: 15upx;

			.returnGoodDtoLv {
				width: calc(100% - 60upx);
				margin: 0 auto;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				padding-top: 40upx;
			}

			.returnGoodDtoDetail {
				width: calc(100% - 60upx);
				margin: 15upx auto 0;

				.returnGoodDtoFlex {
					// height: 80upx;
					margin-bottom: 20upx;
					display: flex;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #67686B;

					.returnGoodDtoReason {
						width: 455upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						margin-left: 30upx;
					}
				}
			}

		}

		.returnGoodDtoBottom {
			width: 100%;
			height: 98upx;
			box-shadow: 0px 6px 21px 6px rgba(238, 238, 238, 0.66);
			background: #FFFFFF;
			position: fixed;
			bottom: 0;

			.returnGoodDtoBottomFlex {
				width: calc(100% - 60upx);
				display: flex;
				justify-content: space-between;
			}

			.returnGoodDtoBottomBtn {
				width: 220upx;
				height: 70upx;
				background: #FFFFFF;
				border: 1upx solid #AEAEAE;
				border-radius: 35upx;
				text-align: center;
				line-height: 70upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-top: 14upx;
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