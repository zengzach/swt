<template>
	<view class="accountBack">
		<view class="accountnews">
			<view class="newsContent">
				<view class="newsName">
					用户名
				</view>
				<view class="newFrom">
					{{useName.loginName}}
				</view>
			</view>
			<view class="contentMassage" @click="open('公司名',useName.company)">
				<view class="massageName">
					公司名
				</view>
				<view class="massageRight">
					<view class="massageRightName">
						{{useName.company?useName.company:'暂无公司信息'}}
					</view>
					<image class="massageImg"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png" mode=""></image>
				</view>
			</view>

			<view class="contentMassage" @click="open('联系人',useName.contact)">
				<view class="massageName">
					联系人
				</view>
				<view class="massageRight">
					<view class="massageRightName">
						{{useName.contact?useName.contact:'暂无联系人信息'}}
					</view>
					<image class="massageImg"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png" mode=""></image>
				</view>
			</view>
			<view class="contentMassage" @click="open('邮箱',useName.email)">
				<view class="massageName">
					邮箱
				</view>
				<view class="massageRight">
					<view class="massageRightName">
						{{useName.email?useName.email:'暂无联系人信息'}}
					</view>
					<image class="massageImg"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png" mode=""></image>
				</view>
			</view>
		</view>
		<uni-popup ref="addCartPopup">
			<view class="popup">
				<view class="updataMailbox">
					<view>修改{{name}}</view>
					<image @click="close"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode=""></image>
				</view>
				<view class="mailbox">
					<view class="mailboxBtnContent">
						<input class="mail" type="text" placeholder="请输入你要修改的信息" v-model="value">
						<image @click="noNum" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/accountCancleImg.png"
							mode=""></image>
					</view>
				</view>
				<view class="mailboxBtn"  :style="{ background: background }">
					<view class="cancelBtn" :style="[{ 'color': color },{ 'border-color': color }]" @click="close">取消</view>
					<view class="sureBtn" @click="resetBtn()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import '@/static/LHT/account.css'
	import {
		getCustomerAccountInfo,
		modifyAccountBaseInfo
	} from "@/api/personal.js"
	export default {
		data() {
			return {
				useName: "",
				paramDto: {
					
				},
				name:'',
				value:'',
				background:'',
				color:''
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.personalcolor
			this.background = this.style.cartbtn
			this.imageURL1 = this.style.personalbackground
			this.getAccont()

		},
		methods: {
			getAccont() {
				getCustomerAccountInfo().then((res) => {
					if (res.code == "0") {		
						this.useName = res.data
					}

				})
			},
			open(useName,useNames) {
				this.name=useName
				if(this.name=='邮箱'){
					this.value=useNames				
				}
				if(this.name=='公司名'){
					this.value=useNames				
				}
				if(this.name=='联系人'){
					this.value=useNames				
				}
				this.$refs.addCartPopup.open('bottom')
				
			},
			close() {
				this.$refs.addCartPopup.close()
			},
			resetBtn() {
				if(this.name=='邮箱'){
					this.paramDto.email=this.value			
				}
				if(this.name=='公司名'){
					this.paramDto.company=this.value				
				}
				if(this.name=='联系人'){
					this.paramDto.contact=this.value				
				}
				this.$refs.addCartPopup.close()
				
				this.getmodifyAccount()
			},
			noNum(){
				this.value=null
			},
			getmodifyAccount() {
				if(this.value==''||this.value==null){
					
				}else{
					modifyAccountBaseInfo(this.paramDto).then((res) => {
						if (res.code == "0") {
							this.getAccont()
						}
					})
				}
			},
		},
	}
</script>

<style lang="less" scoped>
	.accountBack {
		width: 750upx;

		.accountnews {
			width: 690upx;
			height: 380upx;
			background-color: #FFFFFF;
			border-radius: 15upx;
			margin: 20upx auto;

			.newsContent {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.newsName {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-top: 50upx;
					margin-left: 30upx;

				}

				.newFrom {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-right: 65upx;
					margin-top: 38upx;
				}
			}

			.contentMassage {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 38upx;

				.massageName {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 30upx;
				}

				.massageRight {
					display: flex;
					align-items: center;

					.massageRightName {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						margin-right: 24upx;

					}

					.massageImg {
						width: 26upx;
						height: 26upx;
						margin-right: 30upx;
					}


				}
			}


		}

		.popup {
			width: 100%;
			height: 408upx;
			background-color: #fff;
			border-radius: 15upx 15upx 0 0;
			padding-bottom: 50upx;
			position: relative;
			bottom: 0;

			.updataMailbox {
				width: 100%;
				display: flex;

				view {
					width: 160upx;
					height: 31upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					margin-left: 312upx;
					margin-top: 51upx;
				}

				image {
					width: 20upx;
					height: 20upx;
					margin-top: 51upx;
					margin-left: 220upx;
				}
			}

			.mailbox {
				width: 690upx;
				height: 60upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 50upx;
				border-bottom: 2upx solid #EEEEEE;
				margin: 0 auto;

				.mailboxBtnContent {
					display: flex;
					justify-content: space-between;
					margin-top: 60upx;

					.mail {
						height: 23upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						line-height: 39upx;
						// margin-top: 60upx;
					}

					image {
						width: 24upx;
						height: 24upx;
					}
				}

			}

			// .mailboxBtn {
			// 	width: 702upx;
			// 	height: 70upx;
			// 	background: linear-gradient(-70deg, #0D986A, #08AE63);
			// 	border: 1upx solid #0D986A;
			// 	border-radius: 35upx;
			// 	display: flex;
			// 	margin: 90upx auto 0upx;

			// 	.cancelBtn {
			// 		width: 350upx;
			// 		height: 70upx;
			// 		background: #FFFFFF;
			// 		border: 1upx solid #0D986A;
			// 		border-radius: 35upx 0upx 35upx 35upx;
			// 		line-height: 70upx;
			// 		text-align: center;
			// 	}

			// 	.sureBtn {
			// 		width: 350upx;
			// 		text-align: center;
			// 		line-height: 70upx;
			// 	}

			// }
		}
	}
</style>
