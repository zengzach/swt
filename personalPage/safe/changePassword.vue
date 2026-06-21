<template>
	<view class="modification">
		<view class="modification_content_one">
			<view class="modification_content_item">
				<view class="modification_one_title">请输入新密码</view>
				<view class="modification_one_con">
					<input class="uni-input" v-if="showPassword" password placeholder-style="color:#c7c7c7;fontSize:28upx;" @blur="testPassword"
						placeholder="请输入新密码(4-20位的数字和字母组成)" v-model="newPassword"/>
					<input class="uni-input" v-if="!showPassword" type="text" placeholder-style="color:#c7c7c7;fontSize:28upx;" @blur="testPassword"
						placeholder="请输入新密码(4-20位的数字和字母组成)" v-model="newPassword"/>
					<view>
						<image class="look_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/look_password.png" 
							v-if="showPassword" @click="showpwd" mode="widthFix"></image>
						<image class="look_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/not_look_password.png" 
							v-if="!showPassword" @click="unshowpwd" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="modification_content_item">
				<view class="modification_one_title">请确认新密码</view>
				<view class="modification_one_con">
					<input class="uni-input" v-if="isLookPassword2" password placeholder-style="color:#c7c7c7;fontSize:28upx;" placeholder="请再次输入新密码" v-model="newPassword2" />
					<input class="uni-input" v-if="!isLookPassword2" type="text" placeholder-style="color:#c7c7c7;fontSize:28upx;" placeholder="请再次输入新密码" v-model="newPassword2" />
					<view>
						<image class="look_icon" v-if="isLookPassword2" @click="showpwd2"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/look_password.png" mode="widthFix"></image>
						<image class="look_icon" v-if="!isLookPassword2" @click="unshowpwd2"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/not_look_password.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="submit_btn" :style="{ background: background }"  @click="submitPassword">确定</view>
	</view>
</template>

<script>
	import '@/static/LHT/changePassword.css'
	import { toast,verifyPasswordFormat } from '@/utils/utils.js'
	import { changePassword } from '@/api/personalApi.js'
	import { getStyleById } from '@/api/indexApi'
	export default {
		data() {
			return {
				newPassword:'',
				newPassword2:'',
				showPassword:true,
				isLookPassword2:true,
				style:{},
				background:''
			}
		},
		created(){
			this.getStyleByIdList()
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				 uni.stopPullDownRefresh()
			},1000)
		},	
		methods: {
			getStyleByIdList() {
				// var id = 1
				 getStyleById().then(res => {
					this.style =res.data
					this.background = this.style.cartbtn
					// console.log(this.style,'styles')
				})
			},
			showpwd(){
				this.showPassword=false
			},
			unshowpwd(){
				this.showPassword=true
			},
			showpwd2(){
				this.isLookPassword2=false
			},
			unshowpwd2(){
				this.isLookPassword2=true
			},
			testPassword(){
				verifyPasswordFormat(this.newPassword)
			},
			submitPassword(){
				var flag = verifyPasswordFormat(this.newPassword)
				var data={
					password:this.newPassword2
				}
				if(flag){
					if(this.newPassword == this.newPassword2){
						changePassword(data).then(res => {
							if(res.success){
								toast({title:'密码修改成功'})
								uni.redirectTo({
									url:'/personalPage/safe/safe'
								})
							}else{
								toast({title:res.msg})
							}
						})
					}else{
						toast({title:'输入的确认密码跟密码不一致'})
					}
				}
			},
		}
	}
</script>

<style>
	page{background-color: #F8F8F8;}
</style>
<style scoped lang="scss">
.modification{
	width: calc(100% - 48upx);
	padding: 0 24upx;
	.modification_content_one{
		width: calc(100% - 61upx);
		padding: 26upx 30upx 30upx 31upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 22upx 0;
		.modification_content_item{
			border-bottom: 1upx solid #EEEEEE;
			padding-bottom: 36upx;
			.modification_one_title{
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 84upx;
			}
			.modification_one_con{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.look_icon{
					width: 40upx;
					height: 40upx;
				}
				input{
					width: 90%;
				}
			}
			&:last-child{
				border-bottom: 0upx solid #EEEEEE;
				padding-bottom: 0;
			}
		}
		
	}
	
}
</style>
