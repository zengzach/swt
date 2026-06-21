<template>
	<view class="shareDetailPage">
		<view class="shareName">
			分享有礼奖励
		</view>
		<view class="shareDetail">
			<view class="shareImgContent">
				<view class="shareLeftImg">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
				</view>
				<view class="shareTime">
					2023:12:30:15:002222
				</view>
			</view>
			<view class="shareRight">
				<view class="shareTextContent">
					优惠券：满200减
				</view>
				<view class="shareType">
					已发放
				</view>
			</view>
		</view>
		<view class="shareDetail">
			<view class="shareImgContent">
				<view class="shareLeftImg">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode="">
					</image>
				</view>
				<view class="shareTime">
					2023:12:30:15:002222
				</view>
			</view>
			<view class="shareRight">
				<view class="shareTextContent">
					优惠券：满200减
				</view>
				<view class="shareType">
					已发放
				</view>
			</view>
		</view>
	</view>

</template>

<script>
</script>

<style scoped lang="scss">
	.shareDetailPage {
		width: 690upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 10upx auto 0;
		padding-bottom: 50upx;

		.shareName {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			padding-top: 20upx;
			margin-left: 20upx;
		}

		.shareDetail {
			display: flex;
			justify-content: space-between;
			margin-top: 30upx;
			width: 650upx;
			border-top: 1upx solid #EEEEEE;
			margin: 30upx auto 0;
			

			.shareImgContent {
				margin-top: 30upx;

				.shareLeftImg {
					display: flex;

					image {
						width: 48upx;
						height: 48upx;
						margin-right: 12upx;

					}
				}
			}
			.shareTime{
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-top:15upx ;
			}

			.shareRight {
				text-align: right;
				margin-top: 30upx;
				margin-right: 20upx;
				.shareTextContent{
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #E1251B;
				}
				.shareType{
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
				}
			}


		}

	}
</style>
