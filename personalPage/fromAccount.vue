<template>
		<view class="">
			<view class="" v-if="accountBank.length">
				<view class="fromAccountContent" :style="{background: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}" v-for="item in accountBank" :key="item.id">
					<view class="fromAccountBank">
						{{item.dueBank}}
					</view>
					<view class="fromAccountNumber">
						{{item.shroffAccountNumber}}
					</view>
					<view class="fromAccountBranch">
						{{item.openingBank}}
					</view>
					<view class="fromAccountCompany" :style="{ color: color }">
						{{item.collectingCompany}}
					</view>
				</view>
			</view>	
		<view class="notAccount" v-else>
			<view class="notAccountContent">
				<view class="content">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/person.png" mode=""></image>
					<view class="notAccountText">
						暂无银行账号信息
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectBankList
	} from "@/api/personal.js"
	import {
		getRouter,
		refresh,
		getUrl
	} from '@/utils/utils.js'

	export default {
		data() {
			return {
				accountBank: [],
				imageURL:'',
				style:{},
				color:''
			}
		},

		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.prodcuttext
			this.imageURL = this.style.bankbg
			var token = uni.getStorageSync('token')
			if(token){
				
			}else{
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			}
			this.accountselectBankList()
			getUrl()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.accountselectBankList()
				getRouter();				
			},
			accountselectBankList() {
				selectBankList().then(res => {
					this.accountBank = res.data
				})
			},
			//分享个人
			onShareAppMessage() {
				return {
					title: '汇款账号',
					path: 'personalPage/fromAccount' 	
				}
				
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '汇款账号',
					path: 'personalPage/fromAccount' 	
				}
			},

		}

	}
</script>

<style scoped lang="less">
	.notAccount {
		width: 100%;
		height: 100vh;
		background-color: #fff;

		.notAccountContent {
			.content {
				width: 370upx;
				height: 200upx;
				box-sizing: border-box;
				padding-top: 290upx;
				text-align: center;
				margin: 0 auto;

				image {
					width: 100upx;
					height: 108upx;
					background-size: 100%
				}

				.notAccountText {
					width: 371upx;
					height: 26upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #929396;
					text-align: center;
					margin-top: 39upx
				}
			}


		}
	}

	@import url('@/static/LHT/fromAccount.css');
</style>
