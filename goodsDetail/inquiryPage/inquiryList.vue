<template>
	<view>
		<view class="inquiryList" v-if="inquiryList">
			<view class="inquiryList_item" v-for="(item,index) in inquiryList" :key="item.id" @click="toInquiryDetail(item)">
				<view class="inquiryList_item_left">
					<image :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
				</view>
				<view class="inquiryList_item_right">
					<view class="item_goodsTitle">{{item.goodsTitle}}</view>
					<view class="item_goodsTime">
						<view>{{item.createTime}}</view>
						<view style="margin-left: 50upx;color: #e1251b;">{{item.isRecover?'已报价':'询价中'}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noGoods" v-else>
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/nogoods.png" mode="">
			</image>
			<view class="noState"> 暂无询价数据 </view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import { toast, getUrl, refresh, getRouter } from '@/utils/utils.js'
	import { inquiryList } from '@/api/goodsDetailApi.js'
	export default {
		data() {
			return {
				pageNum:1,
				pageSize:20,
				hasNextPage:null,
				inquiryList:[],
			};
		},
		onLoad() {
			this.getInquiryList()
		},
		onReachBottom: function() {
			if (this.hasNextPage) {
				this.pageNum++
				this.getInquiryList()
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.inquiryList=[]
			this.getInquiryList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getInquiryList(){
				var data={
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				inquiryList(data).then(res=>{
					if(res.success){
						res.data.list.forEach(item=>{
							item.createTime = moment(item.createTime).format('YYYY.MM.DD HH:mm:ss')
							this.inquiryList.push(item)
						})
						this.hasNextPage = res.data.hasNextPage
					}
				})
			},
			toInquiryDetail(item){
				uni.navigateTo({
					url:"/goodsDetail/inquiryPage/inquiryDetail?id="+item.id
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.inquiryList{
		width: 750upx;
		margin: 20upx auto 0;
	}
	.inquiryList_item{
		width: 690upx;
		padding: 20upx 30upx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		.inquiryList_item_left{
			width: 220rpx;
			height: 220rpx;
			border: 1px solid #EAEAEA;
			border-radius: 20rpx;
			image{
				width: 220rpx;
				height: 220rpx;
				border-radius: 20rpx;
			}
		}
		.inquiryList_item_right{
			width: 440upx;
			
			.item_goodsTitle{
				width: 100%;
				height: 80upx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				line-height: 40rpx;
				margin-top: 20upx;
				margin-bottom: 65upx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			.item_goodsTime{
				display: flex;
				justify-content: start;
				view{
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #8D8D8D;
					line-height: 40rpx;
				}
			}
		}
	}
	.noGoods {
		width: 750upx;
		text-align: center;
		image {
			width: 84upx;
			height: 84upx;
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
</style>
