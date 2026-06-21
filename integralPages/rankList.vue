<template>
	<view>
		<view class="head">
			<image class="back" @click="back"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/back_white.png" />
			<view class="pai">
				兑换排行
			</view>
		</view>
		<view class="ranklist" v-if="List.length>0">
			<view class="ranklist-item" v-for="(item,index) in List" :key="item.id" @click="toDetail(item.goodsBaseId)">
				<view class="list_left">
					<image class="list_left_img1" v-if="index==0" :src="item.pictureUrl?item.pictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"> </image>
					<image class="list_left_img2" v-if="index==1" :src="item.pictureUrl?item.pictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"> </image>
					<image class="list_left_img3" v-if="index==2" :src="item.pictureUrl?item.pictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"> </image>
					<image class="list_left_img4" v-if="index!=0 && index!=1 && index!=2" :src="item.pictureUrl?item.pictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"> </image>
					<view class="left_img" v-if="index==0">
						<image class="top1"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/top1.png">
						</image>
						<view class="top1-1" style="width: 38upx;height:38upx;border-radius: 50%; background-color: #ffaa00;color: #fff;
						line-height: 38upx;text-align: center;font-size: 26upx;">{{index+1}}</view>
					</view>
					<view class="left_img" v-if="index==1">
						<view class="top1-1" style="width: 38upx;height:38upx;border-radius: 50%; background-color: #9FA5AF;color: #fff;
						line-height: 38upx;text-align: center;font-size: 26upx;">{{index+1}}</view>
					</view>
					<view class="left_img" v-if="index==2">
						<view class="top1-1" style="width: 38upx;height:38upx;border-radius: 50%; background-color: #FF5C1F;color: #fff;
						line-height: 38upx;text-align: center;font-size: 26upx;">{{index+1}}</view>
					</view>
					<view class="left_img" v-if="index!=0 && index!=1 && index!=2">
						<view class="top1-1" style="width: 38upx;height:38upx;border-radius: 50%; background-color: #F75D55;color: #fff;
						line-height: 38upx;text-align: center;font-size: 26upx;">{{index+1}}</view>
					</view>
				</view>
				<view class="list_right">
					<view class="right_title"> {{item.goodsTitle}} </view>
					<view class="right_bot">
						<view class="right_bot_left">
							积分: <view class="bot_left_jf"> {{item.integralPrice}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { integralRankList } from '@/api/integral/integralIndexApi.js';
	import { getRouter } from '@/utils/utils.js'

	export default {
		data() {
			return {
				List: {}
			}
		},
		onLoad() {
			this.getranklist(),
			getRouter()
		},
		methods: {
			//排行榜
			getranklist() {
				integralRankList().then(res=>{
					this.List = res.data
				})
			},
			//去商品详情
			toDetail(id) {
				uni.navigateTo({
					url:"/integralPages/integralDetail?integralId="+id
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	.head {
		width: 750upx;
		height: 574upx;
		background-image: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/ranklist_banner.png);
		background-size: 750upx 574upx;
		position: relative;
	}

	.back {
		width: 46upx;
		height: 40upx;
		position: absolute;
		top: 75upx;
		left: 28upx;
	}

	.pai {
		font-size: 32upx;
		color: #ffffff;
		position: absolute;
		top: 75upx;
		left: 300upx;
	}

	.ranklist {
		width: 700upx;
		background-color: #fff;
		z-index: 9999;
		border-radius: 10upx;
		margin-left: 12px;
		margin-top: -50px;
		position: relative;
		padding: 10upx 0;
	}

	.ranklist-item {
		width: 700upx;
		height: 200upx;
		display: flex;
		justify-content: space-between;
		padding-top: 20upx;
		padding-bottom: 20upx;
		margin-left: 20upx;
	}

	.list_left {
		width: 200upx;
		height: 200upx;
		position: relative;
	}

	.list_left_img1 {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 8upx solid #ffaa00;
	}

	.list_left_img2 {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 8upx solid #9FA5AF;
	}

	.list_left_img3 {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 8upx solid #FF5C1F;
	}

	.list_left_img4 {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		border: 8upx solid #ff4e4e;
	}

	.list_left_img {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}

	.left_img {
		position: relative;
		right: 0;
		top: 0;
	}

	.left_img .top1 {
		width: 52upx;
		height: 52upx;
		position: absolute;
		top: -226upx;
		right: -20upx;
	}

	.top1-1 {
		width: 38upx;
		height: 38upx;
		position: absolute;
		top: -46upx;
		right: 10upx;
	}

	.list_right {
		width: 414upx;
		height: 200upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-right: 30upx;
	}

	.right_title {
		width: 414upx;
		height: 76upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		color: #333;
		font-size: 30upx;
	}

	.right_bot {
		width: 380upx;
		margin-top: 100upx;
		display: flex;
		justify-content: space-between;
	}

	.right_bot_left {
		width: 240upx;
		font-size: 24upx;
		color: #333;
		display: flex;
	}

	.bot_left_jf {
		font-weight: 700;
		font-size: 36upx;
		color: #FB681A;
		margin-top: -10upx;
	}

	.right_bot_right {
		width: 90upx;
		height: 40upx;
		background-color: #FB681A;
		font-size: 24upx;
		color: #ffffff;
		text-align: center;
		line-height: 40upx;
	}

</style>
