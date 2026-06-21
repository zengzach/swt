<template>
	<view class="register_div" :style="{background: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">
		<view class="reg">
			<view class="register_nav" :style='"margin-top:"+(globalData.navHeight)+"rpx;"'>
				<image class="register_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
					mode="widthFix" @click="backpage">
				</image>
				<!-- <input class="uni-input" v-model="verificationCodeValue" placeholder="请输入验证码"
					placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				<button class="get_code" @click="verificationImage" :disabled="buttondisabled">{{counter}}</button> -->
			</view>
			<view class="register_one">
				<view class="register_welcome" :style="{ color: color1 }">欢迎注册</view>
				<view class="register_tips" v-if="welcomesText">{{welcomesText}}</view>
				<view class="register_tips" v-else>用心打造平台，助力无限可能</view>
			</view>
			<view class="login_input">
				<view class="login_input_one">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/user.png"></image>
					<input class="uni-input" v-model="userValue"  @input="user" required="required"  placeholder="请输入账号（4个字符以上）"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				</view>
				<view class="login_input_two">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/mobile.png"></image>
					<input class="uni-input" v-model="phoneValue" @input="number" placeholder="请输入手机号"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				</view>
				<view :class="isChecked == true?'': 'verify'" style="width: 100%;
					height: 80upx;
					margin-top: 30upx;
					margin-left: 45upx;">
					<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
				</view>
				<view class="login_input_three">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/checkcode.png" mode="widthFix">
					</image>
					<input class="uni-input" v-model="verificationCodeValue" placeholder="请输入验证码"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
					<button class="get_code" @click="verificationImage" :style="{ color: color }" :disabled="buttondisabled">{{counter}}</button>
				</view>
				<view class="login_input_four">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/password.png"></image>
					<input class="uni-input" type="password" v-model="passwordValue" @blur="password"
						placeholder="请输入8位以上包含字母数字密码"
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;" />
				</view>
			</view>
			
			<button class="register_btn"  :style="{ background: background }" @click="login">注册
			</button>
			<view class="to_register" @click="toLogin">已有账号立即<text class="LoginBtn" :style="{ color: color }">登录</text></view>
			<view class="register_checkBox">
				<checkbox-group @change="checkboxChange" name="limitarea">
					<checkbox value="1" :color="color" :checked="limitArea" />
					<view style="display:inline;">我已阅读并同意<text class="agreement" :style="{ color: color }" @click="gotoText(1)" >《用户协议》、 </text><text class="agreement" :style="{ color: color }" @click="gotoText(0)">《隐私政策》</text></view>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	import moveVerify from 'components/moveVerify/moveVerify'
	import {
		register,
		sendSms,
		getDetailByOrgNum
	} from '@/api/passport.js'
	import {
		toast,
		verifyMobileNumber,
		verifyPasswordFormat,
		verifyLoginNameFormat
	} from '@/utils/utils.js'
	
	export default {
		components: {
			"move-verify": moveVerify
		},
		data() {
			return {
				resultData: {
				},
				code: '',
				userValue: '',
				phoneValue: '',
				limitArea: 0,
				computedValue: '',
				passwordValue: '',
				codeValue: '',
				verificationCodeValue: '',
				companyValue: '',
				isShow: false,
				globalData: {},
					isChecked:false,
				buttondisabled: true,
				// regesterdisabled:false,
				counter: '获取验证码',
				seconds: 60,
				timer: null,
				timer1:null,
				welcomesText:"",
				style:{},
				color:'',
				color1:'',
				background:'',
				imageURL:'',
				orgNum:'',
				role:'',
				userid:''
			};
		},
		onLoad(opt) {
			this.orgNum=uni.getStorageSync('orgNum')
			this.role=uni.getStorageSync('role')
			this.userid=uni.getStorageSync('userid')
			this.style = uni.getStorageSync('style')
			this.color = this.style.loginbtn
			this.color1 = this.style.logintext
			this.background = this.style.registerback
				this.imageURL = this.style.registerbackground
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
			getDetailByOrgNum().then(res=>{
				if(res.success){	
					this.welcomesText=res.data.welcomes
					if(item == 1&&res.data.articleUserId!=null){
						uni.navigateTo({
							url: '/personalPage/notice_detail?articleId=' + res.data.articleUserId
						})
					}else if(item == 0&&res.data.articlePrivacyId!=null){
						uni.navigateTo({
							url: '/personalPage/notice_detail?articleId=' + res.data.articlePrivacyId
						})
					}
				}
			})
		},
			//欢迎语
			getWolcomes(){
				getDetailByOrgNum().then(res=>{
					if(res.success){
						this.welcomesText=res.data.welcomes
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
				if(this.phoneValue.length == 11){
					var data = {
						imgToken: this.computedImgToken,
						mobile: this.phoneValue,
						mobileMessageType: '2',
						resultCode: this.codeValue,
						verifyCodeType: '2',
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
				}else{
					toast({
						title: '请输入正确手机号'
					})
				}
				

			},
			getHeight() {
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
			},
			login(data) {
				if (this.limitArea == 1) {
					var _this = this
					if(verifyLoginNameFormat(this.userValue)==true){
						verifyPasswordFormat(this.passwordValue)
						register({
								loginName: this.userValue,
								mobile: this.phoneValue,
								password: this.passwordValue,
								smsCode: this.verificationCodeValue,
								orgNum:this.orgNum,
								role:this.role,
								userId:this.userid
							}).then(res => {
							if (res.success) {
								uni.showModal({
									title: '注册成功',
									success(ress) {
										if (ress.confirm) {
											// console.log(res,"123")
											
											uni.setStorageSync('token', res.data.token);
											uni.setStorageSync('userName', res.data.userName);
											var router = uni.getStorageSync('Router')
											if (router == '/pages/index/index' ||router == '/pages/cart/cart' || router == '/pages/personal/personal') {
												uni.switchTab({
													url: router
												});
												
											} else if (router == '/goodsLIst/goodsLIst' || router == '/goodsDetail/goodsDetail' || router == '/personalPage/orderPages/confirmOrder'||router =='/pages/personalPage/leaveWord') {
												uni.redirectTo({
													url: uni.getStorageSync('Url'),
												})
											}else if (router == '/personalPage/receivePackage') {
												uni.navigateTo({
													url: '/personalPage/receivePackage'
												})
											}
											else {
												uni.switchTab({
													url:'/pages/index/index'
												})
											}
										}
									}
								});
								
							}else{
								toast({
									title: res.msg
								})
							}
						})
					}else{
						
						toast({
							title: '登录名是由4-20位的数字和字母组成'
						})
						
					}
					
					
					
				} else {
					uni.showToast({
						title: '请勾选用户协议',
						icon: 'none',
						duration: 2000

					})
				}
			},
			toLogin() {
				uni.redirectTo({
					url: '/loginPages/login'
				})
			},
			show() {
				this.$refs['backGoodsPopup'].open()
			},
			closePayPopup() {
				this.$refs.backGoodsPopup.close()
			},

			number() {
				 if (this.timer1 !== null) clearTimeout(this.timer1)
				      this.timer1 = setTimeout(() => {
				       if(this.phoneValue){
				       	if( verifyMobileNumber(this.phoneValue))
				       	{this.isChecked = true}
				       	else{
				       		this.isChecked = false
				       	}
				       }else{
				       	toast({
				       		title: '请输入正确的手机号'
				       	})
				       }
				      }, 1000)
				    
				
			
			},
			user() {
				if (this.userValue == '') {
					
				} else{
					verifyLoginNameFormat(this.userValue)
				}

			},
			password() {
				verifyPasswordFormat(this.passwordValue)
			},
		
			backpage() {
				uni.setStorageSync('Router', '/pages/index/index')
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	@import url('@/static/LHT/register.css');
	button::after {
		border: none;
	}
</style>
<style scoped lang="scss">
	.register_div {
		width: 750upx;
		height:100vh;
		margin:0 auto;
		overflow:hidden;
		background: #FFFFFF;
		background-image: var(--login-back);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.reg{
			padding: 0 30upx;
			overflow:hidden;
			.register_nav {
				height: 132upx;
				display: flex;
			
				.register_nav_icon {
					width: 40upx;
					height: 40upx;
					margin-left: -8upx;
					margin-top: 22upx;
				}
			
			
			}
			
			.register_one {
				margin-top: 50upx;
				margin-left: 82upx;
			
				.register_tips {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					line-height: 21upx;
					margin-top: 48upx;
				}
			}
			
			.login_input {
				margin-top: 70upx;
			
				.login_input_one {
					width: 600upx;
					height: 80upx;
					border-radius: 40upx;
					display: flex;
					align-items: center;
					margin-top: 30upx;
					margin-left: 45upx;
					background: #F6F6F6;
					overflow: hidden;
			
					image {
						width: 36upx;
						height: 36upx;
						margin-left: 34upx;
					}
			
					.uni-input {
						margin-left: 29upx;
						background: #F6F6F6;
					}
			
			
				}
			
				.login_input_two {
					width: 600upx;
					height: 80upx;
					border-radius: 40upx;
					display: flex;
					align-items: center;
					margin-top: 30upx;
					margin-left: 45upx;
					background: #F6F6F6;
					overflow: hidden;
			
					image {
						width: 36upx;
						height: 36upx;
						margin-left: 34upx;
					}
			
					.uni-input {
						margin-left: 29upx;
						background: #F6F6F6;
					}
				}
			
				.verify {
					pointer-events: none;
				}
			
				.login_input_three {
					width: 600upx;
					height: 80upx;
					border-radius: 40upx;
					display: flex;
					align-items: center;
					margin-top: 30upx;
					margin-left: 45upx;
					background: #F6F6F6;
					overflow: hidden;
			
					image {
						width: 36upx;
						height: 36upx;
						margin-left: 34upx;
					}
			
					.uni-input {
						margin-left: 29upx;
						background: #F6F6F6;
					}
			
					.get_code {
						width: 280upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
					}
			
				}
			
				.login_input_four {
					width: 600upx;
					height: 80upx;
					border-radius: 40upx;
					display: flex;
					align-items: center;
					margin-top: 30upx;
					margin-left: 45upx;
					background: #F6F6F6;
					overflow: hidden;
			
					image {
						width: 36upx;
						height: 36upx;
						margin-left: 34upx;
					}
			
					.uni-input {
						margin-left: 29upx;
						background: #F6F6F6;
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
			
			.register_checkBox {
				margin-top: 42upx;
				display: flex;
				align-items: flex-start;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 29upx;
			}
			
			.to_register {
				width: 100%;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #67686B;
				line-height: 21upx;
				margin-top: 39upx;
				margin-left: 427upx;
			}
			
			.register_checkBox {
				margin-top: 80upx;
				margin-left: 32upx;
			}
			
			.back_goods_popup {
				margin: 0 auto;
			
				.backGoodsPopup {
					width: 400upx;
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
		}
		
	}
</style>
