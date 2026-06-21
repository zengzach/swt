<template>
	<view class="place_order">
		<!-- <view class="place_order_top"> </view> -->
		<view class="place_order_one">
			<view class="place_order_img"  :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
			<view class="place_order_one_tips">提交订单成功</view>
			<view class="place_order_price"><text>{{ currentTime }}</text>秒后自动跳转至订单页面</view>
			<view class="place_order_detail">
				<view>订单号</view>
				<view>{{orderCode}}</view>
			</view>
			<view class="place_order_detail">
				<view>支付方式</view>
				<view>{{payType}}</view>
			</view>
			<view class="place_order_detail">
				<view>支付金额</view>
				<view>￥{{orderAmount}}</view>
			</view>
			<view class="place_order_two" v-if="remittance.length>0">
				<view class="place_order_two_title">线下转账信息</view>
				<view class="place_order_table">
					<view>户名</view>
					<view>{{remittanceMsg.collectingCompany}}</view>
				</view>
				<view class="place_order_table">
					<view>账号</view>
					<view>{{remittanceMsg.shroffAccountNumber}}</view>
				</view>
				<view class="place_order_table">
					<view>开户行</view>
					<view>{{remittanceMsg.dueBank}} {{remittanceMsg.openingBank}}</view>
				</view>
				<view class="place_order_two_tips">
					<view class="image">
						<image src="../../static/icon.png" mode="" style="width: 40upx;height: 40upx;margin-left: -30upx;margin-top: -15upx;"></image>
					</view>
					<view class="place_order_two_top">
						<view>1.下单后请尽快打款至平台指定的银行账户，并及时告知 您的客服，以便您能尽快收到货品;</view>
						<view>2.请确保您的转账金额与订单金额一致，否则将影响订单 的对账进度。</view>
					</view>
				</view>
			</view>
			<view class="place_order_two" v-else>
				<view class="place_order_two_tips">
					<view class="image"></view>
					<view class="place_order_two_top">
						<view>目前系统仅支持线下转账，商家暂未维护“线下转账银行信息”请咨询客服</view>
					</view>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	import {
		selectBankList
	} from '@/api/personal.js'
	export default {
		data() {
			return {
				remittance: '',
				remittanceMsg: [],
				currentTime: 3,
				timer: '',
				orderAmount: '',
				orderCode: '',
				payType: '',
				style:{},
				imageURL:''
			}
		},
		onBackPress(e) {
			// 这里可以自定义返回逻辑，比如下面跳转其他页面
			// uni.switchTab({
			// 	url: '/pages/tabBar/mine/mine'
			// });
			// return true 表示禁止默认返回
			return true
		},
		onLoad(opt) {
			this.style = uni.getStorageSync('style')
			this.imageURL = this.style.placeOrderbg		
			this.orderAmount = opt.orderAmount
			this.payType = opt.payType
			this.orderCode = opt.orderCode
			this.getReceiptBankData()
			this.countDown()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			toOrderDetail() {
				uni.navigateTo({
					url: '../orderDetail/orderDetail'
				})
			},
			getReceiptBankData() {
				selectBankList().then(res => {
					// console.log(res,"银行信息")
					this.remittance = res.data
					this.remittanceMsg = res.data[0]
				})
			},
			countDown() {
				let _this = this
				_this.timer = setInterval(() => {
					if (_this.currentTime > 1) {
						_this.currentTime--
					} else {
						clearInterval(_this.timer)
						uni.reLaunch({
							url: '../../personalPage/orderPage'
						})
					}
				}, 1000)
			},
		}
	}
</script>
<style>
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	@import url('@/static/LHT/placeOrder.css');

	.place_order {
		width: calc(100% - 46upx);
		padding: 18upx 23upx 20upx;
		position: relative;

		.place_order_top {
			width: calc(100% + 46upx);
			height: 132upx;
			background-color: #FFFFFF;
			margin-bottom: 24upx;
		}

		.place_order_one {
			width: 705upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/orderimg.png');
			background-size: 100% 100%;

			image {
				padding: 16upx;
				background-color: #FFFFFF;
				border-radius: 50%;
			}

			.place_order_one_tips {
				margin-top: 30upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
			}

			.place_order_price {
				text {
					color: #E1251B;
				}

				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-top: 25upx;
				margin-bottom: 35upx;
			}

			.place_order_detail {
				display: flex;
				width: 642upx;
				justify-content: space-between;
				margin: 0 auto;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				line-height: 80upx;
			}
		}

		.place_order_two {
			width: calc(100% - 46upx);
			margin-top: 5upx;
			padding: 0upx 23upx 50upx;

			.place_order_two_title {
				width: 100%;
				border-top: 1upx solid #EEEEEE;
				padding: 55upx 0 10upx;
				display: flex;
				align-items: center;

				view {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				image {
					width: 30upx;
					height: 30upx;
					margin-left: 24upx;
				}
			}

			.place_order_table {
				display: flex;
				width: 642upx;
				justify-content: space-between;
				margin: 0 auto;

				view {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 70upx;
				}

				view:nth-child(1) {
					width: 140upx;
				}
			}


		}
	}
</style>
