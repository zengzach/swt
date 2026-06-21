<template>
	<view class="content">
		<view class="header">
			<image class="header_nav_icon" @click="backpage" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png" mode=""></image>
			<view class="header-icon">
				售后
			</view>
		</view>

		<view class="btn">
			<view class="btn_icon"></view>
		</view>
		<view class="main">
			<text style="font-size: 30upx;
font-family: PingFang SC;
font-weight: 500;
color: #202021;
line-height: 50upx;">客户的满意度是衡量我们工作的唯一标准。\n 如果您对商品不满意,需要退换,请联系我们的售后专属客服,我们将竭诚为您服务。\n 感谢您一直以来的支持。</text>

		</view>
		<view class="contact">
			<view class="btn_icon2"></view>
			<view class="tips">
				服务热线：
			</view>
			<view class="number">
				19951210861<br>
				0512-83876656
			</view>
		</view>

		<view class="email">
			<view class="emailimage_icon"></view>
			<view class="emailtips">
				客服邮箱：
			</view>
			<view class="address">
				sales@bioselec.cn
			</view>

		</view>

	</view>
</template>
<script>
	import '@/static/LHT/aftersale.css'
	export default {
		data() {
			return {


			}
		},
		methods: {
			backpage() {
				uni.switchTab({
					url: '/pages/personal/personal'
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 750upx;
		height: 1334upx;
		background: #FFFFFF;

		.header {
			width: 100%;
			height: 132upx;
			margin-top: 40upx;
			display: flex;

			.header_nav_icon {
				width: 40upx;
				height: 40upx;
				margin-top: 75upx;
				margin-left: 22upx;
			}

			.header-icon {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 21upx;
				margin-top: 87upx;
				margin-left: 282upx;
			}
		}

		.btn {
			width: 100%;
			height: 80upx;
			margin-top: 103upx;

			// .btn_icon {
			// 	width: 80upx;
			// 	height: 80upx;
			// 	margin-left: 328upx;

			// }
		}

		.main {
			width: 640upx;
			height: 178upx;
			margin-top: 46upx;
			margin-left: 55upx;
		}

		.contact {
			width: 640upx;
			height: 79upx;
			margin-left: 63upx;
			margin-top: 61upx;
			// background: red;
			display: flex;
			justify-items: center;


			// .btn_icon {
			// 	width: 40upx;
			// 	height: 40upx;
			// }

			.tips {
				width: 150upx;
				height: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 40upx;
				margin-left: 26upx;
				// vertical-align: center;
				// margin: 0, auto;

			}

			.number {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 45upx;
				margin-left: 25upx;
			}

		}

		.email {
			width: 640upx;
			height: 79upx;
			margin-left: 63upx;
			margin-top: 33upx;
			// background: red;
			display: flex;

			// .emailimage_icon {
			// 	width: 40upx;
			// 	height: 40upx;
			// }

			.emailtips {
				width: 150upx;
				height: 45upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 45upx;
				margin-left: 26upx;
			}

			.address {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 45upx;
				margin-left: 25upx;
			}
		}

	}
</style>
