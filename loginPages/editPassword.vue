<template>
	<view class="main" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">
		<view class="password_div">
			<view class="login_flex" :style='"margin-top:"+(globalData.navHeight)+"rpx"'>
				<image class="login_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
					@click="backpage"></image>
		
			</view>
			<view class="password_one">
				<view class="password_welcome" :style="{ color: color1 }">重置密码</view>
				<view class="password_tips">重置密码后，请用新密码登录</view>
			</view>
			<view class="password_input">
				<view class="password_input_one">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/user.png" mode="widthFix">
					</image>
					<input class="uni-input" v-model="phoneValue" focus @input='number' placeholder="请输入手机号"
						placeholder-style="font-size: 28rpx;color: #929396;font-family: PingFang SC;font-weight: 500;" />
				</view>
				<view :class="isChecked == true?'': 'verify'" style=" 	width: 600upx;
					height: 80upx;
					margin-top: 30upx;
					margin-left: 75upx;">
					<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
				</view>
				<view class="password_input_two">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/checkcode.png" mode="widthFix">
					</image>
					<input class="uni-input" v-model="verificationCodeValue" placeholder="请输入验证码"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
					<button class="get_code" @click="verificationImage"  :style="{ color: color }" :disabled="buttondisabled">{{counter}}</button>
				</view>
				<view class="password_input_one">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/password.png" mode="widthFix">
					</image>
					<input type="password" class="uni-input" password v-model="passwordValue" @blur="pass"
						placeholder="请输入8位以上包含字母数字的新密码"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				</view>
				<view class="password_input_one">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/password.png" mode="widthFix">
					</image>
					<input class="uni-input" style="password" password v-model="newpasswordValue" placeholder="请再次输入新密码"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				</view>
			</view>
			<view class="password_btn" :style="{ background: background }" @click="login">确定</view>
		</view>
	</view>
	
</template>

<script>
	import {
		post_login,
		mobileLogin,
		getValidationImg,
		validateSmsVerifyCode,
	} from '@/api/api.js'
	import {
		toast,
		verifyMobileNumber,
		verifyPasswordFormat
	} from '@/utils/utils.js'
	import {
		resetPassword,
		sendSms
	} from '@/api/passport.js'
	import moveVerify from 'components/moveVerify/moveVerify'
	export default {
		components: {
			"move-verify": moveVerify
		},
		data() {
			return {
				resultData: {

				},
				phoneValue: '',
				computedValue: '',
				codeValue: '',
				passwordValue: '',
				newpasswordValue: '',
				isChecked: false,
				computedImg: '',
				verificationCodeValue: '',
				counter: '获取验证码',
				buttondisabled: true,
				seconds: 60,
				timer: null,
				timer1: null,
				imageURL: '',
					color1:'#',
					color:'#',
					background:''
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.loginbtn
			this.color1 = this.style.logintext
			this.background = this.style.registerback
			this.imageURL = this.style.editpass
			this.getComputedImg()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
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
			getComputedImg() {
				getValidationImg().then(res => {
					this.computedImg = 'data:image/jpeg;base64,' + res.data.base64Img
					this.computedImgToken = res.data.imgToken
				})
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
			pass() {
				verifyPasswordFormat(this.passwordValue)
			},
			verificationImage() {
				if (this.phoneValue) {
					var data = {
						imgToken: this.computedImgToken,
						mobile: this.phoneValue,
						mobileMessageType: '3',
						resultCode: this.codeValue,
						verifyCodeType: '3',
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
						title: '请输入手机号'
					})
				}


			},
			Password() {
				var data = {
					mobile: this.phoneValue,
					smsCode: this.verificationCodeValue,
				}
				if (this.passwordValue == this.newpasswordValue) {
					data.password = this.passwordValue
					resetPassword(data).then(res => {
						if (res.success) {
							toast({
								title: '密码重置成功'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/loginPages/login'
								})
							}, 500)
						}
					})
				}
				else {
					toast({
						title: '两次密码不一致'
					})
				}
				
			},
			login() {
				this.Password()
			},
			backpage() {
				uni.navigateTo({
					url: '/loginPages/login'

				})
			},
		}
	}
</script>

<style>
	@import url('@/static/LHT/editPassword.css');

	button::after {
		border: none;
	}
</style>
<style scoped lang="scss">
	@import url('@/static/LHT/editPassword.css');
.main{
	// width: 100%;
	height:100vh;
}
	.password_div {
		width: calc(100% - 45upx);
		overflow: hidden;

		// padding: 0 45upx;
		.login_flex {
			display: flex;
			width: 100%;
			height: 132upx;

			.login_nav_icon {
				width: 40upx;
				height: 40upx;
				margin-top: 105upx;
				margin-left: 22upx;
			}
		}

		.password_one {
			margin-top: 120upx;
			margin-left: 82upx;

			// .password_welcome {
			// 	font-size: 46upx;
			// 	font-family: PingFang SC;
			// 	font-weight: 800;
			// 	color: #08AE63 ;
			// 	line-height: 21upx;
			// 	margin-top: 20upx;
			// }

			.password_tips {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 21upx;
				margin-top: 33upx;
			}
		}

		.password_input {
			margin-top: 70upx;

			.password_input_one {
				width: 600upx;
				height: 80upx;
				// border: 1upx solid #E2E2E2;
				border-radius: 35upx;
				background: #F6F6F6;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				margin-left: 75upx;
				overflow: hidden;

				image {
					width: 36upx;
					height: 36upx;
					margin-left: 40upx;
				}

				input {
					width: calc(100% - 100upx);
					margin-left: 29upx;
				}
			}

			.verify {
				pointer-events: none;
			}

			.password_input_two {
				width: 600upx;
				height: 80upx;
				// border: 1upx solid #E2E2E2;
				border-radius: 40upx;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				margin-left: 75upx;
				background: #F6F6F6;
				overflow: hidden;

				image {
					width: 42upx;
					height: 42upx;
					margin-left: 40upx;
				}

				.uni-input {
					// width: calc(100% - 100upx);
					margin-left: 29upx;
				}

				.get_code {
					width: 280upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
				}
			}

			.password_input_three {
				width: 100%;
				height: 70upx;
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

				.get_code {
					width: 189upx;
					height: 44upx;
					border-left: 1upx solid #EEEEEE;
					text-align: center;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #E1251B;
					line-height: 44upx;
				}
			}

			.change_type {
				width: 100%;
				text-align: right;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-top: 30upx;
			}
		}

		// .password_btn {
		// 	width: 600upx;
		// 	height: 80upx;
		// 	background: linear-gradient(-70deg, #11A574, #08AE63);
		// 	border-radius: 40upx;
		// 	text-align: center;
		// 	// line-height: 70upx;
		// 	font-size: 30upx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #FFFFFF;
		// 	line-height: 80upx;
		// 	margin-top: 70upx;
		// 	margin-left: 75upx;
		// }
	}
</style>
