<template>
	<view class="askForPricePage">
		<view class="askForPriceList">
			<view class="askForPriceContent2">
				<view style="color: #fff;font-size: 88upx;font-weight: 700;position: absolute;top: 120upx;left: 160upx;">
					新人免费领
				</view>
				<view style="width: 600upx;color: #fff;font-size: 28upx;font-weight: 500;position: absolute;top: 160upx;left: 180upx;margin: 100upx auto;">
					注册即赠送{{packages.giftName}}
				</view>
				<img style='width: 100%;'
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/%E6%A4%AD%E5%9C%86%201372%402x.png" alt=""
					srcset="">
			</view>
			<view class="askForPriceContent">
				<view style="color:#FB4439;font-size: 30upx;font-weight: 500;width: 100%;text-align: center;">
					限量{{packages.stockAmount}}份，领完为止
				</view>
				<view class="askForPriceName">
					<view class="goods">
						<image v-if="packages.giftPackType == 20" :src="packages.giftContent.goodsImg" mode=""></image>
						<image v-if="packages.giftPackType == 10" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/%E7%BB%84%20220%402x%20%281%29.png" mode=""></image>
						<view class="goodsFont1" v-if="packages.giftPackType == 20">{{packages.giftContent.goodsTitle}}</view>
						<view class="goodsFont2" v-if="packages.giftPackType == 10">{{packages.giftContent}}<span style='font-size: 24upx;'>积分</span></view>
						<span style="color: #FF5000;font-size: 26upx;margin-left:20upx" v-if="packages.giftPackType == 20">￥{{packages.giftContent.price}}</span> <span style="color: #9FA0A5;font-size: 24upx;margin-left: 100upx;" v-if="packages.giftPackType == 20">*1</span>
					</view>
				</view>	
				<view class="imgContent">
					<view class="mostImg">
						活动时间
					</view>
					<view class="mostImg">
						{{packages.startTime}}至{{packages.endTime}}
					</view>
				</view>
			</view>
			<button class="lastBtn" @click="sureBtn">
				注册领取
			</button>
		</view>
		<view style="width: 100%;height: 20upx;"></view>

	</view>
</template>

<script>
	import {
		toast,
		getRouter,
		getUrl,
		refresh,
		consult_upload_file,
		verifyMobileNumber
	} from '@/utils/utils.js'
	import {
		getAppGiftPack
	} from '@/api/indexApi'
	export default {
		data() {
			return {
				packages:{},
			}
		},
		onLoad(data) {
			this.getGiftPack()
		},
		onShow() {
			getRouter()
		},
		methods: {
			getGiftPack() {
				getAppGiftPack().then(res => {
					if (res.code == '0') {
						this.packages = res.data
					}else{
						
					}
				})
			},
			sureBtn() {
				uni.navigateTo({
					url: '/loginPages/register'
				})
			}

		},
	}
</script>

<style lang="less" scoped>
	// @import url('@/static/LHT/orderPage.css');
	.askForPricePage {
		.askForPriceList {
			.askForPriceContent2 {
				width: 100%;
				height: 350upx;
				border-radius: 15upx;
				margin: 0 auto;
				// position: relative;
				// color: #212121;
			}

			.askForPriceContent {
				width: 688upx;
				height: 670upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin: 0 auto;
				margin-top: 20upx;
				padding-top: 40upx;
				position: relative;
				top: 60;
				left: 30;
				// z-index: 999;

				.askForPriceName {
					width: 440upx;
					margin: 0 auto;
					background: linear-gradient(-70deg, #F53B3C 0%, #F53B3C 100%);
					// height: 28upx;
					padding: 40upx;
					border-radius: 20upx;
					position: relative;
					top: 120upx;
					left: 30;
					.goods {
						width: 420upx;
						height: 116upx;
						background: #fff;
						// position: absolute;
						// top: 200upx;
						// left: 29upx;
						border-radius: 10upx;
						line-height: 106upx;
						
						image {
							width: 90upx;
							height: 90upx;
							margin-top: 12upx;
							margin-left: 10upx;
						}
						
						.goodsFont1 {
							color:#5B5B5B;
							font-size: 26upx;
							font-weight: normal;
							margin-left: 45upx;
							margin-top: 10upx;
							position: absolute;
							top: 2upx;
							left: 110upx;
						}
						
						.goodsFont2 {
							color:#F69000;
							font-size: 48upx;
							font-weight: normal;
							position: absolute;
							top: 40upx;
							left: 170upx;
						}
						
					}
				}


				.imgContent {
					// margin-left: 10upx;
					margin-top: 200upx;
					min-height: 300upx;
					max-height: 1000upx;

					.getImg {
						width: 100upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #212121;
						padding-left: 30upx;
					}

					.imgs {
						display: flex;
						margin-top: 20upx;
						margin-left: 8upx;
					}

					.mostImg {
						width: 100%;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #B0B1B6;
						text-align: center;
						margin-top: 20upx;
						margin-bottom: -20upx;
					}

				}
			}


		}









		.actColor {
			color: #08AE63;
		}

		.askForPriceContent1 {
			width: 688upx;
			height: 280upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin: 0 auto;
			margin-top: 20upx;
			padding: 20upx 0;
			color: #212121;

			.askForPriceForm {
				display: flex;
				width: calc(96%-20upx);
				padding: 0 20upx;
				justify-content: space-between;
				text-align: right;
				margin-top: 40upx;
				color: #212121;
			}
		}

		.lastBtn {
			width: 690upx;
			height: 70upx;
			background: linear-gradient(90deg,#FC684E, #FB4439);
			border-radius: 35upx;
			margin: 40upx auto;
			text-align: center;
			line-height: 70upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;

		}

	}
</style>
<style scoped lang="less">
	::v-deep .file-picker__box {
		width: 140upx !important;
		height: 140upx !important;
		padding: 0 !important;
	}

	::v-deep .uni-file-picker__container {
		height: 140upx !important;
	}
</style>
