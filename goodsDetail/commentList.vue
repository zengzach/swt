<template>
	<view class="comment">
		<view class="commentNum">共{{total}}条评价</view>
		<view class="commentList">
			<view class="comment_list">
				<view class="commentLists" v-for="item in reatList" :key="item.id">
					<view class="commentAutor">
						<view class="commentAutor_">
							<image :src="item.headImg?item.headImg:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'" mode=""></image>
							<view class="autorText">{{item.mobile}}</view>
							<uni-rate class="uni_rate" size="18" :readonly="true" :value="item.rate" />
						</view>
						<view class="comment_timer">{{item.createTime}}</view>
					</view>
					<view class="comment_content">
						<view class="comment_text">
							{{item.suggestion}}
						</view>
						<view class="comment_image">
							<image v-for="(items,index) in item.imageUrlList" :key="index" 
								@click="checkImg(item.imageUrlList,index)"
								:src="items" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="goodsDetail">
			<view class="gobtn" :style="{ background:background}" @click="goDetail()">去选购</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import {
		toast,
		getUrl,
		getRouter
	} from '@/utils/utils.js'
	import {
		getStyleById
	} from '@/api/indexApi'
	import {
		goodsEvaluatePageList
	} from '@/api/goodsDetailApi.js'
	export default {
		data() {
			return {
				style:{},
				background:'',
				artNo:'',
				pageNum:1,
				pageSize:20,
				reatList:[],
				total:'',
				hasNextPage:null,
			};
		},
		onShow() {
			this.getStyleByIdList()
		},
		onLoad(option) {
			this.artNo = option.artNo
			this.getGoodsEvaluatePageList()
		},
		onReachBottom() {
			if (this.hasNextPage) {
				this.pageNum++
				this.getGoodsEvaluatePageList()
			}
		},
		methods: {
			getStyleByIdList() {
				getStyleById().then(res => {
					this.style = res.data
					this.background = this.style.colorblue
				})
			},
			// 去选购
			goDetail() {
				uni.redirectTo({
					url: uni.getStorageSync('Url'),
				})
			},
			// 查看评论图
			checkImg(list,index) {
				wx.previewImage({
					urls: list, //需要预览的图片http链接列表，注意是数组
					current: '' + list[index], // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			// 获取评论列表数据
			getGoodsEvaluatePageList(){
				var data={
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					artNo:this.artNo
				}
				goodsEvaluatePageList(data).then(res=>{
					if(res.success){
						if(res.data.list){
							res.data.list.forEach(item=>{
								item.createTime = moment(item.createTime).format('YYYY.MM.DD HH:mm:ss');
								item.createTime = item.createTime.split(' ')[0];
								var str1 = item.mobile.slice(0,3)
								var str2 = item.mobile.slice(-4)	
								item.mobile = str1+'****'+str2
							})
						}
						this.reatList = res.data.list
						this.total = res.data.total
						this.hasNextPage = res.data.hasNextPage
					}
				})
			},
		}
		
		
	}
</script>

<style>
	page {
		/* background-color: #F6F6F6; */
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="less">
	.comment {
		border-top: 1px solid #F5F5F5;	

		.commentNum {
			background-color: #fff;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 40rpx;
			padding: 30upx 0 0 30upx;
		}

		.commentList {
			width: 690upx;
			padding: 30upx 30upx 110upx 30upx;
			background-color: #fff;

			.commentLists {
				width: 690upx;
				padding: 20upx 0;
				border-bottom: 1px solid #F5F5F5;

				.commentAutor {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.commentAutor_ {
						width: 480upx;
						display: flex;
						justify-content: start;

						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
						}

						.autorText {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-top: 8upx;
							margin-left: 20upx;
						}

						.uni_rate {
							margin-left: 20upx;
							margin-top: 9upx;
						}
					}

					.comment_timer {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-top: 8upx;
					}
				}

				.comment_content {
					margin-left: 80upx;

					.comment_text {
						width: 610rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
						// -webkit-line-clamp: 3;
						// display: -webkit-box;
						// -webkit-box-orient: vertical;
						// overflow: hidden;
						// text-overflow: ellipsis;
					}

					.comment_image {
						width: 610upx;
						display: flex;
						flex-wrap: wrap;
						justify-content: start;

						image {
							width: 135rpx;
							height: 135rpx;
							margin-top: 20upx;
							margin-right: 18upx;
						}

					}

				}

			}

		}

		.goodsDetail {
			width: 100%;
			height: 120rpx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.gobtn {
				width: 690rpx;
				height: 80rpx;
				// background: linear-gradient(121deg, #5A75FF, #4C4DFF);
				border-radius: 40rpx;
				text-align: center;
				line-height: 80upx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>