<template>
	<view class="login_div" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">
		<view class="login_flex" :style='"margin-top:"+(globalData.navHeight)+"upx"'>
			<image class="login_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
				@click="backpage"></image>

		</view>
		<view class="login_one">
			<view class="login_welcome" :style="{ color: color1 }" >欢迎登录</view>
			<view class="login_tips" v-if="welcomesText">{{welcomesText}}</view>
			<view class="login_tips" v-else>用心打造平台，助力无限可能</view>
		</view>
		<view class="login_input" v-if="isUserName">
			<view class="login_input_one">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/user.png"></image>
				<input class="uni-input" v-model="userValue" focus=user placeholder="请输入用户名/手机号"
					placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
			</view>
			<view class="login_input_one">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/password.png"></image>
				<input class="uni-input" type="password" v-model="passwordValue" placeholder="请输入密码"
					placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
			</view>

		</view>
		<view class="login_input" v-if="!isUserName">
			<view class="login_input_one">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/user.png" mode="widthFix">
				</image>
				<input class="uni-input" v-model="phoneValue" @input="number" focus placeholder="请输入手机号"
					placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
			</view>

			<view :class="isChecked == true?'': 'verify'" style=" margin-top: 30upx;">
				<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
			</view>


			<view class="login_input_one">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/checkcode.png" mode="widthFix">
				</image>
				<input class="uni-input" v-model="verificationCodeValue" placeholder="请输入验证码"
					placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				<button class="get_code" @click="verificationImage" :style="{ color: color }" :disabled="buttondisabled">{{counter}}</button>
			</view>
		</view>
		<view class="edit_password" v-if="isUserName" @click="toEditPassword">忘记密码？</view>
		<view class="login_btn" :style="{ background: background }" @click="login">登录</view>
		<view class="change">
			<view class="change_type1" v-if="orgNum!='yx2314'" @click="toRegister">还没账号？ <text class="goRegister" :style="{ color: color }">去注册</text></view>
			<view v-if="orgNum!='yx2314'" style="font-weight: 100;margin-left: 20upx;margin-right: 20upx">
				|
			</view>
			<view class="change_type" v-if="isUserName" @click="isUserName=!isUserName">验证码登录</view>
			<view class="change_type" v-if="!isUserName" @click="isUserName=!isUserName">用户名登录</view>
		</view>

		<view class="register_checkBox">
			<checkbox-group @change="checkboxChange"  name="limitarea">
				<checkbox value="1" :color="color" :checked="limitArea" />
				<view style="display:inline;">我已阅读并同意<text class="agreement"  :style="{ color: color }"
						@click.stop="gotoText(1)">《用户协议》</text>、<text class="agreement" :style="{ color: color }"
						@click.stop="gotoText(0)">《隐私政策》</text></view>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {
		post_login,
		mobileLogin,
		getValidationImg
	} from '@/api/api.js'
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {
		sendSms,
		getDetailByOrgNum
	} from '@/api/passport.js'
	import {
		toast,
		verifyMobileNumber,
		verifyPasswordFormat,
		verifyLoginNameFormat,
		getOrgNum
	} from '@/utils/utils.js'
	import moveVerify from 'components/moveVerify/moveVerify'
	export default {
		components: {
			"move-verify": moveVerify
		},

		data() {
			return {
				resultData: {},
				limitArea: 0,
				userValue: '',
				passwordValue: '',
				phoneValue: '',
				codeValue: '',
				verificationCodeValue: '',
				isUserName: true,
				counter: '获取验证码',
				seconds: 60,
				timer: null,
				timer1: null,
				computedImg: '',
				isChecked: false,
				// checked: false,
				computedImgToken: '',
				globalData: {

				},
				// check:false,
				buttondisabled: true,
				style:{},
				welcomesText: "",
				orgNum: getOrgNum(),
				imageURL:'',
				color:'',
				color1:'',
				background:'',
				
			}
		},

		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.loginbtn
			this.color1 = this.style.logintext
			this.background = this.style.registerback
			this.imageURL = this.style.registerbackground
			// this.getComputedImg()
			this.getHeight()
			this.getWolcomes()

		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
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
			checkboxChange: function(e) {

				var self = this;

				if (e.detail.value.length > 0) {
					self.limitArea = 1;
				} else {
					this.limitArea = 0;
				}
			},
			//欢迎语
			getWolcomes() {
				getDetailByOrgNum().then(res => {
					if (res.success) {
						// console.log(res.data,'res.data');
						this.welcomesText = res.data.welcomes
					}
				})
			},
			/* 校验结果回调函数 */
			verifyResult(res) {
				// console.log(res);
				this.resultData = res;
				if (res.flag) {
					this.buttondisabled = false;

				}
			},
			/* 校验插件重置 */
			verifyReset() {
				this.$refs.verifyElement.reset();

				/* 删除当前页面的数据 */
				this.resultData = {};
			},
			verificationImage() {
				if (this.phoneValue.length == 11) {
					var data = {
						mobile: this.phoneValue,
						mobileMessageType: '1',
					}
					sendSms(data).then(res => {
						if (res.success) {
							toast({
								title: '发送验证码成功'
							})
						} else {
							toast({
								title: res.msg
							})
						}
					})
					const timer = setInterval(() => {
						this.counter = this.seconds + '秒再试';
						this.seconds--;
						this.buttondisabled = true;
						if (this.seconds === -1) {
							clearInterval(timer);
							this.counter = '获取验证码';
							this.seconds = 60;
							this.buttondisabled = false

						}
					}, 1000);
				} else {
					toast({
						title: '请输入正确手机号'
					})
				}

			},
			number() {
				if (this.timer1 !== null) clearTimeout(this.timer1)
				this.timer1 = setTimeout(() => {
					if (this.phoneValue) {
						if (verifyMobileNumber(this.phoneValue)) {
							this.isChecked = true
						} else {
							this.isChecked = false
						}
					} else {
						toast({
							title: '请输入正确的手机号'
						})
					}
				}, 1000)



			},
			user() {
				if (this.userValue == '') {

				} else {
					verifyLoginNameFormat(this.userValue)
				}

			},
			login() {
				let _this = this
				if (this.limitArea) {
					if (this.isUserName) {
						verifyPasswordFormat(this.passwordValue)
						post_login({
							loginName: this.userValue,
							password: this.passwordValue,

						}).then(res => {
							if (res.success) {
								// _this.getLoginAccountData()
								var router = uni.getStorageSync('Router')
								if (router == '/pages/index/index' ||router == '/pages/cart/cart' || router == '/pages/personal/personal'|| router == '/pages/integral/integral') {
									uni.switchTab({
										url: router
									});
								} else if (router == '/integralPages/integralClassifyList' ||router == '/integralPages/integralDetail' ||router == '/goodsLIst/goodsLIst' 
									|| router == '/goodsDetail/goodsDetail' || router == '/personalPage/orderPages/confirmOrder'||router =='/pages/personalPage/leaveWord'
									||router =='/personalPage/helpCenter'||router =='/personalPage/notice_detail'||router == '/personalPage/share/shareDiscount'
									||router =='/personalPage/fromAccount') {
									uni.redirectTo({
										url: uni.getStorageSync('Url'),
									})
								} else {
									uni.switchTab({
										url:'/pages/index/index'
									})
								}
							}
						})
					} else {
						mobileLogin({
							mobile: this.phoneValue,
							smsCode: this.verificationCodeValue
						}).then(res => {
							if (res.success) {
								// _this.getLoginAccountData()
								var router = uni.getStorageSync('Router')
								if (router == '/pages/cart/cart' || router == '/pages/personal/personal') {
									uni.switchTab({
										url: router
									});
								}else{
									uni.switchTab({
										url: router
									});
								}

							} else {
								uni.redirectTo({
									url: '/loginPages/register'
								})
							}
						})
					}
				} else {
					toast({
						title: '请勾选用户协议和隐私协议'
					})
				}

			},
			//判断是否是主账号
			// getLoginAccountData() {
			// 	getLoginAccount().then(res => {
			// 		if (res.success) {
			// 			// uni.setStorageSync('userName', res.data.userName);
			// 			uni.setStorageSync('isMain', res.data.isMain);
			// 			uni.setStorageSync('customerAccountId', res.data.customerAccountId);
			// 		}
			// 	})
			// },
			getHeight() {
				if (wx.getMenuButtonBoundingClientRect()) {
					let menuButtonObject = wx.getMenuButtonBoundingClientRect(); //  获取胶囊高度
					let navTop = 0
					let navHeight = 0
					uni.getSystemInfo({
						success: res => {
							let statusBarHeight = res.statusBarHeight
							navTop = menuButtonObject.top //胶囊按钮与顶部的距离
							navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top -
								statusBarHeight) * 2;
							this.globalData.navHeight = navHeight;
							this.globalData.navTop = navTop;
							this.globalData.windowHeight = res.windowHeight;
						},
					})
				} else {
					this.globalData.navHeight = 60
				}

			},

			toRegister() {
				uni.navigateTo({
					url: '/loginPages/register'
				})
			},
			toEditPassword() {
				uni.navigateTo({
					url: '/loginPages/editPassword'
				})
			},
			backpage() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

		}
	}
