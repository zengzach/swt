<template>
	<view class="loginContent">
		<view class="headerContent">
			<image @click="toBack()"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
				mode=""></image>
			<view class="title"> 绑定手机号 </view>
		</view>	
		<view class="loginMsg">
			<open-data class="loginIcon" type="userAvatarUrl"></open-data>
			<open-data class="applicationAuthority" type='userNickName'></open-data>
			<view class="getMsg">你还没有关联手机号，这将会影响部分功能的使用。</view>
			<button class="loginBtn" :style="{ background: background }"   open-type='getPhoneNumber' @getphonenumber='getMobile' withCredentials='true'>一键关联手机号</button>
		</view>
	</view>
</template>

<script>
	import "@/static/LHT/indexLogin.css";
	import {
		getPhoneNumber,weChatBinding
	} from '@/api/passport.js'
	import {
		toast
	} from '@/utils/utils.js'
	export default {	
		data () {
			return{
				detail:{},
				unionId:null,
				background:'',
				orgNum:'',
				role:'',
				userid:''
				
			}
		},
		onLoad(option) {
			this.style = uni.getStorageSync('style')
			this.background = this.style.registerback
			this.unionId=option.unionId
			this.orgNum=uni.getStorageSync('orgNum')
			this.role=uni.getStorageSync('role')
			this.userid=uni.getStorageSync('userid')
		},
		methods: {
			// 返回上一页
			toBack(){
				uni.redirectTo({
					url:'/loginPages/indexlogin'
				})
			},
			// 获取手机号
			getMobile(e){
				this.detail=e.detail
				var that=this
				if(e.detail.errMsg=='getPhoneNumber:ok'){//同意授权
					wx.login({
						success: (ress) => {
							var data={	
								code:ress.code,
								encryptedData:e.detail.encryptedData,
								iv:e.detail.iv,
								unionId:that.unionId,
								orgNum:that.orgNum,
								role:that.role,
								userId:that.userid
							};	
							getPhoneNumber(data).then(res=>{
								if(res.code==0){//该手机号未绑定小程序
									uni.setStorageSync('token', res.data.token);
									uni.setStorageSync('userName', res.data.userName);
									var router = uni.getStorageSync('Router')
									if (router == '/pages/index/index' ||router == '/pages/cart/cart' || router == '/pages/personal/personal'|| router == '/pages/integral/integral') {
										uni.switchTab({
											url: router
										});
									} else if (router == '/integralPages/integralClassifyList' ||router == '/integralPages/integralDetail' ||
										router =='/goodsLIst/goodsLIst' || router == '/goodsDetail/goodsDetail' ||
										router == '/personalPage/orderPages/confirmOrder'||'/pages/personalPage/leaveWord') {
										uni.redirectTo({
											url: uni.getStorageSync('Url'),
										})
									} else {
										uni.switchTab({
											url:'/pages/index/index'
										})
									}
								}else{//该手机号已绑定小程序
								// console.log("00000000")
									uni.showModal({
										title: '提示',
										content: res.msg,
										success: function(arr) {
											if (arr.confirm) {
												if(res.code==1311022||res.code==1311021){
													// console.log("11111")
												}else if(res.code==1311037){
													wx.login({
														success: (ress2) => {
															var data2={
																autoLogin:true,
																code:ress2.code,
																mobile:res.data.mobile,
																encryptedData:e.detail.encryptedData,
																iv:e.detail.iv,
																unionId:that.unionId
															}
															weChatBinding(data2).then(res2=>{
																if(res2.success){
																	uni.setStorageSync('token', res2.data.token);
																	uni.setStorageSync('userName', res2.data.userName);
																	var router = uni.getStorageSync('Router')
																	if (router == '/pages/index/index' ||router == '/pages/cart/cart' || router == '/pages/personal/personal') {
																		uni.switchTab({
																			url: router
																		});
																	} else if (router ==
																		'/goodsLIst/goodsLIst' || router ==
																		'/goodsDetail/goodsDetail' ||
																		router == '/personalPage/orderPages/confirmOrder'||'/pages/personalPage/leaveWord') {
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
				}else{//拒绝授权
					toast({
						title: '登录失败，请允许授权'
					})
				}
				
				
			},
			
		}
	}
</script>


<style lang="scss">
	.loginContent{
		background-size: 750upx 640upx;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: top center;
		
		.headerContent {
			display: flex;
			width: calc(100% - 50upx);
			height: 31upx;
			margin: 0 auto;
			justify-content: space-between;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			margin-top: 80upx;
			color: #202021;
			align-items: center;
			line-height: 31upx;
			image {
				width: 38upx;
				height: 33.1upx;
			}
			.title{
				margin-right: 290upx;
				

			}
		}
		
		.loginMsg {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		
			.loginIcon {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				overflow: hidden;
				margin:296upx auto;
				margin-bottom: 0;
			}
		
			.applicationAuthority {
				width: 157upx;
				height: 30upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 44upx;
				margin: 39upx auto;
				text-align: center;

			}
		
			.getMsg {
				width: 418px;
				height: 71px;
				line-height: 71upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-top: 39upx;
				text-align: center;
			}
		
			
		
		}
		
		.wait {
			width: 630upx;
			height: 546upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			font-size: 28upx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
		
			.Tips {
				margin-top: 100upx;
			}
		}
	}
	
</style>
<style>

</style>
