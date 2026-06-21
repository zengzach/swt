<template>
	<view class="setPart">
		<view class="serContent">
			<view class="contentOnce" @click="goAccount">
				<view class="onceName">
					账号信息
				</view>
				<image class="onceImg" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png"
					mode=""></image>
			</view>
			
			<view class="contentOnce" @click="gosafeSetting">
				<view class="onceName">
					安全设置
				</view>
				<image class="onceImg" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png"
					mode=""></image>
			</view>
			
			<view class="contentOnce" @click="goAddress">
				<view class="onceName" >
					收货地址
				</view>
				<image class="onceImg" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png"
					mode=""></image>
			</view>

			<view class="contentOnce" @click="goInvoice">
				<view class="onceName">
					开票资料
				</view>
				<image class="onceImg" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png"
					mode=""></image>
			</view>
		</view>
		<view class="personalBtn" @click="returnLogin">退出登录</view>
	</view>
</template>

<script>
	import {
		Logout
	} from '@/api/personalApi.js'
	import {
		refresh,
		getRouter
	} from '@/utils/utils.js'
	export default {
		methods: {
			
			//退出登录
			logout() {
				Logout().then(res => {
					if (res.success) {
						uni.removeStorageSync('token')
						uni.removeStorageSync('userName')
						uni.removeStorageSync('isMain')
						uni.removeStorageSync('customerAccountId')
						uni.switchTab({
							url: '/pages/index/index',
							success: function(e) {
								this.onUnload()
							}
						})
					}
				})
			},
			returnLogin(){
				this.logout()
			},
			goAccount() {
				uni.navigateTo({
					url: '/personalPage/account'
				})
			},
			// 去安全设置页面
			gosafeSetting(){
				uni.navigateTo({
					url:'safe/safe'
				})
			},
			goAddress(){
				uni.navigateTo({
					url:'/personalPage/address/addressList'
				})
			},
			goInvoice(){
				uni.navigateTo({
					url:'/personalPage/invoice'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.setPart {
		width: 750upx;
		.serContent {
			width: 690upx;
			// height: 364upx;
			margin: 20upx auto 0;
			background-color: #ffffff;
			border-radius: 15upx;

			.contentOnce {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.onceName {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					line-height: 84upx;
					margin-left: 30upx;
				}

				.onceImg {
					width: 26upx;
					height: 26upx;
					margin-right: 46upx;
				}
			}

		}

		.personalBtn {
			width: 690upx;
			height: 80upx;
			background-color: #FFFFFF;
			border-radius: 15upx;
			text-align: center;
			line-height: 80upx;
			margin: 60upx auto 0;
		}
	}
</style>
