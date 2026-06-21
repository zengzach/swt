<template>
	<view>
		<view class="integralBrand">
			<view class="integralBrandRight">
				<scroll-view scroll-y="true" v-for="(item,index) in barndArr" :scroll-into-view="item.letter"
					:key='index'  @click="item.data.length ? brandBtn(item.letter) :''">
					<view class="integralBrandRightEn" :style="{'color':item.data.length ? '':'#C4C4C4'} ">
						{{item.letter}}
					</view>
				</scroll-view>
			</view>

			<view class="integralBrandLeft">
				<view class="integralBrandText" v-for="(items,index) in barndArr" :key='index' :id="items.letter">
					<view class="" v-if="items.data.length">
						{{items.letter}}
					</view>
					<view class="integralBrandFlex">
						<view class="integralBrandImgs" v-for="item1 in items.data" :key='item1.id'>
							<view class="integralBrandContent" @click="toList(item1)">
								<view style="width: 140upx;height: 80upx;display:flex;justify-content: center;align-items: center;overflow:hidden;">
									<image :src="item1.url" mode="widthFix"></image>
								</view>
								<view style="margin-top: 15upx;">
									<!-- {{item1.name}} -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		brandSortList,
	} from '@/api/indexApi.js'
	import {
		
		refresh,
		getRouter
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				barndArr: {}
			}
		},
		onLoad() {
			this.getbrandSortList()
			this.getDataMsg()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg(){
				this.getbrandSortList()
				getRouter()
			},
			getbrandSortList(){
				brandSortList().then(res=>{
					this.barndArr = res.data
				})
			},
			brandBtn(item) {
				let id = '#' + item
				wx.createSelectorQuery().select(id).boundingClientRect(function(rect) {
					// 节点的上边界坐标
					let top = rect.top;
					// 节点的下边界坐标
					let bottom = rect.bottom;
					wx.pageScrollTo({
						scrollTop: top,
						duration: 300
					});
				}).exec()
			},
			//跳转品牌商品列表
			toList(item1){
				uni.navigateTo({
					url: '/goodsLIst/goodsLIst?brandName=' + item1.name +'&brandId='+item1.id,
				})
			},
			//分享个人
			onShareAppMessage() {
				return {
					title: '品牌专区',
					path: '/goodsLIst/brandList' 
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '品牌专区',
					path: '/goodsLIst/brandList' 
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.color{
		color: #C4C4C4;
	}
	.integralBrand {
		position: relative;

		.integralBrandRight {
			height:100%;
			position: fixed;
			right: 0;
			top:0;
			overflow:auto;

			.integralBrandRightEn {
				width: 60upx;
				height: 44upx;
				line-height: 44upx;
				background: #F4F4F4;
				border-radius: 22upx;
				text-align: center;
				margin-top: 18upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}

		.integralBrandLeft {
			margin-top: 10upx;
			margin-left: 30upx;

			.integralBrandText {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;

				.integralBrandFlex {
					width: 631upx;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					margin: 0 auto;

					.integralBrandImgs {
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						
						.integralBrandContent {
							width: 140upx;
							// height:120upx;
							margin-top: 42upx;
							text-align: center;
							image {
								width: 140upx;
								height: 80upx;
							}
							view {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
							}
						}
						// .integralBrandContent:nth-child(3n-1){
						// 	margin: 0 20upx;
						// }
						&:nth-child(3n-3) {
							margin: 0upx 15upx;
						}
						&:nth-child(3n-2) {
							margin: 0upx 15upx 0 0upx;
						}
					}
				}
			}
		}
	}
</style>
