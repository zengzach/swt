<template>
	<view style="width:750upx;overflow: hidden;">
		<view class="tabList">
			<view class="tabListItem" v-for="(item,index) in statusList" :key="item.code" @click="getCustomerCouponList(item.code,index)">
				<view :class="index==isClick?'tabListItem_text2':'tabListItem_text'">{{item.description}}</view>
				<view :class="index==isClick?'tabListItem_num2':'tabListItem_num'">{{item.couponNum?item.couponNum:0}}</view>
			</view>
		</view>
		<view class="discounts" v-if="couponList.customerCouponList!=null||couponList.customerCouponList!=[]">
			<view class="discountsList">
				<view class="discountsItem" v-for="(item,index) in couponList.customerCouponList" :key="index"
					:style="{background:item.customerCouponStatus==1?bgd1:bgd2,'backgroundSize':'100% 100%'}" 
					 @click="toCouponDetail(item)">
					<view class="price" v-if="item.couponType==1">
						￥<text>{{item.discountAmount}}</text>
						<view class="price_left">满{{item.conditionPrice}}可用</view>
					</view>
					<view class="price" v-if="item.couponType==2">
						<text>{{item.discountRate*10}}</text>折
						<view class="price_left">满{{item.conditionPrice}}可用</view>
					</view>
					<view class="price_center">
						<view class="discountsDetail_one">{{item.couponType==1?'满减券':'折扣券'}}</view>
						<view class="discountsDetail_two" v-if="item.useType==1">全部商品可用</view>
						<view class="discountsDetail_two" v-if="item.useType==2">指定商品可用</view>
						<view class="discountsDetail_two" v-if="item.useType==3">指定商品不可用</view>
						<view class="discountsDetail_three">{{item.startTime}}-{{item.endTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noList" v-if="couponList.customerCouponList==null||couponList.customerCouponList==[]">
			<view class="cont">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/noDiscountList.png" mode=""></image>
				<view>暂无可用的优惠券</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		customerCouponStatusEnums,customerCouponList
	} from '@/api/personalApi.js'
	import {
		toast
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				statusList:[
					{
						code:0,
						description:'全部',
						couponNum:''
					},
					{
						code:1,
						description:'已领取',
						couponNum:''
					},
					{
						code:2,
						description:'已使用',
						couponNum:''
					},
					{
						code:3,
						description:'已失效',
						couponNum:''
					},
				],
				couponList:{},
				isClick: 0,
				code: 0,
				bgd1:"url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_bg.png')",
				bgd2:"url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_bg_grey.png')"
			};
		},
		onLoad() {
			// this.getCustomerCouponStatusEnums()
			this.getCustomerCouponList(0,0)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getCustomerCouponList(this.code,this.isClick)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getCustomerCouponStatusEnums(){
				customerCouponStatusEnums().then(res=>{
					if(res.success){
						// this.statusList=res.data
					}
				})
			},
			getCustomerCouponList(status,index){
				this.isClick = index
				this.code = status
				var data={
					customerCouponStatus:status
				}
				customerCouponList(data).then(res=>{
					if(res.success){
						this.couponList=res.data
						this.statusList.forEach(item=>{
							if(item.code==0){
								item.couponNum=res.data.total
							}else if(item.code==1){
								item.couponNum=res.data.receiveAmount
							}else if(item.code==2){
								item.couponNum=res.data.usedAmount
							}else if(item.code==3){
								item.couponNum=res.data.expireAmount
							}
						})
					}
				})
			},
			toCouponDetail(item){
				if(item.customerCouponStatus==1){
					uni.navigateTo({
						url:'/personalPage/share/shareDiscount?couponId='+item.couponId
					})
				}else{
					toast({
						title:'该优惠券已失效！'
					})
				}
				
			},
			
		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #F6F6F6;
	}
</style>
<style scoped lang="less">
	.tabList {
		width: 100%;
		height: 95rpx;
		background: #ffffff;
		overflow: auto;
		display: flex;
		justify-content: space-around;
		position:sticky;
		top:0;
		left:0;

		.tabListItem {
			width: 150upx;
			height: 80rpx;
			margin-right: 20upx;
			text-align: center;

			.tabListItem_text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 50rpx;
			}

			.tabListItem_text2 {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #5974FF;
				line-height: 50rpx;
			}
			.tabListItem_num {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
			
			.tabListItem_num2 {
				width: 90rpx;
				height: 24rpx;
				background: #5974FF;
				border-radius: 12rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 24rpx;
				margin: 0 auto;
			}
			
		}
		
	}

	.discounts {
		width: 100%;
		background:#F6F6F6;
		overflow-y: auto;
		padding: 0 30upx 30upx;

		.discountsList {
			width: 100%;
			white-space: nowrap;
		}

		.discountsItem {
			width: 690upx;
			height: 180rpx;
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;

			.price {
				width: 185upx;
				color: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				text-align: center;
				text {
					color: #FFFFFF;
					font-size: 50rpx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 160upx;
				}
				
				.price_left {
					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: -45upx;
				}
			}

			.price_center {
				width: 460upx;
				text-align: left;
				padding-left: 10upx;

				.discountsDetail_one {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #666666;
					margin-top: 36upx;
				}

				.discountsDetail_two {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					margin-top: 10upx;
				}

				.discountsDetail_three {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					margin-top: 10upx;
				}
			}
		}
	}

	.noList{
		width:100%;
		// background:#ffffff;
		position:relative;
		top:20upx;
		.cont{
			width:270upx;
			position:absolute;
			top:290upx;
			left:235upx;
			text-align:center;
			image{
				width:100upx;
				height:100upx;
			}
			view{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #929396;
				line-height: 30rpx;
			}
		}
	}
</style>
