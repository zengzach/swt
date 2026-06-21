<template>
	<view>
		<view class="inquiryList">
			<view class="inquiryList_item">
				<view class="inquiryList_item_left">
					<image :src="inquiryDetail.goodsPictureUrl?inquiryDetail.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"
						mode=""></image>
				</view>
				<view class="inquiryList_item_right">
					<view class="item_goodsTitle">{{inquiryDetail.goodsTitle}}</view>
					<view class="item_goodsTime">
						<view>{{inquiryDetail.createTime}}</view>
						<view style="margin-left: 50upx;color: #e1251b;">{{inquiryDetail.isRecover?'已报价':'询价中'}}</view>
					</view>
				</view>
			</view>
			<view class="inquiryList_content" style="margin-top: 20upx;">
				<view class="content_item">
					<view class="content_title">询价描述</view>
					<view class="content">{{inquiryDetail.description}}</view>
				</view>
				<view class="content_item2" style="margin-top: 10upx;">
					<view class="content_title">联系人</view>
					<view class="content">{{inquiryDetail.contact}}</view>
				</view>
				<view class="content_item2">
					<view class="content_title">手机号</view>
					<view class="content">{{inquiryDetail.mobile}}</view>
				</view>
				<view class="content_item2">
					<view class="content_title">公司名称</view>
					<view class="content">{{inquiryDetail.company}}</view>
				</view>
				<view class="content_item" v-if="inquiryDetail.isRecover">
					<view class="content_title">报价详情</view>
					<view class="content">{{inquiryDetail.recover?inquiryDetail.recover:'暂无报价详情'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import { toast, getUrl, refresh, getRouter } from '@/utils/utils.js'
	import { inquiryDetail } from '@/api/goodsDetailApi.js'
	export default {
		data() {
			return {
				inquiryDetail:{},
				inquiryId:null,
			};
		},
		onLoad(option) {
			this.inquiryId = option.id
			this.getInquiryDetail()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getInquiryDetail()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getInquiryDetail(){
				var data={
					sheetId: this.inquiryId,
				}
				inquiryDetail(data).then(res=>{
					if(res.success){
						res.data.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
						this.inquiryDetail = res.data
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.inquiryList {
		width: 750upx;
		margin: 20upx auto 0;
	}

	.inquiryList_item {
		width: 690upx;
		padding: 20upx 30upx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;

		.inquiryList_item_left {
			width: 220rpx;
			height: 220rpx;
			border: 1px solid #EAEAEA;
			border-radius: 20rpx;

			image {
				width: 220rpx;
				height: 220rpx;
				border-radius: 20rpx;
			}
		}

		.inquiryList_item_right {
			width: 440upx;

			.item_goodsTitle {
				width: 100%;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				line-height: 40rpx;
				margin-top: 20upx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.item_goodsTime {
				display: flex;
				justify-content: start;
				margin-top: 60upx;

				view {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #8D8D8D;
					line-height: 40rpx;
				}
			}
		}
	}

	.inquiryList_content {
		width: 690upx;
		padding: 20upx 30upx;
		background-color: #fff;

		.content_item {
			width: 100%;

			.content_title {
				font-size: 30upx;
				color: #232323;
				line-height: 60upx;
			}

			.content {
				font-size: 24upx;
				color: #555555;
				line-height: 44upx;
			}
		}

		.content_item2 {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.content_title {
				font-size: 28upx;
				color: #232323;
				line-height: 60upx;
			}

			.content {
				font-size: 24upx;
				color: #555555;
				line-height: 44upx;
			}
		}
	}
</style>