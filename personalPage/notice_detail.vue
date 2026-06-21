<template>
	<view class="notice_detail">
		<!-- <view class="" style="height: 145rpx;position: relative;">
				<image class="header_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png" @click="backpage"></image>
		</view> -->
		<view class="header">
			<view class="notice_detail_title">{{list.title}}</view>
		</view>
		<view class="notice_detail_content">
			<view class="notice_detail_msg">
				<view>
					<view>{{list.createTime}}</view>
				</view>
				<view>
					<view>{{list.author}}</view>
				</view>
			</view>
			<view class="notice_detail_html">
				<!-- <bctos-rich-text :nodes="list.context"></bctos-rich-text> -->
				<mp-html :content="list.context" :selectable='true' :tag-style="tagStyle" />
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getArticleDetail
	} from '@/api/articleApi.js'
	import mpHtml from '@/components/mp-html/mp-html'
	import {
		toast,
		refresh,
		getRouter,
		getUrl
	} from '@/utils/utils.js'
	import moment from 'moment';
	export default {
		components:{
			mpHtml
		},
		data() {
			return {
				tagStyle:{img: "width:100%;display:block;", table: "width:100%", video: "width:100%"},
				list: [],
				ids:'',
			}
		},
		onLoad: function(option) {
			this.ids = option.articleId,
			this.getdetail(this.ids);
			getUrl()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			getDataMsg() {
				this.getdetail(this.ids)
				getRouter();				
			},
			getdetail(option) {
				getArticleDetail({
					articleId: option
				}).then((res) => {
					res.data.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
					this.list = res.data;
					// this.list.forEach(item=>{
					// 	console.log(item,'aaa')
					// })
				})
			},
			backpage() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			//分享个人
			onShareAppMessage() {
				return {
					title: '文章详情',
					path: '/personalPage/notice_detail?id=' + this.ids +'&noticeType=1'
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '文章详情',
					path: '/personalPage/notice_detail?id=' + this.ids
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #ffffff;
	}
	.header_nav_icon {
		width: 40upx;
		height: 40upx;
		/* margin-top: 95upx; */
		top: 95upx;
		position: absolute;
		left: 15rpx;
	}
</style>
<style scoped lang="scss">
	.notice_detail {
		// padding: 19upx 0 0;

		.header {
			// width: 100%;
			width: calc(100% - 60upx);
			margin: 0 auto;
			// height: 128upx;
			display: flex;

			.notice_detail_title {
				// width: calc(100% - 60upx);
				margin: 0 auto;
				font-size: 34upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 60upx;
				// text-align: center;
				// margin-bottom: 23upx;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}
		}

		.notice_detail_content {
			margin-top: 40upx;
			
			.notice_detail_msg {
				width: calc(100% - 60upx);
				margin: 0 auto;
				display: flex;
				align-items: center;

				view {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #999999;
					margin-right: 36upx;
					display: flex;

					image {
						width: 24upx;
						height: 24upx;
						margin-right: 19upx;
					}
				}
			}

			.notice_detail_html {
				width: 100%;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				padding-top: 20upx;
				// line-height: 39upx;
				
				image {
					width: 100%;
				}
			}
		}
	}
</style>
