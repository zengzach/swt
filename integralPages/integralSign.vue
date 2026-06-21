<template>
	<view class="integralContext" :catchtouchmove="showPop?'return':''">
		<view class="integralDetail">
			<view class="integralDetailHeadr">
				<view class="headerContent">
					<image @click="banckTo"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/leftArrows.png"
						mode=""></image>
					<view style="margin-left:-36upx"> 我的积分 </view>
					<view> </view>
				</view>
				<view class="integralNum">
					<view class="integralNumLeft">
						<image style="width: 36upx;height: 36upx;"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/integralLogoDetail.png"
							mode=""></image>
						<view class="myIntegral">
							<text class="myNums">{{userinfo.integral}}</text>
							<view class="myText">积分</view>
						</view>
					</view>
				</view>

				<view class="integralSignInLogo">
					<view class="integralSignInNull"> </view>
					<view class="integralSignInImg">
						<view class="integralSignInLeft">
							<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/GetIntegral.png"
								mode=""></image>
							<view class="">
								每日签到可获得{{num}}积分
							</view>
						</view>
						<view class="integralSignInRight" @click="hasSignIn==0? sign():''">
							{{hasSignIn==0?'立即签到':'已签到'}}
						</view>
					</view>
				</view>
			</view>

			<view class="integralDetailContent">

				<view class="integralStatus">
					<view class="integralStatusFlex" v-if="!flag">
						<view :class="item.code==code?'integralLine':''" @click="getIntegral(item.code)"
							v-for="item in Statuses" :key='item.code'>
							{{item.description}}
						</view>
					</view>
					<!-- 积分流水部分 -->
					<view class="integralBillTop" v-if="!flag">
						<view class="" v-if="integralList.length<=0">
							<view class="noOrder">
								<image style="width:180upx;height:120upx;" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/nothing.png"
									mode="widthFix"></image>
								<view>暂无积分记录</view>
							</view>
						</view>
						<view class="integralBill" v-else v-for="item in integralList" :key="item">
							<view class="">
								<view class="integralBuy">
									{{item.changeTypeName}}
								</view>
								<view class="integralBillTitle">
									<view class="" style="color:#666">
										{{item.createTime}}
									</view>
								</view>
							</view>
							<view :class="item.integralNum>1?'integralBillPrice':'integralBillPrice_black'">
								{{item.integralNum>1?'+'+item.integralNum:item.integralNum}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pop" v-if="showPop" catchtouchmove="touchMove">
				<view class="popClose" @click="close"></view>
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/integralMoneys.png"
					mode=""></image>
				<view class="popTitle">今日签到积分：+{{num}}</view>
				<view class="popCertificate">赚积分，海量超值礼品免费换!</view>
				<view class="popCertificateBtn" @click="close">好的</view>
			</view>
			<!-- 遮罩层 -->
			<view class="cover" v-if="showPop"> </view>

		</view>
	</view>
</template>

<script>
	import {
		hasSignIn,dailySignIn,integralLogType,integralLogPage
	} from '@/api/integral/integralSign.js'
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import moment from 'moment';
	import {
		toast
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				flag: false,
				showPop: false,
				userinfo: {
					integral:0
				},
				num: '',
				Statuses: [{
						description: "全部",
						code: 0
					},
					{
						description: "收入",
						code: 1
					},
					{
						description: "支出",
						code: 2
					}
				],
				code: '',
				hasSignIn: 0,
				Loginflag: null,
				pageNum:1,
				integralList:[],
				integralType:[]
			}
		},
		onLoad() {
			// this.getAccountInfo()
			// this.getIntegralType()
			// this.isSignIn()
		},
		onShow() {
			var token = uni.getStorageSync('token')
			if (token) {
				this.Loginflag = true
				this.getAccountInfo()
				this.getIntegralType()
				this.isSignIn()
			} else {
				this.Loginflag = false
			}
		},
		methods: {
			banckTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取账号信息
			getAccountInfo(){
				getLoginAccount().then(res=>{
					if(res.success){
						this.userinfo=res.data
					}
				})
			},
			// 是否签到
			isSignIn() {
				hasSignIn().then(res=>{
					this.hasSignIn=res.data.hasSignIn
					this.num = res.data.integralNum
				})
			},
			// 开启签到弹窗
			sign() {
				if(this.Loginflag){
					this.showPop = true
					dailySignIn().then(res => {
						if (res.success) {
							this.num = res.data.integralNum
							this.getAccountInfo()
							this.getIntegral(0)	
						}
					})
				}else{
					toast({
						title:'未登录，不可以签到哦！'
					})
				}
				
			},
			// 获取积分类型
			getIntegralType(){
				integralLogType().then(res=>{
					if(res.success){
						this.integralType=res.data
						this.getIntegral(0)
					}
				})
			},
			// 获取积分流水
			getIntegral(code){
				if(this.Loginflag){
					this.code=code
					integralLogPage(this.pageNum,{
						type:code
					}).then(res=>{
						this.integralType.forEach(item=>{//分类列表
							res.data.list.forEach(item2=>{//积分流水列表
								if(item2.changeType == item.code){
									item2.changeTypeName = item.description
									if (item2.createTime) {
										item2.createTime = moment(item2.createTime).format('YYYY.MM.DD HH:mm:ss')
									}
								}
							})
							this.integralList = res.data.list
						})
					})
				}else{
					toast({
						title:'登录后才可以查看哦！'
					})
				}
				
			},
			// 关闭签到弹窗
			close() {
				this.showPop = false
				this.isSignIn()
			},
		}
	}
