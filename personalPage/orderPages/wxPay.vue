<template>
	<view class="wxPay">
		<!-- <view  class="" style="height: 80upx;display: flex;padding-top: 80upx;">
			<view class="" style="width:50upx;" @click="backLastPageBtn">
				<image style="width: 30upx;height: 33upx;margin-left:40upx;"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/back_arrow.png" mode="widthFix"></image>
			</view>
			<view class="" style="margin-left: 260upx;font-weight: 500;">
				收银台
			</view>
		</view> -->
		
		<view class="needPay">
			需支付
		</view>
		<view class="needPayPrice">
			<span>￥</span> {{price}}
		</view>
		<view class="plaseChoosePay">
			请选择支付方式
		</view>
		<view class="wxPayContent">
			<view class="wxPayFlex">
				<view class="wxPaySamllFlex">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/wxPayImg.png" mode="">
					</image>
					<view class="">
						微信支付
					</view>
				</view>
				<view class="checkAll" @click="checkedAll">
					<view class="allGoodsChoose"
						:style="{'border-color':(flage ? backgrounds : '#999999'),background:(flage ? backgrounds : '')}">
						<icon v-if="flage" type="success_no_circle" size="12" color="#fff" />
					</view>
				</view>
			</view>
		</view>
		<view class="wxPayBtn" :style="[{ background:  backgrounds }]" @click="goPay">使用微信支付</view>
	</view>
</template>

<script>
	import { wxGetOpenId, wxJsPay } from '@/api/confirmOrder.js'
	import { getStyleById } from '@/api/indexApi'
	import WxmpRsa from 'wxmp-rsa'
	import base64 from '@/js_sdk/js-base64/base64.js'
	import CryptoJS from 'crypto-js'
	import {
		toast
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				flage: false,
				code: '',
				oppenId: '',
				orderCode: '',
				price:'',
				styles:{},
				color: '',
				background: '',
				backgrounds: '',
			}
		},
		onLoad(opt) {
			this.orderCode = opt.orderCode
			this.price=opt.price
		},
		onShow() {
			this.getStyleByIdList()
		},
		methods: {
			getStyleByIdList() {
				// var id = 1
				getStyleById().then(res => {
					this.styles = res.data
					this.color = res.data.loginbtn
					this.backgrounds = res.data.addressadd
					this.background = res.data.goodsListaa
					// console.log(this.styles,'styles')
				})
			},
			backLastPageBtn(){
				uni.navigateTo({
					url: '/personalPage/orderDetail?orderCode=' + this.orderCode
				})
			},
			checkedAll() {
				this.flage = !this.flage
			},
			goPay() {
				if (this.flage) {
					wx.login({
						success: (loginRes) => {
							this.code = loginRes.code
							wxGetOpenId(this.code).then(res => {
								if (res.data) {
									this.oppenId = res.data
									var data = {
										openid: this.oppenId,
										orderCode: this.orderCode
									}
									wxJsPay(data).then(ress => {
										if (ress.data) {
											// var item = JSON.parse(ress.data); 
											wx.requestPayment({
												timeStamp: ress.data.timeStamp,
												nonceStr: ress.data.nonceStr,
												package: ress.data.package,
												signType: 'RSA',
												paySign: ress.data.paySign,
												success(ress) {
													uni.redirectTo({
														url: '/personalPage/orderDetail?orderCode=' + this.orderCode
													})
												},
												fail(ress) {
												},
												complete(ress) {
												}
											})
										}
									})
								}
							})
						}
					})
				}else{
					toast({
						title:'请勾选支付方式'
					})
				}
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.wxPay {
		width: 702upx;
		margin: 0 auto;
		text-align: center;

		.needPay {
			font-size: 26upx;
			margin-top: 83upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}

		.needPayPrice span {

			font-size: 35upx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}

		.needPayPrice {
			margin-top: 55upx;
			font-size: 67upx;
			padding-bottom: 66upx;
			border-bottom: 2upx solid #EEEEEE;
		}

		.plaseChoosePay {
			margin-top: 58upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}

		.wxPayContent {
			.wxPayFlex {
				display: flex;
				justify-content: space-between;
				margin-top: 89upx;

				.wxPaySamllFlex {
					display: flex;
					align-items: center;

					image {
						width: 60upx;
						height: 48upx;
					}

					view {
						margin-left: 25upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}

				.checkAll {
					display: flex;
					align-items: center;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					.allGoodsChoose {
						width: 20upx;
						height: 20upx;
						border-radius: 32upx;
						border: 2upx solid #999999;
						margin-right: 16upx;
						padding: 6upx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

			}

		}

		.wxPayBtn {
			width: 702upx;
			// background: linear-gradient(90deg, #E1251B, #F33E34);
			height: 70upx;
			line-height: 70upx;
			text-align: center;
			border-radius: 35upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			position: absolute;
			bottom: 30upx;
		}
	}
</style>
