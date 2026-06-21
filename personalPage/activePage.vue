<template>
	<view class="activePage">
		<view v-if="goodsResultList&&specialActivityDetail">
			<view v-if="bannerList">
				<view class="uni-margin-wrap ListTopImg">
					<swiper class="swiper" circular :indicator-dots='true' autoplay style="width: 100%;height: 100%;">
						<swiper-item v-for="(item,index) in bannerList" :key="index">
							<image :src="item.url"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="activeContent">
					<mp-html :content="specialActivityDetail.context" :selectable='true' :tag-style="tagStyle" />
				</view>
			</view>
			<view class="activeImg" v-else>
				<mp-html :content="specialActivityDetail.context" :selectable='true' :tag-style="tagStyle" />
			</view>
			<view class="activeList" style="display:flex;" v-if="activityList">
				<view class="activeGoods" v-for="(item,index) in activityList" :key="index" @click="goDetail(item)">
					<view style="width: 296upx;height: 296upx;position: relative;">
						<image style="width: 296upx;height: 296upx;margin-top: 22upx;margin-left: 22upx;"
							v-if="item.goodsPictureUrl" :src="item.goodsPictureUrl" mode=""></image>
						<image style="width: 296upx;height: 296upx;margin-top: 22upx;margin-left: 22upx;" 
							v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
							mode=""></image>
						<image v-if="item.type == 20" style="width: 46upx;height:46upx;position: absolute;top:0;right:0;margin-top: 22upx;
							margin-right: -21upx;" src='https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E7%BB%84%20204%402x.png'
							mode=""></image>
						<image v-if="item.type == 30" style="width: 46upx;height:46upx;position: absolute;top:0;right:0;margin-top: 22upx;
							margin-right: -21upx;" src='https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E7%BB%84%20204%402x%20%281%29.png'
							mode=""></image>
					</view>
					<view class="goodsTitle">{{item.goodsTitle}}</view>
					<!-- 限时折扣 -->
					<view class="" v-if="item.goodsPrice.promotionStatus == 20 && item.type != 20 && item.type != 30">
						<view class="goodsPrice">
							<span>￥</span>{{item.goodsPrice.promotionPrice}}
						</view>
						<view class="">
							<view class="units">货号：{{item.artNo}}</view>
							<view class="units">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
							<view class="units" v-if="!item.isReserve">库存：{{item.stock}}{{item.saleUnitName}}</view>
							<view class="units" v-if="item.stock<=0&&item.isReserve">库存：可预订</view>
							<view class="units" v-if="item.stock>0&&item.isReserve">库存：{{item.stock}}{{item.saleUnitName}}</view>
						</view>
					</view>
					<!-- 赠品 -->
					<view class="" v-else-if="item.type == 20 && item.goodsPrice.promotionStatus == 20">
						<view class="goodsPrice">
							<span>￥{{item.goodsPrice.promotionPrice}}</span>
							<view class="addCartBtn2" v-if="item.type == 20">免费领取</view>
						</view>
						<view class="">
							<view class="units">货号：{{item.artNo}}</view>
							<view class="units">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
							<view class="units">库存：{{item.giftStock?item.giftStock:0}}{{item.saleUnitName}}</view>
						</view>
					</view>
					<!-- 赠品 -->
					<view class="" v-else-if="item.type == 20 && item.goodsPrice.promotionStatus != 20">
						<view class="goodsPrice">
							<span>￥{{item.goodsPrice.price}}</span>
							<view class="addCartBtn2" v-if="item.type == 20">免费领取</view>
						</view>
						<view class="">
							<view class="units">货号：{{item.artNo}}</view>
							<view class="units">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
							<view class="units">库存：{{item.giftStock?item.giftStock:0}}{{item.saleUnitName}}</view>
						</view>
					</view>
					<!-- 样品 -->
					<view class="" v-else-if="item.type == 30">
						<view class="goodsPrice">
							<span>￥0</span>
							<view class="addCartBtn2" v-if="item.type == 30">样品申请</view>
						</view>
						<view class="">
							<view class="units">货号：{{item.artNo}}</view>
							<view class="units">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
							<view class="units">库存：{{item.sampleStock?item.sampleStock:0}}{{item.saleUnitName}}</view>
						</view>
					</view>
					<!-- 正常品 -->
					<view class="" v-else>
						<view class="goodsPrice" v-if="item.goodsPrice.price"><span>￥{{item.goodsPrice.price}}</span></view>
						<view class="goodsPrice" style="font-size: 30upx;" v-else><span>询价</span></view>
						<view class="">
							<view class="units">货号：{{item.artNo}}</view>
							<view class="units">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
							<view class="units" v-if="!item.isReserve">库存：{{item.stock}}{{item.saleUnitName}}</view>
							<view class="units" v-if="item.stock<=0&&item.isReserve">库存：可预订</view>
						</view>
					</view>
				</view>
			</view>
			<!-- v-if="!activityList" -->
			<view class="lastContent" v-if="!hasNextPage"> -------- 我是有底线的 -------- </view>
		</view>
		<!-- <view class="noGoods" v-if="!activityList&&goodsResultList!=null&&specialActivityDetail!=null">
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/nogoods.png" mode="">
			</image>
			<view class="noState">
				暂无活动商品
			</view>
		</view> -->
		<view class="noGoods" v-if="goodsResultList==null&&specialActivityDetail==null">
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/nogoods.png" mode=""></image>
			<view class="noState"> 暂无数据 </view>
		</view>
	</view>
