<template>
	<view class="verification_code_area">
		<view class="verification_code_con">
			<view class="verification_code_title">
				<view class="verify-code">{{phoneValue.replace(phoneValue.substr(3, 4), '****')}}</view>
				<view class="verify-text">为您当前身份验证的手机号</view>
			</view>
			<view class="login_input">
				<!-- <view class="login_input_one">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/login/login_phone.png" mode="widthFix"></image>
					<input class="uni-input" v-model="phoneValue" focus placeholder="请输入用户名/手机号" disabled
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;"/>
				</view> -->
				<view class="login_input_two">
					<view class="login_computed_area">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/login/login_computed.png" mode="widthFix"></image>
						<input class="uni-input" v-model="codeValue" placeholder="请输入计算结果" 
							placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;"/>
					</view>
					<image class="computed_image" :src="computedImg" mode=""></image>
					<view class="change_computed_image" @click="getComputedImg">看不清？</view>
				</view>
				<view class="login_input_three">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/login/login_code.png" mode="widthFix"></image>
					<input class="uni-input" v-model="verificationCodeValue" placeholder="请输入验证码" 
						placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;"/>
						<view class="get_code" :style="{ color: color }"  @click="number=='获取验证码'?verificationImage():''">{{number}}</view>
				</view>
			</view>
			<view class="next_step" :style="{background:(verificationCodeValue ? background : '#E2E2E2' )}" @click="toNextPage">下一步</view>
		</view>
	</view>
</template>

<script>
import "@/static/LHT/changeTel.css"
import {toast} from '@/utils/utils.js'
import {getValidationImg,SendSms } from '@/api/api.js'
import {SmsVerifyCode } from '@/api/safe.js'
export default {
	data() {
		return {
			phoneValue:'',
			codeValue:'',
			verificationCodeValue:'',
			computedImg:'',
			computedImgToken:'',
			tel:'',
			number:'获取验证码',
			num:60,
			style:{},
			background:'',
			color:''
		}
	},
	onLoad(opt){
		this.style = uni.getStorageSync('style')
		this.color = this.style.personalcolor
		this.background = this.style.cartbtn
		this.phoneValue = opt.phoneNum
		this.tel = opt.tel
		this.getComputedImg()
	},
	onPullDownRefresh() {
		this.getComputedImg()
		setTimeout(()=>{
			 uni.stopPullDownRefresh()
		},1000)
	},
	methods: {
		// 获取图片验证码
		getComputedImg(){
			getValidationImg().then(res => {
				this.computedImg = 'data:image/jpeg;base64,' + res.data.base64Img
				this.computedImgToken = res.data.imgToken
			})
		},
		// 发验证码
		verificationImage(){
			if(this.codeValue){
				var data = {
					imgToken:this.computedImgToken,
					resultCode:this.codeValue,
					verifyCodeType:'1',
					mobile:this.phoneValue,
					mobileMessageType:'4'
				}
				SendSms(data).then(res => {
					if(res.success){
						toast({title:'发送验证码成功'})
						const timer = setInterval(() => {
							this.num--;
							this.number = this.num + '秒后再试';
							if (this.num == 0) {
								this.number = '获取验证码';
								this.num = 60;
								clearInterval(timer);
							}
						}, 1000);
					}else{
						toast({title:res.msg})
					}
				})
			}else{
				toast({title:'请输入计算结果'})
			}
			
		},
		toNextPage(){
			if(this.verificationCodeValue){
				var data={
					verifyCode:this.verificationCodeValue,
					mobile:this.phoneValue,
					mobileMessageType:'4'
				}
				SmsVerifyCode(data).then(res=>{
					if(res.success){
						if(this.tel!=undefined){
							uni.redirectTo({
								url:'/personalPage/safe/changeTel'
							})
						}else {
							uni.redirectTo({
								url:'/personalPage/safe/changePassword'
							})
						}
					}else{
						toast({title:res.msg})
					}
				})
				
				
				
			}else{
				toast({ title: '请先输入验证码' })
			}
		},
	}
}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="scss">
.verification_code_area{
	.verification_code_con{
		width: calc(100% - 90upx);
		padding: 45upx 45upx 30upx 45upx;
		background-color: #FFFFFF;
		.verification_code_title{
			
			.verify-code{
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 84upx;
			}
			.verify-text{
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}
		.login_input{
			margin-top: 70upx;
			.login_input_one{
				width: 100%;
				height: 70upx;
				border: 1upx solid #E2E2E2;
				border-radius: 35upx;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				overflow: hidden;
				image{
					width: 46upx;
					height: 46upx;
					margin-left:34upx;
				}
				input{
					width: calc(100% - 100upx);
				}
			}
			.login_input_two{
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 30upx;
				margin-left:20upx;
				.login_computed_area{
					width: 397upx;
					height: 70upx;
					border-bottom: 1upx solid #EEEEEE;
					display: flex;
					align-items: center;
					image{
						width: 46upx;
						height: 46upx;
					}
					input{
						width: calc(100% - 100upx);
						margin-left:20upx;
					}
				}
				.computed_image{
					width: 128upx;
					height: 66upx;
					margin:0 14upx 0 23upx;
				}
				.change_computed_image{
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}
			.login_input_three{
				width: 95%;
				height: 70upx;
				border-bottom: 1upx solid #EEEEEE;
				display: flex;
				margin-top: 30upx;
				overflow: hidden;
				margin-left:20upx;
				image{
					width: 46upx;
					height: 46upx;
				}
				input{
					width: calc(100% - 290upx);
					margin-left:20upx;
				}
				
			}
			.change_type{
				width: 100%;
				text-align: right;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-top: 30upx;
			}
		}
	}

}
</style>
