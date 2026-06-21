<template>
	<view class="loginContent" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">
		<view class="back">
			<image @click="banckTo" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png" mode="">
			</image>
		</view>
		<view class="welcome" :style="{ color: color }"> 欢迎登录 </view>
		<view class="heart" v-if="welcomesText">{{welcomesText}}</view>
		<view class="heart" v-else> 用心打造平台，助力无限可能 </view>
		<view class="bankLoginBgc" :style="{ background: background }" @click="toLogin"> 账号安全登录 </view>
		<view class="phoneLoginBgc" :style="{ background: background }" @click="toWeChatLogin"> 手机号一键登录 </view>
		<view class="login_checkBox">
			<checkbox-group @change="checkboxChange" name="limitarea" class="all">
				<checkbox value="1" :color='color' :checked="limitArea" class="circle" />
				<view style="display:inline;">我已阅读并同意<text class="agreement" :style="{ color: color }" @click="gotoText(1)">《用户协议》、 </text><text
					class="agreement" :style="{ color: color }" @click="gotoText(0)">《隐私政策》</text></view>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import "@/static/LHT/indexLogin.css";
	import {
		toast,
	} from '@/utils/utils.js'
	var that;
	import {
		AuthLogin,
		authRegister,
		weChatLogin
	} from '@/api/passport.js'
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {
		getDetailByOrgNum
	} from '@/api/passport.js'
	export default {
		data() {
			return {
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				code: '',
				limitArea: 0,
				style:{},
				background:'',
				color:'',
				imageURL:'',
				orgNum:'',
				role:'',
				userid:'',
				welcomesText: "",
			}
		},
		onLoad() {
			this.getWolcomes()
			this.style = uni.getStorageSync('style')
			this.orgNum=uni.getStorageSync('orgNum')
			this.role=uni.getStorageSync('role')
			this.userid=uni.getStorageSync('userid')
			this.color = this.style.loginbtn
			this.background = this.style.registerback
			this.imageURL = this.style.registerbackground
			wx.login({
				success: (res) => {
					this.code = res.code
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			//欢迎语
			getWolcomes() {
				getDetailByOrgNum().then(res => {
					if (res.success) {
						// console.log(res.data,'res.data');
						this.welcomesText = res.data.welcomes
					}
				})
			},
			checkboxChange: function(e) {
				if (e.detail.value.length > 0) {
					this.limitArea = 1;
				} else {
					this.limitArea = 0;
				}
			},
			toLogin() {
				uni.redirectTo({
					url: '/loginPages/login'
				})
			},
			// 微信授权
			toWeChatLogin() {
				var that=this
				if (that.limitArea) {
					
					wx.getUserInfo({
						success: function(resInfo) {
							wx.login({
								success: (ress) => {
									var data = {
										code: ress.code,
										nickName: resInfo.userInfo.nickName,
										headImg: resInfo.userInfo.avatarUrl,
										orgNum:that.orgNum,
										role:that.role,
										userId:that.userid
									};
									weChatLogin(data).then(res => {
										uni.showLoading({
											title: '加载中...'
										});
										setTimeout(() => {
											uni.hideLoading()
										}, 500)
										if (res.success) {
											uni.setStorageSync('token', res.data.token);
											uni.setStorageSync('userName', res.data
												.userName);
											var router = uni.getStorageSync('Router')
											if (router == '/pages/index/index' || router == '/pages/cart/cart' || router == '/pages/personal/personal' || router == '/pages/integral/integral') {
												uni.switchTab({
													url: router
												});

											} else if (router == '/integralPages/integralClassifyList' ||router == '/integralPages/integralDetail' ||
												router == '/goodsLIst/goodsLIst' || router == '/goodsDetail/goodsDetail' || router == '/personalPage/orderPages/confirmOrder' ||
												router == '/pages/personalPage/leaveWord' || router == '/personalPage/helpCenter' ||
												router == '/personalPage/notice_detail' || router == '/personalPage/fromAccount'||router == '/personalPage/share/shareDiscount') {
												uni.redirectTo({
													url: uni.getStorageSync('Url'),
												})
											} else {
												uni.switchTab({
													url: '/pages/index/index'
												})
											}
										} else if (res.code == 1311024) {
											uni.redirectTo({
												url: '/loginPages/relevanceMobileNumber?unionId=' + res.data.unionId
											})
										} else {
											toast({
												title: res.msg
											})
										}
									})
								}
							})
						}
					})
				} else {
					toast({
						title: '请勾选用户协议和隐私协议'
					})
				}


			},
			// 隐私政策、用户协议
			gotoText(item) {
				getDetailByOrgNum().then(res => {
					if (res.success) {
						this.welcomesText = res.data.welcomes
						if (item == 1 && res.data.articleUserId != null) {
							uni.navigateTo({
								url: '/personalPage/notice_detail?articleId=' + res.data.articleUserId
							})
						} else if (item == 0 && res.data.articlePrivacyId != null) {
							uni.navigateTo({
								url: '/personalPage/notice_detail?articleId=' + res.data.articlePrivacyId
							})
						}
					}
				})
			},
			// 返回上一页
			banckTo() {
				var router = uni.getStorageSync('Router')
				if (router == '/pages/integral/integral') {
					uni.switchTab({
						url: router
					});
				} else if(router == '/integralPages/integralClassifyList' ||router == '/integralPages/integralDetail'){
					uni.redirectTo({
						url: uni.getStorageSync('Url'),
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
				uni.removeStorageSync('selectedIndex'); // 清除缓存
				uni.hideTabBar()
			},

		}
	}
</script>

<style lang="scss">
	// @import url('@/static/LHT/login.css');

	.loginContent {
		// height:1620upx;
		height:100vh;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: top center;

		.back {
			image {
				width: 38upx;
				height: 33.1upx;
				color: #666666;
				margin-top: 80upx;
				margin-left: 22upx;
			}
		}

		.heart {
			height: 32upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			margin-left: 82upx;
			margin-top: 24upx;
		}

		.login_checkBox {
			margin-top: 273upx;
			display: flex;
			align-items: flex-start;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 29upx;

			.circle {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				margin-left: 76upx;
				margin-right: 50upx;
			}
		}
	}
</style>
<style>

</style>