</script>

<style>
	@import url('@/static/LHT/login.css');

	/* @import url('@/static/DS/login.css'); */
	/* page {
		background: #FFFFFF;
		background-image: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/loginbackground-new.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	} */
	button::after {
		border: none;
	}

	/* button {
		color: #08AE63;
	} */
</style>
<style scoped lang="scss">
	@import url('@/static/LHT/login.css');

	// @import url('@/static/DS/login.css');
	.login_div {
		width: calc(100% - 150upx);
		height:100vh;
		padding: 0 75upx;

		.login_flex {
			display: flex;
			width: 100%;
			height: 132upx;

			.login_nav_icon {
				width: 40upx;
				height: 40upx;
				margin-top: 105upx;
				margin-left: -42upx;
			}

			.login_nav_text {
				width: 100%;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin: 0upx 0 110upx;
				overflow: hidden;
				text-align: center;
			}
		}

		.login_one {

			.login_tips {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 21upx;
				margin-top: 42upx;
				margin-left: 35upx;
			}
		}

		.login_input {
			margin-top: 110upx;

			.login_input_one {
				width: 600upx;
				height: 80upx;
				// border: 1upx solid #E2E2E2;
				border-radius: 40upx;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				background: #F6F6F6;
				overflow: hidden;

				image {
					width: 36upx;
					height: 36upx;
					margin-left: 34upx;
				}

				.uni-input {
					// width: 600upx;
					margin-left: 28upx;
					background: #F6F6F6;
				}

				.get_code {
					width: 300upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					// color: #C4C5CA;
					// line-height: 44upx;
					// margin-left: 50upx;
				}
			}

			.tips {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;

				line-height: 21upx;
				margin-top: 30upx;
				margin-left: 44upx;
			}

			.verify {
				pointer-events: none;
			}

			.login_input_two {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 30upx;

				.login_computed_area {
					width: 397upx;
					height: 70upx;
					border: 1upx solid #E2E2E2;
					border-radius: 35upx;
					display: flex;
					align-items: center;

					image {
						width: 46upx;
						height: 46upx;
						margin-left: 34upx;
					}

					input {
						width: calc(100% - 100upx);
					}
				}

				.computed_image {
					width: 128upx;
					height: 66upx;
					margin: 0 14upx 0 23upx;
				}

				.change_computed_image {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}

			.login_input_three {
				width: 100%;
				height: 80upx;
				border: 1upx solid #E2E2E2;
				border-radius: 35upx;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				overflow: hidden;

				image {
					width: 46upx;
					height: 46upx;
					margin-left: 34upx;
				}

				input {
					width: calc(100% - 290upx);
				}


			}


		}

		.edit_password {
			width: 130upx;
			// text-align: center;
			font-size: 26upx;
			font-family: PingFang SC;
			// font-weight: 500;
			color: #67686B;
			margin-top: 12upx;
			margin-left: 460upx;
		}

		.change {

			display: flex;
			margin-top: 40upx;
			margin-left: 205upx;

			.change_type1 {
				// width: 100%;
				// text-align: right;
				font-size: 26upx;
				font-family: PingFang SC;
				// font-weight: 500;
				color: #67686B;
				margin-top: 7upx;

				// text {
				// 	color: #0D986A;
				// }
			}

			.change_type {
				// width: 100%;
				// text-align: right;
				font-size: 26upx;
				font-family: PingFang SC;
				// font-weight: 500;
				color: #67686B;
				margin-top: 7upx;

				// text {
				// 	color: #0D986A;
				// }
			}
		}


		.register_checkBox_1 {
			width: 600upx;
			margin-top: 285upx;
			// margin-left: upx;
			display: flex;
			align-items: flex-start;
			font-size: 26upx;
			font-family: PingFang SC;
			// font-weight: 500;
			color: #202021;
			// line-height: 29upx;

			// view {
			// text {
			// color: #0D986A;
			// }
			// }
		}

		.register_checkBox_2 {
			width: 600upx;
			margin-top: 223upx;
			display: flex;
			align-items: flex-start;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			line-height: 29upx;

			// view {
			// 	text {
			// 		color: #0D986A;
			// 	}
			// }
		}

		.to_register {
			width: 100%;
			text-align: center;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin-top: 140upx;

			text {
				color: #E1251B;
			}
		}

		.back_goods_popup {
			margin: 0 auto;

			.backGoodsPopup {
				width: 400upx;
				// height: 300upx;
				background-color: #FFFFFF;
				border-radius: 15upx;
				position: relative;
			}

			.backGoodsTitle {
				width: 100%;
				padding: 39upx 0;
				text-align: center;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;

				image {
					width: 30upx;
					height: 30upx;
					position: absolute;
					top: 40upx;
					right: 21upx;
				}
			}

			.backGoodsText {
				font-size: 26upx;
				color: #333333;

				.backGoodsdeal {
					padding: 20upx 24upx 0;
				}

				.backGoodsprivacy {
					padding: 20upx 24upx;
				}
			}
		}

		.register_checkBox {
			margin-top: 42upx;
			display: flex;
			align-items: flex-start;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 29upx;
			margin-top: 280upx;
			margin-left: 20upx;

			// view {
			// 	text {
			// 		color: #E1251B;
			// 	}
			// }
		}

	}
</style>
