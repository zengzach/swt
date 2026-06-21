<template>
	<view>
		<view class="GiftTop">
			<view class="" :style="{paddingTop:statusBarHeight+'px'}">
				<image @click="backGoods"
					src='https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png'
					style='width: 40upx;height:40upx'></image>
			</view>
			<view class="shareTextPlain" @click="openRxplain">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png"
					mode=""></image>
				<view class="">
					活动说明
				</view>


			</view>
			<view class="GiftTopTime">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png"
					mode=""></image>
				<view class="">
					活动时间：2023.04.06 15:23:00 至 2023.05.26 15:23:00
				</view>

			</view>

		</view>
		<view class="shareNumContent">
			<view class="friendNum">
				每分享<span>2</span>个好友可得
			</view>
			<view class="friendGoods">
				<view class="shareGoodsImg">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
				</view>
				<view class="shareGoodsNews">
					<view class="GiftGoodsName">商品分享获得赠品</view>
					<view class="GiftPrice">
						<view class="GiftPriceLeft">
							<span>￥</span>
							200
						</view>
						<view class="shareGoods">
							*1
						</view>
					</view>
				</view>
				<view class="FinishImg">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
				</view>
			</view>
			<!-- 	<view class="friendGoods">
				<view class="shareGoodsImg">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
				</view>
				<view class="shareGoodsNews">
					<view class="GiftPrice">
						100积分
					</view>
				</view>
			</view> -->

			<view style="height: 20upx;">

			</view>
		</view>
		<view class=" sharePage">
			<view class="typePageTitle">
				可分享页面
			</view>
			<view class="line">

			</view>
			<view class="typePageOne">
				<view class="PageName">
					商城首页
				</view>
				<view class="typePageBtn">
					去分享
				</view>
			</view>
			<view class="typePageOne">
				<view class="PageName">
					免费领样品
				</view>
				<view class="typePageBtn">
					去分享
				</view>
			</view>
			<view class="typePageOne">
				<view class="PageName">
					品牌专区
				</view>
				<view class="typePageBtn">
					去分享
				</view>
			</view>
			<view class="typePageOne">
				<view class="PageName">
					产品分类
				</view>
				<view class="typePageBtn">
					去分享
				</view>
			</view>
		</view>
		<view class="shareProduct">
			<view class="ProductTitle">
				<view class="ProductTitleLeft">
					可分享的商品
				</view>
				<view class="ProductTitleRight">
					查看更多>
				</view>
			</view>
			<view class="ProductLine">

			</view>
			<view class="">
			</view>

		</view>

		<view class="awardContent">
			<view class="awardTitle">
				<view class="myAwardName">我获得的奖励<span>共2次</span></view>
				<view class="myAwardMore" @click="goShareDetailBtn">查看全部奖励 ></view>
			</view>
			<view class="awardTitleContent">
				<view class="awaerImgs">
					<view class="awaerImgsStyle">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
					</view>
					<view class="awardTime">
						646565656265
					</view>
				</view>
				<view class="awardED">
					领取赠品
				</view>
			</view>
			<view class="awardTitleContent">
				<view class="awaerImgs">
					<view class="awaerImgsStyle">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
					</view>
					<view class="awardTime">
						646565656265
					</view>
				</view>
				<view class="awardED">
					领取赠品
				</view>
			</view>
			<view class="shareType">
				<view class="shareTypeTop">
					<view class="TypeImg">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
					</view>
					<view class="TypeImgRight">
						<view class="TypeShareNum">
							分享两位好友可得<span>100积分</span>
						</view>
						<view class="TypeShareMore">
							最多得2次 查看详情>
						</view>
					</view>
				</view>
				<view class="shareWechatContent">
					<view class="shareWechatLeft">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<view class="ShareStyle">
							分享好友
						</view>
					</view>
					<view class="shareWechatLeft">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
						</image>
						<view class="ShareStyle">
							分享海报
						</view>
					</view>
				</view>
			</view>
		</view>



		<uni-popup class="add_popup" ref="addCartPopup">
			<view class="addCartPopup">
				<view class="addCartTitle">
					<view class='addCartText'>
						活动说明
					</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="closeCartPopup"></image>
				</view>
				<view class="ActText">
					
					<view class="ActTextCenter">
						<view class="">
							分享(商品]给好友，12个好友登录浏览视为分享成功
						</view>
						<view class="">
							.分享成功后分享者可获得[赠品。获得的奖励将自动发放至账户
						</view>
						<view class="">
							.[每日]最多可获得(13次
						</view>
						<!-- <view class="">
							[赠品需要自己领取下单。}
						</view> -->
					</view>
					
				</view>
				<view class="otherText">
					<view class="otherTitle">
						其他说明
					</view>
					<view class="">
						1.活动时间:{2023年4月17日13:24:07-2023年4月17日14:13:11}

					</view>
					<view class="">
						2.活动有效期内重复分享给相同好友视为一次有效分享.
					</view>
					<view class="">
						3.若奖励未到帐请联系客服进行处理。奖励的使用有效期以实际发放奖励为准请及时使用
					</view>
					<view class="">
						4.通过不正当手段参与活动获得奖励,店铺有权撤销奖励。如有疑问请联系店铺客服。
					</view>
				</view>
				<view class="shareKnowBtn">
					我知道了
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	// import {

	// } from '@/api/commonApi.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				menuButtonInfo: 0,
			}
		},
		onShow() {
			this.getHeight()
		},
		onLoad(option) {

		},
		methods: {
			// 分享有礼
			goShareDetailBtn() {
				uni.navigateTo({
					url: '/personalPage/share/shareDetail'
				})
			},
			openRxplain() {
				this.$refs.addCartPopup.open('bottom')

			},
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
				// console.log(this.statusBarHeight, 'this.statusBarHeight');
			},
		}
	}