</script>

<style lang="scss">
	.integralContext {
		disableScroll: true;

		.integralDetail {
			width: 100%;
			height: 370upx;
			background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/integral_sign_bg.png');
			background-size: 100% 100%;
			position: relative;

			.cover {
				width: 100%;
				height: 100%;
				background: #000000;
				opacity: 0.42;
				position: fixed;
				top: 0;
				z-index: 98;
			}
			.pop {
				width: 560upx;
				height: 558upx;
				position: fixed;
				top: 34%;
				left: 12%;
				background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/sign_alert_bg.png');
				background-size: 100% 100%;
				z-index: 99;

				image {
					width: 222upx;
					height: 115upx;
					margin-top: 134upx;
					margin-left: 172upx;
				}

				.popClose {
					position: absolute;
					width: 46upx;
					height: 46upx;
					background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/integralClose.png');
					background-size: 100% 100%;
					right: 0;
				}

				.popTitle {
					margin-top: 51upx;
					text-align: center;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FB681A;
				}

				.popCertificate {
					text-align: center;
					margin-top: 26upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.popCertificateBtn {
					width: 360upx;
					height: 60upx;
					background: linear-gradient(126deg, #FE7E30, #FFA443);
					border-radius: 30upx;
					margin: 47upx auto 0;
					text-align: center;
					line-height: 60upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}

			.productPop {
				position: fixed;
				top: 30%;
				background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/productPop.png');
				background-size: 100% 100%;
			}

			.integralDetailHeadr {
				.headerContent {
					display: flex;
					width: calc(100% - 44upx);
					margin: 0 auto;
					justify-content: space-between;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					padding-top: 90upx;
					color: #FFFFFF;
					align-items: center;

					image {
						width: 38upx;
						height: 33upx;
					}
				}

				.integralNum {
					width: calc(100% - 76upx);
					margin: 64upx auto 0;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.integralNumLeft {
						display: flex;
						align-items: center;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-left: 10up;

						.myIntegral {
							display: flex;
							align-items: center;

							.myNums {
								font-size: 60upx;
								font-family: PingFang SC;
								font-weight: 800;
								color: #FFFFFF;
								margin-left: 20upx;
								margin-right: 28upx;
							}

							.myText {
								height: 40upx;
								// line-height: 40upx;
								// margin-top: -20upx;
							}
						}

					}


				}

				.integralSignInLogo {
					width: calc(100% - 48upx);
					height: 160upx;
					margin: 35upx auto 0;
					background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/integralSignIn.png');
					background-size: 100% 100%;
					display: flex;

					.integralSignInNull {
						width: 192upx;
					}

					.integralSignInImg {
						width: 510upx;
						display: flex;
						justify-content: space-between;

						.integralSignInLeft {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;

							image {
								width: 204upx;
								height: 35upx;
								margin-top: 43upx;
								margin-bottom: 16upx;
							}
						}

						.integralSignInRight {
							width: 140upx;
							height: 48upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							background: linear-gradient(126deg, #FF8D13, #FE7E30);
							color: #FFFFFF;
							border-radius: 24upx;
							text-align: center;
							line-height: 48upx;
							margin-right: 31upx;
							margin-top: 58upx;
						}
					}
				}
			}

			.integralDetailContent {
				width: calc(100% - 48upx);
				background: #FFFFFF;
				margin: 24upx auto 0;
				border-radius: 15upx;


				.integralStatus {
					width: calc(100% - 72upx);
					margin: 0 auto;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					padding-top: 30upx;

					.integralStatusFlex {
						display: flex;
						justify-content: space-between;
						margin: 0 auto;

						view {
							padding-bottom: 11upx;
							text-align: center;
						}

						.integralLine {
							border-bottom: 6upx solid #FB681A;
						}
					}

					.integralBillTop {
						width: calc(702upx - 58upx);
						margin: 16upx auto 0;
						
						.noOrder{
							height:400upx;
							padding-top:100upx;
							text-align:center;
						}

						.integralBill {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 30upx;
							height: 88upx;
							padding-bottom: 24upx;
							border-bottom: 1upx solid #EEEEEE;

							.integralBillPrice {
								font-size: 30upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #FB681A;
								padding-right:15upx;
							}
							.integralBillPrice_black {
								font-size: 30upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #333;
								padding-right:15upx;
							}

							.integralBuy {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								padding-bottom: 10upx;
							}

							.integralBillTitle {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								display: flex;
								justify-content: space-between;
							}
						}
					}

				}


			}
		}
	}
</style>
