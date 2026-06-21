<template>
	<view class="verification_area">
		<view class="verification_con">
			<!-- <view class="verification_title">修改手机号</view>
			<view class="verification_tips">更换手机号后，下次使用新手机号登录</view> -->
			<view class="verification_input_con">
				<view class="verification_input_one">
					<view class="verification_input_text">请输入新手机号</view>
					<view class="input_one">
						<!-- <view class="verification_input_left">+86</view> -->
						<view>
							<input class="uni-input" type="number" placeholder-style="color:#929396;fontSize:30upx;" placeholder="请输入手机号" v-model="newPhone"/>
						</view>
					</view>
					
				</view>
				<view class="verification_input_computed">
					<view class="verification_input_text">图文验证</view>
					<view class="computed_area">
						<view class="login_computed_area">
							<input class="uni-input" v-model="codeValue" placeholder="请输入计算结果" 
								placeholder-style="font-size: 28rpx;color: #C7C7C7;font-family: PingFang SC;font-weight: 500;"/>
						</view>
						<image class="computed_image" :src="computedImg" mode="widthFix"></image>
						<view class="change_computed_image" @click="getComputedImg">看不清？</view>
					</view>
				</view>
				<view class="verification_input_two">
					<view class="verification_input_text">验证码</view>
					<view class="input_left">
						<!-- <view class="verification_input_left">验证码</view> -->
						<view>
							<input class="uni-input" type="number" placeholder-style="color:#929396;fontSize:30upx;" 
								placeholder="请输入验证码" v-model="newCodeValue"/>
						</view>
						<view class="verification_input_code" :style="{color:color}" @click="verificationImage">{{number}}</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="submit_btn" :style="{background:(newPhone ? background : '#E2E2E2' )}" @click="submitEditPhone">确定</view>
	</view>
</template>

<script>
import "@/static/LHT/changeTel.css"
import {toast} from '@/utils/utils.js'
import { getValidationImg,SendSms } from '@/api/api.js'
import { changeMobile } from '@/api/personalApi.js'
export default {
	data() {
		return {
			newPhone:'',
			codeValue:'',
			newCodeValue:'',
			computedImg:'',
			computedImgToken:'',
			number:'获取验证码',
			num:60,
			style:{},
			color:'',
			background:''
		}
	},
	onLoad(){
		this.style = uni.getStorageSync('style')
		this.color = this.style.prodcuttext
		this.background = this.style.cartbtn
		this.getComputedImg()
	},
	onPullDownRefresh() {
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
		// 发送验证码
		verificationImage(){
			if(this.newPhone){
				if(this.codeValue){
					var data = {
						imgToken:this.computedImgToken,
						resultCode:this.codeValue,
						verifyCodeType:'1',
						mobile:this.newPhone,
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
			}else{
				toast({title:'请输入手机号'})
			}
			
		},
		submitEditPhone(){
			var data={
				mobile:this.newPhone,
				msgCode:this.newCodeValue
			}
			if(this.newPhone && this.newCodeValue){
				changeMobile(data).then(res => {
					if(res.success){
						toast({title:'修改手机号成功'})
						uni.redirectTo({
							url:'/personalPage/safe/safe'
						})
					}else{
						toast({title:res.msg})
					}
					
				}) 
			}
		},
	}
}
</script>

<style scoped lang="scss">
.verification_area{
	.verification_con{
		width: 690upx;
		margin:24upx 30upx;
		background-color: #FFFFFF;
		border-radius: 15px;
		.verification_title{
			font-size: 40upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 84upx;
			margin-left:30upx;
		}
		.verification_tips{
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 34upx;
			margin-left:30upx;
		}
		.verification_input_con{
			margin-left:30upx;
			padding:30upx 0 30upx 0;
			.verification_input_text{
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.input_one{
				width: 95%;
				height: 96upx;
				border-bottom: 1upx solid #EEEEEE;
				display: flex;
				align-items: center;
				.verification_input_left{
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-right: 75upx;
				}
			}
			.verification_input_computed{
				margin-top:10px;
				.computed_area{
					width: 95%;
					height: 96upx;
					display: flex;
					align-items: center;
					border-bottom: 1upx solid #EEEEEE;
				}
				.login_computed_area{
					width: 380upx;
					height: 70upx;
					border-radius: 35upx;
					display: flex;
					align-items: center;
					image{
						width: 46upx;
						height: 46upx;
						margin-left:34upx;
					}
					input{
						width: calc(100% - 100upx);
					}
				}
				.computed_image{
					width: 150upx;
					height: 66upx;
				}
				.change_computed_image{
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}
			.verification_input_two{
				margin-top:10px;
				.input_left{
					width: 95%;
					height: 96upx;
					display: flex;
					align-items: center;
				}
				
			}
		}
	}

}
</style>
