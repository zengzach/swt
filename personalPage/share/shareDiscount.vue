<template>
	<view class="box">
		<view class="share">
			<view class="share_header">
				<view class="header_left">
					<image :src="couponDetail.shopShareLogoUrl?couponDetail.shopShareLogoUrl:'https://img1.bioyx.cn/prod/img/customerHeadImg/default_headImg.png'" mode=""></image>
				</view>
				<view class="header_right">
					<view class="right1">{{couponDetail.shopName?couponDetail.shopName:''}}</view>
					<view class="right2">{{couponDetail.shopShareDescribe?couponDetail.shopShareDescribe:''}}</view>
				</view>
			</view>
			<view class="share_content">
				<view class="content1">
					<view class="content1_top" v-if="couponDetail.couponType==1">
						￥<text>{{couponDetail.discountAmount}}</text>
					</view>
					<view class="content1_top" v-if="couponDetail.couponType==2">
						<text>{{couponDetail.discountRate*10}}</text>折
					</view>
					<view class="content1_right">
						<view class="discountsDetail_two">{{couponDetail.couponName}}</view>
						<view class="discountsDetail_one" v-if="couponDetail.useType==1">全部商品可用</view>
						<view class="discountsDetail_one" v-if="couponDetail.useType==2">指定商品可用</view>
						<view class="discountsDetail_one" v-if="couponDetail.useType==3">指定商品不可用</view>
					</view>
				</view>
				<view class="content2">-------------------------------------------------</view>
				<view class="content3">有效期：{{couponDetail.startTime}} 至 {{couponDetail.endTime}}</view>
				<view class="content4" v-if='couponDetail.isReceived' @click="useCoupon">立即使用</view>
				<view class="content4" v-else @click="saveCoupon">立即领取</view>
				<button class="content5" open-type="share">分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		couponDetail
	} from '@/api/commonApi.js'
	import {
		receiveCoupon
	} from '@/api/indexApi'
	import {
		toast,
		getRouter,
		getUrl,
	} from '@/utils/utils.js'
	import moment from 'moment';
	export default {
		data() {
			return {
				couponId:null,
				couponDetail:{},
			}
		},
		onLoad(option) {
			this.couponId = option.couponId
			this.getCouponDetail()
			// getRouter()
			getUrl()
		},
		// 分享好友--胶囊
		onShareAppMessage() {
			return {
				title: this.couponDetail.couponName,
				path: '/personalPage/share/shareDiscount?couponId='+this.couponDetail.id
			}
		},
		//分享朋友圈--胶囊
		onShareTimeline() {
			return {
				title: this.couponDetail.couponName,
				path: '/personalPage/share/shareDiscount?couponId='+this.couponDetail.id
			}
		},
		methods: {
			getCouponDetail(){
				var data={
					couponId:this.couponId 
				}
				couponDetail(data).then(res=>{
					if(res.success){
						res.data.startTime = moment(res.data.startTime).format('YYYY.MM.DD')
						res.data.endTime = moment(res.data.endTime).format('YYYY.MM.DD')
						this.couponDetail = res.data
					}
				})
			},
			// 领取优惠券
			saveCoupon(){
				var token = uni.getStorageSync('token')
				if(token){
					var data={
						couponId:this.couponDetail.id
					}
					receiveCoupon(data).then(res=>{
						if(res.success){
							toast({
								title:'领取成功'
							})
							this.couponDetail.isReceived=true
						}else{
							toast({
								title:res.msg
							})
						}
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '未登录不能领取优惠券，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
				
			},
			// 使用优惠券
			useCoupon(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			// 分享优惠券
			onShareAppMessage(res) {
			    if (res.from === 'button') {// 来自页面内分享按钮
				
			    }
			    return {
			      title: this.couponDetail.couponName,
			      path: '/personalPage/share/shareDiscount?couponId='+this.couponDetail.id
			    }
			},
			
		}
	}
</script>

<style scoped lang="scss">
	button{
		border:none;
	}
	.box {
		.share {
			width: 660upx;
			height: 960rpx;
			margin: 30upx auto 0;
			background:#ffffff;
			border-radius: 30rpx;
			.share_header{
				width:100%;
				height:130upx;
				// background:#dbf6fd;
				border-radius: 30rpx 30rpx 0 0;
				display:flex;
				.header_left{
					width: 80rpx;
					margin-top:40rpx;
					margin-left:47rpx;
					
					image{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
				.header_right{
					width:570upx;
					margin-top:40rpx;
					margin-left:16rpx;
					.right1{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						line-height: 40rpx;
					}
					.right2{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
					}
				}
			}
			
			.share_content{
				width:606upx;
				height:758upx;
				margin:20upx auto 0;
				background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discount_bg.png');
				background-size: 100% 100%;
				position:relative;
				
				.content1{
					width: 417upx;
					// margin-top: 20upx;
					// background:#7d7d7d;
					position:absolute;
					top: 220upx;
					left: 100upx;
					text-align:center;
					
					.content1_top {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #ED5D44;
					
						text {
							font-size: 70rpx;
							font-family: PingFang SC;
							font-weight: 800;
							color: #ED5D44;
						}
					}
					
					.content1_right {
					
						.discountsDetail_one {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 800;
							color: #ED5D44;
						}
					
						.discountsDetail_two {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #ED5D44;
						}
					}
				}
				.content2{
					width: 417upx;
					height:30upx;
					text-align:center;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #EFBA98;
					line-height: 30rpx;
					overflow:hidden;
					position:absolute;
					top: 380upx;
					left: 100upx;
				}
				.content3{
					width: 417upx;
					position:absolute;
					top: 414upx;
					left: 100upx;
					text-align:center;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #EFBA98;
					line-height: 30rpx;
				}
				.content4{
					width: 455upx;
					height:70upx;
					background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/sourBtn.png');
					background-size:100% 100%;
					position:absolute;
					top: 525upx;
					left: 78upx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #ED5D44;
					line-height: 70rpx;
					text-align:center;
				}
				.content5{
					width: 455upx;
					height:70upx;
					border-radius:40upx;border:1px solid #FCF5D0;background: none;
					// background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/shareBtn_bg.png');
					// background-size:100% 100%;
					position:absolute;
					top: 616upx;
					left: 78upx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FCF5D0;
					line-height: 68rpx;
					text-align:center;
				}
			}
		}
	}
</style>