</script>

<style scoped lang="scss">
	.GiftTop {
		width: 100%;
		height: 633upx;
		background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleBackground.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.GiftTopTime {
			width: 690upx;
			height: 48upx;
			background: #FFFFFF;
			border-radius: 12upx;
			margin: 293upx auto 0;
			display: flex;

			image {
				width: 20upx;
				height: 20upx;
				margin: 10upx 20upx;
			}

			view {
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #E1251B;
				line-height: 48upx;
			}
		}

		.shareTextPlain {
			width: 140upx;
			height: 40upx;
			background: #FFBFB2;
			border-radius: 20upx 0upx 0upx 20upx;
			margin-left: 610upx;
			font-size: 20upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			// line-height: 40upx;
			text-align: center;
			margin-top: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 22upx;
				height: 22upx;
				margin-left: 10upx;
			}

			view {
				margin-right: 20upx;
			}
		}
	}

	.shareNumContent {
		width: 690upx;
		background-color: #fff;
		// height: 500upx;
		border-radius: 20upx;
		margin: 20upx auto 0;
		background-color: #fff;
		margin-top: -100upx;


		.friendNum {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #34393D;
			padding-top: 47upx;
			margin-left: 22upx;

			span {
				color: #E1251B;
			}
		}

		.friendGoods {
			display: flex;
			justify-content: space-between;
			margin-left: 20upx;
			margin-top: 30upx;
			width: 650upx;
			height: 118upx;
			background: rgba(255, 191, 178, 0.2);

			.shareGoodsImg {
				width: 78upx;
				height: 78upx;
				margin: 20upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.shareGoodsNews {

				// margin-left: 40upx;
				.GiftGoodsName {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #EE281E;
					margin-top: 20upx;
				}

				.GiftPrice {
					display: flex;
					margin-top: 20upx;

					.GiftPriceLeft {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #E1251B;
						// span{

						// }

					}

					.shareGoods {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-left: 20upx;
					}
				}
			}

			.FinishImg {
				width: 82upx;
				height: 82upx;
				margin-top: 20upx;
				margin-left: 200upx;
				margin-right: 20upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}



		.typePage {
			display: flex;
			justify-content: space-between;
			margin-left: 20upx;
			margin-top: 20upx;

			.PageName {
				background: #FFFFFF;
				border-radius: 30upx;
				margin-left: 20upx;
			}

			// .typePageBtn{
			// 	margin-left: ;
			// }
		}
	}

	.sharePage {
		width: 690upx;
		height: 450upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin: 20upx auto 0;

		.typePageTitle {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #34393D;
			padding-top: 46upx;
			margin-left: 20upx;

			// margin-left: 20upx;
			// margin-top: 30upx;
		}

		.line {
			width: 654upx;
			height: 1upx;
			border: 1upx solid #EEEEEE;
			background-color: #EEEEEE;
			margin: 16upx auto 20upx;
		}

		.typePageOne {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20upx;
			margin-top: 30upx;

			.PageName {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
			}

			.typePageBtn {
				width: 103upx;
				height: 47upx;
				background: linear-gradient(90deg, #FF5A4F, #FF3A2D);
				border-radius: 23upx;
				margin-right: 20upx;
				font-size: 23upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 47upx;
			}

		}
	}


	.shareProduct {
		width: 691upx;
		height: 842upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin: 10upx auto 0;

		.ProductTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 45upx;

			.ProductTitleLeft {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #34393D;
				margin-left: 20upx;
			}

			.ProductTitleRight {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9FA0A5;
				margin-right: 20upx;
			}
		}

		.ProductLine {
			width: 654upx;
			height: 1upx;
			border: 1upx solid #EEEEEE;
			background-color: #EEEEEE;
			margin: 16upx auto 20upx;

		}
	}

	.awardContent {
		width: 690upx;
		background-color: #fff;
		height: 500upx;
		border-radius: 15upx;
		margin: 20upx auto 0;

		.awardTitle {
			display: flex;
			justify-content: space-between;
			padding-top: 20upx;
			margin-left: 20upx;

			.myAwardName {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.myAwardMore {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9FA0A5;
				margin-right: 20upx;
			}

		}

		.awardTitleContent {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20upx;
			margin-left: 20upx;
			border-top: 1upx solid #9FA0A5;

			.awaerImgsStyle {
				display: flex;

				image {
					width: 48upx;
					height: 48upx;
					margin-top: 28upx;
					margin-right: 12upx;
				}
			}

			.awardTime {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			.awardED {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #9FA0A5;
				margin-right: 20upx;
			}
		}
	}

	.GiftButtom {
		width: 100%;
		text-align: center;
		margin-top: 50upx;
	}

	.shareType {
		width: 690upx;
		height: 400upx;
		background-color: #fff;
		border-radius: 20upx;
		margin: 50upx auto 0;

		.shareTypeTop {
			padding-top: 30upx;
			display: flex;
			margin-left: 20upx;

			.TypeImg {
				image {
					width: 88upx;
					height: 88upx;
				}
			}

			.TypeImgRight {
				margin-left: 50upx;

				.TypeShareNum {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #34393D;

					span {
						color: #EE281E;
					}
				}

				.TypeShareMore {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
				}
			}
		}

		.shareWechatContent {
			width: 634upx;
			border-top: 1upx solid #EEEEEE;
			display: flex;
			margin: 30upx auto 0;
			padding-top: 30upx;

			.shareWechatLeft {
				margin-left: 140upx;

				image {
					width: 100upx;
					height: 100upx;
				}

				.ShareStyle {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}
			}
		}
	}

	.add_popup {
		.addCartPopup {
			width: 100%;
			background-color: #fff;
			border-radius: 15upx 15upx 0 0;
			padding-bottom: 50upx;
			position: relative;
			bottom: 0;

			.addCartTitle {
				width: 100%;
				padding: 39upx 0;
				text-align: center;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;

				.addCartText {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #34393D;
				}

				image {
					width: 30upx;
					height: 30upx;
					position: absolute;
					top: 40upx;
					right: 21upx;
				}
			}

			.ActText {
				width: 688upx;
				height: 228upx;
				background: rgba(225, 37, 27, 0.1);
				border-radius: 20upx;
				margin: 0 auto;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #EE281E;
				text-align: left;
				line-height: 44upx;
				.ActTextCenter{
					padding: 20upx;
				
					view {
						margin-left: 20upx;
						margin-right: 20upx;
					
					}
					
				}
			

			

			}

			.otherText {
				.otherTitle {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					margin-left: 30upx;
				}
				view{
					width: 632upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #9FA0A5;
					line-height: 44upx;
					margin-left: 30upx;
				}

			}

			.shareKnowBtn {
				width: 690upx;
				height: 70upx;
				background: linear-gradient(90deg, #FF5A4F, #FF3A2D);
				border-radius: 35upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				text-align: center;
				line-height: 70upx;
				margin: 90upx auto 0;
			}
		}
	}
</style>
