<template>
	<view class="security_setting_area">
		<view class="security_setting_con">
			<view class="security_setting_item" @click="toEditPassword">
				<view>修改密码</view>
				<image class="arrow_right_c7"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right_c7.png"
					mode="widthFix"></image>
			</view>
			<!-- 修改手机号 -->
			<view class="security_setting_item" @click="toEditPhone" v-if="phoneNum">
				<view>手机号</view>
				<view class="security_setting_phone">
					<view class="phone_num">{{phoneNum != null ? phoneNum.replace(phoneNum.substr(3, 4), '****') : ""}} </view>
					<image class="arrow_right_c7"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right_c7.png"
						mode="widthFix"></image>
				</view>
			</view>
			<!-- 手机号授权 -->
			<button class="security_setting_item" v-if="!phoneNum&&isWxLoginMobile==true" open-type='getPhoneNumber' @getphonenumber='editPhomeNumber' withCredentials='false'>
				<view>手机号</view>
				<view class="security_setting_phone">
					<view class="phone_num">{{phoneNum != null ? phoneNum.replace(phoneNum.substr(3, 4), '****') : ""}} </view>
					<image class="arrow_right_c7"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right_c7.png"
						mode="widthFix"></image>
				</view>
			</button>
			<!-- 暂未开启手机号授权 -->
			<view class="security_setting_item" v-if="isWxLoginMobile==false&&phoneNum==null" @click='noEdit'>
				<view>手机号</view>
				<view class="security_setting_phone">
					<view class="phone_num">{{phoneNum != null ? phoneNum.replace(phoneNum.substr(3, 4), '****') : ""}} </view>
					<image class="arrow_right_c7"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right_c7.png"
						mode="widthFix"></image>
				</view>
			</view>
			
			<!-- <view class="security_setting_item" v-if="phoneNum" @click="recomfirm()">
				<view>绑定微信</view>
				<view class="security_setting_phone">
					<view class="phone_num">{{unionId?'已绑定':'未绑定'}}</view>
					<image class="arrow_right_c7"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right_c7.png"
						mode="widthFix"></image>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		toast,
		verifyPasswordFormat
	} from '@/utils/utils.js'
	import {
		getAccount,
		modifyPassword
	} from '@/api/safe.js'
	import {
		getPhoneNumber,weChatBinding,weChatUnbind
	} from '@/api/passport.js'
	export default {
		data() {
			return {
				newPassword: '',
				phoneNum: null,
				unionId:null,
				mobile:'',
				isWxLoginMobile:null
			}
		},
		onLoad() {
			this.getTel()
			// console.log(this.isWxLoginMobile,"手机号是否授权")
		},
		onShow() {

		},
		onPullDownRefresh() {
			this.getTel()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			// 微信绑定与解绑
			recomfirm() {
				var that=this
				if(that.unionId){
					uni.showModal({
						title: '解绑',
						content: '确定解绑微信吗？',
						confirmText: "确定解绑",
						success: function(res) {
							if (res.confirm) {
								weChatUnbind().then(ress=>{
									if(ress.success){
										toast({
											title:'解绑成功'
										})
										that.getTel()	
									}
								})
							}
						}
					});
				}else{
					uni.showModal({
						title: '绑定',
						content: '确定绑定微信吗？',
						confirmText: "确定绑定",
						success: function(res) {
							if (res.confirm) {
								wx.login({
									success: (ress) => {
										var data={
											autoLogin:false,
											code:ress.code,
											mobile:that.mobile
										}
										weChatBinding(data).then(ress=>{
											if(ress.success){
												toast({
													title:'绑定成功'
												})
												that.getTel()	
											}
										})
									}
								})
								
							} 
						}
					});
				}
				
			},
			// 获取个人信息---手机号
			getTel() {
				getAccount().then(res => {
					this.phoneNum = res.data.mobile
					this.unionId = res.data.unionId
					this.mobile = res.data.mobile
					this.isWxLoginMobile=res.data.isWxLoginMobile
				})
			},
			// 修改密码
			toEditPassword() {
				if (this.phoneNum == null||this.phoneNum == '') {
					toast({
						title: '该微信号未绑定手机号，请先绑定'
					})
					return;
				}
				uni.redirectTo({
					url: '/personalPage/safe/verificationTel?phoneNum=' + this.phoneNum
				})
			},
			// 修改手机号
			toEditPhone(){
				uni.redirectTo({
					url: '/personalPage/safe/verificationTel?phoneNum=' + this.phoneNum + '&tel=' + 'tel'
				})
			},
			noEdit(){
				toast({
					title:'暂未开启手机号授权'
				})
			},
			editPhomeNumber(e) {
				var that=this
				if(e.detail.errMsg=='getPhoneNumber:ok'){//同意授权
					wx.login({
						success: (ress) => {
							var data={	
								code:ress.code,
								encryptedData:e.detail.encryptedData,
								iv:e.detail.iv,
								unionId:that.unionId
							};	
							getPhoneNumber(data).then(res=>{
								if(res.code==0){//该手机号未绑定小程序
									wx.login({
										success: (ress2) => {
											var data2={
												autoLogin:false,
												code:ress2.code,
												mobile:res.data.mobile,
												unionId:that.unionId
											}
											weChatBinding(data2).then(res2=>{
												if(res2.success){
													toast({
														title:'手机号绑定成功'
													})
													that.phoneNum=res.data.mobile
												}	
											})
										},
									})
								}else{//该手机号已绑定小程序
									uni.showModal({
										title: '提示',
										content: res.msg,
										success: function(arr) {
											if (arr.confirm) {
												if(res.code==1311022||res.code==1311021){
													
												}else{
													wx.login({
														success: (ress2) => {
															var data2={
																autoLogin:false,
																code:ress2.code,
																mobile:res.data.mobile,
																encryptedData:e.detail.encryptedData,
																iv:e.detail.iv,
																unionId:that.unionId
															}
															weChatBinding(data2).then(res2=>{
																if(res2.success){
																	toast({
																		title:'手机号绑定成功'
																	})
																	that.phoneNum=res.data.mobile
																}
															})
														},
													})	
												}
												
												
											} else if (arr.cancel) {
												console.log("用户点击了取消")
											}
										}
									});
								}
							})
							
						}
					})
				}else{//拒绝
					toast({
						title:'用户拒绝了手机号授权'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}
	button{
		background: #fff;
		border-color: #fff;
		padding: 0;
	}
	button::after{
	  border: none;
	}

</style>
<style scoped lang="scss">
	.security_setting_area {
		padding: 24upx;

		.security_setting_con {
			width: calc(100% - 60upx);
			padding: 21upx 30upx;
			background-color: #FFFFFF;
			border-radius: 15upx;

			.security_setting_item {
				width: 100%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 84upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-color: #fff;

				.security_setting_phone {
					display: flex;
					align-items: center;

					.phone_num {
						margin-right: 30upx;
					}
				}

				.arrow_right_c7 {
					width: 30upx;
					height: 30upx;
				}

			}
		}

		.pay_popup {
			.payPopup {
				width: 100%;
				height: 400upx;
				background-color: #FFFFFF;
				border-radius: 15upx 15upx 0 0;
				position: relative;

				.payTitle {
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

				.payMsg {
					width: calc(100% - 48upx);
					margin: 24upx;
					border-bottom: 1upx solid #eeeeee;

					input {
						padding-bottom: 26upx
					}
				}

				.submitBtn {
					width: calc(100% - 48upx);
					height: 70upx;
					border: 1upx solid #E1251B;
					border-radius: 35upx;
					background: linear-gradient(90deg, #E1251B, #F33E34);
					margin: 55upx 24upx 0;
					display: flex;
					overflow: hidden;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 70upx;

					.cancel {
						width: 50%;
						background-color: #FFFFFF;
						color: #E1251B;
						text-align: center;
						border-radius: 35px 0px 35px 35px;
					}

					.on {
						width: 50%;
						color: #FFFFFF;
						text-align: center;
					}
				}

				.notSubmit {
					border: 1upx solid #E2E2E2;
					background: #E2E2E2;

					.cancel {
						color: #E2E2E2;
					}
				}
			}
		}
	}
</style>