</template>
<script>
	import {
		getSpecialActivityDetail
	} from '@/api/active.js'
	import {
		getPersonNumber
	} from '@/api/indexApi'
	import {
		refresh,
		getRouter
	} from '@/utils/utils.js'
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components:{
			mpHtml
		},
		data() {
			return {
				tagStyle:{img: "width:100%;display:block;", table: "width:100%", video: "width:100%"},
				activityList: [],
				goodsResultList:{},
				specialActivityDetail: {},
				bannerList: [],
				specialActivityId: '',
				pageNum: 1,
				hasNextPage:false,
			}
		},
		onLoad(opt) {
			this.specialActivityId = opt.specialActivityId
			this.SpecialActivityDetail()
			this.getPersonNumbers()
		},
		onReachBottom: function() {
			if(this.hasNextPage){
				this.pageNum++
				this.SpecialActivityDetail()
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 获取访客数量
			getPersonNumbers() {
				// wx.login({
					//成功放回
					// success: (res) => {
						// let code = res.code
						getPersonNumber().then(res => {})
					// }
				// })
			},
			getDataMsg() {
				this.SpecialActivityDetail()
				getRouter();
			},
			SpecialActivityDetail() {
				getSpecialActivityDetail(this.pageNum, this.specialActivityId).then(res => {
					if (res.success) {
						this.goodsResultList = res.data.goodsResultList
						this.specialActivityDetail = res.data.specialActivityDetail
						
						this.activityList = res.data.goodsResultList.list
						this.bannerList = res.data.specialActivityDetail.bannerList
						this.hasNextPage = res.data.goodsResultList.hasNextPage
						uni.setNavigationBarTitle({
							title: res.data.specialActivityDetail.title
						})
					}
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + item.goodsId + '&goodsType=' + item.type
				})
			},
			//分享个人
			onShareAppMessage() {
				return {
					title: this.specialActivityDetail.title,
					path: '/personalPage/activePage?specialActivityId=' + this.specialActivityId
				}

			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: this.specialActivityDetail.title,
					path: '/personalPage/activePage?id=' + this.specialActivityId
				}

			},
		}
	}
</script>


<style lang="scss" scoped>
	.activePage {
		background-color: #F6F6F6;
		overflow-x: hidden;
	}

	.activeImg {
		width: 750upx;
		background-color: #FFF;
		image {
			width: 750upx;
		}
	}

	.ListTopImg {
		width: 750upx;
		height: 412upx;
		background: #232323;

		image {
			width: 750upx;
			height: 412upx;
		}
	}

	.activeContent {
		background: #FFF;
		// .activeCenter {
		// 	width: 630upx;
		// 	background: #FFF9F6;
		// 	border-radius: 15upx;
		// 	margin: 0upx auto;
		// 	position: relative;
		// 	top: 30upx;
		// 	box-sizing: border-box;

		// 	.activeCenterName {
		// 		margin-top: 10upx;

		// 		.activeTitle {
		// 			width: 191upx;
		// 			height: 29upx;
		// 			font-size: 30upx;
		// 			font-family: Microsoft YaHei;
		// 			font-weight: 400;
		// 			color: #FF4A4B;
		// 			margin-left: 50upx;
		// 			padding-top: 50upx;
		// 		}

		// 		.activeNews {
		// 			width: 532upx;
		// 			height: 116upx;
		// 			font-size: 28upx;
		// 			font-family: Microsoft YaHei;
		// 			font-weight: 400;
		// 			color: #1E1E1E;
		// 			line-height: 44upx;
		// 			margin-left: 50upx;
		// 			padding-top: 32upx;
		// 		}
		// 	}
		// }

		// .activeContentIMg {
		// 	width: 750upx;
		// 	height: 723upx;
		// 	margin: 40upx auto;
		// }
	}


	.activeList {
		width: 750upx;
		margin-top: 20upx;
		padding-bottom: 20upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-start;

		.activeGoods {
			width: 340upx;
			// height: 494upx;
			background: #FFFEFF;
			border-radius: 10upx;
			margin-left: 23upx;
			margin-top: 20upx;
			padding-bottom: 15upx;
			
			.goodsTitle {
				width: 293upx;
				height: 75upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 22upx;
				margin-top: 20upx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				line-height: 75upx;
			}

			.goodsPrice {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #E1251B;
				margin-top: 10upx;
				margin-left: 10upx;
				display: flex;
				position: relative;
				margin-bottom: 10upx;
				// justify-content: space-between;

				span {
					font-size: 36upx;
					font-weight: 600;
				}

				.addCartBtn2 {
					width: 135upx;
					height: 45upx;
					// border: 1px solid #CFD0D2;
					background: #3C6CFE;
					border-radius: 35upx;
					font-size: 28upx;
					color: #fff;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 45upx;
					text-align: center;
					position: absolute;
					top: 0;
					right: 0;
					margin-right: 10upx;
				}
			}
			.units{
				width: 292upx;
				// margin-top: 15upx;
				margin-left: 20upx;
				line-height: 40upx;
				font-size: 24upx;
				color: #9FA0A5;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	.noGoods {
		width: 750upx;
		text-align: center;
		image {
			width: 84upx;
			height: 84upx;
			// margin-left: 335upx;
			margin-top: 300upx;
		}

		.noState {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			margin: 0 auto;
			margin-top: 40upx;
			padding-bottom: 50upx;
		}
	}

	.lastContent {
		width: 100%;
		margin-top: 40upx;
		font-size: 24upx;
		text-align: center;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		padding-bottom: 52upx;
	}
</style>