<template>
	<view v-show="!isSortType" :style="{padding:'0 '+prConfig*2+'rpx'}">
		<view class="articleList" :class="bgStyle==1?'borderRadius15':''"
			:style="'background-color:'+bgColor+';margin-top:'+ mbConfig*2 +'rpx;'" v-if="articleList.length">
			<view v-if="listStyle==1">
				<view v-for="(item,index) in articleList" :key='index' hover-class='none' @click="toEnquiry(item)"
					class="item acea-row row-between-wrapper" :class="conStyle==1?'borderRadius15':''"
					:style="'margin-bottom:'+itemConfig*2+'rpx;'" style="display: flex;">
					<view class="pictrue">
						<image :src="item.url?item.url:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
					</view>
					<view class="text" style="margin-left: 20upx;">
						<view class="name line2">{{item.title}}</view>
						<view class="time">{{item.endDate}}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view v-for="(item,index) in articleList" :key='index' hover-class='none' @click="toEnquiry(item)"
					class="item acea-row row-between-wrapper" :class="conStyle==1?'borderRadius15':''"
					:style="'margin-bottom:'+itemConfig*2+'rpx;'" style="display: flex;">
					<view class="text">
						<view class="name line2">{{item.title}}</view>
						<view class="time">{{item.endDate}}</view>
					</view>
					<view class="pictrue">
						<image :src="item.url?item.url:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import {
		getArticleList,
		// getArtList
	} from '@/api/articleApi.js';
	export default {
		name: 'articleList',
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
				articleList: [],
				numConfig: this.dataConfig.numConfig.val,
				selectConfig: this.dataConfig.selectConfig.activeValue,
				listStyle: this.dataConfig.listStyle.type,
				bgColor: this.dataConfig.bgColor.color[0].item,
				itemConfig: this.dataConfig.itemConfig.val,
				mbConfig: this.dataConfig.mbConfig.val,
				bgStyle: this.dataConfig.bgStyle.type, //背景样式
				prConfig: this.dataConfig.prConfig.val, //背景边距
				conStyle: this.dataConfig.conStyle.type, //内容样式
				pageNum: 1
			}
		},
		created() {},
		mounted() {
			this.getCidArticle();
		},

		methods: {
			toEnquiry(item) {
				// console.log(item, "item--------");
				uni.navigateTo({
					url: '/personalPage/notice_detail?articleId=' + item.id
				})
			},
			getCidArticle: function() {
				let that = this;
				let limit = this.numConfig;
				if (that.selectConfig == 'inquiry_code') {
					var data = {
						limit: limit,
						status: 10,
						pageNum: this.pageNum
					}

					getArticleList(data).then(res => {
						res.data.forEach(item => {
							item.updateTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
							item.url = item.titleImge
							item.endDate = item.updateTime
						})
						that.articleList = res.data;
					});
				} else if (that.selectConfig == 'all_article') {
					var data = {
						limit: limit,
						status: 10,
						pageNum: this.pageNum
					}
					getArticleList(data).then(res => {
						res.data.forEach(item => {
							item.updateTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
							item.url = item.titleImge
							item.endDate = item.updateTime
						})
						that.articleList = res.data;
					})
				} else {
					var data = {
						articleTypeDictCode: that.selectConfig,
						limit: limit,
						status: 10,
						pageNum: this.pageNum
					}
					getArticleList(data).then(res => {
						res.data.forEach(item => {
							item.updateTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
							item.url = item.titleImge
							item.endDate = item.updateTime
						})
						that.articleList = res.data;
					})
				}

			},
		}
	}
</script>

<style lang="scss">
	.borderRadius15 {
		border-radius: 15rpx;
	}
	.articleList {
		background-color: #fff;
		padding: 20rpx 0;

		.item {
			padding: 20rpx;
			background-color: #fff;
			margin: 0 20rpx;

			&:last-child {
				margin-bottom: 0 !important;
			}

			.text {
				width: 60%;

				.name {
					font-size: 30rpx;
					color: #282828;
					height: 82rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; 
				}
				.time {
					font-size: 24rpx;
					color: #999;
					margin-top: 40rpx;
				}
			}
			.pictrue {
				width: 37%;
				height: 155rpx;
				border-radius: 6rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
			.searchGoodsImg {
				width: 220rpx;
				height: 155rpx;
				border-radius: 20rpx;
				position: relative;
				.goodsImg {
					width: 220rpx;
					height: 155rpx;
					border-radius: 20rpx;
					position: absolute;
					left: 0;
					top: 0;
				}
				.goodsImg_bg {
					width: 112upx;
					height: 68upx;
					position: absolute;
					right: -3upx;
					top: 0;
				}
				.goodsImg2 {
					width: 82upx;
					height: 34upx;
					position: absolute;
					right: 5upx;
					top: 5upx;
					z-index: 20upx;
				}
			}
		}
	}
</style>
