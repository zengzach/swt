<template>

	<view v-show="!isSortType" :style="{padding:'0 '+prConfig+'px'}">
		<view class="index-product-wrapper" :class="bgStyle==0?'':'borderRadius15'"
			:style="{ marginTop: mbConfig*2 + 'rpx', background: themeColor }">
			<!-- 单列 -->
			<block v-if="itemStyle == 0">
				<view class="list-box listA" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
					<view class="item" :class="conStyle==1?'borderRadius15':''" v-for="(item, index) in tempArr"
						:key="index" @click="goDetail(item)">
						<view class="pictrue">
							<!-- <span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '1'">{{$t(`秒杀`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '2'">{{$t(`砍价`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '3'">{{$t(`拼团`)}}</span> -->
							<image style="border-radius: 20rpx 0 0 20rpx" :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
						</view>
						<view class="text-info"
							style="display: flex; flex-direction: column; justify-content: space-between;">
							<view>
								<view class="title line2" v-if="titleShow">{{ item.goodsTitle }}</view>
								<view class="old-price" v-if="opriceShow">
									<text>{{$t(`￥`)}}</text>
									{{ item.goodsPrice.marketPrice }}
								</view>
							</view>
							<view class="price" :style="'color:'+fontColor">
								<view v-if="priceShow">
									<text>{{$t(`￥`)}}</text>
									{{item.goodsPrice.promotionPrice !==0?item.goodsPrice.promotionPrice:item.goodsPrice.price}}
								</view>
								<!-- <view class="txt" :style="'border:1px solid '+labelColor+';color:'+labelColor"
									:class="priceShow?'':'on'" v-if="item.checkCoupon && couponShow">{{$t(`券`)}}</view> -->
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 两列 -->
			<block v-if="itemStyle == 1">
				<view class="list-box listC" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
					<view class="item" :class="conStyle?'borderRadius15':''" v-for="(item, index) in tempArr"
						:key="index" @click="goDetail(item)">
						<view class="pictrue">
							<!-- <span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '1'">{{$t(`秒杀`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '2'">{{$t(`砍价`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '3'">{{$t(`拼团`)}}</span> -->
							<image style="border-radius: 20rpx 20rpx 0 0" :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode="aspectFit">
						</view>
						<view class="text-info">
							<view class="title line1" v-if="titleShow">{{ item.goodsTitle }}</view>
							<view class="old-price" v-if="opriceShow">
								<text>{{$t(`￥`)}}</text>
								{{ item.goodsPrice.marketPrice }}
							</view>
							<view class="price" :style="'color:'+fontColor">
								<view v-if="priceShow">
									<text>{{$t(`￥`)}}</text>
									{{item.goodsPrice.promotionPrice !==0?item.goodsPrice.promotionPrice:item.goodsPrice.price}}
								</view>
								<!-- <view class="txt" :style="'border:1px solid '+labelColor+';color:'+labelColor"
									:class="priceShow?'':'on'" v-if="item.checkCoupon && couponShow">{{$t(`券`)}}</view> -->
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 三列 -->
			<block v-if="itemStyle == 2">
				<view class="list-box listB" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
					<view class="item" :class="conStyle?'borderRadius15':''" v-for="(item, index) in tempArr"
						:key="index" @click="goDetail(item)">
						<view class="pictrue">
							<!-- <span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '1'">{{$t(`秒杀`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '2'">{{$t(`砍价`)}}</span>
							<span class="pictrue_log pictrue_log_class" :style="'background-color:'+labelColor"
								v-if="item.activity && item.activity.type === '3'">{{$t(`拼团`)}}</span> -->
							<image style="border-radius: 20rpx 20rpx 0 0" :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode="aspectFit"></image>
						</view>
						<view class="text-info"
							style="display: flex; flex-direction: column; justify-content: space-between;">
							<view>
								<view class="title line1" v-if="titleShow">{{ item.goodsTitle }}</view>
								<view class="old-price" v-if="opriceShow">
									<text>{{$t(`￥`)}}</text>
									{{ item.goodsPrice.marketPrice }}
								</view>
							</view>
							<view class="price" :style="'color:'+fontColor">
								<view v-if="priceShow">
									<text>{{$t(`￥`)}}</text>
									{{item.goodsPrice.promotionPrice !==0?item.goodsPrice.promotionPrice:item.goodsPrice.price}}
								</view>
								<!-- <view class="txt" :style="'border:1px solid '+labelColor+';color:'+labelColor"
									:class="priceShow?'':'on'" v-if="item.checkCoupon && couponShow">{{$t(`券`)}}</view> -->
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 大图 -->
		<view v-if="itemStyle == 3 && tempArr.length" :style="{ marginTop: mbConfig + 'rpx' }">
			<view class="listBig" :class="bgStyle==0?'':'borderRadius15'" :style="{ background: themeColor }">
				<view class="itemBig" :class="conStyle?'borderRadius15':''" v-for="(item,index) in tempArr" :key="index"
					@click="goDetail(item)">
					<view class="img-box">
						<!-- <span class="pictrue_log_big pictrue_log_class" :style="'background-color:'+labelColor"
							v-if="item.activity && item.activity.type === '1'">{{$t(`秒杀`)}}</span>
						<span class="pictrue_log_big pictrue_log_class" :style="'background-color:'+labelColor"
							v-if="item.activity && item.activity.type === '2'">{{$t(`砍价`)}}</span>
						<span class="pictrue_log_big pictrue_log_class" :style="'background-color:'+labelColor"
							v-if="item.activity && item.activity.type === '3'">{{$t(`拼团`)}}</span> -->
						<image :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
					</view>
					<view class="name line2"><span class="coupon"
							:style="'border:1px solid '+labelColor+';color:'+labelColor"
							v-if="item.checkCoupon && couponShow">{{$t(`券`)}}</span><span
							v-if="titleShow">{{item.goodsTitle}}</span></view>
					<view class="price" :style="'color:'+fontColor">
						<span v-if="priceShow">{{$t(`￥`)}}
							<span class="num">
								{{ item.goodsPrice.marketPrice }}
							</span>
						</span>
						<span class="old-price" v-if="opriceShow">{{$t(`￥`)}}
							{{item.goodsPrice.promotionPrice !==0?item.goodsPrice.promotionPrice:item.goodsPrice.price}}
						</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProductslist
	} from '@/api/store.js';
	export default {
		name: 'goodList',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			isSortType: {
				type: String | Number,
				default: 0
			}
		},
		data() {
			return {
				tempArr: [],
				mbConfig: this.dataConfig.mbConfig.val,
				numConfig: this.dataConfig.numConfig.val,
				themeColor: this.dataConfig.themeColor.color[0].item,
				itemStyle: this.dataConfig.itemStyle.type,
				sortType: this.dataConfig.goodsSort.type,
				type: this.dataConfig.tabConfig.tabVal || 0,
				selectId: this.dataConfig.selectConfig.activeValue,
				productIds: this.dataConfig.goodsList.ids || [],
				opriceShow: this.dataConfig.opriceShow.val, //商品原价
				priceShow: this.dataConfig.priceShow.val, //商品价格
				titleShow: this.dataConfig.titleShow.val, //商品名称
				// couponShow: this.dataConfig.couponShow.val, //商品优惠券
				prConfig: this.dataConfig.prConfig.val, //左右边距
				bgStyle: this.dataConfig.bgStyle.type, //背景样式
				conStyle: this.dataConfig.conStyle.type, //内容样式
				fontColor: this.dataConfig.fontColor.color[0].item,
				labelColor: this.dataConfig.labelColor.color[0].item,
				pageNum: 1,
				total: 0,
				hasNextPage:null
			};
		},
		created() {
			this.productslist();
			// console.log(this.bgStyle,"-111--",this.conStyle)
		},
		onLoad() {
			
		},
		mounted() {

		},

		methods: {
			productslist() {
				// console.log(this.numConfig,"numConfig")
				let limit = this.$config.LIMIT;
				// console.log(limit,"limit")
				let data = {};
				var pageSize=null
				if(this.numConfig==null){
					pageSize=limit
				}else{
					pageSize=this.numConfig
				}
				if (this.type == 1) {

					data = {
						ids: this.productIds,
						status:10
					};
					this.tempArr = []
				} else {
					data = {
						priceOrder: this.sortType == 2 ? 'desc' : '',
						salesOrder: this.sortType == 1 ? 'desc' : '',
						categoryId: this.selectId[this.selectId.length - 1] || 0,
						pageNum: this.pageNum,
						status:10,
						pageSize:pageSize
					};
				}
				getProductslist(data).then(res => {
					this.total = res.data.total
					this.hasNextPage = res.data.hasNextPage
					// console.log(this.total, 'this.totaltempArr');
					if (this.total > this.tempArr.length) {
						// this.pageNum++;
						this.tempArr = this.tempArr.concat(res.data.list);
					}

				});
			},

			goDetail(item) {
				// console.log(item, 'item=========');
				this.$emit('detail', item);
				// goodsDetail/goodsDetail
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + item.id
				});


			},
			onsollBottonTwo() {
				// console.log(this.pageNum,"----",this.pageSize,"----",this.total,"----",this.hasNextPage,"----",this.tempArr.length)
				if (this.total > this.tempArr.length) {
					this.pageNum++
					this.productslist()
				}

			},

		}
	};
</script>

<style lang="scss">
	.borderRadius15 {
		border-radius: 20rpx;
	}
	// 大
	.listBig {
		padding: 1px 20rpx 20rpx 20rpx;

		.borderRadius15 {
			border-radius: 20rpx;
			image {
				border-radius: 20rpx 20rpx 0 0;
			}
		}

		.itemBig {
			width: 100%;
			margin-top: 20rpx;
			background-color: #fff;
			padding-bottom: 15rpx;

			.img-box {
				width: 100%;
				height: 284rpx;
				position: relative;

				.pictrue_log_big {
					border-radius: 20rpx 0 20rpx 0;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 28rpx;
				font-weight: bold;
				margin-top: 16rpx;
				padding: 0 8px;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;

				.coupon {
					display: inline-block;
					text-align: center;
					width: 32rpx;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-weight: normal;
					margin-right: 10rpx;
				}
			}

			.price {
				font-weight: bold;
				font-size: 12px;
				margin-top: 10rpx;
				padding: 0 8px;

				.num {
					font-size: 32rpx;
					margin-right: 10rpx;
				}

				.old-price {
					color: #aaa;
					font-weight: normal;
					text-decoration: line-through;
				}
			}
		}
	}
	// 小
	.index-product-wrapper {
		
		.borderRadius15 {
			border-radius: 20rpx;
		}
		
		.list-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 20rpx 20rpx 0;

			.item {
				width: 345rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				overflow: hidden;
				position: relative;

				&.on {
					border-radius: 0;
				}

				.pictrue {
					width: 347rpx;
					height: 347rpx;
				}

				.pictrue_log {
					width: 92rpx;
					height: 44rpx;
					font-size: 26rpx;
					line-height: 44rpx;
					border-radius: 0 0 20rpx 0 !important;
				}

				image {
					// height: 346rpx;
					// width: 347rpx;
					// height: 347rpx;
					width: 100%;
					height: 100%;
					display: block;
				}

				.text-info {
					padding: 10rpx 20rpx 15rpx;

					.title {
						color: #222222;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.old-price {
						margin-top: 4rpx;
						font-size: 26rpx;
						color: #aaaaaa;
						text-decoration: line-through;

						text {
							margin-right: 2px;
							font-size: 20rpx;
						}
					}

					.price {
						display: flex;
						align-items: flex-end;
						font-size: 36rpx;
						font-weight: 550;

						text {
							padding-bottom: 4rpx;
							font-size: 26rpx;
							font-weight: normal;
						}

						.txt {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 28rpx;
							height: 28rpx;
							margin-left: 15rpx;
							margin-bottom: 10rpx;
							border-radius: 4rpx;
							font-size: 20rpx;
							font-weight: normal;

							&.on {
								margin-left: 0;
							}
						}
					}
				}
			}

			&.on {
				display: flex;
			}

			&.listA {
				width: 100%;
				.item {
					width: 100%;
					display: flex;

					.pictrue {
						width: 220rpx !important;
						height: 220rpx !important;
					}

					.text-info {
						// width: calc(100% - 220upx);
						width: 400upx;
						flex: 1
					}
				}
			}

			&.listC {
				.item {
					width: 48.5%;
				}

				.pictrue {
					width: 100%;
					height: 345rpx;
				}
			}

			&.listB {
				justify-content: inherit;

				.item {
					width: 31.6%;
					margin-right: 16rpx;

					.pictrue {
						width: 100%;
						height: 220rpx;
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
